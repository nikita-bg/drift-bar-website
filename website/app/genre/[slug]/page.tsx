import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { EVENTS, type Event } from '@/lib/events-data'
import { GENRE_HUBS, getGenreBySlug, type GenreMeta } from '@/lib/genre-slugs'

export const dynamic = 'force-static'
export const dynamicParams = false

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

const MONTH_SHORT = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек']

interface PageProps {
    params: { slug: string }
}

// ── Static params: prerender all 8 genre hubs ──
export function generateStaticParams(): Array<{ slug: string }> {
    return GENRE_HUBS.map(g => ({ slug: g.slug }))
}

// ── SEO metadata (per-slug) ──
export function generateMetadata({ params }: PageProps): Metadata {
    const meta = getGenreBySlug(params.slug)
    if (!meta) {
        return { title: 'Жанр не е намерен — Drift Bar Plovdiv' }
    }

    const title = `${meta.genre} в Drift Bar Plovdiv — Концерти и Събития`
    const description = `${meta.genre} на живо в Drift Bar Plovdiv. Концерти, програма и резервации за ${meta.label} вечери в Пловдив.`.slice(0, 155)

    return {
        title,
        description,
        keywords: meta.keywords,
        alternates: { canonical: `${baseUrl}/genre/${meta.slug}` },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/genre/${meta.slug}`,
            type: 'website',
            locale: 'bg_BG',
            images: [{
                url: `${baseUrl}/assets/enhanced_live-performance-stage-close.webp`,
                width: 1200,
                height: 630,
                alt: `${meta.genre} в Drift Bar Plovdiv`,
            }],
        },
    }
}

// ── Filter helper: upcoming + recent (last 30 days) events for this genre ──
function getRelevantEvents(genre: string): Event[] {
    const now = Date.now()
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

    return EVENTS
        .filter(e => e.genre === genre)
        .filter(e => {
            const eventTime = new Date(e.date).getTime()
            // Upcoming OR within the last 30 days (still "recent")
            return eventTime >= now - thirtyDaysMs
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function buildSchema(meta: GenreMeta, events: readonly Event[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/genre/${meta.slug}#collectionpage`,
        name: `${meta.genre} в Drift Bar Plovdiv`,
        description: `Концерти и събития в жанра ${meta.genre} на живо в Drift Bar Plovdiv.`,
        url: `${baseUrl}/genre/${meta.slug}`,
        inLanguage: 'bg-BG',
        isPartOf: { '@id': `${baseUrl}/#localbusiness` },
        about: {
            '@type': 'Thing',
            name: meta.genre,
            alternateName: meta.label,
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            numberOfItems: events.length,
            itemListElement: events.map((event, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                    '@type': 'MusicEvent',
                    name: event.title,
                    description: event.description,
                    startDate: `${event.date}T${event.time}:00+03:00`,
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
                    },
                    image: `${baseUrl}${event.image}`,
                    offers: {
                        '@type': 'Offer',
                        price: event.price,
                        priceCurrency: 'EUR',
                        availability: 'https://schema.org/InStock',
                        url: `${baseUrl}/events`,
                    },
                    performer: { '@type': 'MusicGroup', name: event.title },
                    organizer: {
                        '@type': 'Organization',
                        name: 'Drift Bar Plovdiv',
                        url: baseUrl,
                    },
                },
            })),
        },
    } as const
}

