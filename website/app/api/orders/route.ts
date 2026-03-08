import { NextRequest, NextResponse } from 'next/server'
import { getOrders, updateOrderStatus } from '@/lib/orders-store'

export async function GET() {
    const orders = getOrders()
    return NextResponse.json({ orders })
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, status } = await req.json()

        if (!id || !status) {
            return NextResponse.json(
                { error: 'Missing id or status' },
                { status: 400 }
            )
        }

        const updated = updateOrderStatus(id, status)
        if (!updated) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Update order status error:', error)
        return NextResponse.json(
            { error: 'Internal error' },
            { status: 500 }
        )
    }
}
