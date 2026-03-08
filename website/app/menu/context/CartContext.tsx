'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    tableNumber: string
    setTableNumber: (n: string) => void
    addItem: (item: { id: string; name: string; price: number }) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, qty: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
    isCartOpen: boolean
    setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'drift-bar-cart'
const TABLE_KEY = 'drift-bar-table'

export function CartProvider({ children, initialTable }: { children: ReactNode; initialTable?: string }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [tableNumber, setTableNumber] = useState(initialTable || '')
    const [isCartOpen, setCartOpen] = useState(false)
    const [hydrated, setHydrated] = useState(false)

    // Hydrate from localStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(STORAGE_KEY)
            const savedTable = localStorage.getItem(TABLE_KEY)
            if (savedCart) setItems(JSON.parse(savedCart))
            if (savedTable && !initialTable) setTableNumber(savedTable)
        } catch { /* ignore */ }
        setHydrated(true)
    }, [initialTable])

    // Persist to localStorage
    useEffect(() => {
        if (!hydrated) return
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items, hydrated])

    useEffect(() => {
        if (!hydrated) return
        localStorage.setItem(TABLE_KEY, tableNumber)
    }, [tableNumber, hydrated])

    const addItem = useCallback((item: { id: string; name: string; price: number }) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }, [])

    const updateQuantity = useCallback((id: string, qty: number) => {
        if (qty <= 0) {
            setItems(prev => prev.filter(i => i.id !== id))
        } else {
            setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
        }
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
        localStorage.removeItem(STORAGE_KEY)
    }, [])

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return (
        <CartContext.Provider value={{
            items, tableNumber, setTableNumber,
            addItem, removeItem, updateQuantity, clearCart,
            totalItems, totalPrice,
            isCartOpen, setCartOpen,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside CartProvider')
    return ctx
}
