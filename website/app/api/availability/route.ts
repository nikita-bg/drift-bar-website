import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/reservation-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/availability?date=2026-03-10&partySize=4
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const partySize = parseInt(searchParams.get('partySize') || '1')

    if (!date) {
        return NextResponse.json(
            { error: 'Параметър "date" е задължителен (YYYY-MM-DD)' },
            { status: 400 }
        )
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
            { error: 'Невалиден формат на дата. Използвайте YYYY-MM-DD' },
            { status: 400 }
        )
    }

    // Check if day is closed (Mon=1, Tue=2, Wed=3)
    const dayOfWeek = new Date(date + 'T12:00:00').getDay()
    if (dayOfWeek >= 1 && dayOfWeek <= 3) {
        return NextResponse.json(
            { error: 'Барът не работи в понеделник, вторник и сряда.' },
            { status: 400 }
        )
    }

    const slots = await getAvailableSlots(date, partySize)

    return NextResponse.json({ date, partySize, slots })
}
