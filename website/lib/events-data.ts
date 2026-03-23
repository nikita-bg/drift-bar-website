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
        id: 'e2',
        title: 'The Four Tones',
        genre: 'Хеви Метъл',
        date: '2026-03-14',
        dayName: 'Събота',
        time: '21:00',
        price: 10,
        description: 'The Four Tones са един от най-енергичните метъл бандове в Пловдив. Очаквайте мощен звук, бесни рифове и незабравимо шоу.',
        tags: ['LIVE', 'METAL'],
        color: '#c0392b',
        month: 'МАР',
        image: '/events/the-four-tones.svg',
    },
    {
        id: 'e3',
        title: 'Solid Fuel',
        genre: 'Блус & Рок',
        date: '2026-03-20',
        dayName: 'Петък',
        time: '21:00',
        price: 10,
        description: 'Solid Fuel ни предлагат вечер с класически блус рок — топли тонове, соул и страст. Идеална атмосфера с питие в ръка.',
        tags: ['LIVE', 'BLUES', 'ROCK'],
        color: '#2980b9',
        month: 'МАР',
        image: '/events/solid-fuel.png',
    },
    {
        id: 'e4',
        title: 'Funkilicious',
        genre: 'Фънк & Соул',
        date: '2026-03-27',
        dayName: 'Петък',
        time: '21:00',
        price: 12,
        description: 'Българска фънк група от осем млади музиканти. Съчетават фънк, поп, соул и рок със силен груув, енергични изпълнения и богато звучене с духова секция.',
        tags: ['LIVE', 'FUNK', 'SOUL'],
        color: '#8e44ad',
        month: 'МАР',
        image: '/events/funkilicious.jpg',
    },
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
        image: '/events/tsunami-rock-band.jpg',
    },
    {
        id: 'e6',
        title: 'DJ Azsumrado',
        genre: 'DJ Set',
        date: '2026-04-04',
        dayName: 'Събота',
        time: '21:00',
        price: 5,
        description: 'AZSUMRADO зад пулта — един от най-активните DJ артисти в пловдивския нощен живот. Електронни битове, groove и енергия до сутринта.',
        tags: ['DJ', 'ELECTRONIC'],
        color: '#00CED1',
        month: 'АПР',
        image: '/events/dj-azsumrado.jpg',
    },
]

export const ALL_GENRES = ['Всички', 'DJ Set', 'Хеви Метъл', 'Блус & Рок', 'Фънк & Соул']

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
