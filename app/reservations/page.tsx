'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './reservations.module.css'

interface TimeSlot {
    time: string
    available: boolean
    availableSeats: number
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ReservationsPage() {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [partySize, setPartySize] = useState(2)
    const [guestName, setGuestName] = useState('')
    const [guestPhone, setGuestPhone] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [notes, setNotes] = useState('')
    const [slots, setSlots] = useState<TimeSlot[]>([])
    const [loadingSlots, setLoadingSlots] = useState(false)
    const [formStatus, setFormStatus] = useState<FormStatus>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [step, setStep] = useState(1) // 1: date/time, 2: details, 3: confirm

    // Set min date to today
    const today = new Date().toISOString().split('T')[0]

    // Fetch available slots when date or party size changes
    useEffect(() => {
        if (!date) return
        setLoadingSlots(true)
        setStartTime('')

        fetch(`/api/availability?date=${date}&partySize=${partySize}`)
            .then(res => res.json())
            .then(data => {
                setSlots(data.slots || [])
                setLoadingSlots(false)
            })
            .catch(() => {
                setSlots([])
                setLoadingSlots(false)
            })
    }, [date, partySize])

    const handleSubmit = async () => {
        setFormStatus('submitting')
        setErrorMessage('')

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    startTime,
                    duration: 120,
                    partySize,
                    guestName,
                    guestPhone,
                    guestEmail: guestEmail || undefined,
                    notes: notes || undefined,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setFormStatus('error')
                setErrorMessage(data.error || 'Грешка при резервация')
                return
            }

            setFormStatus('success')
        } catch {
            setFormStatus('error')
            setErrorMessage('Няма връзка със сървъра. Моля опитайте отново.')
        }
    }

    const formatDate = (d: string) => {
        if (!d) return ''
        const dt = new Date(d + 'T00:00:00')
        const days = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота']
        const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
        return `${days[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]}`
    }

    const canProceedStep1 = date && startTime
    const canProceedStep2 = guestName.trim() && guestPhone.trim()

    // Success state
    if (formStatus === 'success') {
        return (
            <div className={styles.page}>
                <header className={styles.header}>
                    <div className={styles.headerInner}>
                        <Link href="/" className={styles.headerBack}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <div className={styles.headerBrand}>
                            <Image src="/logo.png" alt="Drift Bar" width={36} height={36} className={styles.headerLogo} />
                            <span className={styles.headerTitle}>DRIFT BAR</span>
                        </div>
                        <div style={{ width: '2.5rem' }} />
                    </div>
                </header>
                <main className={styles.successContainer}>
                    <div className={styles.successCard}>
                        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: '#27ae60' }}>check_circle</span>
                        <h1>Резервацията е изпратена!</h1>
                        <p>Ще получите потвърждение скоро.</p>
                        <div className={styles.successDetails}>
                            <div className={styles.successDetail}>
                                <span className="material-symbols-outlined">calendar_today</span>
                                <span>{formatDate(date)}</span>
                            </div>
                            <div className={styles.successDetail}>
                                <span className="material-symbols-outlined">schedule</span>
                                <span>{startTime}</span>
                            </div>
                            <div className={styles.successDetail}>
                                <span className="material-symbols-outlined">group</span>
                                <span>{partySize} {partySize === 1 ? 'човек' : 'души'}</span>
                            </div>
                        </div>
                        <div className={styles.successActions}>
                            <Link href="/" className={styles.btnPrimary}>Към Началната Страница</Link>
                            <Link href="/menu" className={styles.btnOutline}>Разгледай Менюто</Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link href="/" className={styles.headerBack}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div className={styles.headerBrand}>
                        <Image src="/logo.png" alt="Drift Bar" width={36} height={36} className={styles.headerLogo} />
                        <span className={styles.headerTitle}>DRIFT BAR</span>
                    </div>
                    <div style={{ width: '2.5rem' }} />
                </div>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>event_available</span>
                <h1 className={styles.heroTitle}>Резервации</h1>
                <p className={styles.heroSubtitle}>Запази мястото си за незабравима вечер с жива музика</p>
            </section>

            {/* Progress Steps */}
            <div className={styles.progress}>
                <div className={`${styles.progressStep} ${step >= 1 ? styles.progressActive : ''}`}>
                    <span className={styles.progressDot}>1</span>
                    <span>Дата & Час</span>
                </div>
                <div className={styles.progressLine} />
                <div className={`${styles.progressStep} ${step >= 2 ? styles.progressActive : ''}`}>
                    <span className={styles.progressDot}>2</span>
                    <span>Детайли</span>
                </div>
                <div className={styles.progressLine} />
                <div className={`${styles.progressStep} ${step >= 3 ? styles.progressActive : ''}`}>
                    <span className={styles.progressDot}>3</span>
                    <span>Потвърди</span>
                </div>
            </div>

            <main className={styles.main}>
                <div className={styles.container}>

                    {/* STEP 1: Date & Time */}
                    {step === 1 && (
                        <div className={styles.stepCard}>
                            <h2 className={styles.stepTitle}>
                                <span className="material-symbols-outlined">calendar_month</span>
                                Избери дата и час
                            </h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Дата</label>
                                <input
                                    type="date"
                                    className={styles.input}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={today}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Брой гости</label>
                                <div className={styles.partySizeGrid}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <button
                                            key={n}
                                            className={`${styles.partySizeBtn} ${partySize === n ? styles.partySizeBtnActive : ''}`}
                                            onClick={() => setPartySize(n)}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                                {partySize > 6 && (
                                    <p className={styles.hint}>За по-големи групи, обадете се: <a href="tel:+359988793684">+359 98 879 3684</a></p>
                                )}
                            </div>

                            {date && (
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Час</label>
                                    {loadingSlots ? (
                                        <div className={styles.slotsLoading}>
                                            <span className="material-symbols-outlined">hourglass_empty</span>
                                            Проверка на свободни часове...
                                        </div>
                                    ) : (
                                        <div className={styles.slotsGrid}>
                                            {slots.map(slot => (
                                                <button
                                                    key={slot.time}
                                                    className={`${styles.slotBtn} ${startTime === slot.time ? styles.slotBtnActive : ''} ${!slot.available ? styles.slotBtnFull : ''}`}
                                                    onClick={() => slot.available && setStartTime(slot.time)}
                                                    disabled={!slot.available}
                                                >
                                                    <span className={styles.slotTime}>{slot.time}</span>
                                                    {!slot.available && <span className={styles.slotLabel}>Пълно</span>}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <button
                                className={styles.btnPrimary}
                                disabled={!canProceedStep1}
                                onClick={() => setStep(2)}
                            >
                                Продължи
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    )}

                    {/* STEP 2: Guest Details */}
                    {step === 2 && (
                        <div className={styles.stepCard}>
                            <h2 className={styles.stepTitle}>
                                <span className="material-symbols-outlined">person</span>
                                Вашите данни
                            </h2>

                            <div className={styles.selectedSummary}>
                                <span className="material-symbols-outlined">event</span>
                                <span>{formatDate(date)} • {startTime} • {partySize} {partySize === 1 ? 'човек' : 'души'}</span>
                                <button className={styles.changeBtn} onClick={() => setStep(1)}>Промени</button>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Име *</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Вашето име"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Телефон *</label>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="+359 8XX XXX XXX"
                                    value={guestPhone}
                                    onChange={(e) => setGuestPhone(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email (по желание)</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="email@example.com"
                                    value={guestEmail}
                                    onChange={(e) => setGuestEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Бележки (по желание)</label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Специални изисквания, повод за празнуване..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className={styles.btnRow}>
                                <button className={styles.btnOutline} onClick={() => setStep(1)}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Назад
                                </button>
                                <button
                                    className={styles.btnPrimary}
                                    disabled={!canProceedStep2}
                                    onClick={() => setStep(3)}
                                >
                                    Прегледай
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Confirmation */}
                    {step === 3 && (
                        <div className={styles.stepCard}>
                            <h2 className={styles.stepTitle}>
                                <span className="material-symbols-outlined">fact_check</span>
                                Потвърди резервацията
                            </h2>

                            <div className={styles.confirmCard}>
                                <div className={styles.confirmRow}>
                                    <span className="material-symbols-outlined">calendar_today</span>
                                    <div>
                                        <strong>Дата</strong>
                                        <p>{formatDate(date)}</p>
                                    </div>
                                </div>
                                <div className={styles.confirmRow}>
                                    <span className="material-symbols-outlined">schedule</span>
                                    <div>
                                        <strong>Час</strong>
                                        <p>{startTime} (2 часа)</p>
                                    </div>
                                </div>
                                <div className={styles.confirmRow}>
                                    <span className="material-symbols-outlined">group</span>
                                    <div>
                                        <strong>Гости</strong>
                                        <p>{partySize} {partySize === 1 ? 'човек' : 'души'}</p>
                                    </div>
                                </div>
                                <div className={styles.confirmRow}>
                                    <span className="material-symbols-outlined">person</span>
                                    <div>
                                        <strong>Име</strong>
                                        <p>{guestName}</p>
                                    </div>
                                </div>
                                <div className={styles.confirmRow}>
                                    <span className="material-symbols-outlined">call</span>
                                    <div>
                                        <strong>Телефон</strong>
                                        <p>{guestPhone}</p>
                                    </div>
                                </div>
                                {guestEmail && (
                                    <div className={styles.confirmRow}>
                                        <span className="material-symbols-outlined">mail</span>
                                        <div>
                                            <strong>Email</strong>
                                            <p>{guestEmail}</p>
                                        </div>
                                    </div>
                                )}
                                {notes && (
                                    <div className={styles.confirmRow}>
                                        <span className="material-symbols-outlined">notes</span>
                                        <div>
                                            <strong>Бележки</strong>
                                            <p>{notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {errorMessage && (
                                <div className={styles.errorBanner}>
                                    <span className="material-symbols-outlined">error</span>
                                    {errorMessage}
                                </div>
                            )}

                            <div className={styles.btnRow}>
                                <button className={styles.btnOutline} onClick={() => setStep(2)} disabled={formStatus === 'submitting'}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Назад
                                </button>
                                <button
                                    className={styles.btnPrimary}
                                    onClick={handleSubmit}
                                    disabled={formStatus === 'submitting'}
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>hourglass_empty</span>
                                            Изпращане...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">check_circle</span>
                                            Потвърди Резервацията
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    )
}
