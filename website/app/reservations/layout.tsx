import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'

export const metadata: Metadata = {
    title: 'Резервации — Drift Bar Plovdiv',
    description: 'Запази маса в Drift Bar Plovdiv онлайн или на +359 98 879 3684. Препоръчваме резервация за концертни вечери.',
    keywords: 'резервация бар пловдив, drift bar резервация, маса жива музика пловдив',
    alternates: { canonical: `${baseUrl}/reservations` },
    openGraph: {
        title: 'Резервации — Drift Bar Plovdiv',
        description: 'Запази маса в Drift Bar Plovdiv онлайн или на +359 98 879 3684. Препоръчваме резервация за концертни вечери.',
        url: `${baseUrl}/reservations`,
        type: 'website',
        locale: 'bg_BG',
    },
}

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
