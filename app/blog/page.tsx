'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './blog.module.css'

const POSTS = [
    {
        id: 'b1',
        slug: 'drift-bar-otvori-vrati',
        title: 'Drift Bar отвори врати — Пловдив вече има нова рок сцена',
        excerpt: 'На 1 март 2026 г. Drift Bar официално откри врати в центъра на Пловдив. Разказваме историята зад проекта, визията и какво предстои.',
        author: 'Drift Bar Team',
        date: '2026-03-01',
        readTime: '3 мин',
        category: 'Новини',
        categoryColor: '#9c3211',
        image: null,
        featured: true,
    },
    {
        id: 'b2',
        slug: 'top-5-kokteili',
        title: 'Топ 5 авторски коктейли, които трябва да опиташ в Drift Bar',
        excerpt: 'От Bloody Mary до Aperol Spritz — нашите баристи разкриват тайните на 5-те най-поръчвани коктейла и какво ги прави специални.',
        author: 'Drift Bar Team',
        date: '2026-03-03',
        readTime: '4 мин',
        category: 'Меню',
        categoryColor: '#1a6b4a',
        image: null,
        featured: false,
    },
    {
        id: 'b3',
        slug: 'the-four-tones-intervyu',
        title: 'Интервю с The Four Tones — За музиката, Пловдив и металния звук',
        excerpt: 'Говорим с The Four Tones преди дебютното им шоу в Drift Bar. За started-от-нулата историята, влиянията и защо хеви метълът е жив.',
        author: 'Drift Bar Team',
        date: '2026-03-10',
        readTime: '6 мин',
        category: 'Артисти',
        categoryColor: '#8e44ad',
        image: null,
        featured: false,
    },
    {
        id: 'b4',
        slug: 'plovdiv-bar-kultura',
        title: 'Барът като сцена — Как Пловдив изгради своята жива музикална сцена',
        excerpt: 'Разглеждаме еволюцията на барската и джаз-рок сцена в Пловдив — откъде дойде, кой я движи и накъде върви.',
        author: 'Drift Bar Team',
        date: '2026-03-14',
        readTime: '7 мин',
        category: 'Музика',
        categoryColor: '#2471a3',
        image: null,
        featured: false,
    },
]

const CATEGORIES = ['Всички', 'Новини', 'Меню', 'Артисти', 'Музика']

function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    const months = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек']
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function BlogPage() {
    const [category, setCategory] = useState('Всички')

    const filtered = category === 'Всички'
        ? POSTS
        : POSTS.filter(p => p.category === category)

    const featured = POSTS.find(p => p.featured)
    const regular = filtered.filter(p => !p.featured || category !== 'Всички')

    return (
        <div className={styles.page}>
            {/* ── HEADER ── */}
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Начало
                </Link>
                <Link href="/" className={styles.logo}>DRIFT BAR</Link>
                <Link href="/events" className={styles.eventsLink}>
                    <span className="material-symbols-outlined">event</span>
                    Събития
                </Link>
            </header>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <p className={styles.heroLabel}>
                    <span className="material-symbols-outlined">article</span>
                    Блог & Истории
                </p>
                <h1 className={styles.heroTitle}>Stories from<br /><span>the Bar</span></h1>
                <p className={styles.heroSub}>Новини, интервюта и истории от сцената на Drift Bar Plovdiv</p>
            </section>

            {/* ── FEATURED POST ── */}
            {featured && category === 'Всички' && (
                <section className={styles.featuredSection}>
                    <div className={styles.container}>
                        <article className={styles.featuredCard}>
                            <div className={styles.featuredArtwork}>
                                <div className={styles.featuredLines} aria-hidden="true">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className={styles.line} />
                                    ))}
                                </div>
                                <div className={styles.featuredIcon}>
                                    <span className="material-symbols-outlined">newspaper</span>
                                </div>
                                <span className={styles.featuredBadge}>Препоръчано</span>
                            </div>
                            <div className={styles.featuredInfo}>
                                <span className={styles.postCategory} style={{ '--cat-color': featured.categoryColor } as React.CSSProperties}>
                                    {featured.category}
                                </span>
                                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                                <div className={styles.postMeta}>
                                    <span>
                                        <span className="material-symbols-outlined">person</span>
                                        {featured.author}
                                    </span>
                                    <span>
                                        <span className="material-symbols-outlined">calendar_today</span>
                                        {formatDate(featured.date)}
                                    </span>
                                    <span>
                                        <span className="material-symbols-outlined">schedule</span>
                                        {featured.readTime}
                                    </span>
                                </div>
                                <button className={styles.readBtn}>
                                    Прочети статията
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            {/* ── FILTER ── */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <div className={styles.filterBar}>
                        {CATEGORIES.map(c => (
                            <button
                                key={c}
                                className={`${styles.filterBtn} ${category === c ? styles.filterActive : ''}`}
                                onClick={() => setCategory(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POSTS GRID ── */}
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.postsGrid}>
                        {regular.map(post => (
                            <article key={post.id} className={styles.postCard}>
                                <div className={styles.postArtwork}
                                    style={{ '--cat-color': post.categoryColor } as React.CSSProperties}>
                                    <span className="material-symbols-outlined">
                                        {post.category === 'Меню' ? 'local_bar' :
                                            post.category === 'Артисти' ? 'mic' :
                                                post.category === 'Музика' ? 'music_note' : 'article'}
                                    </span>
                                </div>
                                <div className={styles.postInfo}>
                                    <span className={styles.postCategory}
                                        style={{ '--cat-color': post.categoryColor } as React.CSSProperties}>
                                        {post.category}
                                    </span>
                                    <h3 className={styles.postTitle}>{post.title}</h3>
                                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                                    <div className={styles.postMeta}>
                                        <span>
                                            <span className="material-symbols-outlined">calendar_today</span>
                                            {formatDate(post.date)}
                                        </span>
                                        <span>
                                            <span className="material-symbols-outlined">schedule</span>
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <button className={styles.postReadBtn}>
                                        Прочети
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
