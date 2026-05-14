import type { Metadata } from 'next'
import Script from 'next/script'
import { MENU } from '@/lib/menu-data'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

export const metadata: Metadata = {
    title: 'Меню — Коктейли, Уиски, Бира — Drift Bar Plovdiv',
    description: 'Меню на Drift Bar Plovdiv — авторски коктейли от €5, премиум уиски, бира на чешма, мезета, бургери. Цени в EUR.',
    keywords: 'меню drift bar, коктейли пловдив, уиски пловдив, бар цени пловдив',
    alternates: { canonical: `${baseUrl}/menu` },
    openGraph: {
        title: 'Меню — Коктейли, Уиски, Бира — Drift Bar Plovdiv',
        description: 'Меню на Drift Bar Plovdiv — авторски коктейли от €5, премиум уиски, бира на чешма, мезета, бургери. Цени в EUR.',
        url: `${baseUrl}/menu`,
        type: 'website',
        locale: 'bg_BG',
    },
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

    // Generate Menu JSON-LD Schema
    const hasMenuSchema = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Меню на Drift Bar Plovdiv",
        "url": `${baseUrl}/menu`,
        "mainEntityOfPage": `${baseUrl}/menu`,
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
