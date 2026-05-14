import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { EVENTS, getUpcomingEvents } from '@/lib/events-data'
import { FAQ_ITEMS } from '@/lib/faq-data'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'latin-ext'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    variable: '--font-space-grotesk',
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

export const metadata: Metadata = {
    title: 'Drift Bar Plovdiv — Жива Музика, Рок & Джаз Бар',
    description: 'Drift Bar Plovdiv — сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли, уникална атмосфера. ул. „Сливница" 2a, Кършияка Северен, Пловдив.',
    keywords: 'drift bar plovdiv, рок бар пловдив, жива музика пловдив, джаз бар пловдив, бар пловдив, концерти пловдив',
    openGraph: {
        title: 'Drift Bar Plovdiv — Жива Музика & Рок Бар',
        description: 'Сцена от музиканти за музиканти. Жива рок и джаз музика, авторски коктейли в центъра на Пловдив.',
        type: 'website',
        url: baseUrl,
        locale: 'bg_BG',
        images: [
            {
                url: `${baseUrl}/assets/enhanced_live-performance-stage-close.webp`,
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

// Schema.org LocalBusiness — enriched for both classic SEO (Google rich results)
// and GEO (LLM citations via structured data). Note: alternateName, geo coords,
// areaServed, paymentAccepted, currenciesAccepted are all signals AI engines pick up.
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MusicVenue", "BarOrPub"],
    "@id": `${baseUrl}/#localbusiness`,
    "name": "Drift Bar Plovdiv",
    "alternateName": ["Drift Bar", "Дрифт Бар Пловдив", "Drift Plovdiv"],
    "description": "Бар за рок и джаз музика на живо с професионална акустика и коктейли в Пловдив. Капацитет от 99 места и 20 маси. Сцена от музиканти за музиканти.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Сливница 2а",
        "addressLocality": "Пловдив",
        "addressRegion": "Кършияка Северен",
        "postalCode": "4003",
        "addressCountry": "BG"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.1418,
        "longitude": 24.7461
    },
    "telephone": "+359988793684",
    "email": "driftbar@abv.bg",
    "url": baseUrl,
    "image": `${baseUrl}/assets/enhanced_live-performance-stage-close.webp`,
    "logo": `${baseUrl}/logo.webp`,
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Thursday"], "opens": "20:00", "closes": "02:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "18:00", "closes": "02:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Saturday"], "opens": "20:00", "closes": "04:00" }
    ],
    "priceRange": "€2-€18",
    "currenciesAccepted": "EUR, BGN",
    "paymentAccepted": "Cash, Credit Card",
    "areaServed": {
        "@type": "City",
        "name": "Пловдив",
        "@id": "https://www.wikidata.org/wiki/Q459"
    },
    "smokingAllowed": false,
    "publicAccess": true,
    "hasMap": "https://maps.google.com/?q=Drift+Bar+Plovdiv+Slivnitsa+2a",
    "sameAs": [
        "https://www.facebook.com/driftbarplovdiv",
        "https://www.instagram.com/drift_bar_plovdiv/"
    ]
} as const

// FAQ schema — feeds Google "People also ask" snippets AND is consumed by
// LLMs (ChatGPT search, Perplexity, Claude) when users ask similar questions.
// SOURCE: lib/faq-data.ts — kept in sync with the visible FAQ section rendered
// in app/page.tsx (Google rejects FAQ schema unless the content is visibly on
// the page).
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
        },
    })),
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Generate MusicEvent JSON-LD for each upcoming event. This is critical for
    // SEO (Google Events rich cards) AND GEO (when users ask LLMs "what's
    // happening at Drift Bar tonight", the AI cites structured event data).
    const upcomingEvents = getUpcomingEvents()
    const eventSchemas = upcomingEvents.map(event => ({
        "@context": "https://schema.org",
        "@type": "MusicEvent",
        "name": event.title,
        "description": event.description,
        "startDate": `${event.date}T${event.time}:00+03:00`,
        "endDate": `${event.date}T23:59:00+03:00`,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "MusicVenue",
            "name": "Drift Bar Plovdiv",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Сливница 2а",
                "addressLocality": "Пловдив",
                "postalCode": "4003",
                "addressCountry": "BG"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.1418,
                "longitude": 24.7461
            }
        },
        "image": `${baseUrl}${event.image}`,
        "offers": {
            "@type": "Offer",
            "price": event.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": `${baseUrl}/events`,
            "validFrom": new Date().toISOString().slice(0, 10)
        },
        "performer": {
            "@type": "MusicGroup",
            "name": event.title
        },
        "organizer": {
            "@type": "Organization",
            "name": "Drift Bar Plovdiv",
            "url": baseUrl
        }
    }))

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
                    href="/logo.webp"
                    type="image/webp"
                />
                <link
                    rel="preload"
                    as="image"
                    href="/assets/enhanced_live-performance-stage-close.webp"
                    type="image/webp"
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
                {/* Enriched LocalBusiness/MusicVenue/BarOrPub schema — feeds Google
                    Maps, Google Search, and AI search engines (ChatGPT, Perplexity, Claude). */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                {/* FAQ schema — drives Google "People also ask" and AEO/GEO. */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                {/* One MusicEvent schema per upcoming event — Google Events rich cards. */}
                {eventSchemas.map((schema, i) => (
                    <script
                        key={`event-schema-${i}`}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                ))}
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
