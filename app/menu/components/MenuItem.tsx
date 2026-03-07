'use client'

import Image from 'next/image'
import type { MenuItem as MenuItemType } from '@/lib/menu-data'
import { generatePlaceholder, type PlaceholderType } from '@/lib/generate-placeholder'
import { useCart } from '../context/CartContext'
import styles from '../menu.module.css'

interface MenuItemProps {
    item: MenuItemType
    featured: boolean
    placeholderType?: PlaceholderType
}

export default function MenuItem({ item, featured, placeholderType = 'cocktail' }: MenuItemProps) {
    const { items, addItem, updateQuantity } = useCart()
    const cartItem = items.find(i => i.id === item.id)
    const quantity = cartItem?.quantity || 0

    const handleAdd = () => {
        addItem({ id: item.id, name: item.name, price: item.price })
    }

    // Генерира placeholder image ако липсва
    const imageSrc = item.image || generatePlaceholder(placeholderType, item.name)

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
                        unoptimized={!item.image} // За SVG data URLs
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
                    <div className={styles.cardActions}>
                        {quantity === 0 ? (
                            <button className={styles.addBtn} onClick={handleAdd} aria-label={`Добави ${item.name}`}>
                                <span className="material-symbols-outlined">add</span>
                                Добави
                            </button>
                        ) : (
                            <div className={styles.qtyControls}>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={() => updateQuantity(item.id, quantity - 1)}
                                    aria-label="Намали"
                                >
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={() => updateQuantity(item.id, quantity + 1)}
                                    aria-label="Добави"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        )
    }

    return (
        <article className={styles.cardSimple}>
            <div className={styles.cardSimpleLeft}>
                <h4 className={styles.cardSimpleName}>{item.name}</h4>
                <p className={styles.cardSimpleDesc}>{item.desc}</p>
            </div>
            <div className={styles.cardSimpleRight}>
                <span className={styles.cardSimplePrice}>{item.price.toFixed(2)} €</span>
                {quantity === 0 ? (
                    <button className={styles.addBtnSmall} onClick={handleAdd} aria-label={`Добави ${item.name}`}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                ) : (
                    <div className={styles.qtyControlsSmall}>
                        <button
                            className={styles.qtyBtnSmall}
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className={styles.qtyValueSmall}>{quantity}</span>
                        <button
                            className={styles.qtyBtnSmall}
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                )}
            </div>
        </article>
    )
}
