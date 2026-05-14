import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface ReservationBody {
    name: string
    date: string
    time: string
    guests: string
    phone: string
    message?: string
}

interface FormSubmitResponse {
    success?: string | boolean
    message?: string
}

// FormSubmit.co — free anti-spam form-to-email relay, no API key, no signup.
// First submission triggers a confirmation email to RECIPIENT; once Slona
// clicks the activation link, all future submissions arrive in her inbox.
// Docs: https://formsubmit.co/
const RECIPIENT = 'driftbar@abv.bg'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${RECIPIENT}`

// Manual validation — kept here to avoid pulling in zod just for one route.
function validate(body: unknown): { ok: true; data: ReservationBody } | { ok: false; error: string } {
    if (!body || typeof body !== 'object') {
        return { ok: false, error: 'Невалидни данни.' }
    }
    const b = body as Record<string, unknown>

    const name = typeof b.name === 'string' ? b.name.trim() : ''
    const date = typeof b.date === 'string' ? b.date.trim() : ''
    const time = typeof b.time === 'string' ? b.time.trim() : ''
    const guests = typeof b.guests === 'string' ? b.guests.trim() : ''
    const phone = typeof b.phone === 'string' ? b.phone.trim() : ''
    const message =
        typeof b.message === 'string' && b.message.length > 0 ? b.message.trim() : undefined

    if (name.length < 2 || name.length > 120) {
        return { ok: false, error: 'Името е задължително (между 2 и 120 знака).' }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { ok: false, error: 'Невалиден формат на дата.' }
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
        return { ok: false, error: 'Невалиден формат на час.' }
    }
    if (guests.length === 0 || guests.length > 3) {
        return { ok: false, error: 'Невалиден брой гости.' }
    }
    if (phone.length < 6 || phone.length > 40) {
        return { ok: false, error: 'Невалиден телефонен номер.' }
    }
    if (message !== undefined && message.length > 2000) {
        return { ok: false, error: 'Бележката е твърде дълга.' }
    }

    return { ok: true, data: { name, date, time, guests, phone, message } }
}

export async function POST(request: Request): Promise<NextResponse> {
    let body: unknown
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Невалиден JSON.' }, { status: 400 })
    }

    const validation = validate(body)
    if (!validation.ok) {
        return NextResponse.json({ error: validation.error }, { status: 400 })
    }
    const data = validation.data

    // Reject past dates server-side (form already enforces min on input)
    const today = new Date().toISOString().slice(0, 10)
    if (data.date < today) {
        return NextResponse.json(
            { error: 'Не можете да резервирате за минала дата.' },
            { status: 400 }
        )
    }

    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        request.headers.get('x-real-ip') ??
        'unknown'

    // FormSubmit AJAX expects flat key-value pairs. Bulgarian labels survive
    // because FormSubmit forwards as UTF-8 in the email body.
    const payload: Record<string, string> = {
        'Име': data.name,
        'Дата': data.date,
        'Час': data.time,
        'Брой гости': data.guests,
        'Телефон': data.phone,
        'Бележка': data.message ?? '(няма)',
        'IP адрес': ip,
        'Източник': 'driftbarplovdiv.com',
        // FormSubmit control fields (prefixed with _):
        _subject: `Нова резервация — ${data.name} — ${data.date} ${data.time}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: 'noreply@driftbarplovdiv.com',
    }

    let upstream: Response
    try {
        upstream = await fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
            cache: 'no-store',
            // 10s — FormSubmit usually replies in 1-3s; protect against hangs.
            signal: AbortSignal.timeout(10_000),
        })
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'unknown network error'
        return NextResponse.json(
            { error: `Не успяхме да изпратим резервацията. ${msg}` },
            { status: 502 }
        )
    }

    let upstreamBody: FormSubmitResponse = {}
    try {
        upstreamBody = (await upstream.json()) as FormSubmitResponse
    } catch {
        /* FormSubmit sometimes returns non-JSON on errors — ignore */
    }

    if (!upstream.ok) {
        return NextResponse.json(
            {
                error:
                    upstreamBody.message ??
                    `Услугата за изпращане отговори с HTTP ${upstream.status}.`,
            },
            { status: 502 }
        )
    }

    // First-submission case: FormSubmit returns success but states that the
    // recipient must confirm before further emails arrive.
    const needsConfirm =
        typeof upstreamBody.message === 'string' &&
        upstreamBody.message.toLowerCase().includes('confirm')
    const message = needsConfirm
        ? 'Резервацията е изпратена. (Първото изпращане изисква еднократно потвърждение от страна на бара — Slona вече е получила имейл за потвърждение.)'
        : 'Резервацията е изпратена. Ще ви се обадим за потвърждение.'

    return NextResponse.json({ success: true, message })
}
