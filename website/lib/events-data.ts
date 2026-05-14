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
        id: 'e15',
        title: 'Музика от 6 десетилетия',
        genre: 'Ретро Хитове',
        date: '2026-05-22',
        dayName: 'Петък',
        time: '21:00',
        price: 10,
        description: 'След огромния интерес към събитието в Клуб Полинеро, повтаряме музикалното пътуване и в Drift Bar. Чуйте най-красивите парчета от последните 6 десетилетия на 20-ти век — 60s, 70s, 80s, 90s, 00s, 10s. Запазете маса и питие предварително — местата са ограничени.',
        tags: ['LIVE', 'RETRO', 'COVERS'],
        color: '#d68910',
        month: 'МАЙ',
        image: '/events/6-decades-music.png',
    },
    {
        id: 'e14',
        title: 'Coven 5',
        genre: 'Рок',
        date: '2026-05-16',
        dayName: 'Събота',
        time: '21:00',
        price: 5,
        description: 'Coven 5 на сцената на Drift Bar. Очаквай мощно живо изпълнение в петъчно-съботния ритъм на Пловдив. Врата 20:00, начало 21:00.',
        tags: ['LIVE', 'ROCK'],
        color: '#9b59b6',
        month: 'МАЙ',
        image: '/events/coven-5.jpg',
    },
    {
        id: 'e13',
        title: 'ЕЛИТ',
        genre: 'Рок',
        date: '2026-05-15',
        dayName: 'Петък',
        time: '21:00',
        price: 10,
        description: 'ЕЛИТ — една от легендите на българския рок се завръща на сцената. Огнян Цолов (вокал), Атанас Андреев (китара), Петър Каръпски (бас), Иво Иванчев (барабани). С албуми като "Forgotten Faces" (1995) и "Объркан свят" (1998), участия на Metal Fest в Милуоки, турнета със Сигнал и подгряване на Назарет и Греъм Бонет. Тази вечер — на живо в Drift.',
        tags: ['LIVE', 'ROCK', 'LEGEND'],
        color: '#c0392b',
        month: 'МАЙ',
        image: '/events/elit.png',
    },
    {
        id: 'e12',
        title: 'DINA YORK & THE YORKERS',
        genre: 'Блус & Соул',
        date: '2026-05-14',
        dayName: 'Четвъртък',
        time: '21:00',
        price: 10,
        description: 'Американската певица Дина Йорк пристига за първи път в Пловдив след напълно разпродадения си концерт в София. Със своята група The Yorkers тя преосмисля най-красивите блус и соул класики на всички времена. Състав: Дина Йорк (вокал), Доменико Дередита (пиано), Цуки Цветанов (китара), Доменико Форнари (бас), Иво Попов (барабани).',
        tags: ['LIVE', 'BLUES', 'SOUL'],
        color: '#34495e',
        month: 'МАЙ',
        image: '/events/dina-york.jpg',
    },
    {
        id: 'e11',
        title: 'DeeStoned',
        genre: 'Блус Рок',
        date: '2026-05-09',
        dayName: 'Събота',
        time: '21:00',
        price: 10,
        description: 'DeeStoned идват да разтресат сцената с Blues Rock, който се помни.',
        tags: ['LIVE', 'BLUES-ROCK'],
        color: '#27ae60',
        month: 'МАЙ',
        image: '/events/deestoned.jpg',
    },
    {
        id: 'e16',
        title: 'DJAANY (+ Support: ZED)',
        genre: 'DJ Set',
        date: '2026-05-08',
        dayName: 'Петък',
        time: '22:00',
        price: 10,
        description: 'Drift Bar Plovdiv представя DJAANY — един от най-разпознаваемите DJ-и в българската клубна сцена. Support set от ZED. Open-format нощ — house, urban, club classics. Врата 22:00, парти до сутринта.',
        tags: ['DJ', 'CLUB', 'PARTY'],
        color: '#2c5f5d',
        month: 'МАЙ',
        image: '/events/djaany.png',
    },
    {
        id: 'e17',
        title: 'DJ Borrix',
        genre: 'DJ Set',
        date: '2026-05-02',
        dayName: 'Събота',
        time: '22:00',
        price: 5,
        description: 'DJ Borrix отново зад пулта в Drift Bar — поредната open-format нощ. Mashup-и, ремикси, оригинални миксове до сутринта.',
        tags: ['DJ', 'PARTY'],
        color: '#e67e22',
        month: 'МАЙ',
        image: '/events/dj-borrix-may.jpg',
    },
    {
        id: 'e10',
        title: 'Sharp Dressed Men',
        genre: 'Рок Кавъри',
        date: '2026-05-01',
        dayName: 'Петък',
        time: '21:00',
        price: 10,
        description: 'Sharp Dressed Men е пловдивска рок група, която събира в репертоара си най-големите рок хитове от групи като ZZ Top, Lenny Kravitz, Scorpions, Joe Cocker, Alice Cooper и много други. Димо Тунчев (вокал, китара), Никола Атанасов (бас, бек-вокал), Даниел Пържанов (барабани).',
        tags: ['LIVE', 'ROCK', 'COVERS'],
        color: '#e74c3c',
        month: 'МАЙ',
        image: '/events/sharp-dressed-men.jpg',
    },
    {
        id: 'e18',
        title: 'ORIMBE',
        genre: 'Джаз & Латино',
        date: '2026-04-30',
        dayName: 'Четвъртък',
        time: '20:30',
        price: 10,
        description: 'ORIMBE на сцената на Drift Bar — Live Jazz, Fusion и Afrobeat в една вечер. Топъл духов саунд, грууви ритъм секция и неочаквани композиционни обрати.',
        tags: ['LIVE', 'JAZZ', 'FUSION', 'AFROBEAT'],
        color: '#a0522d',
        month: 'АПР',
        image: '/events/orimbe.jpg',
    },
    {
        id: 'e19',
        title: 'DJ JMJ — Retro Night',
        genre: 'DJ Set',
        date: '2026-04-25',
        dayName: 'Събота',
        time: '22:00',
        price: 5,
        description: 'DJ JMJ зад пулта — Retro Night: funk, soul и класики, които задават настроението до сутринта. 1 шот безплатно преди 21:00. 18+.',
        tags: ['DJ', 'RETRO', 'FUNK', 'SOUL'],
        color: '#5d6d7e',
        month: 'АПР',
        image: '/events/dj-jmj.jpg',
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

export const ALL_GENRES = ['Всички', 'Рок', 'Блус & Соул', 'Блус Рок', 'Рок Кавъри', 'Ретро Хитове', 'DJ Set', 'Джаз & Латино', 'Джаз']

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
