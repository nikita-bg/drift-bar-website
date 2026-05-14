import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../article.module.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'
const PAGE_PATH = '/blog/barove-bliso-do-novotel-plovdiv'
const PUBLISHED = '2026-05-14'
const UPDATED = '2026-05-14'

export const metadata: Metadata = {
    title: 'Барове близо до Новотел Пловдив — пешеходно достижими | Drift Bar',
    description: 'Кои барове в Пловдив са в пешеходно разстояние от Новотел — карта, разходка покрай реката, какво си заслужава да посетите.',
    keywords: 'барове новотел пловдив, barove near novotel plovdiv, бар близо до novotel, drift bar новотел, пешеходен мост пловдив',
    alternates: { canonical: `${baseUrl}${PAGE_PATH}` },
    openGraph: {
        title: 'Барове близо до Новотел Пловдив — пешеходно достижими',
        description: 'Кои заведения са в 10-минутна разходка от Новотел Пловдив. Полезно за гости и туристи.',
        type: 'article',
        url: `${baseUrl}${PAGE_PATH}`,
        locale: 'bg_BG',
    },
}

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Барове близо до Новотел Пловдив — пешеходно достижими',
    description: 'Ръководство за барове в пешеходно разстояние от Новотел Пловдив — за гости и туристи.',
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
    about: ['Novotel Plovdiv', 'Барове', 'Пешеходен мост', 'Туристи', 'Пловдив'],
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Кой е най-близкият бар до Новотел Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Drift Bar Plovdiv (ул. Сливница 2а) е на около 2–3 минути пеша от Новотел — най-близката музикална сцена с редовни концерти. Други заведения изискват 5–10 минути разходка.',
            },
        },
        {
            '@type': 'Question',
            name: 'Колко минути пеша е от Новотел до историческия център?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Около 7–10 минути през пешеходния мост и по Княз Александър Първи. Хубава вечерна разходка покрай реката.',
            },
        },
        {
            '@type': 'Question',
            name: 'Безопасна ли е разходката вечер?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да — пешеходният мост и крайбрежната алея са осветени, обикновено има минувачи. Стандартни предпазни мерки като в всеки голям град.',
            },
        },
        {
            '@type': 'Question',
            name: 'Има ли барове с английскоговорящ персонал?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'В повечето заведения близо до Новотел персоналът говори английски на базово ниво, особено в местата, които са свикнали с туристи. Drift Bar — английски се говори.',
            },
        },
        {
            '@type': 'Question',
            name: 'Кога е най-добре да отидете?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'За жива музика — четвъртък до събота вечер (концертите в Drift Bar започват в 21:00). За лежерна вечеря с напитка — всеки ден от седмицата.',
            },
        },
    ],
}

