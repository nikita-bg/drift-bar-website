import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// PATCH /api/reservations/[id] — Update reservation status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { status, tableId, notes } = body

        // Validate status
        const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'NO_SHOW', 'COMPLETED']
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `Невалиден статус. Разрешени: ${validStatuses.join(', ')}` },
                { status: 400 }
            )
        }

        const updateData: Record<string, unknown> = {}
        if (status) updateData.status = status
        if (tableId !== undefined) updateData.tableId = tableId
        if (notes !== undefined) updateData.notes = notes

        const reservation = await prisma.reservation.update({
            where: { id },
            data: updateData,
            include: { table: true },
        })

        return NextResponse.json({ success: true, reservation })
    } catch (error) {
        console.error('Reservation update failed:', error)
        return NextResponse.json(
            { error: 'Резервацията не беше намерена' },
            { status: 404 }
        )
    }
}

// DELETE /api/reservations/[id] — Cancel reservation
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.reservation.update({
            where: { id },
            data: { status: 'CANCELLED' },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Reservation cancellation failed:', error)
        return NextResponse.json(
            { error: 'Резервацията не беше намерена' },
            { status: 404 }
        )
    }
}
