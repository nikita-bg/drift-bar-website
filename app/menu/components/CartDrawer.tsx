'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import styles from '../menu.module.css'

type OrderStatus = 'idle' | 'loading' | 'success' | 'error'

export default function CartDrawer() {
    const {
        items, tableNumber, setTableNumber,
        updateQuantity, removeItem, clearCart,
        totalItems, totalPrice,
        isCartOpen, setCartOpen,
    } = useCart()

    const [orderStatus, setOrderStatus] = useState<OrderStatus>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async () => {
        if (!tableNumber.trim()) {
            setErrorMsg('Моля, въведете номер на маса')
            return
        }
        if (items.length === 0) return

        setOrderStatus('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    table: tableNumber.trim(),
                    items: items.map(i => ({
                        id: i.id,
                        name: i.name,
                        price: i.price,
                        quantity: i.quantity,
                    })),
                    total: totalPrice,
                    timestamp: new Date().toISOString(),
                }),
            })

            if (!res.ok) throw new Error('Грешка при изпращане')

            setOrderStatus('success')
            clearCart()
            setTimeout(() => {
                setOrderStatus('idle')
                setCartOpen(false)
            }, 3000)
        } catch {
            setOrderStatus('error')
            setErrorMsg('Не можахме да изпратим поръчката. Опитайте отново.')
        }
    }

    return (
        <>
            {/* Floating Cart Button */}
            {totalItems > 0 && !isCartOpen && (
                <button
                    className={styles.cartFab}
                    onClick={() => setCartOpen(true)}
                    aria-label={`Кошница: ${totalItems} артикула`}
                >
                    <span className="material-symbols-outlined">shopping_bag</span>
                    <span className={styles.cartBadge}>{totalItems}</span>
                    <span className={styles.cartFabPrice}>{totalPrice.toFixed(2)} €</span>
                </button>
            )}

            {/* Backdrop */}
            {isCartOpen && (
                <div className={styles.cartBackdrop} onClick={() => setCartOpen(false)} />
            )}

            {/* Drawer */}
            <aside className={`${styles.cartDrawer} ${isCartOpen ? styles.cartDrawerOpen : ''}`}>
                <div className={styles.cartHeader}>
                    <h2 className={styles.cartTitle}>
                        <span className="material-symbols-outlined">shopping_bag</span>
                        Вашата поръчка
                    </h2>
                    <button
                        className={styles.cartClose}
                        onClick={() => setCartOpen(false)}
                        aria-label="Затвори"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Success state */}
                {orderStatus === 'success' && (
                    <div className={styles.cartSuccess}>
                        <span className="material-symbols-outlined">check_circle</span>
                        <h3>Поръчката е изпратена!</h3>
                        <p>Ще я приготвим възможно най-скоро.</p>
                    </div>
                )}

                {/* Cart items */}
                {orderStatus !== 'success' && (
                    <>
                        <div className={styles.cartBody}>
                            {items.length === 0 ? (
                                <div className={styles.cartEmpty}>
                                    <span className="material-symbols-outlined">remove_shopping_cart</span>
                                    <p>Кошницата е празна</p>
                                </div>
                            ) : (
                                <ul className={styles.cartList}>
                                    {items.map(item => (
                                        <li key={item.id} className={styles.cartItem}>
                                            <div className={styles.cartItemInfo}>
                                                <span className={styles.cartItemName}>{item.name}</span>
                                                <span className={styles.cartItemPrice}>
                                                    {(item.price * item.quantity).toFixed(2)} €
                                                </span>
                                            </div>
                                            <div className={styles.cartItemControls}>
                                                <button
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    aria-label="Намали"
                                                >
                                                    <span className="material-symbols-outlined">remove</span>
                                                </button>
                                                <span className={styles.qtyValue}>{item.quantity}</span>
                                                <button
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label="Добави"
                                                >
                                                    <span className="material-symbols-outlined">add</span>
                                                </button>
                                                <button
                                                    className={styles.cartItemRemove}
                                                    onClick={() => removeItem(item.id)}
                                                    aria-label="Премахни"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className={styles.cartFooter}>
                                {/* Table number input */}
                                <div className={styles.tableInput}>
                                    <label htmlFor="table-number" className={styles.tableLabel}>
                                        <span className="material-symbols-outlined">table_restaurant</span>
                                        Номер на маса
                                    </label>
                                    <input
                                        id="table-number"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="напр. 5"
                                        value={tableNumber}
                                        onChange={(e) => setTableNumber(e.target.value)}
                                        className={styles.tableField}
                                    />
                                </div>

                                {errorMsg && (
                                    <p className={styles.cartError}>{errorMsg}</p>
                                )}

                                {/* Total + Submit */}
                                <div className={styles.cartTotal}>
                                    <span>Общо</span>
                                    <span className={styles.cartTotalPrice}>{totalPrice.toFixed(2)} €</span>
                                </div>

                                <button
                                    className={styles.cartSubmit}
                                    onClick={handleSubmit}
                                    disabled={orderStatus === 'loading'}
                                >
                                    {orderStatus === 'loading' ? (
                                        <>
                                            <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>
                                                hourglass_empty
                                            </span>
                                            Изпращане...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">send</span>
                                            Поръчай
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </aside>
        </>
    )
}
