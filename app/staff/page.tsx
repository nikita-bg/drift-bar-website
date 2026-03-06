'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './dashboard.module.css'

interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface Order {
    id: string
    table: string
    items: OrderItem[]
    total: number
    timestamp: string
    status: 'new' | 'seen' | 'done'
}

const STAFF_PASSWORD = 'drift2024'
const REFRESH_INTERVAL = 10_000 // 10 seconds
const AUTH_KEY = 'drift-staff-auth'

function timeAgo(iso: string): string {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (diff < 60) return `преди ${diff} сек`
    if (diff < 3600) return `преди ${Math.floor(diff / 60)} мин`
    return `преди ${Math.floor(diff / 3600)} ч`
}

function playBeep() {
    try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 800
        osc.type = 'sine'
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.5)
    } catch {
        // Audio not supported — ignore
    }
}

export default function StaffDashboard() {
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState(false)
    const [shaking, setShaking] = useState(false)

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
    const [refreshing, setRefreshing] = useState(false)

    const prevNewCount = useRef(0)

    // Check session storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem(AUTH_KEY)
            if (saved === 'true') setAuthenticated(true)
        }
    }, [])

    const fetchOrders = useCallback(async (isAuto = false) => {
        if (isAuto) setRefreshing(true)
        else setLoading(true)

        try {
            const res = await fetch('/api/orders')
            const data = await res.json()
            const fetched: Order[] = data.orders ?? []

            // Sound alert for new orders
            const newCount = fetched.filter(o => o.status === 'new').length
            if (newCount > prevNewCount.current && prevNewCount.current >= 0) {
                playBeep()
            }
            prevNewCount.current = newCount

            setOrders(fetched)
            setLastUpdate(new Date())
        } catch (err) {
            console.error('Failed to fetch orders:', err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    // Auto-refresh when authenticated
    useEffect(() => {
        if (!authenticated) return
        fetchOrders()
        const interval = setInterval(() => fetchOrders(true), REFRESH_INTERVAL)
        return () => clearInterval(interval)
    }, [authenticated, fetchOrders])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === STAFF_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true')
            setAuthenticated(true)
            setAuthError(false)
        } else {
            setAuthError(true)
            setShaking(true)
            setTimeout(() => setShaking(false), 600)
            setPassword('')
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_KEY)
        setAuthenticated(false)
        setOrders([])
        setPassword('')
    }

    const handleStatusChange = async (id: string, status: Order['status']) => {
        try {
            await fetch('/api/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            })
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
        } catch (err) {
            console.error('Failed to update status:', err)
        }
    }

    // ── Password Screen ──────────────────────────────────────────────
    if (!authenticated) {
        return (
            <main className={styles.authPage}>
                <div className={`${styles.authCard} ${shaking ? styles.shake : ''}`}>
                    <div className={styles.authLogo}>
                        <span className={styles.authLogoIcon}>🏎️</span>
                        <h1 className={styles.authTitle}>Drift Bar</h1>
                        <p className={styles.authSubtitle}>Staff Access</p>
                    </div>

                    <form onSubmit={handleLogin} className={styles.authForm}>
                        <div className={styles.authInputWrap}>
                            <input
                                id="staff-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Парола"
                                className={`${styles.authInput} ${authError ? styles.authInputError : ''}`}
                                autoComplete="current-password"
                                autoFocus
                            />
                        </div>

                        {authError && (
                            <p className={styles.authError}>❌ Грешна парола</p>
                        )}

                        <button type="submit" className={styles.authBtn}>
                            Влез →
                        </button>
                    </form>
                </div>
            </main>
        )
    }

    // ── Dashboard Screen ─────────────────────────────────────────────
    const activeOrders = orders.filter(o => o.status !== 'done')
    const doneOrders = orders.filter(o => o.status === 'done')

    return (
        <main className={styles.dashPage}>
            {/* Header */}
            <header className={styles.dashHeader}>
                <div className={styles.dashHeaderLeft}>
                    <span className={styles.dashLogo}>🍸</span>
                    <div>
                        <h1 className={styles.dashTitle}>Drift Bar — Поръчки</h1>
                        <p className={styles.dashMeta}>
                            {refreshing ? (
                                <span className={styles.refreshPulse}>↻ Обновяване...</span>
                            ) : lastUpdate ? (
                                `Обновено: ${lastUpdate.toLocaleTimeString('bg-BG')}`
                            ) : 'Зарежда...'}
                        </p>
                    </div>
                </div>
                <div className={styles.dashHeaderRight}>
                    <span className={styles.newBadgeCount}>
                        {orders.filter(o => o.status === 'new').length} нови
                    </span>
                    <button className={styles.refreshBtn} onClick={() => fetchOrders()}>
                        ↻
                    </button>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        Изход
                    </button>
                </div>
            </header>

            {/* Body */}
            <div className={styles.dashBody}>
                {loading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner} />
                        <p>Зарежда поръчки...</p>
                    </div>
                ) : activeOrders.length === 0 && doneOrders.length === 0 ? (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>🎉</span>
                        <h2>Няма поръчки</h2>
                        <p>Поръчките ще се появят тук автоматично</p>
                    </div>
                ) : (
                    <>
                        {/* Active Orders */}
                        {activeOrders.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    Активни ({activeOrders.length})
                                </h2>
                                <div className={styles.ordersGrid}>
                                    {activeOrders.map(order => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            onStatusChange={handleStatusChange}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Done Orders */}
                        {doneOrders.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDone}`}>
                                    Готови ({doneOrders.length})
                                </h2>
                                <div className={styles.ordersGrid}>
                                    {doneOrders.map(order => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            onStatusChange={handleStatusChange}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}

// ── Order Card Component ────────────────────────────────────────────
function OrderCard({
    order,
    onStatusChange,
}: {
    order: Order
    onStatusChange: (id: string, status: Order['status']) => void
}) {
    const statusLabel = {
        new: '🆕 НОВА',
        seen: '👁️ ВИДЯНА',
        done: '✅ ГОТОВА',
    }[order.status]

    return (
        <article className={`${styles.orderCard} ${styles[`orderCard_${order.status}`]}`}>
            <div className={styles.orderCardHeader}>
                <span className={`${styles.statusBadge} ${styles[`badge_${order.status}`]}`}>
                    {statusLabel}
                </span>
                <span className={styles.orderTime}>{timeAgo(order.timestamp)}</span>
            </div>

            <div className={styles.orderTable}>
                🍽️ Маса <strong>{order.table}</strong>
            </div>

            <ul className={styles.orderItems}>
                {order.items.map((item, i) => (
                    <li key={`${item.id}-${i}`} className={styles.orderItem}>
                        <span className={styles.orderItemQty}>{item.quantity}x</span>
                        <span className={styles.orderItemName}>{item.name}</span>
                        <span className={styles.orderItemPrice}>
                            {(item.price * item.quantity).toFixed(2)} €
                        </span>
                    </li>
                ))}
            </ul>

            <div className={styles.orderTotal}>
                Общо: <strong>{order.total.toFixed(2)} €</strong>
            </div>

            <div className={styles.orderActions}>
                {order.status === 'new' && (
                    <button
                        className={styles.btnSeen}
                        onClick={() => onStatusChange(order.id, 'seen')}
                    >
                        Видяна ✓
                    </button>
                )}
                {order.status !== 'done' && (
                    <button
                        className={styles.btnDone}
                        onClick={() => onStatusChange(order.id, 'done')}
                    >
                        Готова ✅
                    </button>
                )}
                {order.status === 'done' && (
                    <button
                        className={styles.btnReopen}
                        onClick={() => onStatusChange(order.id, 'new')}
                    >
                        Върни
                    </button>
                )}
            </div>

            <div className={styles.orderId}>{order.id}</div>
        </article>
    )
}
