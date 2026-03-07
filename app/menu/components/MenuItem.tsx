'use client'

import Image from 'next/image'
import type { MenuItem as MenuItemType } from '@/lib/menu-data'
import { generatePlaceholder, type PlaceholderType } from '@/lib/generate-placeholder'
import styles from '../menu.module.css'

interface MenuItemProps {
    item: MenuItemType
    featured: boolean
    placeholderType?: PlaceholderType
}

export default function MenuItem({ item, featured, placeholderType = 'cocktail' }: MenuItemProps) {
    // Cart system removed - menu is display only

    // Генерира placeholder image ако липсва
    const imageSrc = item.image || generatePlaceholder(placeholderType, item.name)
    const isSvgOrDataUrl = !item.image || item.image.endsWith('.svg')

    if (featured) {
        return (
            <article className={styles.cardFeatured}>
                <div className={styles.cardImage}>
                    <Image
                        src={imageSrc}
                        alt={item.name}
                        width={400}
                        height={500}
                        className={styles.cardImg}
                        unoptimized={isSvgOrDataUrl}
                    />
                    {item.tags && item.tags.length > 0 && (
                        <div className={styles.cardTags}>
                            {item.tags.map((tag) => (
                                <span key={tag} className={styles.cardTag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardName}>{item.name}</h3>
                        <span className={styles.cardPrice}>{item.price.toFixed(2)} €</span>
                    </div>
                    <p className={styles.cardDesc}>{item.desc}</p>
                </div>
            </article>
        )
    }

    return (
        <article className={styles.cardSimple}>
            {(item.image || placeholderType) && (
                <div className={styles.cardSimpleThumbnail}>
                    <Image
                        src={imageSrc}
                        alt={item.name}
                        width={80}
                        height={100}
                        className={styles.cardSimpleThumbnailImg}
                        unoptimized={isSvgOrDataUrl}
                    />
                </div>
            )}
            <div className={styles.cardSimpleLeft}>
                <h4 className={styles.cardSimpleName}>{item.name}</h4>
                <p className={styles.cardSimpleDesc}>{item.desc}</p>
            </div>
            <div className={styles.cardSimpleRight}>
                <span className={styles.cardSimplePrice}>{item.price.toFixed(2)} €</span>
            </div>
        </article>
    )
}
