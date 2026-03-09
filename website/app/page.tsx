'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './landing.module.css'
import { getUpcomingEvents, formatEventDate } from '@/lib/events-data'

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [headerScrolled, setHeaderScrolled] = useState(false)
    const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle')
    const [activeSection, setActiveSection] = useState('hero')
    const vinylRef = useRef<HTMLDivElement>(null)

    // Get upcoming events (limit to 3 for homepage)
    const upcomingEvents = getUpcomingEvents(3)

    // Header scroll
    useEffect(() => {
        const handleScroll = () => setHeaderScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Scroll spy - track active section
    useEffect(() => {
        const sections = ['hero', 'events', 'about', 'gallery', 'contact', 'reserve']
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100 // Offset for header

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i])
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Run on mount
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Reveal animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add(styles.revealed)
                    observer.unobserve(e.target)
                }
            }),
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        )
        document
            .querySelectorAll(`.${styles.reveal}`)
            .forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileMenuOpen])

    // Set min date for reservation form
    useEffect(() => {
        const dateInput = document.getElementById('date') as HTMLInputElement
        if (dateInput) dateInput.min = new Date().toISOString().split('T')[0]
    }, [])

    // Smooth scroll for hash links
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a[href^="#"]')
            if (!link) return
            const href = link.getAttribute('href')
            if (!href || href === '#') return
            const section = document.querySelector(href)
            if (!section) return
            e.preventDefault()
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    // Vinyl hover
    const handleVinylEnter = () => {
        if (vinylRef.current) vinylRef.current.style.animationPlayState = 'paused'
    }
    const handleVinylLeave = () => {
        if (vinylRef.current) vinylRef.current.style.animationPlayState = 'running'
    }

    const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        try {
            await fetch('https://simplifyopsco.app.n8n.cloud/webhook/drift-bar-new-reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    date: formData.get('date'),
                    time: formData.get('time'),
                    guests: formData.get('guests'),
                    phone: formData.get('phone'),
                    message: formData.get('message'),
                }),
            })
        } catch {
            // Webhook fire-and-forget - still show success to user
        }

        setFormStatus('success')
        form.reset()
        setTimeout(() => setFormStatus('idle'), 3000)
    }

    return (
        <>
            {/* JSON-LD Schemas (AEO / GEO / Local SEO) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        // Generate Event schemas for all upcoming events
                        ...upcomingEvents.map(event => ({
                            "@context": "https://schema.org",
                            "@type": "Event",
                            "name": event.title,
                            "startDate": `${event.date}T${event.time}:00+02:00`,
                            "description": event.description,
                            "location": {
                                "@type": "Place",
                                "name": "Drift Bar Plovdiv",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "ул. Сливница 2а",
                                    "addressLocality": "Кършияка Северен, Пловдив",
                                    "postalCode": "4003",
                                    "addressCountry": "BG"
                                }
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": event.price.toString(),
                                "priceCurrency": "EUR"
                            },
                            "performer": {
                                "@type": "MusicGroup",
                                "name": event.title
                            }
                        })),
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Има ли музика на живо през седмицата?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Да, Drift Bar Plovdiv организира музика на живо редовно, като повечето събития са в петък и събота, но често имаме и концерти в средата на седмицата."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Къде се намира Drift Bar?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Drift Bar се намира на ул. Сливница 2а, 4003 Кършияка Северен, град Пловдив."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Мога ли да резервирам маса за 10 човека?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Да, капацитетът на бара е 99 места с над 20 маси, като приемаме групови резервации за до 20 души."
                                    }
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org/",
                            "@type": "LocalBusiness",
                            "name": "Drift Bar Plovdiv",
                            "image": "https://driftbarplovdiv.com/logo.png",
                            "@id": "https://driftbarplovdiv.com",
                            "url": "https://driftbarplovdiv.com",
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "reviewCount": "24"
                            },
                            "review": [
                                {
                                    "@type": "Review",
                                    "author": { "@type": "Person", "name": "Иван Д." },
                                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                    "reviewBody": "Страхотен звук и атмосфера! Най-доброто място за рок музика в града."
                                },
                                {
                                    "@type": "Review",
                                    "author": { "@type": "Person", "name": "Мария С." },
                                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                    "reviewBody": "Коктейлите са супер, а обслужването – на високо ниво."
                                },
                                {
                                    "@type": "Review",
                                    "author": { "@type": "Person", "name": "Георги Н." },
                                    "reviewRating": { "@type": "Rating", "ratingValue": "4" },
                                    "reviewBody": "Много свежо място за групи и резервации. Препоръчвам."
                                }
                            ]
                        }
                    ])
                }}
            />
            {/* ===== HEADER ===== */}
            <header className={`${styles.siteHeader} ${headerScrolled ? styles.scrolled : ''}`} id="header">
                <div className={`${styles.container} ${styles.headerInner}`}>
                    <a href="#" className={styles.logoLink} aria-label="Drift Bar Home">
                        <Image
                            src="/logo.png"
                            alt="Drift Bar Plovdiv"
                            width={80}
                            height={80}
                            className={styles.logoImg}
                            priority
                            fetchPriority="high"
                            sizes="80px"
                        />
                        <span className={styles.logoText}>DRIFT BAR</span>
                    </a>
                    <nav className={styles.mainNav}>
                        <a href="#events" className={`${styles.navLink} ${activeSection === 'events' ? styles.active : ''}`}>Събития</a>
                        <a href="#about" className={`${styles.navLink} ${activeSection === 'about' ? styles.active : ''}`}>За Нас</a>
                        <a href="#gallery" className={`${styles.navLink} ${activeSection === 'gallery' ? styles.active : ''}`}>Галерия</a>
                        <a href="#contact" className={`${styles.navLink} ${activeSection === 'contact' ? styles.active : ''}`}>Контакт</a>
                        <Link href="/menu" className={styles.navLink}>Меню</Link>
                    </nav>
                    <a href="#reserve" className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`}>Резервации</a>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Отвори навигационното меню"
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">menu</span>
                    </button>
                </div>
            </header>

            {/* ===== MOBILE MENU ===== */}
            <div
                className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.active : ''}`}
                onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false) }}
            >
                <div className={styles.mobileMenuContent}>
                    <button className={styles.mobileCloseBtn} onClick={() => setMobileMenuOpen(false)} aria-label="Затвори навигационното меню">
                        <span className="material-symbols-outlined" aria-hidden="true">close</span>
                    </button>
                    <nav className={styles.mobileNav}>
                        <a href="#events" className={`${styles.mobileNavLink} ${activeSection === 'events' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Събития</a>
                        <a href="#about" className={`${styles.mobileNavLink} ${activeSection === 'about' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>За Нас</a>
                        <a href="#gallery" className={`${styles.mobileNavLink} ${activeSection === 'gallery' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Галерия</a>
                        <a href="#contact" className={`${styles.mobileNavLink} ${activeSection === 'contact' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Контакт</a>
                        <Link href="/menu" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Дигитално Меню</Link>
                        <a href="#reserve" className={`${styles.btn} ${styles.btnPrimary} ${styles.mobileReserveBtn}`} onClick={() => setMobileMenuOpen(false)}>Резервации</a>
                    </nav>
                </div>
            </div>

            <div className={styles.siteWrapper}>

                {/* ===== HERO ===== */}
                <section className={styles.hero} id="hero">
                    <div className={`${styles.container} ${styles.heroContent}`}>
                        <div className={`${styles.heroText} ${styles.reveal}`}>
                            <p className={styles.heroTagline}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>graphic_eq</span>
                                Сцена от Музиканти за Музиканти
                            </p>
                            <h1 className={styles.heroTitle}>
                                Жива Музика,<br />Авторски Коктейли &<br />Професионална Акустика
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Рок &amp; джаз бар с 99 места капацитет в Пловдив. Професионално озвучаване и коктейлно меню.
                            </p>
                            <div className={styles.heroActions}>
                                <a href="#events" className={`${styles.btn} ${styles.btnDark}`}>
                                    Предстоящи Концерти
                                </a>
                                <a href="#contact" className={`${styles.btn} ${styles.btnOutlineCircle}`} aria-label="Вижте местоположението на Drift Bar на картата">
                                    <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
                                </a>
                            </div>
                        </div>
                        <div className={`${styles.heroVisual} ${styles.reveal}`}>
                            <div
                                className={styles.vinylRecord}
                                onMouseEnter={handleVinylEnter}
                                onMouseLeave={handleVinylLeave}
                            >
                                <div className={styles.vinylGrooves} ref={vinylRef}>
                                    <div className={styles.vinylLabel}>
                                        <Image
                                            src="/assets/enhanced_live-performance-stage-close.png"
                                            alt="Изпълнение на живо на сцената на Drift Bar"
                                            className={styles.vinylImage}
                                            width={300}
                                            height={300}
                                            priority
                                            fetchPriority="high"
                                            sizes="(max-width: 768px) 200px, 300px"
                                        />
                                        <div className={styles.vinylCenterHole} />
                                    </div>
                                </div>
                                <div className={styles.heroTonearm} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroScrollIndicator} aria-hidden="true">
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </section>

                {/* ===== EVENTS SECTION ===== */}
                <section className={`${styles.section} ${styles.eventsSection}`} id="events">
                    <div className={styles.container}>
                        <div className={`${styles.sectionHeader} ${styles.reveal}`}>
                            <div>
                                <h2 className={styles.sectionTitle}>Предстоящи Събития</h2>
                                <p className={styles.sectionLabel}>Жива Музика Този Месец</p>
                            </div>
                            <Link href="/events" className={styles.viewAllLink}>
                                Виж Всички <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                            </Link>
                        </div>
                        <div className={styles.eventsGrid}>
                            {upcomingEvents.map((event) => {
                                const dateInfo = formatEventDate(event.date)
                                return (
                                    <article key={event.id} className={`${styles.eventCard} ${styles.reveal}`}>
                                        <div className={styles.eventCardSleeve}>
                                            <div className={styles.sleeveVinyl}>
                                                <div className={styles.sleeveVinylHole} />
                                            </div>
                                        </div>
                                        <div className={styles.eventCardBody}>
                                            <div className={styles.eventCardImage}>
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    width={600}
                                                    height={400}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <span className={`${styles.eventBadge} ${styles.badgeStereo}`}>
                                                    {event.tags[0]}
                                                </span>
                                                <span className={styles.eventBadgeVol}>{event.month}</span>
                                            </div>
                                            <div className={styles.eventCardInfo}>
                                                <p className={styles.eventMeta}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>calendar_today</span>
                                                    {event.dayName}, {dateInfo.day} {dateInfo.monthShort} • {event.time}
                                                </p>
                                                <h3 className={styles.eventName}>{event.title}</h3>
                                                <p className={styles.eventGenre}>{event.genre}</p>
                                                <div className={styles.eventFooter}>
                                                    <span className={styles.eventPrice}>{event.price} EUR</span>
                                                    <a href="#reserve" className={`${styles.btn} ${styles.btnSm}`}>Резервирай</a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}

                            {upcomingEvents.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#a09878' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem', opacity: 0.4 }}>music_off</span>
                                    <p>Няма предстоящи събития в момента. Проверете скоро!</p>
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: '3rem', textAlign: 'center' }} className={styles.mobileOnly}>
                            <Link href="/events" className={`${styles.btn} ${styles.btnOutlineCircle}`} style={{ width: 'auto', padding: '0 2rem' }}>
                                Всички Събития
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ===== ABOUT SECTION ===== */}
                <section className={`${styles.section} ${styles.aboutSection}`} id="about">
                    <div className={styles.container}>
                        <div className={styles.aboutGrid}>
                            <div className={`${styles.aboutImages} ${styles.reveal}`}>
                                <div className={`${styles.aboutImg} ${styles.aboutImgMain}`}>
                                    <Image
                                        src="/assets/enhanced_crowd-seating-night-event.png"
                                        alt="Оживената атмосфера в Drift Bar"
                                        width={700}
                                        height={500}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                                        loading="lazy"
                                    />
                                </div>
                                <div className={`${styles.aboutImg} ${styles.aboutImgSecondary}`}>
                                    <Image
                                        src="/assets/enhanced_lounge-tables-atmospheric.png"
                                        alt="Уютни маси в Drift Bar"
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className={`${styles.aboutText} ${styles.reveal}`}>
                                <p className={styles.sectionLabel}>За Drift Bar</p>
                                <h2 className={styles.sectionTitle}>Бар и Сцена<br />в Центъра на Пловдив.</h2>
                                <p className={styles.aboutDescription}>
                                    Drift Bar е локация за музика на живо. С професионално звуково и светлинно оборудване, пространството е изградено за максимално качество на акустиката по време на концерти.
                                </p>
                                <p className={styles.aboutDescription}>
                                    Музикалната програма включва рок, хард рок, блус и джаз изпълнения. Барът разполага с 99 места, 20 маси и меню от ръчно приготвени коктейли и отлежали напитки.
                                </p>
                                <div className={styles.aboutStats}>
                                    <div className={styles.stat}>
                                        <span className={styles.statNumber}>99</span>
                                        <span className={styles.statLabel}>Капацитет</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statNumber}>20</span>
                                        <span className={styles.statLabel}>Маси</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statNumber}>PRO</span>
                                        <span className={styles.statLabel}>Звук &amp; Светлина</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== GALLERY ===== */}
                <section className={`${styles.section} ${styles.gallerySection}`} id="gallery">
                    <div className={styles.container}>
                        <div className={`${styles.sectionHeader} ${styles.sectionHeaderCenter} ${styles.reveal}`}>
                            <p className={styles.sectionLabel}>Галерия</p>
                            <h2 className={styles.sectionTitle}>Атмосферата в Drift</h2>
                        </div>
                        <div className={`${styles.galleryGrid} ${styles.reveal}`}>
                            <div className={`${styles.galleryItem} ${styles.galleryItemLarge}`}>
                                <Image
                                    src="/assets/enhanced_stage-drum-kit-lights.png"
                                    alt="Сцената с барабани и осветление"
                                    width={800}
                                    height={600}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                                    loading="lazy"
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">music_note</span>
                                    <span>Сцената</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image
                                    src="/assets/enhanced_lounge-seating-night-lights.png"
                                    alt="Уютният салон"
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    loading="lazy"
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">local_bar</span>
                                    <span>Барът</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image
                                    src="/assets/enhanced_live-performance-stage-close.png"
                                    alt="Изпълнение на живо"
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    loading="lazy"
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">nightlife</span>
                                    <span>Концерт</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image
                                    src="/assets/mixer.jpg"
                                    alt="Звуков пулт"
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    loading="lazy"
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">tune</span>
                                    <span>Звуков Пулт</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image
                                    src="/assets/enhanced_crowd-seating-night-event.png"
                                    alt="Момент от събитие"
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    loading="lazy"
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">groups</span>
                                    <span>Нощен Живот</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image
                                    src="/assets/enhanced_lounge-tables-atmospheric.png"
                                    alt="Интериор"
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    loading="lazy"
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">chair</span>
                                    <span>Интериор</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== RESERVATION ===== */}
                <section className={`${styles.section} ${styles.reserveSection}`} id="reserve">
                    <div className={styles.container}>
                        <div className={styles.reserveGrid}>
                            <div className={`${styles.reserveInfo} ${styles.reveal}`}>
                                <p className={styles.sectionLabel}>Резервации</p>
                                <h2 className={styles.sectionTitle}>Запази Своето<br />Място на Бара</h2>
                                <p className={styles.reserveDescription}>
                                    20 маси, 99 души капацитет. Резервирай предварително за концертни вечери, за да си сигурен в мястото си.
                                </p>
                                <div className={styles.reserveDetails}>
                                    <div className={styles.reserveDetail}>
                                        <span className="material-symbols-outlined">schedule</span>
                                        <div>
                                            <strong>Работно Време</strong>
                                            <p>Ср-Чт, Нд: 20:00 - 02:00</p>
                                            <p>Пт-Сб: 20:00 - 04:00</p>
                                            <p className={styles.textMuted}>Пн-Вт: Почивен ден</p>
                                        </div>
                                    </div>
                                    <div className={styles.reserveDetail}>
                                        <span className="material-symbols-outlined">call</span>
                                        <div>
                                            <strong>Телефон</strong>
                                            <p><a href="tel:+359988793684">+359 98 879 3684</a></p>
                                        </div>
                                    </div>
                                    <div className={styles.reserveDetail}>
                                        <span className="material-symbols-outlined">mail</span>
                                        <div>
                                            <strong>Email</strong>
                                            <p><a href="mailto:info@driftbarplovdiv.com">info@driftbarplovdiv.com</a></p>
                                            <p><a href="mailto:driftbar@abv.bg">driftbar@abv.bg</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.reserveFormWrapper} ${styles.reveal}`}>
                                <form className={styles.reserveForm} onSubmit={handleReservation}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="res-name">Вашето Име</label>
                                        <input type="text" id="res-name" name="name" required placeholder="Иван Иванов" />
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="date">Дата</label>
                                            <input type="date" id="date" name="date" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="time">Час</label>
                                            <select id="time" name="time" required>
                                                <option value="">Избери...</option>
                                                {['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'].map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="guests">Брой Гости</label>
                                            <select id="guests" name="guests" required>
                                                <option value="">Избери...</option>
                                                {[1, 2, 3, 4, 5, 6].map(n => (
                                                    <option key={n} value={n}>{n} {n === 1 ? 'човек' : 'души'}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="phone">Телефон</label>
                                            <input type="tel" id="phone" name="phone" required placeholder="+359 8XX XXX XXX" />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Бележки (по желание)</label>
                                        <textarea id="message" name="message" rows={3} placeholder="Специални изисквания, повод..." />
                                    </div>
                                    <button
                                        type="submit"
                                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull} ${formStatus === 'success' ? styles.btnSuccess : ''}`}
                                        disabled={formStatus === 'success'}
                                    >
                                        {formStatus === 'success' ? (
                                            <><span className="material-symbols-outlined">check_circle</span> Резервацията е изпратена!</>
                                        ) : (
                                            <><span className="material-symbols-outlined">event_available</span> Изпрати Резервация</>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ===== REVIEWS ===== */}
                <section className={`${styles.section} ${styles.reviewsSection}`} id="reviews">
                    <div className={styles.container}>
                        <div className={`${styles.sectionHeader} ${styles.sectionHeaderCenter} ${styles.reveal}`}>
                            <p className={styles.sectionLabel}>Отзиви</p>
                            <h2 className={styles.sectionTitle}>Какво Казват Клиентите</h2>
                        </div>
                        <div className={styles.reveal} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {[
                                { author: "Иван Д.", rating: 5, text: "Страхотен звук и атмосфера! Най-доброто място за рок музика в града." },
                                { author: "Мария С.", rating: 5, text: "Коктейлите са супер, а обслужването – на високо ниво." },
                                { author: "Георги Н.", rating: 4, text: "Много свежо място за групи и резервации. Препоръчвам." }
                            ].map((review, i) => (
                                <div key={i} style={{ backgroundColor: '#16110b', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', color: '#9c3211', marginBottom: '1rem' }}>
                                        {[...Array(review.rating)].map((_, j) => <span key={j} className="material-symbols-outlined" style={{ fontSize: '1.25rem', fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                    </div>
                                    <p style={{ color: '#c8c3b4', marginBottom: '1.5rem', fontStyle: 'italic', opacity: 0.8 }}>"{review.text}"</p>
                                    <p style={{ color: '#c8c3b4', fontWeight: '600' }}>— {review.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <section className={`${styles.section} ${styles.faqSection}`} id="faq" style={{ backgroundColor: '#130d07' }}>
                    <div className={styles.container}>
                        <div className={`${styles.sectionHeader} ${styles.sectionHeaderCenter} ${styles.reveal}`}>
                            <p className={styles.sectionLabel}>FAQ</p>
                            <h2 className={styles.sectionTitle}>Често Задавани Въпроси</h2>
                        </div>
                        <div className={styles.reveal} style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ backgroundColor: '#16110b', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ color: '#c8c3b4', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Има ли музика на живо през седмицата?</h3>
                                <p style={{ color: '#c8c3b4', lineHeight: '1.6', opacity: 0.8 }}>Да, Drift Bar Plovdiv организира музика на живо редовно, като повечето събития са в петък и събота, но често имаме и концерти в средата на седмицата.</p>
                            </div>
                            <div style={{ backgroundColor: '#16110b', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ color: '#c8c3b4', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Къде се намира Drift Bar?</h3>
                                <p style={{ color: '#c8c3b4', lineHeight: '1.6', opacity: 0.8 }}>Очакваме ви на ул. Сливница 2а, 4003 Кършияка Северен, в град Пловдив.</p>
                            </div>
                            <div style={{ backgroundColor: '#16110b', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ color: '#c8c3b4', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Мога ли да резервирам маса за 10 човека?</h3>
                                <p style={{ color: '#c8c3b4', lineHeight: '1.6', opacity: 0.8 }}>Да, капацитетът на бара е 99 места с над 20 маси, като безпроблемно приемаме и настаняваме големи компании.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== CONTACT ===== */}
                <section className={`${styles.section} ${styles.contactSection}`} id="contact">
                    <div className={styles.container}>
                        <div className={`${styles.sectionHeader} ${styles.sectionHeaderCenter} ${styles.reveal}`}>
                            <p className={styles.sectionLabel}>Как да ни намериш</p>
                            <h2 className={styles.sectionTitle}>Ела в Drift Bar</h2>
                        </div>
                        <div className={styles.contactGrid}>
                            <div className={`${styles.contactMap} ${styles.reveal}`}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d217.35240670392056!2d24.7441427!3d42.1561547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd1d9af074413%3A0x179c8acbe2bbd5c!2sDrift%20Bar%20Plovdiv!5e1!3m2!1sbg!2sza!4v1772915095587!5m2!1sbg!2sza"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0, borderRadius: '1rem' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Drift Bar Plovdiv на картата"
                                />
                            </div>
                            <div className={`${styles.contactInfoCards} ${styles.reveal}`}>
                                <div className={styles.contactCard}>
                                    <span className="material-symbols-outlined" style={{ color: '#9c3211' }}>location_on</span>
                                    <h3>Адрес</h3>
                                    <p>ул. Сливница 2а</p>
                                    <p>4003 Кършияка Северен, Пловдив</p>
                                    <a href="https://maps.app.goo.gl/z9wTmKz4knVpdLvdA" target="_blank" rel="noopener noreferrer" className={styles.contactCardLink} aria-label="Отвори Google Maps за навигация до Drift Bar">
                                        Навигирай <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">open_in_new</span>
                                    </a>
                                </div>
                                <div className={styles.contactCard}>
                                    <span className="material-symbols-outlined" style={{ color: '#9c3211' }}>schedule</span>
                                    <h3>Работно Време</h3>
                                    <p>Ср – Чт, Нд: 20:00 – 02:00</p>
                                    <p>Пт – Сб: 20:00 – 04:00</p>
                                    <p className={styles.textMuted}>Пн – Вт: Почивен ден</p>
                                </div>
                                <div className={styles.contactCard}>
                                    <span className="material-symbols-outlined" style={{ color: '#9c3211' }}>share</span>
                                    <h3>Социални Мрежи</h3>
                                    <div className={styles.socialLinks}>
                                        <a href="https://www.instagram.com/drift_bar_plovdiv/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Последвайте Drift Bar в Instagram">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                        </a>
                                        <a href="https://facebook.com/Drift.Bar.Plovdiv" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Харесайте Drift Bar във Facebook">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== FOOTER ===== */}
                <footer className={styles.siteFooter}>
                    <div className={`${styles.container} ${styles.footerInner}`}>
                        <div className={styles.footerBrand}>
                            <div className={`${styles.vinylLogo} ${styles.vinylLogoSm}`}>
                                <div className={styles.vinylLogoInner} />
                            </div>
                            <span className={styles.logoText}>Drift Bar</span>
                        </div>
                        <p className={styles.footerTagline}>
                            Сцена от Музиканти за Музиканти • Пловдив<br />
                            ул. Сливница 2а, 4003 Кършияка Северен, Пловдив • Тел: +359 98 879 3684
                        </p>
                        <div className={styles.footerLinks}>
                            <a href="#events">Събития</a>
                            <a href="#about">За Нас</a>
                            <a href="#gallery">Галерия</a>
                            <a href="#reserve">Резервации</a>
                            <a href="#contact">Контакт</a>
                        </div>
                        <p className={styles.footerCopy}>© 2026 Drift Bar Plovdiv. Всички права запазени.</p>
                    </div>
                </footer>

            </div>
        </>
    )
}
