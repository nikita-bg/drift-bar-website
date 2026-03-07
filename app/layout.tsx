import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Drift Bar Plovdiv — Жива Музика, Рок & Джаз Бар',
    description: 'Drift Bar Plovdiv — сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли, уникална атмосфера. ул. „Сливница" 2a, Кършияка Северен, Пловдив.',
    keywords: 'drift bar plovdiv, рок бар пловдив, жива музика пловдив, джаз бар пловдив, бар пловдив, концерти пловдив',
    openGraph: {
        title: 'Drift Bar Plovdiv — Жива Музика & Рок Бар',
        description: 'Сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли в центъра на Пловдив.',
        type: 'website',
        url: 'https://driftbarplovdiv.com',
        locale: 'bg_BG',
        images: [
            {
                url: 'https://driftbarplovdiv.com/og-image.svg',
                width: 1200,
                height: 630,
                alt: 'Drift Bar Plovdiv - Жива Музика',
            }
        ]
    },
    icons: {
        icon: [
            { url: '/icon.svg', type: 'image/svg+xml' }
        ],
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="bg">
            <head>
                {/* Preconnect for faster font loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Space Grotesk: full weight range including 800 & 900 for hero/headings */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                {/* Material Symbols for icons */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": ["LocalBusiness", "MusicVenue", "BarOrPub"],
                            "name": "Drift Bar Plovdiv",
                            "description": "Бар за рок и джаз музика на живо с професионална акустика и коктейли в Пловдив. Капацитет от 99 места и 20 маси.",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "ул. Сливница 2а",
                                "addressLocality": "Кършияка Северен, Пловдив",
                                "postalCode": "4003",
                                "addressCountry": "BG"
                            },
                            "telephone": "+359988793684",
                            "email": "driftbar@abv.bg",
                            "openingHoursSpecification": [
                                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Wednesday", "Thursday", "Sunday"], "opens": "20:00", "closes": "02:00" },
                                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Saturday"], "opens": "20:00", "closes": "04:00" }
                            ],
                            "priceRange": "$$",
                            "url": "https://driftbarplovdiv.com"
                        })
                    }}
                />
            </head>
            <body>
                <div className="grain-overlay" aria-hidden="true" />
                {children}
            </body>
        </html>
    )
}
