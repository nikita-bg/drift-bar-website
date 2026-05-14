import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../article.module.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'
const PAGE_PATH = '/blog/rok-barove-plovdiv'
const PUBLISHED = '2026-05-14'
const UPDATED = '2026-05-14'

export const metadata: Metadata = {
    title: 'Рок барове в Пловдив — пълно ръководство 2026 | Drift Bar',
    description: 'Кои са рок баровете в Пловдив, какво ги отличава и какво да очаквате на концерт. Drift Bar, Бронзов мост и други активни места.',
    keywords: 'рок барове пловдив, рок бар пловдив, рок музика пловдив, концерти рок пловдив, drift bar rock, метъл пловдив',
    alternates: { canonical: `${baseUrl}${PAGE_PATH}` },
    openGraph: {
        title: 'Рок барове в Пловдив — пълно ръководство',
        description: 'Кои са активните рок барове в Пловдив, какво ги отличава и кога да отидете.',
        type: 'article',
        url: `${baseUrl}${PAGE_PATH}`,
        locale: 'bg_BG',
    },
}

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Рок барове в Пловдив — пълно ръководство',
    description: 'Ръководство за рок баровете в Пловдив — активни места, какво да очаквате, кога да отидете.',
    author: { '@type': 'Organization', name: 'Drift Bar Plovdiv', url: baseUrl },
    publisher: {
        '@type': 'Organization',
        name: 'Drift Bar Plovdiv',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.webp` },
    },
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}${PAGE_PATH}` },
    inLanguage: 'bg-BG',
    about: ['Рок музика', 'Пловдив', 'Рок барове', 'Концерти'],
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Кой е най-добрият рок бар в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Drift Bar Plovdiv (ул. Сливница 2а, Кършияка Северен) е сред водещите рок дестинации в града — пълноценна сцена, професионално озвучаване, редовни концерти на групи като ЕЛИТ, Sharp Dressed Men, DeeStoned и Coven 5.',
            },
        },
        {
            '@type': 'Question',
            name: 'Има ли метъл концерти в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да — макар сцената да е тясна. Групи като Coven 5 и периодични гост-турнета поддържат хеви рок и метъл живи. По-екстремните поджанрове обикновено се групират в специални вечери.',
            },
        },
        {
            '@type': 'Question',
            name: 'Колко струва вход за рок концерт в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Локални групи в малки барове — 5–10 EUR. По-известни имена и легенди на сцената — 10–15 EUR. DJ рок вечери — около 5 EUR.',
            },
        },
        {
            '@type': 'Question',
            name: 'Кога свирят рок групите в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Петък и събота — основните рок вечери. В Drift Bar концертите започват в 21:00 (врата от 20:00). DJ музика след шоуто до 04:00 в петък и събота.',
            },
        },
        {
            '@type': 'Question',
            name: 'Как се резервира маса за рок концерт?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Онлайн чрез страницата за резервации на Drift Bar или на +359 98 879 3684. За известни групи резервирайте поне 3–5 дни предварително.',
            },
        },
    ],
}

