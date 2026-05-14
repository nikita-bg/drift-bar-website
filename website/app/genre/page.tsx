import type { Metadata } from 'next'
import Link from 'next/link'
import { EVENTS } from '@/lib/events-data'
import { GENRE_HUBS } from '@/lib/genre-slugs'

export const dynamic = 'force-static'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

export const metadata: Metadata = {
    title: 'Музикални Жанрове — Drift Bar Plovdiv',
    description: 'Рок, джаз, блус, соул, DJ сетове и латино — всички жанрове на живо в Drift Bar Plovdiv. Изберете жанр и вижте предстоящите концерти.',
    keywords: 'жанрове музика пловдив, жива музика пловдив, рок джаз блус пловдив, drift bar жанрове',
    alternates: { canonical: `${baseUrl}/genre` },
    openGraph: {
        title: 'Музикални Жанрове — Drift Bar Plovdiv',
        description: 'Рок, джаз, блус, соул, DJ сетове и латино — всички жанрове на живо в Drift Bar Plovdiv.',
        url: `${baseUrl}/genre`,
        type: 'website',
        locale: 'bg_BG',
    },
}

// CollectionPage schema for the index — helps both Google and LLMs understand
// this is a hub of curated genre subpages.
const indexSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/genre#collectionpage`,
    name: 'Музикални жанрове в Drift Bar Plovdiv',
    description: 'Хъб със всички музикални жанрове, представени на сцената на Drift Bar Plovdiv.',
    url: `${baseUrl}/genre`,
    inLanguage: 'bg-BG',
    isPartOf: { '@id': `${baseUrl}/#localbusiness` },
    mainEntity: {
        '@type': 'ItemList',
        numberOfItems: GENRE_HUBS.length,
        itemListElement: GENRE_HUBS.map((g, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${baseUrl}/genre/${g.slug}`,
            name: g.genre,
        })),
    },
} as const

// Count events per genre for the cards
function getEventCount(genre: string): number {
    return EVENTS.filter(e => e.genre === genre).length
}

export default function GenreIndexPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#e8e4d9', fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(indexSchema) }}
            />

            {/* ── HEADER ── */}
            <header style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'rgba(10, 10, 18, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a09878', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Начало
                </Link>
                <Link href="/" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', color: '#e8e4d9', textDecoration: 'none' }}>
                    DRIFT BAR
                </Link>
                <Link href="/events" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a09878', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
                    <span className="material-symbols-outlined">event</span>
                    Събития
                </Link>
            </header>

            {/* ── HERO ── */}
            <section style={{ padding: '4rem 1.5rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
                <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d4af37', fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>library_music</span>
                    Музика в Drift Bar
                </p>
                <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', lineHeight: 1.05, fontWeight: 800, margin: 0, color: '#e8e4d9' }}>
                    Музикални<br />
                    <span style={{ color: '#9c3211' }}>жанрове</span>
                </h1>
                <p style={{ marginTop: '1.5rem', maxWidth: 720, fontSize: '1.05rem', color: '#a09878', lineHeight: 1.7 }}>
                    Drift Bar Plovdiv е сцена за широк спектър жанрове — от рок и джаз до блус, соул, латино и DJ сетове. Изберете жанр и вижте предстоящите концерти, програмата за следващите седмици и какво прави всяка вечер уникална.
                </p>
            </section>

            {/* ── GENRE GRID ── */}
            <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {GENRE_HUBS.map(g => {
                        const count = getEventCount(g.genre)
                        return (
                            <Link
                                key={g.slug}
                                href={`/genre/${g.slug}`}
                                style={{ display: 'block', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', padding: '1.75rem 1.5rem', textDecoration: 'none', color: 'inherit', border: '1px solid rgba(255, 255, 255, 0.06)', transition: 'all 0.2s ease' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                                        {g.label}
                                    </span>
                                    {count > 0 && (
                                        <span style={{ fontSize: '0.7rem', color: '#a09878', background: 'rgba(212, 175, 55, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '999px', border: '1px solid rgba(212, 175, 55, 0.18)' }}>
                                            {count} {count === 1 ? 'събитие' : 'събития'}
                                        </span>
                                    )}
                                </div>
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#e8e4d9' }}>
                                    {g.genre}
                                </h2>
                                <p style={{ fontSize: '0.9rem', color: '#a09878', margin: 0, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {g.intro}
                                </p>
                                <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9c3211', fontSize: '0.85rem', fontWeight: 600 }}>
                                    Виж концертите
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
