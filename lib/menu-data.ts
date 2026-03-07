/* ═══════════════════════════════════════════════
   Drift Bar Plovdiv — Full Menu Data
   Source: Physical menu photos (March 2026)
   ═══════════════════════════════════════════════ */

export interface MenuItem {
    id: string
    name: string
    price: number
    desc?: string
    volume?: string
    tags?: string[]
    image?: string
}

export interface MenuCategory {
    title: string
    titleAccent?: string
    subtitle?: string
    type: 'featured' | 'simple'
    items: MenuItem[]
}

export type CategoryKey =
    | 'cocktails'
    | 'whiskey'
    | 'bourbon'
    | 'vodka'
    | 'gin'
    | 'rum'
    | 'tequila'
    | 'rakiya'
    | 'brandy'
    | 'liqueurs'
    | 'digestifs'
    | 'wine'
    | 'beer'
    | 'food'
    | 'soft'
    | 'shots'

export type Menu = Record<CategoryKey, MenuCategory>

// ─── MAIN MENU DATA ────────────────────────────

export const MENU: Menu = {

    /* ═══════════════════════════════════════
       КОКТЕЙЛИ
       ═══════════════════════════════════════ */
    cocktails: {
        title: 'Коктейли',
        titleAccent: '& Миксове',
        subtitle: 'Класически и авторски',
        type: 'simple',
        items: [
            // ── Водка коктейли ──
            { id: 'cock-bloody-mary', name: 'Bloody Mary', price: 6, desc: 'Водка, доматен сок, фреш лимон', image: '/menu-images/cocktail_bloody_mary.png' },
            { id: 'cock-white-russian', name: 'White Russian', price: 6, desc: 'Водка, Kahlúa, сметана', image: '/menu-images/cocktail_white_russian.png' },
            { id: 'cock-cosmopolitan', name: 'Cosmopolitan', price: 6, desc: 'Водка, фреш лимон, сок касис, трипъл сек', image: '/menu-images/cocktail_cosmopolitan.png' },
            { id: 'cock-sex-beach', name: 'Sex on the Beach', price: 6, desc: 'Водка, шнапс праскова, сок ананас, сок портокал, гренадин', image: '/menu-images/cocktail_sex_on_beach.png' },
            { id: 'cock-long-island', name: 'Long Island', price: 7, desc: 'Водка, ром, текила, трипъл сек, фреш лимон, Кока-Кола', image: '/menu-images/cocktail_long_island.png' },
            { id: 'cock-bullfrog', name: 'Bullfrog', price: 7, desc: 'Водка, джин, ром, текила, синьо кюрасо, Red Bull', image: '/menu-images/cocktail_bullfrog.png' },
            // ── Ром коктейли ──
            { id: 'cock-cuba-libre', name: 'Cuba Libre', price: 6, desc: 'Ром, Кока-Кола, лайм', image: '/menu-images/cocktail_cuba_libre.png' },
            { id: 'cock-strawberry-daiquiri', name: 'Strawberry Daiquiri', price: 6, desc: 'Ром, Cointreau, ягоди, фреш лимон', image: '/menu-images/cocktail_strawberry_daiquiri.png' },
            // ── Джин коктейли ──
            { id: 'cock-gin-fizz', name: 'Gin Fizz', price: 6, desc: 'Джин, фреш лимон, захарен сироп, сода', image: '/menu-images/cocktail_gin_fizz.png' },
            { id: 'cock-cardinal', name: 'Cardinal', price: 6, desc: 'Джин, синьо кюрасо, тоник, фреш лимон', image: '/menu-images/cocktail_cardinal.png' },
            { id: 'cock-green-dragon', name: 'Green Dragon', price: 6, desc: 'Джин, ликьор мента, фреш лимон, сода', image: '/menu-images/cocktail_green_dragon.png' },
            { id: 'cock-hurricane', name: 'Hurricane', price: 6, desc: 'Джин, бял ром, червен ром, амарето, сок ананас, сок портокал, гренадин', image: '/menu-images/cocktail_hurricane.png' },
            // ── Текила коктейли ──
            { id: 'cock-margarita', name: 'Margarita', price: 7, desc: 'Текила, Cointreau, фреш лимон', image: '/menu-images/cocktail_margarita.png' },
            { id: 'cock-tequila-sunrise', name: 'Tequila Sunrise', price: 6, desc: 'Текила, сок портокал, гренадин', image: '/menu-images/cocktail_tequila_sunrise.png' },
            // ── Уиски коктейли ──
            { id: 'cock-dublin-milkshake', name: 'Dublin Milkshake', price: 7, desc: 'Уиски, Bailey\'s, мляко, какао', image: '/menu-images/cocktail_dublin_milkshake.png' },
            { id: 'cock-black-jack', name: 'Black Jack', price: 9, desc: 'Jack Daniel\'s, Amaretto, Cointreau, Кока-Кола', image: '/menu-images/cocktail_black_jack.png' },
            { id: 'cock-aperol-spritz', name: 'Aperol Spritz', price: 6, desc: 'Aperol, просеко, сода', image: '/menu-images/cocktail_aperol_spritz.png' },
            // ── Безалкохолни коктейли ──
            { id: 'cock-na-mint-rosemary', name: 'Мента и Розмарин', price: 5, desc: 'Сироп мента, фреш лимон, минерална вода, розмарин', tags: ['Non-alc'], image: '/menu-images/cocktail_gin_fizz.png' },
            { id: 'cock-na-lavender', name: 'Лавандула и Касис', price: 5, desc: 'Лавандула, сок касис, фреш лимон, минерална вода', tags: ['Non-alc'], image: '/menu-images/cocktail_cosmopolitan.png' },
            { id: 'cock-na-orange-velvet', name: 'Orange Velvet', price: 5, desc: 'Сок портокал, сок ананас, сок ябълка, сметана', tags: ['Non-alc'], image: '/menu-images/cocktail_tequila_sunrise.png' },
            { id: 'cock-na-bloody-mary', name: 'Bloody Mary (безалк.)', price: 5, desc: 'Доматен сок, фреш лимон, селъри', tags: ['Non-alc'], image: '/menu-images/cocktail_bloody_mary.png' },
        ],
    },

    /* ═══════════════════════════════════════
       ВИНО & ШАМПАНСКО
       ═══════════════════════════════════════ */
    wine: {
        title: 'Вино',
        titleAccent: '& Шампанско',
        subtitle: 'Verano Azur, Moët & Prosecco',
        type: 'simple',
        items: [
            // ── Бяло вино ──
            { id: 'wine-white-180', name: 'Бяло вино — чаша 180 мл', price: 3, desc: 'Verano Azur', image: '/menu-images/wine-white-180.svg' },
            { id: 'wine-white-375', name: 'Бяло вино — 375 мл', price: 9, desc: 'Verano Azur', image: '/menu-images/wine-white-375.svg' },
            { id: 'wine-white-750', name: 'Бяло вино — 750 мл', price: 16, desc: 'Verano Azur', image: '/menu-images/wine-white-750.svg' },
            // ── Червено вино ──
            { id: 'wine-red-180', name: 'Червено вино — чаша 180 мл', price: 3, desc: 'Verano Azur', image: '/menu-images/wine-red-180.svg' },
            { id: 'wine-red-375', name: 'Червено вино — 375 мл', price: 9, desc: 'Verano Azur', image: '/menu-images/wine-red-375.svg' },
            { id: 'wine-red-750', name: 'Червено вино — 750 мл', price: 16, desc: 'Verano Azur', image: '/menu-images/wine-red-750.svg' },
            // ── Розе ──
            { id: 'wine-rose-180', name: 'Розе — чаша 180 мл', price: 3, desc: 'Verano Azur', image: '/menu-images/wine-rose-180.svg' },
            { id: 'wine-rose-375', name: 'Розе — 375 мл', price: 9, desc: 'Verano Azur', image: '/menu-images/wine-rose-375.svg' },
            { id: 'wine-rose-750', name: 'Розе — 750 мл', price: 16, desc: 'Verano Azur', image: '/menu-images/wine-rose-750.svg' },
            // ── Шампанско ──
            { id: 'wine-moet', name: 'Moët Chandon', price: 245, desc: 'Шампанско', tags: ['Premium'], image: '/menu-images/wine-moet.svg' },
            { id: 'wine-prosecco', name: 'Prosecco', price: 35, desc: 'Шампанско', image: '/menu-images/wine-prosecco.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       УИСКИ
       ═══════════════════════════════════════ */
    whiskey: {
        title: 'Уиски',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            // ── Уиски ──
            { id: 'wh-jw-red', name: 'Johnnie Walker Red Label', price: 5, desc: 'Уиски 50 мл', image: '/menu-images/spirit-jw-red.png' },
            { id: 'wh-jb', name: 'J&B', price: 5, desc: 'Уиски 50 мл', image: '/menu-images/wh-jb.svg' },
            { id: 'wh-bushmills', name: 'Bushmills', price: 5, desc: 'Уиски 50 мл', image: '/menu-images/wh-bushmills.svg' },
            { id: 'wh-jameson', name: 'Jameson', price: 5, desc: 'Уиски 50 мл', image: '/menu-images/spirit-jameson.png' },
            { id: 'wh-black-bush', name: 'Black Bush', price: 6, desc: 'Уиски 50 мл', image: '/menu-images/wh-black-bush.svg' },
            { id: 'wh-monkey-shoulder', name: 'Monkey Shoulder', price: 7, desc: 'Уиски 50 мл', image: '/menu-images/spirit-monkey-shoulder.png' },
            { id: 'wh-jack-daniels', name: 'Jack Daniel\'s', price: 7, desc: 'Уиски 50 мл', image: '/menu-images/spirit-jack-daniels.png' },
            // ── Отлежало уиски ──
            { id: 'wh-jw-black', name: 'Johnnie Walker Black Label', price: 8, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/spirit-jw-black.png' },
            { id: 'wh-jw-green', name: 'Johnnie Walker Green Label', price: 17, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/wh-jw-green.svg' },
            { id: 'wh-jw-gold', name: 'Johnnie Walker Gold Label', price: 17, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/wh-jw-gold.svg' },
            { id: 'wh-jw-blue', name: 'Johnnie Walker Blue Label', price: 75, desc: 'Отлежало уиски 50 мл', tags: ['Premium', 'Aged'], image: '/menu-images/spirit-jw-blue.jpg' },
            { id: 'wh-chivas-12', name: 'Chivas Regal 12 y.o.', price: 8, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/spirit-chivas-12.png' },
            { id: 'wh-royal-salut', name: 'Royal Salut', price: 40, desc: 'Отлежало уиски 50 мл', tags: ['Premium', 'Aged'], image: '/menu-images/spirit-royal-salut.jpg' },
            { id: 'wh-jd-barrel', name: 'Jack Daniel\'s Single Barrel', price: 15, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/wh-jd-barrel.svg' },
            { id: 'wh-glen-12', name: 'Glenfiddich 12 y.o.', price: 8, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/spirit-glenfiddich-12.png' },
            { id: 'wh-glen-15', name: 'Glenfiddich 15 y.o.', price: 15, desc: 'Отлежало уиски 50 мл', tags: ['Aged'], image: '/menu-images/wh-glen-15.svg' },
            { id: 'wh-glen-18', name: 'Glenfiddich 18 y.o.', price: 24, desc: 'Отлежало уиски 50 мл', tags: ['Premium', 'Aged'], image: '/menu-images/spirit-glenfiddich-18.jpg' },
        ],
    },

    /* ═══════════════════════════════════════
       БЪРБЪН
       ═══════════════════════════════════════ */
    bourbon: {
        title: 'Бърбън',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'wh-jim-beam', name: 'Jim Beam', price: 4, desc: 'Бърбън 50 мл', image: '/menu-images/spirit-jim-beam.png' },
            { id: 'wh-makers-mark', name: 'Maker\'s Mark', price: 5.5, desc: 'Бърбън 50 мл', image: '/menu-images/spirit-makers-mark.png' },
            { id: 'wh-four-roses', name: 'Four Roses', price: 4, desc: 'Бърбън 50 мл', image: '/menu-images/bourbon-four-roses.svg' },
            { id: 'wh-wild-turkey', name: 'Wild Turkey', price: 6, desc: 'Бърбън 50 мл', image: '/menu-images/bourbon-wild-turkey.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       ВОДКА
       ═══════════════════════════════════════ */
    vodka: {
        title: 'Водка',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-vodka-savoy', name: 'Savoy', price: 2, desc: 'Водка 50 мл', image: '/menu-images/vodka-savoy.svg' },
            { id: 'sp-vodka-zytnia', name: 'Zytnia', price: 2, desc: 'Водка 50 мл', image: '/menu-images/vodka-zytnia.svg' },
            { id: 'sp-vodka-smirnoff', name: 'Smirnoff', price: 4, desc: 'Водка 50 мл', image: '/menu-images/spirit-smirnoff.png' },
            { id: 'sp-vodka-absolut', name: 'Absolut', price: 4, desc: 'Водка 50 мл', image: '/menu-images/spirit-absolut.png' },
            { id: 'sp-vodka-finlandia', name: 'Finlandia', price: 4, desc: 'Водка 50 мл', image: '/menu-images/vodka-finlandia.svg' },
            { id: 'sp-vodka-beluga', name: 'Beluga', price: 9, desc: 'Водка 50 мл', tags: ['Premium'], image: '/menu-images/spirit-beluga.jpg' },
            { id: 'sp-vodka-grey-goose', name: 'Grey Goose', price: 9, desc: 'Водка 50 мл', tags: ['Premium'], image: '/menu-images/spirit-grey-goose.jpg' },
        ],
    },

    /* ═══════════════════════════════════════
       ДЖИН
       ═══════════════════════════════════════ */
    gin: {
        title: 'Джин',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-gin-savoy', name: 'Savoy', price: 2, desc: 'Джин 50 мл', image: '/menu-images/gin-savoy.svg' },
            { id: 'sp-gin-gordons', name: 'Gordon\'s', price: 4, desc: 'Джин 50 мл', image: '/menu-images/spirit-gordons-gin.png' },
            { id: 'sp-gin-beefeater', name: 'Beefeater', price: 4, desc: 'Джин 50 мл', image: '/menu-images/gin-beefeater.svg' },
            { id: 'sp-gin-bombay', name: 'Bombay Sapphire', price: 5.5, desc: 'Джин 50 мл', image: '/menu-images/spirit-bombay-sapphire.png' },
            { id: 'sp-gin-botanist', name: 'The Botanist', price: 10, desc: 'Джин 50 мл', tags: ['Premium'], image: '/menu-images/spirit-botanist.jpg' },
            { id: 'sp-gin-hendricks', name: 'Hendrick\'s', price: 9, desc: 'Джин 50 мл', tags: ['Premium'], image: '/menu-images/spirit-hendricks.jpg' },
        ],
    },

    /* ═══════════════════════════════════════
       РОМ
       ═══════════════════════════════════════ */
    rum: {
        title: 'Ром',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-rum-savoy', name: 'Savoy White/Red', price: 3, desc: 'Ром 50 мл', image: '/menu-images/rum-savoy.svg' },
            { id: 'sp-rum-captain', name: 'Captain Morgan', price: 5, desc: 'Ром 50 мл', image: '/menu-images/spirit-captain-morgan.png' },
            { id: 'sp-rum-captain-gold', name: 'Captain Morgan Gold', price: 5, desc: 'Ром 50 мл', image: '/menu-images/rum-captain-gold.svg' },
            { id: 'sp-rum-havana', name: 'Havana Club', price: 4, desc: 'Ром 50 мл', image: '/menu-images/spirit-havana-club.png' },
            { id: 'sp-rum-havana7', name: 'Havana Club 7 y.o.', price: 7, desc: 'Ром 50 мл', tags: ['Aged'], image: '/menu-images/rum-havana7.svg' },
            { id: 'sp-rum-malibu', name: 'Malibu', price: 4, desc: 'Ром 50 мл', image: '/menu-images/rum-malibu.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       ТЕКИЛА
       ═══════════════════════════════════════ */
    tequila: {
        title: 'Текила',
        titleAccent: '',
        subtitle: '30 мл',
        type: 'simple',
        items: [
            { id: 'sp-teq-savoy', name: 'Savoy', price: 1.5, desc: 'Текила 30 мл', image: '/menu-images/tequila-savoy.svg' },
            { id: 'sp-teq-cuervo-silver', name: 'Jose Cuervo Silver', price: 2.5, desc: 'Текила 30 мл', image: '/menu-images/tequila-cuervo-silver.svg' },
            { id: 'sp-teq-cuervo-repo', name: 'Jose Cuervo Reposado', price: 2.5, desc: 'Текила 30 мл', image: '/menu-images/tequila-cuervo-repo.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       РАКИЯ
       ═══════════════════════════════════════ */
    rakiya: {
        title: 'Ракия',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-rak-pomorie-grape', name: 'Поморийска гроздова', price: 2, desc: 'Ракия 50 мл', image: '/menu-images/rakiya-pomorie-grape.svg' },
            { id: 'sp-rak-pomorie-muscat', name: 'Поморийска мускатова', price: 3, desc: 'Ракия 50 мл', image: '/menu-images/rakiya-pomorie-muscat.svg' },
            { id: 'sp-rak-burgas63', name: 'Бургас 63', price: 4, desc: 'Ракия 50 мл', image: '/menu-images/rakiya-burgas63.svg' },
            { id: 'sp-rak-sungurlare', name: 'Сунгурларска гроздова', price: 3, desc: 'Ракия 50 мл', image: '/menu-images/rakiya-sungurlare.svg' },
            { id: 'sp-rak-sliven', name: 'Сливенска перла', price: 5, desc: 'Ракия 50 мл', image: '/menu-images/rakiya-sliven.svg' },
            { id: 'sp-rak-troyan', name: 'Троянска сливова', price: 4, desc: 'Ракия 50 мл', image: '/menu-images/rakiya-troyan.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       БРЕНДИ
       ═══════════════════════════════════════ */
    brandy: {
        title: 'Бренди',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-brandy-karnobat', name: 'Karnobat', price: 2, desc: 'Бренди 50 мл', image: '/menu-images/brandy-karnobat.svg' },
            { id: 'sp-brandy-metaxa', name: 'Metaxa', price: 4, desc: 'Бренди 50 мл', image: '/menu-images/brandy-metaxa.svg' },
            { id: 'sp-brandy-courvoisier', name: 'Courvoisier', price: 7, desc: 'Бренди 50 мл', tags: ['Premium'], image: '/menu-images/brandy-courvoisier.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       ЛИКЬОРИ
       ═══════════════════════════════════════ */
    liqueurs: {
        title: 'Ликьори',
        titleAccent: '',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-liq-baileys', name: 'Bailey\'s', price: 5, desc: 'Ликьор 50 мл', image: '/menu-images/spirit-baileys.png' },
            { id: 'sp-liq-aftershock', name: 'After Shock', price: 5, desc: 'Ликьор 50/30 мл — 5/3 €', volume: '50/30 мл', image: '/menu-images/liqueur-aftershock.svg' },
            { id: 'sp-liq-pitu', name: 'Pitu', price: 5, desc: 'Ликьор 50 мл', image: '/menu-images/liqueur-pitu.svg' },
            { id: 'sp-liq-kahlua', name: 'Kahlúa', price: 5, desc: 'Ликьор 50 мл (цената не е посочена в менюто)', tags: ['Цена ориентировъчна'], image: '/menu-images/liqueur-kahlua.svg' },
            { id: 'sp-liq-galliano', name: 'Galliano', price: 5, desc: 'Ликьор 50/30 мл — 5/3 € (цената не е посочена в менюто)', volume: '50/30 мл', tags: ['Цена ориентировъчна'], image: '/menu-images/liqueur-galliano.svg' },
            { id: 'sp-liq-cointreau', name: 'Cointreau', price: 5, desc: 'Ликьор 50 мл', image: '/menu-images/liqueur-cointreau.svg' },
            { id: 'sp-liq-disaronno', name: 'Disaronno', price: 5, desc: 'Ликьор 50 мл', image: '/menu-images/liqueur-disaronno.svg' },
            { id: 'sp-liq-skinos', name: 'Skinos', price: 5, desc: 'Ликьор 50/30 мл — 5/3 €', volume: '50/30 мл', image: '/menu-images/liqueur-skinos.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       ДИЖЕСТИВИ & АПЕРИТИВИ
       ═══════════════════════════════════════ */
    digestifs: {
        title: 'Дижестиви',
        titleAccent: '& Аперитиви',
        subtitle: '50 мл',
        type: 'simple',
        items: [
            { id: 'sp-dig-ouzo-plomari', name: 'Ouzo Plomari', price: 3, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-ouzo-plomari.svg' },
            { id: 'sp-dig-ouzo-12', name: 'Ouzo 12', price: 3, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-ouzo-12.svg' },
            { id: 'sp-dig-absinthe', name: 'Absinthe', price: 5, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-absinthe.svg' },
            { id: 'sp-dig-mastika', name: 'Мастика Карнобат', price: 2, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-mastika.svg' },
            { id: 'sp-dig-mint-karnobat', name: 'Мента Карнобат', price: 2, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-mint-karnobat.svg' },
            { id: 'sp-dig-pernod', name: 'Pernod', price: 4, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-pernod.svg' },
            { id: 'sp-dig-ricard', name: 'Ricard', price: 4, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-ricard.svg' },
            { id: 'sp-dig-jagermeister', name: 'Jägermeister', price: 4, desc: 'Дижестив 50/30 мл — 4/2 €', volume: '50/30 мл', image: '/menu-images/spirit-jagermeister.png' },
            { id: 'sp-dig-aperol', name: 'Aperol', price: 4, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-aperol.svg' },
            { id: 'sp-dig-campari', name: 'Campari', price: 4, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-campari.svg' },
            { id: 'sp-dig-martini', name: 'Martini', price: 4, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-martini.svg' },
            { id: 'sp-dig-sambuca', name: 'Sambuca', price: 4, desc: 'Дижестив 50/30 мл — 4/2 € (цената не е посочена в менюто)', volume: '50/30 мл', tags: ['Цена ориентировъчна'], image: '/menu-images/digestif-sambuca.svg' },
            { id: 'sp-dig-fernet', name: 'Fernet-Branca', price: 4, desc: 'Дижестив 50/30 мл — 4/2 €', volume: '50/30 мл', image: '/menu-images/digestif-fernet.svg' },
            { id: 'sp-dig-branca-menta', name: 'Branca Menta', price: 4, desc: 'Дижестив 50/30 мл — 4/2 €', volume: '50/30 мл', image: '/menu-images/digestif-branca-menta.svg' },
            { id: 'sp-dig-marie-brizard', name: 'Marie Brizard Mint', price: 4, desc: 'Дижестив 50 мл', image: '/menu-images/digestif-marie-brizard.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       БИРА
       ═══════════════════════════════════════ */
    beer: {
        title: 'Бира',
        titleAccent: 'Наливна & Бутилка',
        subtitle: 'Draft 400 мл, бутилка 330 мл',
        type: 'simple',
        items: [
            // ── Наливна 400 мл ──
            { id: 'beer-bohem', name: 'Bohem', price: 3.5, desc: 'Наливна 400 мл', image: '/menu-images/beer-bohem.svg' },
            { id: 'beer-radeberger-draft', name: 'Radeberger', price: 4, desc: 'Наливна 400 мл', image: '/menu-images/beer-radeberger.svg' },
            // ── Бутилка 330 мл ──
            { id: 'beer-estrella', name: 'Estrella Damm', price: 4, desc: 'Бутилка 330 мл', image: '/menu-images/beer-estrella.svg' },
            { id: 'beer-radeberger-bottle', name: 'Radeberger Pilsner', price: 4, desc: 'Бутилка 330 мл', image: '/menu-images/beer-radeberger-bottle.svg' },
            { id: 'beer-bernard', name: 'Bernard Blond', price: 4.5, desc: 'Бутилка 330 мл', image: '/menu-images/beer-bernard.svg' },
            { id: 'beer-clausthaler', name: 'Clausthaler Alc. 0.0%', price: 4, desc: 'Безалкохолна, бутилка 330 мл', tags: ['Non-alc'], image: '/menu-images/beer-clausthaler.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       ХРАНА
       ═══════════════════════════════════════ */
    food: {
        title: 'Храна',
        titleAccent: '& Мезета',
        subtitle: 'Барски хапки и плата',
        type: 'simple',
        items: [
            { id: 'food-chicken-nuggets', name: 'Пилешки хапки с пармезан и сос Айоли', price: 6, desc: '300 г', image: '/menu-images/food-chicken-nuggets.jpg' },
            { id: 'food-chicken-wings', name: 'Пилешки крилца сос BBQ & ранч', price: 5, desc: '400 г', image: '/menu-images/food-chicken-wings.jpg' },
            { id: 'food-fries', name: 'Пържени картофки', price: 3.5, desc: '250 г', image: '/menu-images/food-fries.jpg' },
            { id: 'food-fries-cheese', name: 'Пържени картофки + сирене', price: 4, desc: '300 г', image: '/menu-images/food-fries-cheese.jpg' },
            { id: 'food-sausages', name: 'Наденички с медена горчица и картофки', price: 8, desc: '450 г', image: '/menu-images/food-sausages.jpg' },
            { id: 'food-princess', name: 'Принцеса с кайма', price: 4, desc: '250 г', image: '/menu-images/food-princess.jpg' },
            { id: 'food-vegan-nuggets', name: 'Веган карфиолени хапки Льолев', price: 4, desc: '300 г', image: '/menu-images/food-vegan-cauliflower.jpg' },
            { id: 'food-fruit-plate', name: 'Плодове сезонни за двама', price: 10, desc: '500 г (цената не е посочена в менюто)', tags: ['Цена ориентировъчна'], image: '/menu-images/food-fruit-platter.jpg' },
            { id: 'food-meat-platter', name: 'Плато сухи мезета', price: 10, desc: '200 г', image: '/menu-images/food-meat-platter.jpg' },
            { id: 'food-cheese-platter', name: 'Плато сирене и кашкавал', price: 10, desc: '200 г', image: '/menu-images/food-cheese-platter.jpg' },
            { id: 'food-mixed-platter', name: 'Плато микс', price: 18, desc: '400 г', tags: ['За двама'], image: '/menu-images/food-mixed-platter.jpg' },
        ],
    },

    /* ═══════════════════════════════════════
       БЕЗАЛКОХОЛНИ & ГОРЕЩИ
       ═══════════════════════════════════════ */
    soft: {
        title: 'Безалкохолни',
        titleAccent: '& Горещи',
        subtitle: 'Напитки, кафе, чай, екстри',
        type: 'simple',
        items: [
            // ── Безалкохолни ──
            { id: 'soft-water-small', name: 'Минерална вода 450 мл', price: 1, desc: '', image: '/menu-images/soft-water.svg' },
            { id: 'soft-water-large', name: 'Минерална вода 850 мл', price: 2, desc: '', image: '/menu-images/soft-water.svg' },
            { id: 'soft-soda', name: 'Газирана вода', price: 2, desc: '', image: '/menu-images/soft-soda.svg' },
            { id: 'soft-coca-cola', name: 'Coca-Cola продукти 330 мл', price: 2.5, desc: 'Кока-Кола, Фанта, Спрайт', image: '/menu-images/soft-coca-cola.svg' },
            { id: 'soft-red-bull', name: 'Red Bull', price: 4, desc: '', image: '/menu-images/soft-red-bull.svg' },
            { id: 'soft-juice', name: 'Натурални сокове', price: 2.5, desc: '', image: '/menu-images/soft-juice.svg' },
            { id: 'soft-perrier', name: 'Perrier 330 мл', price: 3.5, desc: '', image: '/menu-images/soft-perrier.svg' },
            { id: 'soft-ice-tea', name: 'Студен чай', price: 2.5, desc: '', image: '/menu-images/soft-ice-tea.svg' },
            // ── Горещи напитки ──
            { id: 'hot-tea', name: 'Чай Twinings', price: 3, desc: 'Различни вкусове', image: '/menu-images/soft-tea.svg' },
            { id: 'hot-espresso', name: 'Еспресо', price: 2.5, desc: '', image: '/menu-images/soft-espresso.svg' },
            { id: 'hot-cappuccino', name: 'Капучино', price: 3.5, desc: '', image: '/menu-images/soft-cappuccino.svg' },
            { id: 'hot-latte', name: 'Лате', price: 3.5, desc: '', image: '/menu-images/soft-latte.svg' },
            // ── Екстри ──
            { id: 'extra-nuts', name: 'Ядки 80 г', price: 5, desc: '', image: '/menu-images/soft-nuts.svg' },
            { id: 'extra-carrots', name: 'Чаша моркови', price: 4, desc: '', image: '/menu-images/soft-carrots.svg' },
            { id: 'extra-olives', name: 'Маслини', price: 4, desc: '', image: '/menu-images/soft-olives.svg' },
            { id: 'extra-chocolate', name: 'Шоколад', price: 5, desc: '', image: '/menu-images/soft-chocolate.svg' },
        ],
    },

    /* ═══════════════════════════════════════
       ШОТОВЕ
       ═══════════════════════════════════════ */
    shots: {
        title: 'Шотове',
        titleAccent: '',
        subtitle: '30 мл',
        type: 'simple',
        items: [
            { id: 'shot-tequila', name: 'Текила', price: 1.5, desc: '30 мл', image: '/menu-images/shot-tequila.svg' },
            { id: 'shot-bloody-mary', name: 'Bloody Mary (6 бр.)', price: 7, desc: '6 x 30 мл', image: '/menu-images/shot-bloody-mary.svg' },
            { id: 'shot-jagermeister', name: 'Jägermeister', price: 2, desc: '30 мл', image: '/menu-images/shot-jagermeister.svg' },
            { id: 'shot-arabic', name: 'Арабска Свирка', price: 2.5, desc: '30 мл', image: '/menu-images/shot-arabic.svg' },
        ],
    },
}

// ─── CATEGORIES METADATA ───────────────────────

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
    cocktails: 'Коктейли',
    whiskey: 'Уиски',
    bourbon: 'Бърбън',
    vodka: 'Водка',
    gin: 'Джин',
    rum: 'Ром',
    tequila: 'Текила',
    rakiya: 'Ракия',
    brandy: 'Бренди',
    liqueurs: 'Ликьори',
    digestifs: 'Дижестиви',
    wine: 'Вино',
    beer: 'Бира',
    food: 'Храна',
    soft: 'Безалк.',
    shots: 'Шотове',
}

export const CATEGORY_ICONS: Record<CategoryKey, string> = {
    cocktails: 'nightlife',
    whiskey: 'liquor',
    bourbon: 'liquor',
    vodka: 'local_bar',
    gin: 'local_bar',
    rum: 'local_bar',
    tequila: 'local_bar',
    rakiya: 'local_bar',
    brandy: 'liquor',
    liqueurs: 'local_drink',
    digestifs: 'local_drink',
    wine: 'wine_bar',
    beer: 'sports_bar',
    food: 'restaurant',
    soft: 'coffee',
    shots: 'science',
}
