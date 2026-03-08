import { Metadata } from 'next'
import Script from 'next/script'
import { MENU } from '@/lib/menu-data'

export const metadata: Metadata = {
    title: 'Меню | Drift Bar Plovdiv | Коктейли, Уиски и Напитки',
    description: 'Разгледайте онлайн менюто на Drift Bar Plovdiv. Голямо разнообразие от алкохолни и безалкохолни коктейли, отлежало уиски, наливна бира и мезета.',
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
    // Generate Menu JSON-LD Schema
    const hasMenuSchema = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Меню на Drift Bar Plovdiv",
        "url": "https://driftbarplovdiv.com/menu",
        "mainEntityOfPage": "https://driftbarplovdiv.com/menu",
        "hasMenuSection": Object.values(MENU).map(cat => ({
            "@type": "MenuSection",
            "name": cat.title + (cat.titleAccent ? " " + cat.titleAccent : ""),
            "hasMenuItem": cat.items.map(item => ({
                "@type": "MenuItem",
                "name": item.name,
                "description": item.desc || item.name,
                "offers": {
                    "@type": "Offer",
                    "price": item.price,
                    "priceCurrency": "EUR"
                }
            }))
        }))
    }

    return (
        <>
            <Script
                id="menu-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hasMenuSchema) }}
            />
            {children}
        </>
    )
}