export default function GenrePage({ params }: PageProps) {
    const meta = getGenreBySlug(params.slug)
    if (!meta) {
        notFound()
    }

    const events = getRelevantEvents(meta.genre)
    const schema = buildSchema(meta, events)

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#e8e4d9', fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* ── HEADER ── */}
            <header style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'rgba(10, 10, 18, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <Link href="/genre" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a09878', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Жанрове
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
            <section style={{ padding: '4rem 1.5rem 3rem', maxWidth: 1100, margin: '0 auto' }}>
                <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d4af37', fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>graphic_eq</span>
                    Жанр · {meta.label}
                </p>
                <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', lineHeight: 1.05, fontWeight: 800, margin: 0, color: '#e8e4d9' }}>
                    {meta.genre} в Пловдив<br />
                    <span style={{ color: '#9c3211' }}>Drift Bar</span>
                </h1>
                <p style={{ marginTop: '1.5rem', maxWidth: 720, fontSize: '1.05rem', color: '#a09878', lineHeight: 1.7 }}>
                    {meta.intro}
                </p>
            </section>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>

                {/* ── UPCOMING EVENTS ── */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', color: '#e8e4d9', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                        Предстоящи събития
                    </h2>

                    {events.length === 0 ? (
                        <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <p style={{ color: '#a09878', marginBottom: '1rem' }}>
                                В момента няма публикувани {meta.genre.toLowerCase()} събития. Следете програмата за нови дати.
                            </p>
                            <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.4rem', background: '#9c3211', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem' }}>
                                Цялата програма
                                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                            {events.map(event => {
                                const d = new Date(event.date)
                                return (
                                    <article key={event.id} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                        <div style={{ position: 'relative', aspectRatio: '4 / 3', background: event.color }}>
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                width={400}
                                                height={300}
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                            />
                                        </div>
                                        <div style={{ padding: '1.1rem 1.2rem 1.3rem' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#a09878', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                                                {event.dayName}, {d.getDate()} {MONTH_SHORT[d.getMonth()]} · {event.time}
                                            </div>
                                            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.4rem', color: '#e8e4d9' }}>
                                                {event.title}
                                            </h3>
                                            <p style={{ fontSize: '0.85rem', color: '#a09878', margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {event.description}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                                                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#d4af37' }}>
                                                    {event.price === 0 ? 'Свободен вход' : `${event.price} EUR`}
                                                </span>
                                                <Link href="/reservations" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem', background: '#9c3211', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontWeight: 600 }}>
                                                    Резервирай
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    )}
                </section>

                {/* ── ABOUT THE GENRE ── */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', color: '#e8e4d9', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                        За жанра
                    </h2>
                    <div style={{ display: 'grid', gap: '1.25rem', maxWidth: 820 }}>
                        <p style={{ color: '#cfc8b3', lineHeight: 1.8, fontSize: '1rem' }}>{meta.aboutP1}</p>
                        <p style={{ color: '#cfc8b3', lineHeight: 1.8, fontSize: '1rem' }}>{meta.aboutP2}</p>
                    </div>
                </section>

                {/* ── WHY DRIFT BAR ── */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', color: '#e8e4d9', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                        Защо Drift Bar за {meta.genre}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                        {[
                            { icon: 'graphic_eq', title: 'Професионална акустика', text: 'Залата е калибрирана за жив звук — от тихия джаз до пълнокръвния рок саунд.' },
                            { icon: 'group', title: 'Интимна обстановка', text: '99 места и 20 маси — без бариери между публиката и сцената.' },
                            { icon: 'speaker', title: 'Професионално озвучаване', text: 'Звукова система и мониторинг от музиканти за музиканти.' },
                        ].map(b => (
                            <div key={b.icon} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#d4af37', marginBottom: '0.75rem', display: 'block' }}>{b.icon}</span>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#e8e4d9' }}>{b.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#a09878', margin: 0, lineHeight: 1.6 }}>{b.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(156, 50, 17, 0.15), rgba(212, 175, 55, 0.08))', borderRadius: '1.5rem', padding: '2.5rem 1.75rem', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#e8e4d9' }}>
                            Запазете маса за следващото {meta.genre} събитие
                        </h3>
                        <p style={{ color: '#a09878', margin: '0 0 1.5rem', fontSize: '1rem' }}>
                            Местата за концерти в Drift Bar се изчерпват бързо. Резервирайте предварително.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                            <Link href="/reservations" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.6rem', background: '#9c3211', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontWeight: 600 }}>
                                <span className="material-symbols-outlined">event_available</span>
                                Резервирай маса
                            </Link>
                            <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.6rem', background: 'transparent', color: '#e8e4d9', textDecoration: 'none', borderRadius: '999px', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.18)' }}>
                                Виж всички събития
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
