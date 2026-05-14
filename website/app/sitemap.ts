import { MetadataRoute } from 'next'
import { EVENTS } from '@/lib/events-data'
import { ARTISTS } from '@/lib/artists-data'
import { GENRE_SLUGS } from '@/lib/genre-slugs'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://driftbarplovdiv.com'
const now = new Date()

// Artist slugs are the single source of truth in lib/artists-data.ts.
const ARTIST_SLUGS = ARTISTS.map(a => a.slug)

const BLOG_SLUGS = [
    'jiva-muzika-plovdiv',
    'rok-barove-plovdiv',
    'jaz-barove-plovdiv',
    'barove-karshiyaka-severen',
    'barove-bliso-do-novotel-plovdiv',
]

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
        { url: `${baseUrl}/events`,      lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
        { url: `${baseUrl}/menu`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${baseUrl}/reservations`,lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
        { url: `${baseUrl}/artists`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${baseUrl}/genre`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.75 },
        { url: `${baseUrl}/blog`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    ]

    const eventPages: MetadataRoute.Sitemap = EVENTS.map((event) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: now,
        // Upcoming events change more often than past ones.
        changeFrequency: new Date(event.date) >= now ? ('daily' as const) : ('monthly' as const),
        priority: new Date(event.date) >= now ? 0.9 : 0.5,
    }))

    const artistPages: MetadataRoute.Sitemap = ARTIST_SLUGS.map((slug) => ({
        url: `${baseUrl}/artists/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    const genrePages: MetadataRoute.Sitemap = GENRE_SLUGS.map((slug) => ({
        url: `${baseUrl}/genre/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
    }))

    return [
        ...staticPages,
        ...eventPages,
        ...artistPages,
        ...genrePages,
        ...blogPages,
    ]
}
