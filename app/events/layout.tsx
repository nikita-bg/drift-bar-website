import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Събития и Музика на Живо | Drift Bar Plovdiv',
    description: 'Проверете предстоящите концерти и музикални събития в Drift Bar Plovdiv. Рок, джаз, блус изпълнения на живо всяка седмица.',
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
