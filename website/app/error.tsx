'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error boundary caught:', error)
    }, [error])

    return (
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
                <span className="material-symbols-outlined" style={{
                    fontSize: '5rem',
                    color: '#c0392b',
                    display: 'block',
                    marginBottom: '1.5rem',
                }}>
                    error
                </span>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#e8e1cf',
                    marginBottom: '1rem',
                }}>
                    Нещо се обърка
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: '#c8c3b4',
                    marginBottom: '2rem',
                    opacity: 0.8,
                }}>
                    Извиняваме се за неудобството. Възникна неочаквана грешка.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={reset}
                        className="error-btn-primary"
                    >
                        <span className="material-symbols-outlined">refresh</span>
                        Опитай Отново
                    </button>
                    <Link href="/" className="error-btn-outline">
                        <span className="material-symbols-outlined">home</span>
                        Начална Страница
                    </Link>
                    <style jsx>{`
                        .error-btn-primary, .error-btn-outline {
                            padding: 0.875rem 2rem;
                            border-radius: 0.5rem;
                            fontSize: 1rem;
                            font-weight: 600;
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: all 0.2s;
                            cursor: pointer;
                        }
                        .error-btn-primary {
                            background: #9c3211;
                            color: #fff;
                            border: none;
                        }
                        .error-btn-primary:hover {
                            background: #7d2810;
                        }
                        .error-btn-outline {
                            background: transparent;
                            color: #c8c3b4;
                            border: 2px solid rgba(255, 255, 255, 0.1);
                            text-decoration: none;
                        }
                        .error-btn-outline:hover {
                            border-color: rgba(255, 255, 255, 0.3);
                            color: #e8e1cf;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    )
}
