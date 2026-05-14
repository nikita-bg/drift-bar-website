import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

export const metadata: Metadata = {
    title: 'Събития и Концерти — Drift Bar Plovdiv',
    description: 'Програма с предстоящи концерти на живо в Drift Bar — рок, джаз, блус, DJ сетове в Пловдив. Резервирай маса за следващия концерт.',
    keywords: 'концерти пловдив, събития пловдив, жива музика пловдив, drift bar програма',
    alternates: { canonical: `${baseUrl}/events` },
    openGraph: {
        title: 'Събития и Концерти — Drift Bar Plovdiv',
        description: 'Програма с предстоящи концерти на живо в Drift Bar — рок, джаз, блус, DJ сетове в Пловдив. Резервирай маса за следващия концерт.',
        url: `${baseUrl}/events`,
        type: 'website',
        locale: 'bg_BG',
    },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