export default function BaroveBlisoDoNovotelPage() {
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
                        <Link href="/">Начало</Link> / <Link href="/blog">Блог</Link> / Барове близо до Новотел Пловдив
                    </nav>

                    <h1 className={styles.title}>Барове близо до Новотел Пловдив — пешеходно достижими</h1>

                    <p className={styles.lede}>
                        Новотел Пловдив е разположен на северния бряг на река Марица, в Кършияка Северен — близо до историческия център, но достатъчно встрани, че да си запази тиха обстановка. За гости на хотела, които искат да излязат за бира, коктейл или жива музика без да хващат такси, има няколко добри опции в радиус от 10 минути пеша.
                    </p>

                    <div className={styles.meta}>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>schedule</span> 5 мин четене</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>calendar_today</span> 14 май 2026</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>directions_walk</span> 10-min walk</span>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Картата накратко</h2>
                        <p className={styles.p}>
                            Новотел Пловдив е на улицата, която върви успоредно на реката, в подножието на пешеходния мост. От хотела има три основни посоки за вечерна разходка:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>На север по Сливница</strong> — към Drift Bar и местните кафе-барове в Кършияка.</li>
                            <li className={styles.li}><strong>Юг през пешеходния мост</strong> — към Главната и Капана, центъра на нощния живот.</li>
                            <li className={styles.li}><strong>Изток-запад по крайбрежната алея</strong> — сезонни тераси по брега на Марица.</li>
                        </ul>
                        <p className={styles.p}>
                            Всички тези посоки са пешеходни в рамките на 10 минути. Маршрутите са осветени и удобни.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Drift Bar — на пешеходно разстояние от Новотел</h2>
                        <p className={styles.p}>
                            <strong>Drift Bar Plovdiv</strong> на ул. Сливница 2а е най-близката музикална сцена до Новотел — около 2–3 минути пеша на север от хотела. Бившият пиано-бар ЕКСЕЛ, отворен наново на 1 март 2026 г. като рок и джаз сцена.
                        </p>
                        <p className={styles.p}>
                            Програмата включва редовни концерти — рок, джаз, блус, авторска музика. Артисти като ЕЛИТ, Sharp Dressed Men, DeeStoned, Angel Demirev Jazz Trio, Дина Йорк & The Yorkers. Работно време: четвъртък 20:00–02:00, петък и събота 20:00–04:00, неделя 18:00–02:00. Понеделник до сряда — почивни дни.
                        </p>
                        <p className={styles.p}>
                            За гости на Новотел това е най-удобният избор за вечер с жива музика — без транспорт, без планиране на връщане. Капацитет 99 места, 20 маси. Резервации препоръчителни за концертни вечери. <Link href="/events">Виж програмата</Link>.
                        </p>

                        <div className={styles.callout}>
                            <p>За гости на Новотел — 2-3 минути пеша до Drift Bar. Едно от малкото места в Пловдив, в които ще чуете жива музика без да напускате района на хотела.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Разходката покрай реката</h2>
                        <p className={styles.p}>
                            От Новотел южната посока е красива вечерна разходка. Излизате от хотела, пресичате към крайбрежната алея и тръгвате на изток или запад. Реката е тиха, мостовете са осветени, въздухът — по-чист от градския център.
                        </p>
                        <p className={styles.p}>
                            През топлите месеци (април–октомври) има сезонни заведения и тераси по брега. Тук не очаквайте жива музика — това са лежерни места за коктейл, чаша вино, разговор. Идеално преди или след вечеря.
                        </p>
                        <p className={styles.p}>
                            След като прекосите пешеходния мост, попадате на южния бряг — там започва историческият Пловдив. Главната улица е на още 3 минути пеша.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Пешеходният мост — портал към центъра</h2>
                        <p className={styles.p}>
                            Пешеходният мост над Марица е една от практически най-полезните инфраструктури на Пловдив. От Новотел сте на минута от северния му край. След като преминете моста (около 3 минути), вече сте на южния бряг — началото на Княз Александър Първи (Главната) и пътя към Капана.
                        </p>
                        <p className={styles.p}>
                            Това означава, че за 7–10 минути пеша от хотела имате достъп до целия централен нощен живот на Пловдив. Без такси, без чакане. Тази свобода е една от причините Новотел да е добра база за гости, които искат да открият града.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Какво има от другата страна</h2>
                        <p className={styles.p}>
                            Кратко за това какво ви очаква, ако пресечете моста:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>Главната (Княз Александър Първи)</strong> — пешеходната главна улица. Кафенета, ресторанти, тълпи особено в петък/събота вечер.</li>
                            <li className={styles.li}><strong>Капана</strong> — творческият квартал. Малки барове, галерии, занаятчийски магазини. Туристически център, но с истинска енергия.</li>
                            <li className={styles.li}><strong>Старият град</strong> — културно-историческият район. Античният театър, Етнографският музей. По-малко барове, повече гледки.</li>
                            <li className={styles.li}><strong>Каменица</strong> — източната част на центъра. Местни заведения, по-малко туристи.</li>
                        </ul>
                        <p className={styles.p}>
                            Ако сте дошли за един уикенд в Пловдив — съчетавайте. Една вечер концерт в Drift Bar в Кършияка, друга вечер разходка през моста към Капана. Това е градът в неговите два варианта.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Полезни съвети за гости на Новотел</h2>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>За жива музика</strong> — Drift Bar (ул. Сливница 2а), на 2–3 минути пеша. Резервирайте поне ден предварително.</li>
                            <li className={styles.li}><strong>За турист-приятелски кафе</strong> — крайбрежната алея през топлите месеци.</li>
                            <li className={styles.li}><strong>За централен нощен живот</strong> — преминете моста и тръгнете към Капана.</li>
                            <li className={styles.li}><strong>За такси на връщане</strong> — Bolt и Yellow Taxi работят добре. Около 3–5 EUR в рамките на центъра.</li>
                            <li className={styles.li}><strong>За плащане</strong> — кредитни карти се приемат в повечето места, но имайте малко в брой за по-малките заведения.</li>
                        </ul>

                        <div className={styles.cta}>
                            <p className={styles.ctaText}>За резервация в Drift Bar — на крачки от Новотел Пловдив.</p>
                            <Link href="/reservations" className={styles.ctaPrimary}>Резервация онлайн</Link>
                            <a href="tel:+359988793684" className={styles.ctaSecondary}>+359 98 879 3684</a>
                        </div>
                    </section>

                    <section className={styles.faq}>
                        <h2 className={styles.h2}>Често задавани въпроси</h2>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Колко близо е Drift Bar до Новотел?</h3>
                            <p className={styles.faqA}>Около 2–3 минути пеша. И двете заведения са на ул. Сливница в Кършияка Северен.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли заведения, които работят късно?</h3>
                            <p className={styles.faqA}>Drift Bar — петък и събота до 04:00. Заведенията в Капана — повечето до 02:00–03:00. Хотелските барове и тераси затварят по-рано.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли английско меню?</h3>
                            <p className={styles.faqA}>В по-голямата част от заведенията близо до Новотел — да, или поне снимки и базови преводи. <Link href="/menu">Менюто на Drift Bar</Link>.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Какви са цените?</h3>
                            <p className={styles.faqA}>Бира — 3–5 EUR, коктейли 6–10 EUR, вход за концерт в Drift Bar 5–10 EUR. По-евтино от София, по-скъпо от провинциалните градове.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Подходящ ли е районът за семейства с деца?</h3>
                            <p className={styles.faqA}>Крайбрежната алея и разходката до пешеходния мост — да, особено през деня. Drift Bar е заведение за пълнолетни (от 18 г.).</p>
                        </div>
                    </section>

                    <footer className={styles.footer}>
                        <p>Последно обновено: 14 май 2026 г.</p>
                        <p>Drift Bar Plovdiv · ул. Сливница 2а, Кършияка Северен, 4003 Пловдив · <a href="tel:+359988793684">+359 98 879 3684</a></p>
                        <div className={styles.relatedLinks}>
                            <Link href="/blog/barove-karshiyaka-severen" className={styles.relatedLink}>Барове в Кършияка Северен</Link>
                            <Link href="/blog/jiva-muzika-plovdiv" className={styles.relatedLink}>Жива музика в Пловдив</Link>
                            <Link href="/events" className={styles.relatedLink}>Концерти</Link>
                            <Link href="/reservations" className={styles.relatedLink}>Резервация</Link>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    )
}
