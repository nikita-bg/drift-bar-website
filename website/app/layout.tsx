import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'latin-ext'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    variable: '--font-space-grotesk',
})

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
                url: 'https://driftbarplovdiv.com/assets/enhanced_live-performance-stage-close.png',
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
        <html lang="bg" className={spaceGrotesk.variable}>
            <head>
                {/* DNS Prefetch & Preconnect for external resources */}
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://www.googletagmanager.com" />

                {/* Preload critical images */}
                <link
                    rel="preload"
                    as="image"
                    href="/logo.png"
                    type="image/png"
                />
                <link
                    rel="preload"
                    as="image"
                    href="/assets/enhanced_live-performance-stage-close.png"
                    type="image/png"
                />

                {/* Material Symbols for icons - loaded async with font-display: swap */}
                <link
                    rel="preload"
                    as="style"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                    rel="stylesheet"
                />
                <noscript>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                        rel="stylesheet"
                    />
                </noscript>
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

                {/* Google Analytics - Optimized loading */}
                <Script
                    strategy="lazyOnload"
                    src="https://www.googletagmanager.com/gtag/js?id=G-9MX98P83J1"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-9MX98P83J1', {
                            send_page_view: false
                        });
                        gtag('event', 'page_view');
                    `}
                </Script>
                <Analytics />
            </body>
        </html>
    )
}
