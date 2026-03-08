'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../menu.module.css'

interface MenuHeaderProps {
    tableNumber?: string
}

export default function MenuHeader({ tableNumber }: MenuHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link href="/" className={styles.headerBack}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div className={styles.headerBrand}>
                    <Image
                        src="/logo.png"
                        alt="Drift Bar Plovdiv"
                        width={40}
                        height={40}
                        className={styles.headerLogo}
                        priority
                    />
                    <span className={styles.headerTitle}>DRIFT BAR</span>
                </div>
                {/* Table number removed - no ordering system */}
            </div>
        </header>
    )
}
