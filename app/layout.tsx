import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-primary',
})

export const metadata: Metadata = {
    title: 'Drift Bar Plovdiv — Меню',
    description: 'Дигитално меню на Drift Bar Plovdiv. Авторски коктейли, класики, вино, уиски, бира. ул. Сливница 2А, Пловдив.',
    icons: {
        icon: '/favicon.ico',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="bg" className={spaceGrotesk.variable}>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <div className="grain-overlay" aria-hidden="true" />
                {children}
            </body>
        </html>
    )
}
