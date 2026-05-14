import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { EVENTS, type Event } from '@/lib/events-data'
import styles from './event-detail.module.css'

// ─────────────────────────────────────────────
// Static generation config
// ─────────────────────────────────────────────
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
    return EVENTS.map(event => ({ id: event.id }))
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

// ─────────────────────────────────────────────
// Per-event SEO metadata
// ─────────────────────────────────────────────
interface PageProps {
    params: { id: string }
}

export function generateMetadata({ params }: PageProps): Metadata {
    const event = EVENTS.find(e => e.id === params.id)

    if (!event) {
        return {
            title: 'Събитие не е намерено — Drift Bar Plovdiv',
            description: 'Това събитие не е намерено.',
        }
    }

    const eventUrl = `${baseUrl}/events/${event.id}`
    const imageUrl = `${baseUrl}${event.image}`
    const formattedDate = formatDateLong(event.date)
    const title = `${event.title} — ${formattedDate} | Drift Bar Plovdiv`
    const description = `${event.title} — ${event.genre} на живо в Drift Bar Plovdiv, ${event.dayName}, ${formattedDate} от ${event.time}. ${event.description.slice(0, 140)}`

    return {
        title,
        description,
        keywords: `${event.title}, ${event.genre}, концерт пловдив, drift bar plovdiv, жива музика, ${event.tags.join(', ')}`,
        alternates: {
            canonical: eventUrl,
        },
        openGraph: {
            title: `${event.title} — Drift Bar Plovdiv`,
            description,
            type: 'article',
            url: eventUrl,
            locale: 'bg_BG',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${event.title} — Drift Bar Plovdiv`,
            description,
            images: [imageUrl],
        },
    }
}

// ─────────────────────────────────────────────
// Date helpers (Bulgarian)
// ─────────────────────────────────────────────
const MONTH_NAMES_LONG = [
    'януари', 'февруари', 'март', 'април', 'май', 'юни',
    'юли', 'август', 'септември', 'октомври', 'ноември', 'декември',
] as const

const MONTH_NAMES_SHORT = [
    'Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни',
    'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек',
] as const

function formatDateLong(dateStr: string): string {
    const date = new Date(dateStr)
    return `${date.getDate()} ${MONTH_NAMES_LONG[date.getMonth()]} ${date.getFullYear()}`
}

function formatDateShort(dateStr: string): string {
    const date = new Date(dateStr)
    return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]}`
}

// ─────────────────────────────────────────────
// MusicEvent JSON-LD builder
// ─────────────────────────────────────────────
function buildMusicEventSchema(event: Event) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        name: event.title,
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
        image: `${baseUrl}${event.image}`,
        offers: {
            '@type': 'Offer',
            price: event.price,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/events/${event.id}`,
        },
        performer: {
            '@type': 'MusicGroup',
            name: event.title,
        },
        organizer: {
            '@type': 'Organization',
            name: 'Drift Bar Plovdiv',
            url: baseUrl,
        },
    }
}

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────
export default function EventDetailPage({ params }: PageProps) {
    const event = EVENTS.find(e => e.id === params.id)

    if (!event) {
        notFound()
    }

    // After notFound() the code below is unreachable for missing events,
    // but TS doesn't know that — narrow the type explicitly.
    const safeEvent: Event = event

    const schema = buildMusicEventSchema(safeEvent)

    // Other upcoming events (excluding current), max 4
    const now = new Date()
    const otherEvents: Event[] = EVENTS
        .filter(e => e.id !== safeEvent.id && new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4)

    const formattedDate = formatDateLong(safeEvent.date)
    const priceDisplay = safeEvent.price === 0 ? 'Свободен вход' : `${safeEvent.price} EUR`
    const reservationHref = `/reservations?event=${encodeURIComponent(safeEvent.title)}`

    return (
        <div className={styles.page}>
            {/* MusicEvent JSON-LD — feeds Google Events rich cards + AI engines */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* ── HEADER ── */}
            <header className={styles.header}>
                <Link href="/events" className={styles.backLink}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Събития
                </Link>
                <Link href="/" className={styles.logo}>DRIFT BAR</Link>
                <Link href="/menu" className={styles.menuLink}>
                    <span className="material-symbols-outlined">local_bar</span>
                    Меню
                </Link>
            </header>

            <div className={styles.container}>
                {/* ── HERO ── */}
                <section
                    className={styles.hero}
                    style={{ '--accent': safeEvent.color } as React.CSSProperties}
                >
                    <div className={styles.heroImageWrap}>
                        <Image
                            src={safeEvent.image}
                            alt={safeEvent.title}
                            fill
                            priority
                            sizes="(max-width: 1000px) 100vw, 1000px"
                            className={styles.heroImage}
                        />
                        <div className={styles.heroBadges}>
                            {safeEvent.tags.map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                        <div className={styles.heroMonth}>{safeEvent.month}</div>
                    </div>

                    <div className={styles.heroMeta}>
                        <span className="material-symbols-outlined">calendar_today</span>
                        {safeEvent.dayName}, {formattedDate}
                        <span aria-hidden="true">•</span>
                        <span className="material-symbols-outlined">schedule</span>
                        {safeEvent.time}
                    </div>

                    <h1 className={styles.title}>{safeEvent.title}</h1>
                    <p className={styles.genre}>{safeEvent.genre}</p>

                    {/* ── CTA ROW ── */}
                    <div className={styles.ctaRow}>
                        <div className={styles.priceBlock}>
                            <span className={styles.priceLabel}>Вход</span>
                            <span className={styles.priceValue}>{priceDisplay}</span>
                        </div>
                        <Link href={reservationHref} className={styles.reserveBtn}>
                            <span className="material-symbols-outlined">event_available</span>
                            Запази маса
                        </Link>
                        <a href="tel:+359988793684" className={styles.phoneBtn}>
                            <span className="material-symbols-outlined">call</span>
                            +359 98 879 3684
                        </a>
                    </div>
                </section>

                {/* ── DESCRIPTION ── */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>За събитието</h2>
                    <p className={styles.description}>{safeEvent.description}</p>
                </section>

                {/* ── VENUE INFO ── */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>За мястото</h2>
                    <div className={styles.venueGrid}>
                        <div className={styles.venueCard}>
                            <div className={styles.venueLabel}>
                                <span className="material-symbols-outlined">location_on</span>
                                Адрес
                            </div>
                            <div className={styles.venueValue}>
                                ул. Сливница 2а<br />
                                Кършияка Северен, Пловдив 4003
                            </div>
                        </div>
                        <div className={styles.venueCard}>
                            <div className={styles.venueLabel}>
                                <span className="material-symbols-outlined">groups</span>
                                Капацитет
                            </div>
                            <div className={styles.venueValue}>
                                99 места, 20 маси<br />
                                Интимна обстановка
                            </div>
                        </div>
                        <div className={styles.venueCard}>
                            <div className={styles.venueLabel}>
                                <span className="material-symbols-outlined">schedule</span>
                                Работно време
                            </div>
                            <div className={styles.venueValue}>
                                Чет: 20:00–02:00<br />
                                Пет–Съб: 20:00–04:00<br />
                                Нед: 18:00–02:00
                            </div>
                        </div>
                        <div className={styles.venueCard}>
                            <div className={styles.venueLabel}>
                                <span className="material-symbols-outlined">call</span>
                                Резервации
                            </div>
                            <div className={styles.venueValue}>
                                <a href="tel:+359988793684" style={{ color: '#e8e4d9' }}>
                                    +359 98 879 3684
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── OTHER EVENTS ── */}
                {otherEvents.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Други предстоящи събития</h2>
                        <div className={styles.otherGrid}>
                            {otherEvents.map(other => (
                                <Link
                                    key={other.id}
                                    href={`/events/${other.id}`}
                                    className={styles.otherCard}
                                >
                                    <div className={styles.otherImageWrap}>
                                        <Image
                                            src={other.image}
                                            alt={other.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 240px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.otherInfo}>
                                        <div className={styles.otherMeta}>
                                            {other.dayName}, {formatDateShort(other.date)} • {other.time}
                                        </div>
                                        <div className={styles.otherTitle}>{other.title}</div>
                                        <div className={styles.otherGenre}>{other.genre}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* ── FOOTER ── */}
            <footer className={styles.footer}>
                <p>
                    Drift Bar Plovdiv • ул. Сливница 2а, Пловдив •{' '}
                    <a href="tel:+359988793684">+359 98 879 3684</a>
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <Link href="/events">Всички събития</Link>
                    {' • '}
                    <Link href="/reservations">Резервации</Link>
                    {' • '}
                    <Link href="/menu">Меню</Link>
                </p>
            </footer>
        </div>
    )
}
