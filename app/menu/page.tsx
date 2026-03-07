'use client'

import { Suspense, useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Menu, CategoryKey } from '@/lib/menu-data'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/menu-data'
import MenuHeader from './components/MenuHeader'
import MenuGrid from './components/MenuGrid'
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
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('cocktails')
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const tableNumber = searchParams.get('table')
    const tabsScrollRef = useRef<HTMLDivElement>(null)
    const isClickScrolling = useRef(false)

    useEffect(() => {
        fetch('/api/menu')
            .then((res) => res.json())
            .then((data: Menu) => {
                setMenuData(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    // Scroll spy - track which category section is in view
    const handleScroll = useCallback(() => {
        if (isClickScrolling.current) return

        const offset = 140 // height of header + tabs
        for (let i = CATEGORIES.length - 1; i >= 0; i--) {
            const el = document.getElementById(`cat-${CATEGORIES[i]}`)
            if (el && el.offsetTop - offset <= window.scrollY) {
                setActiveCategory(CATEGORIES[i])
                break
            }
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    // Scroll active tab into view in the horizontal tabs bar
    useEffect(() => {
        const el = tabsScrollRef.current
        if (!el) return
        const activeIndex = CATEGORIES.indexOf(activeCategory)
        const activeTab = el.children[activeIndex] as HTMLElement | undefined
        if (activeTab) {
            const tabLeft = activeTab.offsetLeft
            const tabWidth = activeTab.offsetWidth
            const scrollLeft = el.scrollLeft
            const containerWidth = el.clientWidth
            if (tabLeft < scrollLeft + 40) {
                el.scrollTo({ left: tabLeft - 40, behavior: 'smooth' })
            } else if (tabLeft + tabWidth > scrollLeft + containerWidth - 40) {
                el.scrollTo({ left: tabLeft + tabWidth - containerWidth + 40, behavior: 'smooth' })
            }
        }
    }, [activeCategory])

    // Click tab -> scroll to that section
    const scrollToCategory = (cat: CategoryKey) => {
        const el = document.getElementById(`cat-${cat}`)
        if (!el) return
        isClickScrolling.current = true
        setActiveCategory(cat)
        const offset = 130
        window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
        setTimeout(() => { isClickScrolling.current = false }, 800)
    }

    return (
        <div className={styles.menuPage}>
            <MenuHeader tableNumber={tableNumber || undefined} />

            {/* Sticky Category Tabs */}
            <nav className={styles.stickyTabs} aria-label="Категории меню">
                <div className={styles.tabsScroll} ref={tabsScrollRef}>
                    {CATEGORIES.map((cat) => {
                        const categoryData = menuData ? menuData[cat] : null
                        if (!categoryData || categoryData.items.length === 0) return null
                        return (
                            <button
                                key={cat}
                                className={`${styles.tab} ${cat === activeCategory ? styles.tabActive : ''}`}
                                onClick={() => scrollToCategory(cat)}
                            >
                                <span className="material-symbols-outlined">{CATEGORY_ICONS[cat]}</span>
                                <span>{CATEGORY_LABELS[cat]}</span>
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* All Categories - Continuous Scroll */}
            <main className={styles.menuContent}>
                <div className={styles.container}>
                    {loading && (
                        <div className={styles.loading}>
                            <span className="material-symbols-outlined">hourglass_empty</span>
                            <p>Зареждане...</p>
                        </div>
                    )}

                    {!loading && menuData && CATEGORIES.map((cat) => {
                        const categoryData = menuData[cat]
                        if (!categoryData || categoryData.items.length === 0) return null
                        return (
                            <section key={cat} id={`cat-${cat}`} className={styles.categorySection}>
                                <div className={styles.categoryHeader}>
                                    <h2 className={styles.categoryTitle}>
                                        {categoryData.title}{' '}
                                        <span className={styles.categoryAccent}>{categoryData.titleAccent}</span>
                                    </h2>
                                    {categoryData.subtitle && (
                                        <p className={styles.categorySubtitle}>{categoryData.subtitle}</p>
                                    )}
                                </div>
                                <MenuGrid
                                    items={categoryData.items}
                                    categoryType={categoryData.type}
                                    categoryKey={cat}
                                />
                            </section>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
