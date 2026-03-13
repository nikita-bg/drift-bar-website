import { NextRequest, NextResponse } from 'next/server'
import { addOrder } from '@/lib/orders-store'

interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface OrderPayload {
    table: string
    items: OrderItem[]
    total: number
    timestamp: string
}

export async function POST(req: NextRequest) {
    try {
        const body: OrderPayload = await req.json()

        // Validate
        if (!body.table || !body.items || body.items.length === 0) {
            return NextResponse.json(
                { error: 'Невалидна поръчка — липсват маса или артикули' },
                { status: 400 }
            )
        }

        // Save to in-memory store first
        const saved = addOrder({
            table: body.table,
            items: body.items,
            total: body.total,
            timestamp: body.timestamp || new Date().toISOString(),
        })

        // Forward to n8n webhook if configured
        const webhookUrl = process.env.N8N_WEBHOOK_URL
        if (webhookUrl) {
            const webhookRes = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (!webhookRes.ok) {
                console.error('n8n webhook failed:', webhookRes.status)
            }
        } else {
            // Log order if no webhook configured
            console.log('📦 Нова поръчка:', JSON.stringify(body, null, 2))
        }

        return NextResponse.json({
            success: true,
            message: 'Поръчката е приета!',
            orderId: saved.id,
        })
    } catch (error) {
        console.error('Order error:', error)
        return NextResponse.json(
            { error: 'Неуспешно обработване на поръчката' },
            { status: 500 }
        )
    }
}
