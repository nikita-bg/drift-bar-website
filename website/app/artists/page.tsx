import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ARTISTS } from '@/lib/artists-data'

export const dynamic = 'force-static'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

export const metadata: Metadata = {
    title: 'Артисти и Изпълнители — Drift Bar Plovdiv',
    description: 'Музикантите и групите, които свирят на живо в Drift Bar Plovdiv — рок, джаз, блус, соул, DJ сетове. Български и международни артисти на сцената в Пловдив.',
    keywords: 'артисти drift bar, музиканти пловдив, рок групи пловдив, джаз изпълнители пловдив, концерти пловдив',
    alternates: { canonical: `${baseUrl}/artists` },
    openGraph: {
        title: 'Артисти и Изпълнители — Drift Bar Plovdiv',
        description: 'Музикантите и групите, които свирят на живо в Drift Bar Plovdiv — рок, джаз, блус, соул, DJ сетове.',
        url: `${baseUrl}/artists`,
        type: 'website',
        locale: 'bg_BG',
    },
}

// ItemList schema — helps Google + LLMs understand this is a curated list of artists.
const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Артисти в Drift Bar Plovdiv',
    description: 'Списък на музикантите и групите, които свирят в Drift Bar Plovdiv.',
    numberOfItems: ARTISTS.length,
    itemListElement: ARTISTS.map((artist, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${baseUrl}/artists/${artist.slug}`,
        item: {
            '@type': 'MusicGroup',
            name: artist.name,
            genre: artist.genre,
            url: `${baseUrl}/artists/${artist.slug}`,
            image: `${baseUrl}${artist.imageUrl}`,
        },
    })),
}

export default function ArtistsIndexPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#e8e4d9', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            {/* ── HEADER ── */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    background: 'rgba(10, 10, 18, 0.9)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
            >
                <Link
                    href="/"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a09878', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Начало
                </Link>
                <Link
                    href="/"
                    style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', color: '#e8e4d9', textDecoration: 'none' }}
                >
                    DRIFT BAR
                </Link>
                <Link
                    href="/events"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a09878', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}
                >
                    <span className="material-symbols-outlined">event</span>
                    Събития
                </Link>
            </header>

            {/* ── HERO ── */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem 2.5rem' }}>
                <p
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#9c3211',
                        margin: '0 0 1.2rem',
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.05rem' }}>mic</span>
                    Сцена от музиканти за музиканти
                </p>
                <h1
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        margin: '0 0 1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                    }}
                >
                    Артисти<br />
                    <span style={{ color: '#9c3211' }}>в Drift Bar</span>
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#a09878', maxWidth: '60ch', lineHeight: 1.6, margin: 0 }}>
                    Български и международни музиканти, които свирят на живо в Drift Bar Plovdiv —
                    рок, блус, джаз, соул, DJ сетове.
                </p>
            </section>

            {/* ── GRID ── */}
            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem 5rem' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {ARTISTS.map(artist => {
                        const accent = artist.accentColor ?? '#9c3211'
                        return (
                            <Link
                                key={artist.slug}
                                href={`/artists/${artist.slug}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '14px',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        aspectRatio: '4 / 3',
                                        background: `linear-gradient(135deg, ${accent}33, #11111a)`,
                                        borderBottom: `1px solid ${accent}40`,
                                    }}
                                >
                                    <Image
                                        src={artist.imageUrl}
                                        alt={artist.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 320px"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.1rem 1.25rem 1.4rem' }}>
                                    <p
                                        style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.14em',
                                            textTransform: 'uppercase',
                                            color: accent,
                                            margin: '0 0 0.5rem',
                                        }}
                                    >
                                        {artist.genre}
                                    </p>
                                    <h2
                                        style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 800,
                                            margin: '0 0 0.5rem',
                                            color: '#e8e4d9',
                                            textTransform: 'uppercase',
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        {artist.name}
                                    </h2>
                                    <p
                                        style={{
                                            fontSize: '0.88rem',
                                            color: '#a09878',
                                            lineHeight: 1.55,
                                            margin: 0,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {artist.bio}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
