import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ARTISTS, getArtistBySlug, type Artist } from '@/lib/artists-data'
import { EVENTS, type Event } from '@/lib/events-data'

// Force static generation — one HTML file per artist at build time.
// Locked to known slugs only: any unknown /artists/<slug> returns 404.
export const dynamic = 'force-static'
export const dynamicParams = false

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

interface ArtistPageProps {
    params: { slug: string }
}

// ───────────────────────────────────────────
// Static params + metadata
// ───────────────────────────────────────────

export function generateStaticParams(): { slug: string }[] {
    return ARTISTS.map(artist => ({ slug: artist.slug }))
}

export function generateMetadata({ params }: ArtistPageProps): Metadata {
    const artist = getArtistBySlug(params.slug)

    if (!artist) {
        return {
            title: 'Артист не е намерен — Drift Bar Plovdiv',
        }
    }

    const title = `${artist.name} в Drift Bar Plovdiv — ${artist.genre}`
    const description = artist.bio.length > 160
        ? `${artist.bio.slice(0, 157)}...`
        : artist.bio

    return {
        title,
        description,
        alternates: { canonical: `${baseUrl}/artists/${artist.slug}` },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/artists/${artist.slug}`,
            type: 'profile',
            locale: 'bg_BG',
            images: [
                {
                    url: `${baseUrl}${artist.imageUrl}`,
                    width: 1200,
                    height: 630,
                    alt: artist.name,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${baseUrl}${artist.imageUrl}`],
        },
    }
}

// ───────────────────────────────────────────
// Schema helpers
// ───────────────────────────────────────────

function findEventForArtist(artist: Artist): Event | undefined {
    return EVENTS.find(event => event.date === artist.eventDate)
}

function buildSameAs(artist: Artist): string[] {
    if (!artist.socialLinks) return []
    const links = [
        artist.socialLinks.facebook,
        artist.socialLinks.instagram,
        artist.socialLinks.spotify,
        artist.socialLinks.youtube,
        artist.socialLinks.website,
    ]
    return links.filter((link): link is string => Boolean(link))
}

function buildMusicGroupSchema(artist: Artist) {
    const sameAs = buildSameAs(artist)
    return {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        '@id': `${baseUrl}/artists/${artist.slug}#musicgroup`,
        name: artist.name,
        description: artist.bio,
        genre: artist.genre,
        image: `${baseUrl}${artist.imageUrl}`,
        url: `${baseUrl}/artists/${artist.slug}`,
        ...(sameAs.length > 0 ? { sameAs } : {}),
    }
}

function buildPerformanceEventSchema(artist: Artist, event: Event) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        name: `${artist.name} — на живо в Drift Bar Plovdiv`,
        description: event.description,
        startDate: `${event.date}T${event.time}:00+03:00`,
        endDate: `${event.date}T23:59:00+03:00`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
            '@type': 'MusicVenue',
            name: 'Drift Bar Plovdiv',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'ул. Сливница 2а',
                addressLocality: 'Пловдив',
                postalCode: '4003',
                addressCountry: 'BG',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 42.1418,
                longitude: 24.7461,
            },
        },
        image: `${baseUrl}${artist.imageUrl}`,
        offers: {
            '@type': 'Offer',
            price: event.price,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/reservations`,
        },
        performer: {
            '@type': 'MusicGroup',
            '@id': `${baseUrl}/artists/${artist.slug}#musicgroup`,
            name: artist.name,
        },
        organizer: {
            '@type': 'Organization',
            name: 'Drift Bar Plovdiv',
            url: baseUrl,
        },
    }
}

function buildBreadcrumbSchema(artist: Artist) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Начало',
                item: baseUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Артисти',
                item: `${baseUrl}/artists`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: artist.name,
                item: `${baseUrl}/artists/${artist.slug}`,
            },
        ],
    }
}

// ───────────────────────────────────────────
// Date formatting
// ───────────────────────────────────────────

const MONTHS_BG = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']

function formatEventDateLong(dateStr: string): string {
    const d = new Date(dateStr)
    return `${d.getDate()} ${MONTHS_BG[d.getMonth()]} ${d.getFullYear()}`
}

