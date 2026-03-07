'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { CategoryKey } from '@/lib/menu-data'
import styles from '../menu.module.css'

interface CategoryTabsProps {
    categories: CategoryKey[]
    labels: Record<CategoryKey, string>
    icons: Record<CategoryKey, string>
    activeCategory: CategoryKey
    onCategoryChange: (cat: CategoryKey) => void
}

export default function CategoryTabs({
    categories,
    labels,
    icons,
    activeCategory,
    onCategoryChange,
}: CategoryTabsProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const updateArrows = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setShowLeftArrow(el.scrollLeft > 4)
        setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }, [])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        updateArrows()
        el.addEventListener('scroll', updateArrows, { passive: true })
        window.addEventListener('resize', updateArrows)
        return () => {
            el.removeEventListener('scroll', updateArrows)
            window.removeEventListener('resize', updateArrows)
        }
    }, [updateArrows])

    // Scroll active tab into view on category change
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const activeIndex = categories.indexOf(activeCategory)
        const activeTab = el.children[activeIndex] as HTMLElement | undefined
        if (activeTab) {
            const tabLeft = activeTab.offsetLeft
            const tabWidth = activeTab.offsetWidth
            const scrollLeft = el.scrollLeft
            const containerWidth = el.clientWidth

            // Scroll if tab is partially hidden
            if (tabLeft < scrollLeft + 40) {
                el.scrollTo({ left: tabLeft - 40, behavior: 'smooth' })
            } else if (tabLeft + tabWidth > scrollLeft + containerWidth - 40) {
                el.scrollTo({ left: tabLeft + tabWidth - containerWidth + 40, behavior: 'smooth' })
            }
        }
    }, [activeCategory, categories])

    const scrollBy = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault()
            onCategoryChange(categories[index - 1])
        } else if (e.key === 'ArrowRight' && index < categories.length - 1) {
            e.preventDefault()
            onCategoryChange(categories[index + 1])
        } else if (e.key === 'Home') {
            e.preventDefault()
            onCategoryChange(categories[0])
        } else if (e.key === 'End') {
            e.preventDefault()
            onCategoryChange(categories[categories.length - 1])
        }
    }

    return (
        <nav className={styles.tabs} aria-label="Категории меню">
            <div className={styles.tabsWrapper}>
                {/* Gradient fade indicators */}
                <div
                    className={`${styles.tabsFadeLeft} ${!showLeftArrow ? styles.tabsFadeHidden : ''}`}
                    aria-hidden="true"
                />
                <div
                    className={`${styles.tabsFadeRight} ${!showRightArrow ? styles.tabsFadeHidden : ''}`}
                    aria-hidden="true"
                />

                {/* Arrow buttons */}
                <button
                    className={`${styles.tabsArrow} ${styles.tabsArrowLeft} ${!showLeftArrow ? styles.tabsArrowHidden : ''}`}
                    onClick={() => scrollBy(-200)}
                    aria-label="Превъртете наляво"
                    tabIndex={-1}
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                    className={`${styles.tabsArrow} ${styles.tabsArrowRight} ${!showRightArrow ? styles.tabsArrowHidden : ''}`}
                    onClick={() => scrollBy(200)}
                    aria-label="Превъртете надясно"
                    tabIndex={-1}
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>

                {/* Scrollable tabs */}
                <div className={styles.tabsScroll} ref={scrollRef} role="tablist">
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            className={`${styles.tab} ${cat === activeCategory ? styles.tabActive : ''}`}
                            onClick={() => onCategoryChange(cat)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            role="tab"
                            aria-selected={cat === activeCategory}
                            tabIndex={cat === activeCategory ? 0 : -1}
                        >
                            <span className="material-symbols-outlined">{icons[cat]}</span>
                            <span>{labels[cat]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}
