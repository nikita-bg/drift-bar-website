import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../article.module.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'
const PAGE_PATH = '/blog/jiva-muzika-plovdiv'
const PUBLISHED = '2026-05-14'
const UPDATED = '2026-05-14'

export const metadata: Metadata = {
    title: 'Жива музика в Пловдив — къде да чуете концерт | Drift Bar',
    description: 'Пълно ръководство за живата музика в Пловдив — рок, джаз, блус, авторски сцени. Активни заведения, видове концерти, какво да очаквате.',
    keywords: 'жива музика пловдив, концерти пловдив, live music plovdiv, рок концерти пловдив, джаз пловдив, музика на живо пловдив',
    alternates: { canonical: `${baseUrl}${PAGE_PATH}` },
    openGraph: {
        title: 'Жива музика в Пловдив — къде да чуете концерт',
        description: 'Пълно ръководство за живата музика в Пловдив — заведения, жанрове, какво да очаквате на концерт.',
        type: 'article',
        url: `${baseUrl}${PAGE_PATH}`,
        locale: 'bg_BG',
    },
}

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Жива музика в Пловдив — къде да чуете концерт',
    description: 'Пълно ръководство за живата музика в Пловдив — рок, джаз, блус, авторски сцени. Активни заведения и съвети.',
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
    about: ['Жива музика', 'Пловдив', 'Концерти', 'Рок', 'Джаз'],
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Кои са най-добрите места за жива музика в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Drift Bar Plovdiv (рок, джаз, блус — ул. Сливница 2а), Бронзов мост (рок и кавъри в Капана), сцените около Каменица и Sky Bar. Всяко място има своя профил — Drift Bar e фокусиран върху концерти с пълноценна сцена и акустика.',
            },
        },
        {
            '@type': 'Question',
            name: 'Каква музика свирят в Drift Bar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Рок, блус, джаз, соул, авторски проекти. Артисти като ЕЛИТ, Sharp Dressed Men, DeeStoned, Angel Demirev Jazz Trio, Дина Йорк. В петък и събота често има DJ сетове до 04:00.',
            },
        },
        {
            '@type': 'Question',
            name: 'Колко струва вход за концерт в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Концертите в Drift Bar обикновено са 5–10 EUR. DJ вечерите — около 5 EUR. По-големи турнета (Capitol, Дом на културата) са в по-висок ценови диапазон. Точните цени са на страницата за събития.',
            },
        },
        {
            '@type': 'Question',
            name: 'Кога са най-добрите вечери за жива музика в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Четвъртък, петък и събота — основните концертни вечери в повечето барове. В Drift Bar четвъртъкът често е джаз/блус, петък/събота — рок и DJ сетове, неделя — спокойни сесии и open mic.',
            },
        },
        {
            '@type': 'Question',
            name: 'Нужна ли е резервация за концерт?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'За концертни вечери в Drift Bar силно се препоръчва резервация — капацитетът е 99 места и масите се пълнят бързо. Резервация — онлайн или на +359 98 879 3684.',
            },
        },
    ],
}

