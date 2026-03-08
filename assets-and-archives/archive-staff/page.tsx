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

interface Reservation {
    id: string
    date: string
    startTime: string
    endTime: string
    duration: number
    partySize: number
    guestName: string
    guestPhone: string
    guestEmail?: string
    notes?: string
    status: string
    source: string
    table?: { id: string; name: string; capacity: number }
    createdAt: string
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
    const [activeTab, setActiveTab] = useState<'orders' | 'reservations'>('orders')

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
    const [refreshing, setRefreshing] = useState(false)

    const [reservations, setReservations] = useState<Reservation[]>([])
    const [resLoading, setResLoading] = useState(false)
    const [resDate, setResDate] = useState(new Date().toISOString().split('T')[0])
    const [resStatusFilter, setResStatusFilter] = useState<string>('all')

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

    const fetchReservations = useCallback(async () => {
        setResLoading(true)
        try {
            const params = new URLSearchParams({ date: resDate })
            if (resStatusFilter !== 'all') params.set('status', resStatusFilter)
            const res = await fetch(`/api/reservations?${params}`)
            const data = await res.json()
            setReservations(data.reservations ?? [])
        } catch (err) {
            console.error('Failed to fetch reservations:', err)
        } finally {
            setResLoading(false)
        }
    }, [resDate, resStatusFilter])

    // Auto-refresh when authenticated
    useEffect(() => {
        if (!authenticated) return
        fetchOrders()
        const interval = setInterval(() => fetchOrders(true), REFRESH_INTERVAL)
        return () => clearInterval(interval)
    }, [authenticated, fetchOrders])

    // Fetch reservations when tab or filters change
    useEffect(() => {
        if (!authenticated || activeTab !== 'reservations') return
        fetchReservations()
    }, [authenticated, activeTab, fetchReservations])

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
        setReservations([])
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

