'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './events.module.css'
import { EVENTS, ALL_GENRES, formatEventDate } from '@/lib/events-data'

export default function EventsPage() {
    const [filter, setFilter] = useState('Всички')

    const filtered = filter === 'Всички'
        ? EVENTS
        : EVENTS.filter(e => e.genre === filter)

    return (
        <div className={styles.page}>
            {/* ── HEADER ── */}
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Начало
                </Link>
                <Link href="/" className={styles.logo}>DRIFT BAR</Link>
                <Link href="/menu" className={styles.menuLink}>
                    <span className="material-symbols-outlined">local_bar</span>
                    Меню
                </Link>
            </header>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroLabel}>
                        <span className="material-symbols-outlined">graphic_eq</span>
                        Жива Музика в Пловдив
                    </p>
                    <h1 className={styles.heroTitle}>Предстоящи<br /><span>Събития</span></h1>
                    <p className={styles.heroSub}>Рок, блус, джаз и повече — всяка седмица на сцената на Drift Bar</p>
                </div>
                <div className={styles.heroVinyl} aria-hidden="true">
                    <div className={styles.vinylGroove} />
                    <div className={styles.vinylGroove} />
                    <div className={styles.vinylGroove} />
                    <div className={styles.vinylCenter} />
                </div>
            </section>

            {/* ── FILTER ── */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <div className={styles.filterBar}>
                        {ALL_GENRES.map(g => (
                            <button
                                key={g}
                                className={`${styles.filterBtn} ${filter === g ? styles.filterActive : ''}`}
                                onClick={() => setFilter(g)}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EVENTS GRID ── */}
            <main className={styles.main}>
                <div className={styles.container}>
                    {filtered.length === 0 ? (
                        <div className={styles.empty}>
                            <span className="material-symbols-outlined">music_off</span>
                            <p>Няма намерени събития</p>
                        </div>
                    ) : (
                        <div className={styles.eventsGrid}>
                            {filtered.map(event => (
                                <article key={event.id} className={styles.eventCard}>
                                    {/* Event Image */}
                                    <div className={styles.cardArtwork} style={{ '--accent': event.color } as React.CSSProperties}>
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            width={400}
                                            height={300}
                                            className={styles.eventImage}
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        />
                                        <div className={styles.artworkBadges}>
                                            {event.tags.map(tag => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                        <div className={styles.artworkMonth}>{event.month}</div>
                                    </div>

                                    {/* Info */}
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardMeta}>
                                            <span className="material-symbols-outlined">calendar_today</span>
                                            {event.dayName}, {new Date(event.date).getDate()} {['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'][new Date(event.date).getMonth()]} • {event.time}
                                        </div>
                                        <h2 className={styles.cardTitle}>{event.title}</h2>
                                        <p className={styles.cardGenre}>{event.genre}</p>
                                        <p className={styles.cardDesc}>{event.description}</p>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.cardPrice}>
                                                {event.price === 0 ? 'Свободен вход' : `${event.price} EUR`}
                                            </span>
                                            <Link href="/reservations" className={styles.reserveBtn}>
                                                <span className="material-symbols-outlined">event_available</span>
                                                Резервирай
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* ── CTA ── */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <span className="material-symbols-outlined">music_note</span>
                        <div>
                            <h3>Искаш да свириш на нашата сцена?</h3>
                            <p>Свържи се с нас — приемаме запитвания от банди и изпълнители.</p>
                        </div>
                        <a href="mailto:info@driftbarplovdiv.com" className={styles.ctaBtn}>
                            Пиши ни
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
