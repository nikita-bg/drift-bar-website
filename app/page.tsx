'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './landing.module.css'

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [headerScrolled, setHeaderScrolled] = useState(false)
    const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle')
    const vinylRef = useRef<HTMLDivElement>(null)

    // Header scroll
    useEffect(() => {
        const handleScroll = () => setHeaderScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll, { passive: true })
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

    const handleReservation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormStatus('success')
        setTimeout(() => setFormStatus('idle'), 3000)
            ; (e.target as HTMLFormElement).reset()
    }

    return (
        <>
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
                        />
                        <span className={styles.logoText}>DRIFT BAR</span>
                    </a>
                    <nav className={styles.mainNav}>
                        <a href="#events" className={styles.navLink}>Събития</a>
                        <a href="#about" className={styles.navLink}>За Нас</a>
                        <a href="#gallery" className={styles.navLink}>Галерия</a>
                        <a href="#contact" className={styles.navLink}>Контакт</a>
                        <Link href="/menu" className={styles.navLink}>Меню</Link>
                    </nav>
                    <a href="#reserve" className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`}>Резервации</a>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Отвори менюто"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* ===== MOBILE MENU ===== */}
            <div
                className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.active : ''}`}
                onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false) }}
            >
                <div className={styles.mobileMenuContent}>
                    <button className={styles.mobileCloseBtn} onClick={() => setMobileMenuOpen(false)} aria-label="Затвори">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <nav className={styles.mobileNav}>
                        <a href="#events" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Събития</a>
                        <a href="#about" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>За Нас</a>
                        <a href="#gallery" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Галерия</a>
                        <a href="#contact" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Контакт</a>
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
                                Жива Музика,<br />Авторски Коктейли &<br />Незабравими Нощи
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Рок &amp; джаз бар в сърцето на Пловдив. Професионален звук, авторски коктейли, истинска музика на живо.
                            </p>
                            <div className={styles.heroActions}>
                                <a href="#events" className={`${styles.btn} ${styles.btnDark}`}>
                                    Предстоящи Концерти
                                </a>
                                <a href="#contact" className={`${styles.btn} ${styles.btnOutlineCircle}`} aria-label="Как да ни намериш">
                                    <span className="material-symbols-outlined">location_on</span>
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
                                            src="/assets/drums.jpg"
                                            alt="TAMA барабани на сцената на Drift Bar Plovdiv"
                                            className={styles.vinylImage}
                                            width={300}
                                            height={300}
                                            priority
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
                        </div>
                        <div className={styles.eventsGrid}>
                            {/* Event Card 1 */}
                            <article className={`${styles.eventCard} ${styles.reveal}`} itemScope itemType="https://schema.org/Event">
                                <div className={styles.eventCardSleeve}>
                                    <div className={styles.sleeveVinyl}>
                                        <div className={styles.sleeveVinylHole} />
                                    </div>
                                </div>
                                <div className={styles.eventCardBody}>
                                    <div className={styles.eventCardImage}>
                                        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
                                            <rect width="600" height="400" fill="#241c15" />
                                            <circle cx="300" cy="200" r="120" fill="none" stroke="#9c3211" strokeWidth="2" opacity="0.4" />
                                            <circle cx="300" cy="200" r="80" fill="none" stroke="#9c3211" strokeWidth="1.5" opacity="0.3" />
                                            <circle cx="300" cy="200" r="40" fill="none" stroke="#9c3211" strokeWidth="1" opacity="0.25" />
                                            <circle cx="300" cy="200" r="8" fill="#9c3211" opacity="0.6" />
                                            <text x="300" y="340" textAnchor="middle" fill="#c8c3b4" fontSize="13" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" letterSpacing="3" opacity="0.5">THE FOUR TONES</text>
                                            <text x="300" y="60" textAnchor="middle" fill="#9c3211" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="4" opacity="0.7">DRIFT BAR • LIVE</text>
                                        </svg>
                                        <span className={`${styles.eventBadge} ${styles.badgeStereo}`}>LIVE</span>
                                        <span className={styles.eventBadgeVol}>МАР</span>
                                    </div>
                                    <div className={styles.eventCardInfo}>
                                        <p className={styles.eventMeta} itemProp="startDate" content="2026-03-14T22:00">
                                            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>calendar_today</span>
                                            Събота, 14 Март • 22:00
                                        </p>
                                        <h3 className={styles.eventName} itemProp="name">The Four Tones</h3>
                                        <p className={styles.eventGenre}>Хеви Метъл</p>
                                        <div className={styles.eventFooter}>
                                            <span className={styles.eventPrice}>10 EUR</span>
                                            <a href="#reserve" className={`${styles.btn} ${styles.btnSm}`}>Резервирай</a>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Event Card 2 */}
                            <article className={`${styles.eventCard} ${styles.reveal}`} itemScope itemType="https://schema.org/Event">
                                <div className={styles.eventCardSleeve}>
                                    <div className={styles.sleeveVinyl}>
                                        <div className={styles.sleeveVinylHole} />
                                    </div>
                                </div>
                                <div className={styles.eventCardBody}>
                                    <div className={styles.eventCardImage}>
                                        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
                                            <rect width="600" height="400" fill="#1a1209" />
                                            <circle cx="300" cy="200" r="140" fill="none" stroke="#9c3211" strokeWidth="3" opacity="0.35" />
                                            <circle cx="300" cy="200" r="100" fill="none" stroke="#c8c3b4" strokeWidth="1" opacity="0.15" />
                                            <circle cx="300" cy="200" r="60" fill="none" stroke="#9c3211" strokeWidth="1.5" opacity="0.3" />
                                            <circle cx="300" cy="200" r="20" fill="#9c3211" opacity="0.5" />
                                            <circle cx="300" cy="200" r="8" fill="#1a1209" />
                                            <text x="300" y="340" textAnchor="middle" fill="#c8c3b4" fontSize="13" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" letterSpacing="3" opacity="0.5">SOLID FUEL</text>
                                            <text x="300" y="60" textAnchor="middle" fill="#9c3211" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="4" opacity="0.7">DRIFT BAR • ROCK</text>
                                        </svg>
                                        <span className={`${styles.eventBadge} ${styles.badgeHifi}`}>ROCK</span>
                                        <span className={styles.eventBadgeVol}>МАР</span>
                                    </div>
                                    <div className={styles.eventCardInfo}>
                                        <p className={styles.eventMeta} itemProp="startDate" content="2026-03-20T22:00">
                                            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>calendar_today</span>
                                            Петък, 20 Март • 22:00
                                        </p>
                                        <h3 className={styles.eventName} itemProp="name">Solid Fuel</h3>
                                        <p className={styles.eventGenre}>Блус &amp; Рок</p>
                                        <div className={styles.eventFooter}>
                                            <span className={styles.eventPrice}>10 EUR</span>
                                            <a href="#reserve" className={`${styles.btn} ${styles.btnSm}`}>Резервирай</a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* ===== ABOUT SECTION ===== */}
                <section className={`${styles.section} ${styles.aboutSection}`} id="about">
                    <div className={styles.container}>
                        <div className={styles.aboutGrid}>
                            <div className={`${styles.aboutImages} ${styles.reveal}`}>
                                <div className={`${styles.aboutImg} ${styles.aboutImgMain}`}>
                                    <Image src="/assets/bar-counter.jpg" alt="Бар на Drift Bar Plovdiv" width={700} height={500} />
                                </div>
                                <div className={`${styles.aboutImg} ${styles.aboutImgSecondary}`}>
                                    <Image src="/assets/mixer.jpg" alt="Професионален миксер Drift Bar" width={400} height={300} />
                                </div>
                            </div>
                            <div className={`${styles.aboutText} ${styles.reveal}`}>
                                <p className={styles.sectionLabel}>За Drift Bar</p>
                                <h2 className={styles.sectionTitle}>Повече от Бар.<br />Сцена за Истинска Музика.</h2>
                                <p className={styles.aboutDescription}>
                                    Drift Bar е най-новото място за жива музика в центъра на Пловдив. С професионално звуково и светлинно оборудване, създадохме пространство, където музикантите идват да свирят истинско, а публиката — да чуе качество.
                                </p>
                                <p className={styles.aboutDescription}>
                                    Концепцията е проста: качествена жива музика, авторски коктейли и автентична атмосфера. От рок и хард рок до блус и джаз — тук звучи всичко, което идва от сърцето.
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
                                <Image src="/assets/stage.jpg" alt="Сцената с осветление" width={800} height={600} />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">music_note</span>
                                    <span>Сцената</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image src="/assets/bar.jpg" alt="Барът" width={400} height={400} />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">local_bar</span>
                                    <span>Барът</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image src="/assets/drums.jpg" alt="TAMA барабани" width={400} height={400} />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">piano</span>
                                    <span>Оборудване</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image src="/assets/mixer.jpg" alt="Звуков пулт" width={400} height={400} />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">tune</span>
                                    <span>Звуков Пулт</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image src="/assets/live-performance.jpg" alt="Жив концерт" width={400} height={400} />
                                <div className={styles.galleryOverlay}>
                                    <span className="material-symbols-outlined">groups</span>
                                    <span>Концерт</span>
                                </div>
                            </div>
                            <div className={styles.galleryItem}>
                                <Image src="/assets/interior.jpg" alt="Интериор" width={400} height={400} />
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
                                            <p><a href="tel:+359988793686">+359 98 879 3686</a></p>
                                        </div>
                                    </div>
                                    <div className={styles.reserveDetail}>
                                        <span className="material-symbols-outlined">mail</span>
                                        <div>
                                            <strong>Email</strong>
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
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2958.8!2d24.749!3d42.147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDA4JzQ4LjQiTiAyNMKwNDQnNTcuMiJF!5e0!3m2!1sbg!2sbg!4v1709500000000!5m2!1sbg!2sbg"
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
                                    <p>ул. Сливница 4</p>
                                    <p>Пловдив, България</p>
                                    <a href="https://maps.app.goo.gl/V6z6ackykTwdEzgV7" target="_blank" rel="noopener" className={styles.contactCardLink}>
                                        Навигирай <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>open_in_new</span>
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
                                        <a href="https://instagram.com/drift_bar_plovdiv" target="_blank" rel="noopener" className={styles.socialLink} aria-label="Instagram">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                        </a>
                                        <a href="https://facebook.com/Drift.Bar.Plovdiv" target="_blank" rel="noopener" className={styles.socialLink} aria-label="Facebook">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" /></svg>
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
                        <p className={styles.footerTagline}>Сцена от Музиканти за Музиканти • Пловдив</p>
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
