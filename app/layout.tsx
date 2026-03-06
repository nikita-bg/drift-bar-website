import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Drift Bar Plovdiv — Жива Музика, Рок & Джаз Бар',
    description: 'Drift Bar Plovdiv — сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли, уникална атмосфера. ул. Сливница 2А, Пловдив.',
    keywords: 'drift bar plovdiv, рок бар пловдив, жива музика пловдив, джаз бар пловдив, бар пловдив, концерти пловдив',
    openGraph: {
        title: 'Drift Bar Plovdiv — Жива Музика & Рок Бар',
        description: 'Сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли в центъра на Пловдив.',
        type: 'website',
        url: 'https://driftbarplovdiv.com',
        locale: 'bg_BG',
    },
    icons: {
        icon: '/favicon.ico',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
                            "description": "Сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли в центъра на Пловдив.",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "ул. Сливница 2А",
                                "addressLocality": "Пловдив",
                                "addressCountry": "BG"
                            },
                            "telephone": "+359877455192",
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
