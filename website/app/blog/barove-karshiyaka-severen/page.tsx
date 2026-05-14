import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../article.module.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'
const PAGE_PATH = '/blog/barove-karshiyaka-severen'
const PUBLISHED = '2026-05-14'
const UPDATED = '2026-05-14'

export const metadata: Metadata = {
    title: 'Барове в кв. Кършияка Северен — Пловдив | Drift Bar',
    description: 'Локален пътеводител за баровете в Кършияка Северен, Пловдив — какво да очаквате, транспорт, паркинг, кратки разстояния.',
    keywords: 'барове кършияка пловдив, кършияка северен барове, drift bar кършияка, барове сливница пловдив, бар център пловдив',
    alternates: { canonical: `${baseUrl}${PAGE_PATH}` },
    openGraph: {
        title: 'Барове в кв. Кършияка Северен — Пловдив',
        description: 'Пътеводител за квартала Кършияка Северен — заведения, транспорт, паркинг.',
        type: 'article',
        url: `${baseUrl}${PAGE_PATH}`,
        locale: 'bg_BG',
    },
}

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Барове в кв. Кършияка Северен — Пловдив',
    description: 'Локален пътеводител за заведенията в Кършияка Северен и какво ги отличава от центъра.',
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
    about: ['Кършияка', 'Пловдив', 'Барове', 'Квартал', 'Local guide'],
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Къде се намира кв. Кършияка Северен?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Северна централна част на Пловдив, от другата страна на река Марица спрямо историческия център. Започва от пешеходния мост и Новотел Пловдив и се простира на север. Пощенски код 4003.',
            },
        },
        {
            '@type': 'Question',
            name: 'Кои са баровете в Кършияка Северен?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Drift Bar Plovdiv (ул. Сливница 2а) е централно музикално заведение в района. Има няколко кафе-барове в околността с по-лежерен профил. По-голяма част от нощния живот на града е в Капана и Главната, но Кършияка предлага по-спокойна алтернатива.',
            },
        },
        {
            '@type': 'Question',
            name: 'Има ли паркинг в Кършияка Северен?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да. Публичен паркинг на Новотел Пловдив, улично паркиране по Сливница и съседните улици. Сравнително по-достъпно от Капана и Главната.',
            },
        },
        {
            '@type': 'Question',
            name: 'Как се стига до Кършияка Северен с обществен транспорт?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'С автобус до спирка Новотел Пловдив или пешеходно през пешеходния мост от центъра — около 5–7 минути от Главната до района. Таксита от центъра — 3–5 EUR.',
            },
        },
        {
            '@type': 'Question',
            name: 'Безопасен ли е квартала вечер?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да. Кършияка Северен е жилищно-търговски район с обичайно ниска престъпност и осветени улици. Стандартни предпазни мерки като в всеки град са достатъчни.',
            },
        },
    ],
}

