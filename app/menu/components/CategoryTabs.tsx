'use client'

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
    return (
        <nav className={styles.tabs}>
            <div className={styles.tabsScroll}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.tab} ${cat === activeCategory ? styles.tabActive : ''}`}
                        onClick={() => onCategoryChange(cat)}
                    >
                        <span className="material-symbols-outlined">{icons[cat]}</span>
                        <span>{labels[cat]}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}