    const handleReservationStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/reservations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })
            setReservations(prev =>
                prev.map(r => r.id === id ? { ...r, status } : r)
            )
        } catch (err) {
            console.error('Failed to update reservation:', err)
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
    const newOrdersCount = orders.filter(o => o.status === 'new').length
    const pendingResCount = reservations.filter(r => r.status === 'PENDING').length

    return (
        <main className={styles.dashPage}>
            {/* Header */}
            <header className={styles.dashHeader}>
                <div className={styles.dashHeaderLeft}>
                    <span className={styles.dashLogo}>🍸</span>
                    <div>
                        <h1 className={styles.dashTitle}>Drift Bar — Панел</h1>
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
                    <button className={styles.refreshBtn} onClick={() => activeTab === 'orders' ? fetchOrders() : fetchReservations()}>
                        ↻
                    </button>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        Изход
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className={styles.dashTabs}>
                <button
                    className={`${styles.dashTab} ${activeTab === 'orders' ? styles.dashTabActive : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    🍽️ Поръчки
                    {newOrdersCount > 0 && (
                        <span className={styles.tabBadge}>{newOrdersCount}</span>
                    )}
                </button>
                <button
                    className={`${styles.dashTab} ${activeTab === 'reservations' ? styles.dashTabActive : ''}`}
                    onClick={() => setActiveTab('reservations')}
                >
                    📅 Резервации
                    {pendingResCount > 0 && (
                        <span className={styles.tabBadge}>{pendingResCount}</span>
                    )}
                </button>
            </div>

            {/* Body */}
            <div className={styles.dashBody}>
                {activeTab === 'orders' ? (
                    <>
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
                    </>
                ) : (
                    /* ── Reservations Tab ──── */
                    <>
                        {/* Date & status filter */}
                        <div className={styles.resFilters}>
                            <input
                                type="date"
                                className={styles.resDateInput}
                                value={resDate}
                                onChange={(e) => setResDate(e.target.value)}
                            />
                            <select
                                className={styles.resStatusSelect}
                                value={resStatusFilter}
                                onChange={(e) => setResStatusFilter(e.target.value)}
                            >
                                <option value="all">Всички</option>
                                <option value="PENDING">Чакащи</option>
                                <option value="CONFIRMED">Потвърдени</option>
                                <option value="CANCELLED">Отменени</option>
                                <option value="COMPLETED">Завършени</option>
                                <option value="NO_SHOW">Не се явиха</option>
                            </select>
                        </div>

                        {resLoading ? (
                            <div className={styles.loadingState}>
                                <div className={styles.spinner} />
                                <p>Зарежда резервации...</p>
                            </div>
                        ) : reservations.length === 0 ? (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>📅</span>
                                <h2>Няма резервации</h2>
                                <p>за {resDate}</p>
                            </div>
                        ) : (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    {reservations.length} резервации за {resDate}
                                </h2>
                                <div className={styles.ordersGrid}>
                                    {reservations.map(res => (
                                        <ReservationCard
                                            key={res.id}
                                            reservation={res}
                                            onStatusChange={handleReservationStatus}
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

// ── Reservation Card Component ──────────────────────────────────────
function ReservationCard({
    reservation: res,
    onStatusChange,
}: {
    reservation: Reservation
    onStatusChange: (id: string, status: string) => void
}) {
    const statusEmoji: Record<string, string> = {
        PENDING: '⏳',
        CONFIRMED: '✅',
        CANCELLED: '❌',
        NO_SHOW: '👻',
        COMPLETED: '🎉',
    }

    const statusLabel: Record<string, string> = {
        PENDING: 'ЧАКАЩА',
        CONFIRMED: 'ПОТВЪРДЕНА',
        CANCELLED: 'ОТМЕНЕНА',
        NO_SHOW: 'НЕ СЕ ЯВИ',
        COMPLETED: 'ЗАВЪРШЕНА',
    }

    const statusColor: Record<string, string> = {
        PENDING: '#f39c12',
        CONFIRMED: '#27ae60',
        CANCELLED: '#e74c3c',
        NO_SHOW: '#95a5a6',
        COMPLETED: '#3498db',
    }

    return (
        <article className={styles.orderCard} style={{ borderLeft: `4px solid ${statusColor[res.status] || '#ccc'}` }}>
            <div className={styles.orderCardHeader}>
                <span className={styles.statusBadge} style={{ background: statusColor[res.status], color: '#fff' }}>
                    {statusEmoji[res.status]} {statusLabel[res.status]}
                </span>
                <span className={styles.orderTime}>{res.startTime} – {res.endTime}</span>
            </div>

            <div className={styles.orderTable}>
                👤 <strong>{res.guestName}</strong>
            </div>

            <ul className={styles.orderItems}>
                <li className={styles.orderItem}>
                    <span className={styles.orderItemQty}>👥</span>
                    <span className={styles.orderItemName}>{res.partySize} {res.partySize === 1 ? 'човек' : 'души'}</span>
                </li>
                <li className={styles.orderItem}>
                    <span className={styles.orderItemQty}>📞</span>
                    <span className={styles.orderItemName}>{res.guestPhone}</span>
                </li>
                {res.guestEmail && (
                    <li className={styles.orderItem}>
                        <span className={styles.orderItemQty}>📧</span>
                        <span className={styles.orderItemName}>{res.guestEmail}</span>
                    </li>
                )}
                {res.notes && (
                    <li className={styles.orderItem}>
                        <span className={styles.orderItemQty}>📝</span>
                        <span className={styles.orderItemName} style={{ fontStyle: 'italic' }}>{res.notes}</span>
                    </li>
                )}
                {res.table && (
                    <li className={styles.orderItem}>
                        <span className={styles.orderItemQty}>🍽️</span>
                        <span className={styles.orderItemName}>{res.table.name} (до {res.table.capacity} души)</span>
                    </li>
                )}
            </ul>

            <div className={styles.orderActions}>
                {res.status === 'PENDING' && (
                    <>
                        <button className={styles.btnSeen} onClick={() => onStatusChange(res.id, 'CONFIRMED')}>
                            Потвърди ✅
                        </button>
                        <button className={styles.btnReopen} onClick={() => onStatusChange(res.id, 'CANCELLED')}>
                            Откажи ❌
                        </button>
                    </>
                )}
                {res.status === 'CONFIRMED' && (
                    <>
                        <button className={styles.btnDone} onClick={() => onStatusChange(res.id, 'COMPLETED')}>
                            Завършена 🎉
                        </button>
                        <button className={styles.btnReopen} onClick={() => onStatusChange(res.id, 'NO_SHOW')}>
                            Не се яви 👻
                        </button>
                    </>
                )}
                {(res.status === 'CANCELLED' || res.status === 'NO_SHOW') && (
                    <button className={styles.btnReopen} onClick={() => onStatusChange(res.id, 'PENDING')}>
                        Върни ↩
                    </button>
                )}
            </div>

            <div className={styles.orderId}>
                {res.source === 'website' ? '🌐' : '📞'} {res.id.slice(0, 12)}...
            </div>
        </article>
    )
}
