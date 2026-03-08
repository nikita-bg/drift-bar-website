import { prisma } from './db'

// ─── BAR CONFIG ────────────────────────────────
const TOTAL_CAPACITY = 99
const OPENING_HOUR = 20 // 20:00
const CLOSING_HOUR = 4  // 04:00 next day (Fri/Sat), 02:00 other days

// ─── TIME SLOTS ────────────────────────────────
export const TIME_SLOTS = [
    '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30',
    '00:00',
]

// ─── TYPES ─────────────────────────────────────
interface AvailabilityCheck {
    date: string      // YYYY-MM-DD
    startTime: string // HH:MM
    endTime: string   // HH:MM
    partySize: number
    excludeReservationId?: string
}

export interface AvailabilityResult {
    available: boolean
    reason?: string
    bookedSeats: number
    availableSeats: number
}

// ─── HELPERS ───────────────────────────────────

/** Convert HH:MM to minutes since midnight */
function timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

/** Calculate end time from start + duration */
export function calculateEndTime(startTime: string, durationMinutes: number): string {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = (startMinutes + durationMinutes) % (24 * 60)
    const hours = Math.floor(endMinutes / 60)
    const mins = endMinutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

/** Check if two time ranges overlap (handles midnight crossing) */
function timesOverlap(
    start1: string, end1: string,
    start2: string, end2: string
): boolean {
    const s1 = timeToMinutes(start1)
    const e1 = timeToMinutes(end1)
    const s2 = timeToMinutes(start2)
    const e2 = timeToMinutes(end2)

    // Handle midnight crossing by normalizing
    const adjE1 = e1 <= s1 ? e1 + 24 * 60 : e1
    const adjE2 = e2 <= s2 ? e2 + 24 * 60 : e2

    return s1 < adjE2 && s2 < adjE1
}

// ─── CONFLICT DETECTION ────────────────────────

export async function checkAvailability({
    date,
    startTime,
    endTime,
    partySize,
    excludeReservationId,
}: AvailabilityCheck): Promise<AvailabilityResult> {
    // Find all active reservations for this date
    const reservations = await prisma.reservation.findMany({
        where: {
            date,
            status: { in: ['PENDING', 'CONFIRMED'] },
            ...(excludeReservationId ? { id: { not: excludeReservationId } } : {}),
        },
    })

    // Filter overlapping time slots
    const overlapping = reservations.filter(r =>
        timesOverlap(r.startTime, r.endTime, startTime, endTime)
    )

    const bookedSeats = overlapping.reduce((sum, r) => sum + r.partySize, 0)
    const availableSeats = TOTAL_CAPACITY - bookedSeats

    if (availableSeats < partySize) {
        return {
            available: false,
            reason: `Само ${availableSeats} свободни места. Заявени: ${partySize}`,
            bookedSeats,
            availableSeats,
        }
    }

    return { available: true, bookedSeats, availableSeats }
}

// ─── AVAILABLE SLOTS ───────────────────────────

export async function getAvailableSlots(date: string, partySize: number = 1) {
    const results: { time: string; available: boolean; availableSeats: number }[] = []

    for (const time of TIME_SLOTS) {
        const endTime = calculateEndTime(time, 120) // 2-hour default

        const check = await checkAvailability({
            date,
            startTime: time,
            endTime,
            partySize,
        })

        results.push({
            time,
            available: check.available,
            availableSeats: check.availableSeats,
        })
    }

    return results
}

// ─── SEED DEFAULT TABLES ───────────────────────

export async function seedTables() {
    const existingCount = await prisma.table.count()
    if (existingCount > 0) return // Already seeded

    const tables = Array.from({ length: 20 }, (_, i) => ({
        name: `Маса ${i + 1}`,
        capacity: i < 4 ? 2 : i < 12 ? 4 : i < 18 ? 6 : 8,
        location: i < 4 ? 'Бар' : i < 12 ? 'Зала' : i < 18 ? 'Прозорец' : 'VIP',
    }))

    await prisma.table.createMany({ data: tables })
    console.log('✅ Seeded 20 tables')
}
