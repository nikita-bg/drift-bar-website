import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../article.module.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'
const PAGE_PATH = '/blog/jaz-barove-plovdiv'
const PUBLISHED = '2026-05-14'
const UPDATED = '2026-05-14'

export const metadata: Metadata = {
    title: 'Джаз барове в Пловдив — къде да слушате jazz live | Drift Bar',
    description: 'Джаз сцената в Пловдив — къде да чуете jazz на живо, какви артисти свирят и как се държи човек на джаз концерт.',
    keywords: 'джаз бар пловдив, jazz plovdiv, джаз пловдив, jazz live plovdiv, jazz бар пловдив, jam session пловдив',
    alternates: { canonical: `${baseUrl}${PAGE_PATH}` },
    openGraph: {
        title: 'Джаз барове в Пловдив — къде да слушате jazz live',
        description: 'Пловдивската джаз сцена — заведения, типове сесии и какво да очаквате.',
        type: 'article',
        url: `${baseUrl}${PAGE_PATH}`,
        locale: 'bg_BG',
    },
}

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Джаз барове в Пловдив — къде да слушате jazz live',
    description: 'Ръководство за джаз сцената в Пловдив — активни заведения, типове сесии и етикет.',
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
    about: ['Джаз', 'Пловдив', 'Jazz', 'Концерти', 'Live music'],
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Има ли джаз бар в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да — Drift Bar Plovdiv (ул. Сливница 2а) свири джаз редовно, особено в четвъртък. Свирят триа като Angel Demirev Jazz Trio, бразилски джаз вечери с Мария Караиванова и Преслав Пеев, и блус/соул проекти.',
            },
        },
        {
            '@type': 'Question',
            name: 'Кога има джаз концерти в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Четвъртък и понякога неделя са основните джаз вечери в Drift Bar. Началото е 21:00. Други заведения имат периодични джаз сесии — програмата варира.',
            },
        },
        {
            '@type': 'Question',
            name: 'Колко струва вход за джаз концерт?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Стандартно 10 EUR в Drift Bar. По-малките неделни сесии и jam sessions често са с по-нисък или нулев вход.',
            },
        },
        {
            '@type': 'Question',
            name: 'Как се държи човек на джаз концерт?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Тихо по време на солата, аплодисменти след всяко соло (не след цялата пиеса), без високи разговори по време на изпълнение. Поръчвайте по време на паузи между пиесите, не на ниско ниво.',
            },
        },
        {
            '@type': 'Question',
            name: 'Кои джаз музиканти свирят в Пловдив?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Активни локални и национални имена: Ангел Демирев (китара), Борислав Петров (барабани), Евгени Димитров (бас), Мария Караиванова (вокал), Преслав Пеев (саксофон), Живко Братанов (пиано), Николай Бобчев (контрабас). Гост-артисти от чужбина периодично.',
            },
        },
    ],
}

