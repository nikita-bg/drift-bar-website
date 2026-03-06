'use client'

import type { MenuItem as MenuItemType } from '@/lib/menu-data'
import MenuItem from './MenuItem'
import styles from '../menu.module.css'

interface MenuGridProps {
    items: MenuItemType[]
    categoryType: 'featured' | 'simple'
}

export default function MenuGrid({ items, categoryType }: MenuGridProps) {
    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <span className="material-symbols-outlined">no_food</span>
                <p>Няма артикули в тази категория.</p>
            </div>
        )
    }

    return (
        <div className={categoryType === 'featured' ? styles.gridFeatured : styles.gridSimple}>
            {items.map((item) => (
                <MenuItem key={item.id} item={item} featured={categoryType === 'featured'} />
            ))}
        </div>
    )
}
