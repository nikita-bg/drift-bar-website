import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkAvailability, calculateEndTime, seedTables } from '@/lib/reservation-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/reservations — List reservations
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}
    if (date) where.date = date
    if (status) where.status = status

    const reservations = await prisma.reservation.findMany({
        where,
        include: { table: true },
        orderBy: { startTime: 'asc' },
    })

    return NextResponse.json({ reservations })
}

// POST /api/reservations — Create a new reservation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            date,
            startTime,
            duration = 120,
            partySize,
            guestName,
            guestPhone,
            guestEmail,
            notes,
            tableId,
        } = body

        // Validate required fields
        if (!date || !startTime || !partySize || !guestName || !guestPhone) {
            return NextResponse.json(
                { error: 'Моля попълнете всички задължителни полета (дата, час, брой гости, име, телефон)' },
                { status: 400 }
            )
        }

        // Validate party size
        if (partySize < 1 || partySize > 20) {
            return NextResponse.json(
                { error: 'Брой гости трябва да е между 1 и 20' },
                { status: 400 }
            )
        }

        // Validate date is not in the past
        const today = new Date().toISOString().split('T')[0]
        if (date < today) {
            return NextResponse.json(
                { error: 'Не можете да резервирате за минала дата' },
                { status: 400 }
            )
        }

        // Calculate end time
        const endTime = calculateEndTime(startTime, duration)

        // Check availability
        const availability = await checkAvailability({
            date,
            startTime,
            endTime,
            partySize,
        })

        if (!availability.available) {
            return NextResponse.json(
                { error: availability.reason },
                { status: 409 }
            )
        }

        // Ensure tables are seeded
        await seedTables()

        // Create reservation
        const reservation = await prisma.reservation.create({
            data: {
                date,
                startTime,
                endTime,
                duration,
                partySize,
                guestName,
                guestPhone,
                guestEmail: guestEmail || null,
                notes: notes || null,
                tableId: tableId || null,
                status: 'PENDING',
                source: 'website',
            },
            include: { table: true },
        })

        // TODO: Trigger n8n webhook for confirmation
        // try {
        //     if (process.env.N8N_RESERVATION_WEBHOOK_URL) {
        //         await fetch(process.env.N8N_RESERVATION_WEBHOOK_URL, {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(reservation),
        //         })
        //     }
        // } catch (e) { console.error('n8n webhook failed:', e) }

        return NextResponse.json({ success: true, reservation })
    } catch (error) {
        console.error('Reservation creation failed:', error)
        return NextResponse.json(
            { error: 'Грешка при създаване на резервация. Моля опитайте отново.' },
            { status: 500 }
        )
    }
}
