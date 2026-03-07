'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Menu, CategoryKey } from '@/lib/menu-data'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/menu-data'
import { CartProvider } from './context/CartContext'
import MenuHeader from './components/MenuHeader'
import CategoryTabs from './components/CategoryTabs'
import MenuGrid from './components/MenuGrid'
import CartDrawer from './components/CartDrawer'
import styles from './menu.module.css'

const CATEGORIES: CategoryKey[] = ['cocktails', 'whiskey', 'bourbon', 'vodka', 'gin', 'rum', 'tequila', 'rakiya', 'brandy', 'liqueurs', 'digestifs', 'wine', 'beer', 'food', 'soft', 'shots']

export default function MenuPage() {
    return (
        <Suspense fallback={<div className={styles.loading}><p>Зареждане...</p></div>}>
            <MenuPageContent />
        </Suspense>
    )
}

function MenuPageContent() {
    const [menuData, setMenuData] = useState<Menu | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('cocktails')
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const tableNumber = searchParams.get('table')

    useEffect(() => {
        fetch('/api/menu')
            .then((res) => res.json())
            .then((data: Menu) => {
                setMenuData(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const currentCategory = menuData ? menuData[selectedCategory] : null

    return (
        <CartProvider initialTable={tableNumber || undefined}>
            <div className={styles.menuPage}>
                <MenuHeader tableNumber={tableNumber || undefined} />

                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroInner}>
                        <span className={`material-symbols-outlined ${styles.heroIcon}`}>restaurant_menu</span>
                        <h1 className={styles.heroTitle}>
                            Нашето <em>Меню</em>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Класически коктейли, селекция спиртни напитки, вина и храна. Всяка напитка — направена правилно.
                        </p>
                    </div>
                </section>

                {/* Category Tabs */}
                <CategoryTabs
                    categories={CATEGORIES}
                    labels={CATEGORY_LABELS}
                    icons={CATEGORY_ICONS}
                    activeCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                {/* Menu Content */}
                <main className={styles.menuContent}>
                    <div className={styles.container}>
                        {loading && (
                            <div className={styles.loading}>
                                <span className="material-symbols-outlined">hourglass_empty</span>
                                <p>Зареждане...</p>
                            </div>
                        )}

                        {!loading && currentCategory && (
                            <>
                                <div className={styles.categoryHeader}>
                                    <h2 className={styles.categoryTitle}>
                                        {currentCategory.title}{' '}
                                        <span className={styles.categoryAccent}>{currentCategory.titleAccent}</span>
                                    </h2>
                                    {currentCategory.subtitle && (
                                        <p className={styles.categorySubtitle}>{currentCategory.subtitle}</p>
                                    )}
                                </div>
                                <MenuGrid
                                    items={currentCategory.items}
                                    categoryType={currentCategory.type}
                                    categoryKey={selectedCategory}
                                />
                            </>
                        )}
                    </div>
                </main>

                {/* Cart */}
                <CartDrawer />
            </div>
        </CartProvider>
    )
}
