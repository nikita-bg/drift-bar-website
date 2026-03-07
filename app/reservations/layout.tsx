import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Резервации | Drift Bar Plovdiv',
    description: 'Направете онлайн резервация за Drift Bar Plovdiv. Гарантирайте си маса за най-добрите музикални събития и концерти.',
}

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
