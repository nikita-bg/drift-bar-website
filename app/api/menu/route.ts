import { NextResponse } from 'next/server'
import { MENU } from '@/lib/menu-data'

export async function GET() {
    return NextResponse.json(MENU)
}
