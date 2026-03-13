'use client'

import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #130d07 0%, #1a120a 100%)',
                padding: '2rem',
                fontFamily: 'var(--font-space-grotesk, sans-serif)',
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '600px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '3rem 2rem',
                    borderRadius: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                    <div style={{
                        fontSize: '8rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #9c3211 0%, #c0392b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        lineHeight: 1,
                    }}>
                        404
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#e8e1cf',
                        marginBottom: '1rem',
                    }}>
                        Страницата не е намерена
                    </h1>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#c8c3b4',
                        marginBottom: '2rem',
                        opacity: 0.8,
                    }}>
                        Съжаляваме, но страницата която търсите не съществува.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/" className="notfound-btn-primary">
                            <span className="material-symbols-outlined">home</span>
                            Начална Страница
                        </Link>
                        <Link href="/events" className="notfound-btn-outline">
                            <span className="material-symbols-outlined">event</span>
                            Предстоящи Събития
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .notfound-btn-primary, .notfound-btn-outline {
                    padding: 0.875rem 2rem;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .notfound-btn-primary {
                    background: #9c3211;
                    color: #fff;
                    border: none;
                }
                .notfound-btn-primary:hover {
                    background: #7d2810;
                }
                .notfound-btn-outline {
                    background: transparent;
                    color: #c8c3b4;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                }
                .notfound-btn-outline:hover {
                    border-color: rgba(255, 255, 255, 0.3);
                    color: #e8e1cf;
                }
                .material-symbols-outlined {
                    font-size: 1.25rem;
                }
            `}</style>
        </>
    )
}