export default function BaroveKarshiyakaSeverenPage() {
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
                        <Link href="/">Начало</Link> / <Link href="/blog">Блог</Link> / Барове в Кършияка Северен
                    </nav>

                    <h1 className={styles.title}>Барове в кв. Кършияка Северен — Пловдив</h1>

                    <p className={styles.lede}>
                        Кършияка Северен не е първият квартал, който туристическите водачи споменават, когато говорят за нощен живот в Пловдив. Това е едновременно неговото предимство и недостатък. Тук няма опашки пред вратите, няма Instagram-ориентирани кафенета, а заведенията се пълнят с местни. За тези, които предпочитат спокойствието на жилищно-търговски квартал пред глъчта на Капана, кварталът има какво да предложи.
                    </p>

                    <div className={styles.meta}>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>schedule</span> 5 мин четене</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>calendar_today</span> 14 май 2026</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>location_on</span> Кършияка, Пловдив</span>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Уникалният характер на Кършияка Северен</h2>
                        <p className={styles.p}>
                            Кършияка Северен е северната централна част на Пловдив — от другата страна на река Марица спрямо историческия център и Капана. Пощенският код е 4003. Кварталът започва около пешеходния мост и Новотел Пловдив и се простира на север, с граница към Тракия и Кючук Париж.
                        </p>
                        <p className={styles.p}>
                            Това не е чисто жилищен квартал, нито туристическа зона. Тук има жилищни блокове от 70-те и 80-те, малки магазини, кафенета, банки, един хотел от висока класа (Новотел), няколко по-малки бизнес сгради. Реката оформя южната граница, а пешеходният мост свързва квартала с историческия център за пет минути.
                        </p>
                        <p className={styles.p}>
                            Заради този смесен характер заведенията тук имат различна публика — местни от блоковете, гости на Новотел, хора, които работят в района, по-камерна вечерна тълпа. Това не е район на тийнейджърски нощен живот.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Drift Bar като централно музикално място</h2>
                        <p className={styles.p}>
                            <strong>Drift Bar Plovdiv</strong> на ул. Сливница 2а е централната музикална точка в квартала. Бившият пиано-бар ЕКСЕЛ — отворен наново на 1 март 2026 г. като сцена за рок, джаз и блус. Капацитет 99 места, 20 маси. Концерти в четвъртък (20:00–02:00), петък и събота (20:00–04:00), неделя (18:00–02:00). Понеделник до сряда — почивни дни.
                        </p>
                        <p className={styles.p}>
                            Програмата включва имена като ЕЛИТ, Sharp Dressed Men, DeeStoned, Angel Demirev Jazz Trio, Дина Йорк. За пълния календар — <Link href="/events">страницата за събития</Link>. Резервации — онлайн или на +359 98 879 3684.
                        </p>
                        <p className={styles.p}>
                            Положението на бара е стратегическо: пет минути пеша от пешеходния мост (т.е. от центъра), две минути от Новотел Пловдив, лесен достъп от Тракия с такси или кола.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Други опции в пешеходно разстояние</h2>
                        <p className={styles.p}>
                            Кварталът няма гъстото струпване на барове като Капана, но в радиус от 10 минути пеша има няколко алтернативи в различен профил:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>Кафе-барове по Сливница</strong> — лежерни заведения, които работят повече като кафенета през деня и преминават към коктейли вечер. Подходящи за по-тихо начало на вечерта преди концерт или вместо.</li>
                            <li className={styles.li}><strong>Хотелски барове</strong> — Новотел Пловдив има свой бар с по-висок ценови диапазон, но качествени напитки. Понякога има лежерни DJ сетове през лятото.</li>
                            <li className={styles.li}><strong>Заведенията по крайбрежната алея</strong> — сезонни тераси по брега на Марица. Активни от април до октомври, по-затворени през зимата.</li>
                        </ul>
                        <p className={styles.p}>
                            За по-разнообразен нощен живот — пешеходният мост ви извежда за 5 минути в района на Главната и Капана, където концентрацията на заведения е значително по-висока.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Транспорт</h2>
                        <p className={styles.p}>
                            Кварталът е добре свързан:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>Пешеходно от центъра:</strong> 5–7 минути от Главната през пешеходния мост.</li>
                            <li className={styles.li}><strong>С автобус:</strong> няколко линии минават през спирка Новотел Пловдив. Проверете разписанието в приложение като Plovdiv Bus.</li>
                            <li className={styles.li}><strong>С такси:</strong> 3–5 EUR от центъра. По-евтино през деня.</li>
                            <li className={styles.li}><strong>С кола:</strong> от магистрала Тракия — около 10 минути. От летище Пловдив — около 25 минути.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Паркинг</h2>
                        <p className={styles.p}>
                            Едно от практическите предимства на Кършияка пред центъра — паркингът не е невъзможна задача. Опциите:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>Публичен паркинг на Новотел Пловдив</strong> — на крачки от Drift Bar, обикновено има места.</li>
                            <li className={styles.li}><strong>Улично паркиране по ул. Сливница и съседните</strong> — безплатно вечер, синя зона през деня.</li>
                            <li className={styles.li}><strong>Зад жилищните блокове</strong> — често има свободни места, но проверете табелите.</li>
                        </ul>
                        <p className={styles.p}>
                            Все пак, за петък и събота вечер, когато има концерт — препоръчваме такси или Bolt. По-евтино от глобите и безопасно за пътя у дома.
                        </p>

                        <div className={styles.callout}>
                            <p>Голямото предимство на Кършияка Северен е, че сте близо до всичко — центъра, реката, Тракия — без да сте в центъра. За хора, които ценят тиха обстановка и лесен паркинг, кварталът е по-добър избор от Капана.</p>
                        </div>

                        <div className={styles.cta}>
                            <p className={styles.ctaText}>Drift Bar — ул. Сливница 2а, Кършияка Северен. Концерти четвъртък до неделя.</p>
                            <Link href="/reservations" className={styles.ctaPrimary}>Резервация</Link>
                            <a href="tel:+359988793684" className={styles.ctaSecondary}>+359 98 879 3684</a>
                        </div>
                    </section>

                    <section className={styles.faq}>
                        <h2 className={styles.h2}>Често задавани въпроси</h2>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Колко е разходката от Главната до Кършияка Северен?</h3>
                            <p className={styles.faqA}>5–7 минути през пешеходния мост над река Марица. Удобно и през лятото, и през зимата.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли ресторанти в района?</h3>
                            <p className={styles.faqA}>Да — няколко ресторанта с традиционна и интернационална кухня, включително ресторанта на Новотел. По крайбрежната алея — сезонни заведения с гледка към реката.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Подходящ ли е районът за туристи?</h3>
                            <p className={styles.faqA}>Да — особено за гости, които се настаняват в Новотел и искат да са близо до историческия център, но в по-спокойна обстановка. Drift Bar дава директен достъп до жива музика без да напускате квартала.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Какво е работното време на заведенията?</h3>
                            <p className={styles.faqA}>Drift Bar — четвъртък 20:00–02:00, петък/събота 20:00–04:00, неделя 18:00–02:00. Други заведения варират — повечето кафе-барове до 23:00, по-късно през уикенда.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Кога е активен Кършияка през годината?</h3>
                            <p className={styles.faqA}>Drift Bar работи целогодишно. Сезонните тераси по реката — от април до октомври. Зимата районът е по-камерен.</p>
                        </div>
                    </section>

                    <footer className={styles.footer}>
                        <p>Последно обновено: 14 май 2026 г.</p>
                        <p>Автор: Drift Bar Plovdiv · ул. Сливница 2а, Кършияка Северен, Пловдив 4003 · <a href="tel:+359988793684">+359 98 879 3684</a></p>
                        <div className={styles.relatedLinks}>
                            <Link href="/blog/barove-bliso-do-novotel-plovdiv" className={styles.relatedLink}>Барове близо до Новотел</Link>
                            <Link href="/blog/jiva-muzika-plovdiv" className={styles.relatedLink}>Жива музика в Пловдив</Link>
                            <Link href="/events" className={styles.relatedLink}>Програма Drift Bar</Link>
                            <Link href="/menu" className={styles.relatedLink}>Меню</Link>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    )
}
