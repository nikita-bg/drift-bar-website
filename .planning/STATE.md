# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-06)

**Core value:** Customers can order drinks and food from their table without waiting for a server, and staff instantly receives orders via Telegram notification.
**Current focus:** Phase 4 - Deployment

## Current Position

Phase: 3 of 4 (Staff Dashboard) — COMPLETE
Status: Phase 3 complete, ready for Phase 4
Last activity: 2026-03-06 — Phase 3 executed (staff dashboard + n8n fix)

Progress: [██████████████████████████████] 75% (Phases 1+2+3 of 4)

## What Is Built So Far

### ✅ Phase 1 — Foundation & Menu (COMPLETE)
- Next.js 14 + TypeScript + vintage aesthetic
- `/menu` page with 9 categories, 150+ items from real physical menu
- Original Drift Bar logo in header
- Mobile-first responsive design, grain overlay

### ✅ Phase 2 — Ordering System (COMPLETE)
**Frontend (Next.js):**
- `app/menu/context/CartContext.tsx` — cart state with localStorage
- `app/menu/components/CartDrawer.tsx` — slide-out drawer, FAB button
- `app/menu/components/MenuItem.tsx` — add-to-cart buttons on each item
- `app/api/order/route.ts` — POST /api/order → saves to store + n8n webhook

**Backend (n8n):**
- Workflow ID: `N5ObadlwGyp6JnWE`
- Name: "Drift Bar — Нова Поръчка → Telegram"
- Structure: Webhook → Format Message → Telegram
- Status: VALID (0 errors) — fixed expression syntax
- ⚠️ Needs: Telegram Bot Token credentials + TELEGRAM_CHAT_ID env var in n8n
- ⚠️ Needs: N8N_WEBHOOK_URL in Next.js .env.local
- ⚠️ Needs: Workflow ACTIVATION (currently inactive)

**Menu Data:**
- `lib/menu-data.ts` — 9 categories, 150+ items
- Categories: signatures, cocktails, wine, whiskey, spirits, beer, food, soft, shots
- All prices from physical menu photos

### ✅ Phase 3 — Staff Dashboard (COMPLETE)
**Orders Store:**
- `lib/orders-store.ts` — in-memory singleton, survives hot-reload
- `app/api/orders/route.ts` — GET (read all) + PATCH (update status)
- `app/api/order/route.ts` — updated to save to store on POST

**Staff Dashboard:**
- `app/staff/page.tsx` — password-protected dashboard
- `app/staff/dashboard.module.css` — dark vintage styling
- Password: `drift2024` (stored in sessionStorage after login)
- Auto-refresh every 10 seconds
- Sound alert (Web Audio API beep) on new orders
- Order cards: table, items, total, time ago, status
- Status actions: "Видяна ✓" / "Готова ✅"
- Mobile-responsive grid

## Performance Metrics

| Phase | Plans | Total | Status |
|-------|-------|-------|--------|
| 1. Foundation & Menu | 3/3 | ~30 min | ✅ Complete |
| 2. Ordering System | 2/2 | ~45 min | ✅ Complete |
| 3. Staff Dashboard | 2/2 | ~30 min | ✅ Complete |
| 4. Deployment | 0/TBD | - | ⏳ Next |

## Accumulated Context

### Decisions
- Phase 1: Use Next.js App Router + vintage aesthetic matching landing page
- Phase 2: Use n8n for backend workflows (no custom backend needed)
- Phase 2: Cart persists via localStorage
- Phase 2: Table number entered in cart drawer before order
- Phase 3: Use shared password for staff dashboard (simpler than per-user auth for v1)
- Phase 3: Orders persist in memory (global singleton, NOT in DB — resets on server restart)
- Phase 2: Use Telegram for staff notifications (staff already uses it)
- Phase 1: Display prices in EUR
- Menu: 9 categories from real physical menu photos

### Pending Todos
- Configure Telegram Bot Token in n8n (manual step by owner)
- Add TELEGRAM_CHAT_ID env var in n8n (manual step)
- Add N8N_WEBHOOK_URL to .env.local (manual step)
- ACTIVATE n8n workflow N5ObadlwGyp6JnWE in n8n UI

### Blockers/Concerns
- Telegram bot token needed for n8n workflow — owner must provide
- n8n webhook URL must be added to Next.js env
- Orders are in-memory only — restart = lost orders (acceptable for v1)
- Staff password is hardcoded (`drift2024`) — change before production

## Session Continuity

Last session: 2026-03-06
Stopped at: Phase 3 complete. Staff dashboard + orders API + n8n workflow fixed.
Next: Phase 4 — Vercel deployment, QR codes, production config
