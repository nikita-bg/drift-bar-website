// ═══════════════════════════════════════════
// Drift Bar Plovdiv — Events Data
// Shared event data across the website
// ═══════════════════════════════════════════

export interface Event {
    id: string
    title: string
    genre: string
    date: string
    dayName: string
    time: string
    price: number
    description: string
    tags: string[]
    color: string
    month: string
    image: string
}

export const EVENTS: Event[] = [
    {
        id: 'e5',
        title: 'Tsunami Rock Band BG',
        genre: 'Рок',
        date: '2026-04-03',
        dayName: 'Петък',
        time: '21:00',
        price: 10,
        description: 'Tsunami Rock Band BG идват с мощен рок саунд и незабравимо live изпълнение. Една вечер, в която сцената се тресе.',
        tags: ['LIVE', 'ROCK'],
        color: '#e74c3c',
        month: 'АПР',
        image: '/events/tsunami-rock-band.svg',
    },
    {
        id: 'e6',
        title: 'DJ Azsumrado',
        genre: 'DJ Set',
        date: '2026-04-04',
        dayName: 'Събота',
        time: '22:00',
        price: 5,
        description: 'AZSUMRADO зад пулта — един от най-активните DJ артисти в пловдивския нощен живот. Електронни битове, groove и енергия до сутринта.',
        tags: ['DJ', 'ELECTRONIC'],
        color: '#00CED1',
        month: 'АПР',
        image: '/events/dj-azsumrado.svg',
    },
    {
        id: 'e7',
        title: 'DJ Borrix',
        genre: 'DJ Set',
        date: '2026-04-11',
        dayName: 'Събота',
        time: '22:00',
        price: 5,
        description: 'DJ Borrix зад пулта — един от разпознаваемите DJ артисти в пловдивската сцена. Open-format парти с mashup-и, ремикси и оригинални миксове. Енергия, грууув и незабравима нощ.',
        tags: ['DJ', 'PARTY'],
        color: '#e67e22',
        month: 'АПР',
        image: '/events/dj-borrix.jpg',
    },
    {
        id: 'e8',
        title: 'Бразилска вечер',
        genre: 'Джаз & Латино',
        date: '2026-04-16',
        dayName: 'Четвъртък',
        time: '21:00',
        price: 10,
        description: 'Потопете се в ритмите на Бразилия с вечер на джаз и латино музика. Мария Караиванова (вокал), Преслав Пеев (саксофон), Живко Братанов (пиано), Николай Бобчев (контрабас) и Александър Каменов (барабани) ви канят на едно топло и страстно музикално пътуване.',
        tags: ['LIVE', 'JAZZ', 'LATINO'],
        color: '#f39c12',
        month: 'АПР',
        image: '/events/brazilian-night.jpg',
    },
    {
        id: 'e9',
        title: 'Angel Demirev Jazz Trio',
        genre: 'Джаз',
        date: '2026-04-17',
        dayName: 'Петък',
        time: '21:00',
        price: 10,
        description: 'Потопете се в магията на съвременния джаз с триото на Ангел Демирев — музикант с изразителен стил, впечатляваща техника и силно сценично присъствие. Авторска музика, в която се преплитат джаз традиция, модерни импровизации и дълбока емоционалност. Ангел Демирев (китара), Борислав Петров (барабани), Евгени Димитров (бас китара).',
        tags: ['LIVE', 'JAZZ'],
        color: '#1abc9c',
        month: 'АПР',
        image: '/events/angel-demirev-jazz-trio.jpg',
    },
]

export const ALL_GENRES = ['Всички', 'Рок', 'DJ Set', 'Джаз & Латино', 'Джаз']

// Helper to get upcoming events (sorted by date)
export function getUpcomingEvents(limit?: number): Event[] {
    const now = new Date()
    const upcoming = EVENTS
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return limit ? upcoming.slice(0, limit) : upcoming
}

// Helper to format date for display
export function formatEventDate(dateStr: string): { day: number; monthShort: string } {
    const date = new Date(dateStr)
    const monthNames = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек']

    return {
        day: date.getDate(),
        monthShort: monthNames[date.getMonth()]
    }
}