export default function JivaMuzikaPlovdivPage() {
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
                        <Link href="/">Начало</Link> / <Link href="/blog">Блог</Link> / Жива музика в Пловдив
                    </nav>

                    <h1 className={styles.title}>Жива музика в Пловдив — къде да чуете концерт</h1>

                    <p className={styles.lede}>
                        Пловдив има малка, но плътна сцена за жива музика. От рок концерти в кварталните барове до джаз вечери и авторски проекти — градът предлага повече, отколкото подсказват туристическите водачи. Това е практическо ръководство за тези, които искат да чуят музика на живо в Пловдив.
                    </p>

                    <div className={styles.meta}>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>schedule</span> 6 мин четене</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>calendar_today</span> 14 май 2026</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>location_on</span> Пловдив, България</span>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Защо Пловдив е добра сцена за жива музика</h2>
                        <p className={styles.p}>
                            Пловдив е вторият по големина град в България, но има едно предимство, което София няма — мащабът. Музикантите тук се познават, публиката е лоялна, а заведенията не са преобърнати в туристически машини. Това означава, че когато отидете на концерт в Пловдив, най-вероятно ще видите изпълнителите някъде из бара след шоуто, а няма да си тръгнете със спомена за това колко скъпа е била бирата.
                        </p>
                        <p className={styles.p}>
                            Историята помага. Градът има солидна традиция в джаза от 70-те години, силна рок сцена от 90-те и съвременна вълна от автори, които експериментират. Тренджите се сменят, но винаги има поне няколко места, в които всяка седмица свири нещо живо.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Видове концерти — какво свири в Пловдив</h2>

                        <h3 className={styles.h3}>Рок и блус рок</h3>
                        <p className={styles.p}>
                            Най-силната жила в Пловдив. Местни групи като Sharp Dressed Men (кавъри на ZZ Top, Lenny Kravitz, Scorpions) и DeeStoned (блус рок) свирят редовно. Легенди от 90-те като <strong>ЕЛИТ</strong> — групата на Огнян Цолов с албуми "Forgotten Faces" и "Объркан свят" — продължават да обикалят малките зали. На по-агресивната страна — Coven 5 и експериментални проекти.
                        </p>

                        <h3 className={styles.h3}>Джаз и блус</h3>
                        <p className={styles.p}>
                            Джазът в Пловдив е тих, но устойчив. Триа от типа на <strong>Angel Demirev Jazz Trio</strong> — авторска китарна музика, която съчетава традиция и модерни импровизации — се чуват в по-камерните барове. Бразилските вечери с Мария Караиванова и саксофониста Преслав Пеев носят латино джаз. Има и блус посетители — Дина Йорк (САЩ) с The Yorkers вкараха ново темпо в сцената с първия си концерт в Пловдив тази година.
                        </p>

                        <h3 className={styles.h3}>DJ сетове и електроника</h3>
                        <p className={styles.p}>
                            Петък и събота след полунощ повечето барове минават на DJ музика — open format, mashups, групово известни името на DJ Azsumrado и DJ Borrix. Това не е клубна сцена в стил София — по-скоро удължение на концертната вечер.
                        </p>

                        <h3 className={styles.h3}>Ретро и кавъри</h3>
                        <p className={styles.p}>
                            Една ниша, която расте — пътувания през десетилетията. Програми като "Музика от 6 десетилетия" (60s–10s) с живи изпълнения на класиките. Не е носталгия за носталгията — добре направеният кавър е истинска школа.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Активни заведения за жива музика</h2>
                        <p className={styles.p}>
                            Сцената се мени, но има няколко места, които държат редовна програма:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                <strong>Drift Bar Plovdiv</strong> — ул. Сливница 2а, Кършияка Северен. Капацитет 99 места, 20 маси. Фокус върху рок, джаз и блус с пълноценна сцена и професионално озвучаване. Концерти четвъртък–събота, DJ сетове петък/събота. <Link href="/events">Виж програмата</Link>.
                            </li>
                            <li className={styles.li}>
                                <strong>Бронзов мост</strong> — в района на Капана. Кавъри, рок, по-малки сесии. Атмосфера на стария град, по-туристически профил.
                            </li>
                            <li className={styles.li}>
                                <strong>Каменица и околности</strong> — няколко заведения в района редуват акустични вечери и по-весели рок групи. Сезонно — повече през пролетта и лятото.
                            </li>
                            <li className={styles.li}>
                                <strong>Sky Bar (терасата на хотел Imperial)</strong> — DJ сетове и лежерни концерти през топлите месеци. По-високи цени, добра гледка към града.
                            </li>
                        </ul>
                        <p className={styles.p}>
                            За по-големи турнета — Дом на културата "Борис Христов", Античният театър (летен сезон), Capitol Fest. Това е друга лига и обикновено билетите се продават предварително.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Как да изберете къде да отидете</h2>
                        <p className={styles.p}>
                            Три прости стъпки:
                        </p>
                        <ol className={styles.ol}>
                            <li className={styles.li}><strong>Започнете от жанра.</strong> Ако искате блус и джаз — Drift Bar. Ако сте в режим на туристическа разходка из Капана — Бронзов мост. Ако ще пиете нещо по терасата лятно време — Sky Bar.</li>
                            <li className={styles.li}><strong>Проверете програмата.</strong> Повечето барове публикуват седмичните си концерти във Facebook или Instagram. Drift Bar има пълен календар на сайта.</li>
                            <li className={styles.li}><strong>Резервирайте.</strong> За концертни вечери — задължително. Малките зали се пълнят и без шоу.</li>
                        </ol>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Какво да очаквате на концерт в Пловдив</h2>
                        <p className={styles.p}>
                            Концертите в малките пловдивски барове обикновено започват в 21:00, рядко по-късно. Вратите се отварят около 20:00. Между сетовете има паузи от 10–15 минути. Шоутата свършват към 23:30–00:00, след което музиката минава на DJ или плейлист.
                        </p>
                        <p className={styles.p}>
                            Цените за вход варират — повечето концерти са в диапазона 5–10 EUR, обикновено включват добра гледка към сцената и място за сядане, ако сте резервирали маса. Напитките — стандартни пловдивски цени, без концертна надценка в повечето случаи.
                        </p>
                        <p className={styles.p}>
                            Дрескодът — никакъв. Тениска и дънки са повече от достатъчно. Хората идват да слушат, не да позират.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Drift Bar като пример за съвременната сцена</h2>
                        <p className={styles.p}>
                            Drift Bar е сравнително нов на сцената — отвори врати на 1 март 2026 г. на мястото на бившия пиано-бар ЕКСЕЛ. Концепцията е тясна и ясна: сцена от музиканти за музиканти, рок и джаз с професионално озвучаване, без претенции и без турбо клубна музика до сутринта.
                        </p>
                        <p className={styles.p}>
                            Програмата за май 2026 включва ЕЛИТ (15 май), Coven 5 (16 май), Sharp Dressed Men (1 май), DeeStoned (9 май), Дина Йорк & The Yorkers (14 май) и Музика от 6 десетилетия (22 май). За изчерпателен списък — <Link href="/events">страницата за събития</Link>.
                        </p>

                        <div className={styles.cta}>
                            <p className={styles.ctaText}>Резервирайте маса за концертна вечер — местата свършват бързо.</p>
                            <Link href="/reservations" className={styles.ctaPrimary}>Резервация онлайн</Link>
                            <a href="tel:+359988793684" className={styles.ctaSecondary}>+359 98 879 3684</a>
                        </div>
                    </section>

                    <section className={styles.faq}>
                        <h2 className={styles.h2}>Често задавани въпроси</h2>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Кои са най-добрите места за жива музика в Пловдив?</h3>
                            <p className={styles.faqA}>Drift Bar Plovdiv за рок, джаз и блус; Бронзов мост за кавъри в Капана; сцените около Каменица; Sky Bar за лежерни вечери на терасата. Drift Bar има пълноценна сцена и редовна програма четвъртък–събота.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Колко струва вход за концерт?</h3>
                            <p className={styles.faqA}>Малки барове — 5–10 EUR. Турнета и по-големи зали — над 10 EUR. DJ вечери — обикновено около 5 EUR.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли място за паркинг в близост до концертните барове?</h3>
                            <p className={styles.faqA}>Зависи от района. Drift Bar е близо до публичния паркинг на Новотел Пловдив. В Капана паркирането е по-сложно — препоръчително е такси или обществен транспорт.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Кога е най-добре да резервирам?</h3>
                            <p className={styles.faqA}>За концертни вечери — поне 2–3 дни предварително. За по-известни групи (ЕЛИТ, утвърдени имена) — седмица преди.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли качествена жива музика през делниците?</h3>
                            <p className={styles.faqA}>Четвъртък е активна вечер в Drift Bar — често джаз/блус програма. Понеделник–сряда повечето места са затворени или нямат концерти.</p>
                        </div>
                    </section>

                    <footer className={styles.footer}>
                        <p>Последно обновено: 14 май 2026 г.</p>
                        <p>Автор: Drift Bar Plovdiv · <Link href="/">driftbarplovdiv.com</Link></p>
                        <div className={styles.relatedLinks}>
                            <Link href="/blog/rok-barove-plovdiv" className={styles.relatedLink}>Рок барове в Пловдив</Link>
                            <Link href="/blog/jaz-barove-plovdiv" className={styles.relatedLink}>Джаз барове в Пловдив</Link>
                            <Link href="/events" className={styles.relatedLink}>Програма на събитията</Link>
                            <Link href="/menu" className={styles.relatedLink}>Меню</Link>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    )
}