export default function JazBarovePlovdivPage() {
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
                        <Link href="/">Начало</Link> / <Link href="/blog">Блог</Link> / Джаз барове в Пловдив
                    </nav>

                    <h1 className={styles.title}>Джаз барове в Пловдив — къде да слушате jazz live</h1>

                    <p className={styles.lede}>
                        Джазът в България винаги е бил по-силен, отколкото подсказва инфраструктурата. В Пловдив има тиха, но постоянна сцена — китаристи, които правят свои албуми, саксофонисти, които свирят в София и Италия, певици, които идват от Бразилия и Америка за един концерт. Това е ръководство за тези, които искат да чуят jazz на живо в Пловдив.
                    </p>

                    <div className={styles.meta}>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>schedule</span> 5 мин четене</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>calendar_today</span> 14 май 2026</span>
                        <span><span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>music_note</span> Jazz</span>
                    </div>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Защо джаз в Пловдив</h2>
                        <p className={styles.p}>
                            Пловдив има традиция в джаза от 70-те години — джаз клубовете към читалищата, фестивалите, локалното радио. Тази традиция не умря с 90-те — просто се сви до по-камерни форми. Днес джаз сцената в Пловдив не е концертна индустрия, а серия от тесни сесии, в които китаристи, барабанисти и духови играят за публика от 30–60 души.
                        </p>
                        <p className={styles.p}>
                            И това е добре. Джазът на живо губи смисъл в зали с по 500 души, в които публиката е там за акустиката, а не за изпълнението. В малкото пловдивско заведение чувате на коя нота барабанистът сменя темпото, кога китаристът се поколебава, кога саксофонистът се връща назад към тема. Това е джазът, който си заслужава.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Типове джаз сесии в Пловдив</h2>

                        <h3 className={styles.h3}>Авторски проекти</h3>
                        <p className={styles.p}>
                            Триа и квартети, които свирят собствена музика. <strong>Angel Demirev Jazz Trio</strong> е типичен пример — Ангел Демирев на китара, Борислав Петров на барабани, Евгени Димитров на бас. Авторски композиции, в които се преплитат джаз традиция и модерни импровизации. Това не е стандартен репертоар — това е джаз като език.
                        </p>

                        <h3 className={styles.h3}>Латино и бразилски джаз</h3>
                        <p className={styles.p}>
                            По-топла страна на джаза — boss nova, samba jazz, ритми от Бразилия. <strong>Бразилските вечери</strong> с Мария Караиванова (вокал), Преслав Пеев (саксофон), Живко Братанов (пиано), Николай Бобчев (контрабас) и Александър Каменов (барабани) са станали редовна точка в пловдивския календар. Това е достъпен джаз за хора, които не са сигурни дали обичат жанра.
                        </p>

                        <h3 className={styles.h3}>Блус и соул кросоувъри</h3>
                        <p className={styles.p}>
                            Не точно джаз, но в близка съседска позиция. <strong>Дина Йорк & The Yorkers</strong> — американската певица с интернационален квинтет (Доменико Дередита, Цуки Цветанов, Доменико Форнари, Иво Попов) — преосмислят класически блус и соул стандарти. Това е концерт, в който джаз публиката се чувства у дома, но и не-джазери намират какво да харесват.
                        </p>

                        <h3 className={styles.h3}>Jam sessions</h3>
                        <p className={styles.p}>
                            Свободни сесии, на които музикантите се присъединяват към основната група. Това се случва от време на време в Пловдив — рядко обявено, по-често стихийно. Ако сте музикант — носете инструмента и питайте.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Drift Bar за джаз</h2>
                        <p className={styles.p}>
                            Drift Bar (ул. Сливница 2а, Кършияка Северен) е едно от заведенията, които поддържат редовна джаз програма. Капацитет 99 места и 20 маси — достатъчно интимна обстановка за акустичен инструмент, но достатъчно голяма, за да побере солидна публика. Озвучаването е настроено за акустика, не само за рок.
                        </p>
                        <p className={styles.p}>
                            Джаз вечерите обикновено са в четвъртък — началото в 21:00, врата 20:00. Вход около 10 EUR. За април 2026 програмата включваше Бразилска вечер (16 април) и Angel Demirev Jazz Trio (17 април). За май — Дина Йорк & The Yorkers (14 май). За пълния календар — <Link href="/events">страницата за събития</Link>.
                        </p>

                        <div className={styles.callout}>
                            <p>Джазът тук не е фон — той е причината хората да дойдат. Това променя начина, по който се слуша.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Артисти, които свирят в Пловдив</h2>
                        <p className={styles.p}>
                            Основният състав на активната джаз сцена в Пловдив включва:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>Ангел Демирев</strong> — китарист и композитор, лидер на собствено трио, силно сценично присъствие.</li>
                            <li className={styles.li}><strong>Борислав Петров</strong> — барабанист, активен в няколко проекта.</li>
                            <li className={styles.li}><strong>Евгени Димитров</strong> — басист, фокус върху джаз и фюжън.</li>
                            <li className={styles.li}><strong>Мария Караиванова</strong> — вокал, специалитет — бразилски и латино джаз.</li>
                            <li className={styles.li}><strong>Преслав Пеев</strong> — саксофонист, активен както в Пловдив, така и в София.</li>
                            <li className={styles.li}><strong>Живко Братанов</strong> — пианист, оркестратор.</li>
                            <li className={styles.li}><strong>Николай Бобчев</strong> — контрабасист, акустично направление.</li>
                            <li className={styles.li}><strong>Александър Каменов</strong> — барабанист, латино и бразилски ритми.</li>
                        </ul>
                        <p className={styles.p}>
                            Гост-артисти от чужбина периодично — италиански пианисти, американски вокалисти, балкански проекти. Това не е градът с турнетата на Branford Marsalis, но е градът, в който се прави добра локална музика.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.h2}>Как се държи човек на джаз концерт</h2>
                        <p className={styles.p}>
                            Малък етикет, който прави разликата между публика, която музикантите харесват, и публика, която им пречи:
                        </p>
                        <ul className={styles.ul}>
                            <li className={styles.li}><strong>Тихо по време на солата.</strong> Не е сноб правило — солото е момент, в който музикантът свири нещо, което не е репетирал. Шумът от вашия разговор се чува на сцената.</li>
                            <li className={styles.li}><strong>Аплодисменти след всяко соло, не след цялата пиеса.</strong> Това е стандартът от 50 години. Не аплодирайте всяко завъртане на басиста, но после, когато соло е изградено и завършено — да.</li>
                            <li className={styles.li}><strong>Поръчвайте между пиесите.</strong> Сервитьорът ще оцени, а музикантите няма да виждат как се пише поръчка по време на балада.</li>
                            <li className={styles.li}><strong>Телефонът — в джоба.</strong> Една снимка в началото е добре. Десет минути видео — не. Звукът не се записва добре, а вие пропускате концерта.</li>
                            <li className={styles.li}><strong>Идете до края.</strong> Джаз концертите често имат най-добрия си момент в последната пиеса — когато музикантите вече са се отпуснали.</li>
                        </ul>

                        <div className={styles.cta}>
                            <p className={styles.ctaText}>За маса на джаз вечер — резервирайте предварително. Местата за акустични концерти свършват първи.</p>
                            <Link href="/reservations" className={styles.ctaPrimary}>Резервирай маса</Link>
                            <a href="tel:+359988793684" className={styles.ctaSecondary}>+359 98 879 3684</a>
                        </div>
                    </section>

                    <section className={styles.faq}>
                        <h2 className={styles.h2}>Често задавани въпроси</h2>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли постоянен джаз бар в Пловдив?</h3>
                            <p className={styles.faqA}>Drift Bar Plovdiv поддържа редовна джаз програма с акцент в четвъртък. Други заведения имат периодични джаз сесии — провере програмата им.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Колко продължава джаз концерт?</h3>
                            <p className={styles.faqA}>Обикновено два сета по 45–50 минути с пауза от 15–20 минути между тях. Общо около 2 часа.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Подходящ ли е джазът за първа среща?</h3>
                            <p className={styles.faqA}>Да — акустиката е по-подходяща за разговор от рок концерт, обстановката е спокойна. Бразилски и латино джаз вечери са особено приятни.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли менюто храна по време на джаз вечер?</h3>
                            <p className={styles.faqA}>Drift Bar е основно бар, но има закуски и леки храни. <Link href="/menu">Виж менюто</Link>.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>Има ли джаз фестивал в Пловдив?</h3>
                            <p className={styles.faqA}>Сезонни събития се организират — обикновено лятото в рамките на културната програма на града. Извън това — редовни концерти в малките сцени.</p>
                        </div>
                    </section>

                    <footer className={styles.footer}>
                        <p>Последно обновено: 14 май 2026 г.</p>
                        <p>Автор: Drift Bar Plovdiv · <Link href="/">driftbarplovdiv.com</Link> · ул. Сливница 2а, Пловдив</p>
                        <div className={styles.relatedLinks}>
                            <Link href="/blog/jiva-muzika-plovdiv" className={styles.relatedLink}>Жива музика в Пловдив</Link>
                            <Link href="/blog/rok-barove-plovdiv" className={styles.relatedLink}>Рок барове в Пловдив</Link>
                            <Link href="/events" className={styles.relatedLink}>Програма</Link>
                            <Link href="/reservations" className={styles.relatedLink}>Резервация</Link>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    )
}