export default function RokBarovePlovdivPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className={styles.page}>
                <header className={styles.header}>
                    <Link href="/blog" className={styles.backLink}>
                        <span className="material-symbols-outlined">arrow_back</span>
                        Блог
                    </Link>
                    <Link href="/" className={styles.logo}>DRIFT BAR</Link>
                    <Link href="/events" className={styles.eventsLink}>
                        <span className="material-symbols-outlined">event</span>
                        Събития
                    </Link>
                </header>

                <article className={styles.article}>
                    <nav className={styles.breadcrumb} aria-label="breadcrumb">
                        <Link href="/">Начало</Link> / <Link href="/blog">Блог</Link> / Рок барове в Пловдив
                    </nav>

                    <h1 className={styles.title}>Рок барове в Пловдив — пълно ръководство</h1>

                    <p className={styles.lede}>
                        Рок сцената в Пловдив никога не е била огромна, но винаги е била жива. Това е ръководство за тези, които искат да чуят китари на живо — от блус рок до по-тежки поджанрове. Кои са активните барове, какво ги отличава и какво да очаквате.
                    </p>

                    <div className={styles.meta}>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>schedule</span> 5 мин четене</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>calendar_today</span> 14 май 2026</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>music_note</span> Рок</span>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Какво прави един рок бар</h2>
                        <p className={styles.p}>
                            Рок барът не е просто заведение, в което пускат Pink Floyd на тонколоните. Истинският рок бар има три неща: място за сцена с истинско озвучаване, публика, която идва заради музиката, и програма, на която можете да разчитате. Бар, който в понеделник пуска чалга, а в петък слага китара на сцената, не е рок бар — просто е бар, който понякога има рок концерт.
                        </p>
                        <p className={styles.p}>
                            В Пловдив има няколко места, които отговарят на тези изисквания в различна степен. По-долу разглеждаме всяко от тях честно — без да правим вид, че всички са еднакво добри.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Рок сцената в Пловдив — кратък контекст</h2>
                        <p className={styles.p}>
                            Пловдивският рок има корени в края на 80-те и началото на 90-те. Групи като ЕЛИТ (албуми "Forgotten Faces" 1995 и "Объркан свят" 1998) тръгват от тук, обикалят страната, подгряват Назарет и Греъм Бонет, участват на Metal Fest в Милуоки. Това не е минало — Огнян Цолов, Атанас Андреев, Петър Каръпски и Иво Иванчев все още качват сцената.
                        </p>
                        <p className={styles.p}>
                            Около тази традиция израства съвременното поколение — Sharp Dressed Men с репертоар от ZZ Top, Lenny Kravitz, Scorpions, Joe Cocker и Alice Cooper; DeeStoned с по-блусарски звук; Coven 5 с по-агресивен подход; Tsunami Rock Band BG с мощно живо изпълнение. Списъкът не е дълъг, но има дълбочина.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Активни рок места в Пловдив</h2>
                        <p className={styles.p}>
                            Реалистично — местата, в които можете да очаквате рок концерт всяка седмица, не са много. Ето как изглежда картата:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                <strong>Drift Bar Plovdiv</strong> — ул. Сливница 2а, Кършияка Северен. Бившият пиано-бар ЕКСЕЛ, отворил като рок и джаз сцена на 1 март 2026 г. Капацитет 99 места, 20 маси. Концерти петък/събота, по-камерни вечери в четвъртък. Sharp Dressed Men, ЕЛИТ, DeeStoned, Coven 5 — всички свирят тук.
                            </li>
                            <li className={styles.li}>
                                <strong>Бронзов мост</strong> — в Капана. Кавъри и местни рок групи. Атмосфера на стария град. Програмата е по-разпокъсана, но има концерти.
                            </li>
                            <li className={styles.li}>
                                <strong>По-малки барове в Каменица</strong> — сезонно. Пролетта и лятото оживяват с акустични рок сесии и периодични концерти. Зимата — по-тихо.
                            </li>
                        </ul>
                        <p className={styles.p}>
                            За по-големи турнета — Дом на културата "Борис Христов" и Античният театър (лятото). Това вече не са барове, а класически концертни зали.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Drift Bar като рок дестинация</h2>
                        <p className={styles.p}>
                            Drift Bar е новото на сцената, но концепцията е тясно фокусирана: сцена от музиканти за музиканти, с професионално озвучаване и редовна програма. Това не е универсален бар, който в петък реши да направи концерт — това е заведение, изградено около живата музика.
                        </p>
                        <p className={styles.p}>
                            Сцената е компактна, акустиката — пригодена за рок и блус. Публиката е разположена близо до изпълнителите — 20 маси и 99 места означават, че от всяко място чувате и виждате добре. Капацитетът е достатъчно интимен, че китаристите наистина да забележат, когато публиката пее с тях.
                        </p>
                        <p className={styles.p}>
                            Програмата за май 2026 включва ЕЛИТ (15 май, петък), Coven 5 (16 май, събота), DeeStoned (9 май), Sharp Dressed Men (1 май). За пълния календар — <Link href="/events">страницата за събития</Link>.
                        </p>

                        <div className={styles.callout}>
                            <p>Drift Bar не е тематичен бар с плакати на Iron Maiden по стените и сервитьорки с потници. Това е заведение за хора, които искат да чуят живи китари в добра обстановка — без декорация, без поза.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Какво да очаквате на рок концерт</h2>
                        <p className={styles.p}>
                            Стандартната рок вечер в Drift Bar изглежда така: врата 20:00, начало в 21:00. Първи сет около 45 минути, пауза 15 минути, втори сет още 45–60 минути. След концерта — DJ музика до 04:00 в петък/събота, до 02:00 в четвъртък.
                        </p>
                        <p className={styles.p}>
                            Звукът е силен, но не агресивно силен — акустиката е настроена така, че да чувате солото на китарата, но и приятеля до вас, когато ви каже нещо. Това е важно — лошият миксаж може да съсипе и най-добрия концерт.
                        </p>
                        <p className={styles.p}>
                            Цените за вход обикновено са 5–10 EUR в зависимост от групата. По-известните имена като ЕЛИТ — към горната граница. Напитки — стандартни пловдивски цени, без концертна надценка.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Кога да отидете</h2>
                        <p className={styles.p}>
                            Петък и събота са основните рок вечери в Пловдив. В Drift Bar четвъртъкът също е активен — често с блус или джаз/рок програма. Понеделник до сряда повечето места са затворени.
                        </p>
                        <p className={styles.p}>
                            Идете към 20:30, ако искате добра маса и спокойно първо питие преди концерта. Ако дойдете в 21:00, шоуто ще започне, но добрите места ще са взети.
                        </p>
                        <p className={styles.p}>
                            За известни имена — резервирайте предварително. ЕЛИТ, Sharp Dressed Men и DeeStoned привличат пълни зали и масите свършват дни преди шоуто.
                        </p>

                        <div className={styles.cta}>
                            <p className={styles.ctaText}>За маса на следващия рок концерт — резервирайте онлайн или по телефон.</p>
                            <Link href="/reservations" className={styles.ctaPrimary}>Резервация</Link>
                            <a href="tel:+359988793684" className={styles.ctaSecondary}>+359 98 879 3684</a>
                        </div>
                    </section>

                    <section className={styles.faq}>
                        <h2 className={styles.h2}>Често задавани въпроси</h2>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Кой е най-добрият рок бар в Пловдив?</h3>
                            <p className={styles.faqA}>Drift Bar Plovdiv има най-фокусираната рок програма в момента — пълноценна сцена, редовни концерти, добра акустика. Бронзов мост в Капана е алтернатива за по-туристически профил.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли метъл сцена в Пловдив?</h3>
                            <p className={styles.faqA}>Да, но тясна. Coven 5 и периодични гост-групи поддържат хеви рок и метъл. Не очаквайте всяка седмица концерт — обикновено програмираните метъл вечери са на месечен принцип.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Колко струва вход?</h3>
                            <p className={styles.faqA}>5–10 EUR за повечето местни групи. До 15 EUR за легенди на сцената и гост-турнета.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли паркинг?</h3>
                            <p className={styles.faqA}>Drift Bar е до публичния паркинг на Новотел Пловдив и улично паркиране по Сливница. В Капана паркингът е по-сложен — препоръчително такси.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Резервация задължителна ли е?</h3>
                            <p className={styles.faqA}>За концерти на известни групи — да. За обикновени вечери — препоръчително, особено след 21:00.</p>
                        </div>
                    </section>

                    <footer className={styles.footer}>
                        <p>Последно обновено: 14 май 2026 г.</p>
                        <p>Автор: Drift Bar Plovdiv · <Link href="/">driftbarplovdiv.com</Link> · Телефон: <a href="tel:+359988793684">+359 98 879 3684</a></p>
                        <div className={styles.relatedLinks}>
                            <Link href="/blog/jiva-muzika-plovdiv" className={styles.relatedLink}>Жива музика в Пловдив</Link>
                            <Link href="/blog/jaz-barove-plovdiv" className={styles.relatedLink}>Джаз барове в Пловдив</Link>
                            <Link href="/events" className={styles.relatedLink}>Предстоящи концерти</Link>
                            <Link href="/reservations" className={styles.relatedLink}>Резервация на маса</Link>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    )
}