function isFutureDate(dateStr: string | undefined): boolean {
    if (!dateStr) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(dateStr) >= today
}

// ───────────────────────────────────────────
// Page
// ───────────────────────────────────────────

export default function ArtistPage({ params }: ArtistPageProps) {
    const artist = getArtistBySlug(params.slug)

    if (!artist) {
        notFound()
    }

    const event = findEventForArtist(artist)
    const upcoming = isFutureDate(artist.eventDate)

    const musicGroupSchema = buildMusicGroupSchema(artist)
    const breadcrumbSchema = buildBreadcrumbSchema(artist)
    const eventSchema = event ? buildPerformanceEventSchema(artist, event) : null

    const accent = artist.accentColor ?? '#9c3211'

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#e8e4d9', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            {/* JSON-LD: MusicGroup + (optional) MusicEvent + Breadcrumb */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
            />
            {eventSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                    href="/artists"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a09878', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Артисти
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

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
                {/* ── HERO / ARTIST CARD ── */}
                <article
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr)',
                        gap: '2.5rem',
                        background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: `0 30px 80px -40px ${accent}55`,
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '4 / 3',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            background: `linear-gradient(135deg, ${accent}33, #11111a)`,
                            border: `1px solid ${accent}55`,
                        }}
                    >
                        <Image
                            src={artist.imageUrl}
                            alt={artist.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>

                    <div>
                        <p
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                color: accent,
                                margin: '0 0 1rem',
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>graphic_eq</span>
                            {artist.genre}
                        </p>

                        <h1
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                fontWeight: 900,
                                lineHeight: 1.05,
                                letterSpacing: '-0.02em',
                                margin: '0 0 1.5rem',
                                textTransform: 'uppercase',
                            }}
                        >
                            {artist.name}
                        </h1>

                        <p
                            style={{
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                                color: '#d4ccba',
                                margin: '0 0 2rem',
                                maxWidth: '70ch',
                            }}
                        >
                            {artist.bio}
                        </p>

                        {/* Event info block */}
                        {event && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${accent}40`,
                                    borderRadius: '12px',
                                    marginBottom: '2rem',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: '#e8e4d9' }}>
                                    <span className="material-symbols-outlined" style={{ color: accent }}>calendar_today</span>
                                    <strong>{upcoming ? 'Следващ концерт:' : 'Последно представяне:'}</strong>{' '}
                                    {formatEventDateLong(event.date)} • {event.time}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: '#a09878' }}>
                                    <span className="material-symbols-outlined">payments</span>
                                    {event.price === 0 ? 'Свободен вход' : `${event.price} EUR`}
                                </div>
                            </div>
                        )}

                        {/* CTAs */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {upcoming && (
                                <Link
                                    href="/reservations"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        background: accent,
                                        color: '#fff',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    <span className="material-symbols-outlined">event_available</span>
                                    Резервирай маса
                                </Link>
                            )}
                            <Link
                                href="/events"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.85rem 1.5rem',
                                    background: 'transparent',
                                    color: '#e8e4d9',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                }}
                            >
                                <span className="material-symbols-outlined">queue_music</span>
                                Всички събития
                            </Link>
                        </div>
                    </div>
                </article>

                {/* ── ABOUT THE VENUE (location reinforcement for GEO) ── */}
                <section
                    style={{
                        marginTop: '3rem',
                        padding: '1.75rem',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#e8e4d9' }}>
                        Къде свири {artist.name}?
                    </h2>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#a09878', margin: 0, maxWidth: '70ch' }}>
                        {artist.name} се представя в <strong style={{ color: '#e8e4d9' }}>Drift Bar Plovdiv</strong> —
                        бар за рок и джаз музика на живо в Пловдив, България. Намира се на
                        ул. „Сливница" 2а, Кършияка Северен — бившият пиано-бар ЕКСЕЛ, до пешеходния мост и Новотел Пловдив.
                        Капацитет от 99 места и 20 маси, професионално озвучаване и акустика.
                    </p>
                </section>
            </main>
        </div>
    )
}
