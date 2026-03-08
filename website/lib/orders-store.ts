// lib/orders-store.ts
// In-memory singleton store for orders.
// Persists across Next.js hot reloads via global scope.

export interface Order {
    id: string
    table: string
    items: { id: string; name: string; price: number; quantity: number }[]
    total: number
    timestamp: string
    status: 'new' | 'seen' | 'done'
}

// Use global to survive hot-reload in dev
const globalStore = global as typeof global & { _driftOrders?: Order[] }
if (!globalStore._driftOrders) {
    globalStore._driftOrders = []
}

export function addOrder(order: Omit<Order, 'id' | 'status'>): Order {
    const newOrder: Order = {
        ...order,
        id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        status: 'new',
    }
    globalStore._driftOrders!.unshift(newOrder) // newest first
    // Keep max 200 orders in memory
    if (globalStore._driftOrders!.length > 200) {
        globalStore._driftOrders = globalStore._driftOrders!.slice(0, 200)
    }
    return newOrder
}

export function getOrders(): Order[] {
    return globalStore._driftOrders ?? []
}

export function updateOrderStatus(id: string, status: Order['status']): boolean {
    const order = globalStore._driftOrders?.find(o => o.id === id)
    if (!order) return false
    order.status = status
    return true
}
