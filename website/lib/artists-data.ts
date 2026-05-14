// ═══════════════════════════════════════════
// Drift Bar Plovdiv — Artists Data
// One entry per artist/band that has performed (or will perform) at Drift Bar.
// Drives the /artists index page and /artists/[slug] dynamic detail pages.
// Each page is a static URL targeted at SEO + GEO (LLM citations) when users
// ask ChatGPT/Perplexity/Google about a specific artist + Plovdiv.
// ═══════════════════════════════════════════

export interface ArtistSocialLinks {
    facebook?: string
    instagram?: string
    spotify?: string
    youtube?: string
    website?: string
}

export interface Artist {
    slug: string
    name: string
    genre: string
    bio: string
    imageUrl: string
    eventDate?: string
    accentColor?: string
    socialLinks?: ArtistSocialLinks
}

export const ARTISTS: readonly Artist[] = [
    {
        slug: 'dina-york-yorkers',
        name: 'Dina York & The Yorkers',
        genre: 'Блус & Соул',
        bio: 'Американската певица Дина Йорк пристига за първи път в Пловдив след напълно разпродадения си концерт в София. Със своята група The Yorkers тя преосмисля най-красивите блус и соул класики на всички времена. Състав: Дина Йорк (вокал), Доменико Дередита (пиано), Цуки Цветанов (китара), Доменико Форнари (бас), Иво Попов (барабани).',
        imageUrl: '/events/dina-york.svg',
        eventDate: '2026-05-14',
        accentColor: '#34495e',
    },
    {
        slug: 'elit',
        name: 'ЕЛИТ',
        genre: 'Рок',
        bio: 'ЕЛИТ е една от легендите на българския рок. Съставът включва Огнян Цолов (вокал), Атанас Андреев (китара), Петър Каръпски (бас) и Иво Иванчев (барабани). Групата е известна с албумите "Forgotten Faces" (1995) и "Объркан свят" (1998), участия на Metal Fest в Милуоки, турнета със Сигнал и подгряване на Назарет и Греъм Бонет.',
        imageUrl: '/events/elit.svg',
        eventDate: '2026-05-15',
        accentColor: '#c0392b',
    },
    {
        slug: 'coven-5',
        name: 'Coven 5',
        genre: 'Рок',
        bio: 'Coven 5 е българска рок група, която качва на сцената на Drift Bar мощен live звук и енергично присъствие. Очаквайте плътен рок саунд в петъчно-съботния ритъм на Пловдив.',
        imageUrl: '/events/coven-5.svg',
        eventDate: '2026-05-16',
        accentColor: '#9b59b6',
    },
    {
        slug: 'deestoned',
        name: 'DeeStoned',
        genre: 'Блус Рок',
        bio: 'DeeStoned е българска блус-рок група, чийто звук съчетава риф-ориентиран рок и автентично блусарско усещане. На сцената на Drift Bar групата носи запомнящо се live изпълнение в традицията на класическия Blues Rock.',
        imageUrl: '/events/deestoned.svg',
        eventDate: '2026-05-09',
        accentColor: '#27ae60',
    },
    {
        slug: 'sharp-dressed-men',
        name: 'Sharp Dressed Men',
        genre: 'Рок Кавъри',
        bio: 'Sharp Dressed Men е пловдивска рок кавър група, която събира в репертоара си най-големите рок хитове от ZZ Top, Lenny Kravitz, Scorpions, Joe Cocker, Alice Cooper и много други. Състав: Димо Тунчев (вокал, китара), Никола Атанасов (бас, бек-вокал), Даниел Пържанов (барабани).',
        imageUrl: '/events/sharp-dressed-men.svg',
        eventDate: '2026-05-01',
        accentColor: '#e74c3c',
    },
    {
        slug: 'angel-demirev-jazz-trio',
        name: 'Angel Demirev Jazz Trio',
        genre: 'Джаз',
        bio: 'Angel Demirev Jazz Trio е българско джаз трио, водено от китариста Ангел Демирев — музикант с изразителен стил, впечатляваща техника и силно сценично присъствие. Авторска музика, в която се преплитат джаз традиция, модерни импровизации и дълбока емоционалност. Състав: Ангел Демирев (китара), Борислав Петров (барабани), Евгени Димитров (бас китара).',
        imageUrl: '/events/angel-demirev-jazz-trio.jpg',
        eventDate: '2026-04-17',
        accentColor: '#1abc9c',
    },
    {
        slug: 'brazilian-night',
        name: 'Бразилска вечер',
        genre: 'Джаз & Латино',
        bio: 'Бразилска вечер е специален състав, който носи на сцената на Drift Bar ритмите на Бразилия — бразилски джаз и латино музика. Състав: Мария Караиванова (вокал), Преслав Пеев (саксофон), Живко Братанов (пиано), Николай Бобчев (контрабас) и Александър Каменов (барабани).',
        imageUrl: '/events/brazilian-night.jpg',
        eventDate: '2026-04-16',
        accentColor: '#f39c12',
    },
    {
        slug: 'tsunami-rock-band',
        name: 'Tsunami Rock Band BG',
        genre: 'Рок',
        bio: 'Tsunami Rock Band BG е българска рок група, която идва на сцената на Drift Bar с мощен рок саунд и незабравимо live изпълнение. Една вечер, в която сцената се тресе.',
        imageUrl: '/events/tsunami-rock-band.svg',
        eventDate: '2026-04-03',
        accentColor: '#e74c3c',
    },
    {
        slug: 'dj-azsumrado',
        name: 'DJ Azsumrado',
        genre: 'DJ Set',
        bio: 'DJ Azsumrado е един от най-активните DJ артисти в пловдивския нощен живот. Електронни битове, groove и енергия до сутринта — open-format сетове, които държат дансинга жив.',
        imageUrl: '/events/dj-azsumrado.svg',
        eventDate: '2026-04-04',
        accentColor: '#00CED1',
    },
    {
        slug: 'dj-borrix',
        name: 'DJ Borrix',
        genre: 'DJ Set',
        bio: 'DJ Borrix е един от разпознаваемите DJ артисти в пловдивската сцена. Известен е с open-format партита, mashup-и, ремикси и оригинални миксове, които носят енергия, грууув и незабравима нощ.',
        imageUrl: '/events/dj-borrix.jpg',
        eventDate: '2026-04-11',
        accentColor: '#e67e22',
    },
    {
        slug: '6-decades-music',
        name: '6 Десетилетия Музика',
        genre: 'Ретро Хитове',
        bio: '6 Десетилетия Музика е специално музикално пътуване през най-красивите парчета от 60-те до 10-те години на 20-ти век — 60s, 70s, 80s, 90s, 00s и 10s. След огромния интерес към събитието в Клуб Полинеро, проектът се качва на сцената на Drift Bar.',
        imageUrl: '/events/6-decades-music.svg',
        eventDate: '2026-05-22',
        accentColor: '#d68910',
    },
]

// ───────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────

export function getArtistBySlug(slug: string): Artist | undefined {
    return ARTISTS.find(artist => artist.slug === slug)
}

export function getAllArtistSlugs(): string[] {
    return ARTISTS.map(artist => artist.slug)
}

export function getUpcomingArtists(now: Date = new Date()): Artist[] {
    return ARTISTS
        .filter(artist => artist.eventDate !== undefined && new Date(artist.eventDate) >= now)
        .sort((a, b) => new Date(a.eventDate as string).getTime() - new Date(b.eventDate as string).getTime())
}
