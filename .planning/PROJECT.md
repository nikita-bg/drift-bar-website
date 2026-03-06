# Drift Bar Plovdiv - Digital Menu & Reservation System

## What This Is

A Next.js web app for Drift Bar Plovdiv that lets customers browse the digital menu and place orders from their table via QR code, plus a staff dashboard for managing orders and reservations. Backend powered by n8n workflows for Telegram notifications and integrations.

## Core Value

Customers can order drinks and food from their table without waiting for a server, and staff instantly receives orders via Telegram notification.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Customers can scan QR code at their table and view digital menu
- [ ] Menu displays items in categories (коктейли, класика, вино, уиски, бира) with prices in EUR
- [ ] Customers can select items and send order with table number
- [ ] n8n webhook receives order and sends Telegram notification to staff
- [ ] Staff dashboard shows live orders (table number, items, timestamp)
- [ ] Customers can make reservation via form (name, phone, date, time, guests)
- [ ] Staff dashboard shows upcoming reservations
- [ ] Menu data loaded from structured file (PDF menu in project will be converted)
- [ ] Staff dashboard protected by simple shared password
- [ ] Responsive design works on mobile (customer primary use case)

### Out of Scope

- Stripe payment integration — defer to v2 (order-ahead with prepayment)
- Google Calendar sync — defer to v2
- Per-user staff accounts — v1 uses shared password
- Menu admin panel — v1 menu updated via file/database manually
- Order status updates (confirmed/preparing/ready) — v1 is one-way notification
- Multi-language support — v1 is Bulgarian only

## Context

**Existing work:**
- Landing page already built (static HTML, vintage record store aesthetic)
- Menu HTML template exists (menu.html) but needs Next.js migration
- PDF menu file available ("Drift Bar menu_PRW--2.pdf") — needs data extraction
- QR codes page exists (qr-codes.html) — will integrate with Next.js menu URLs

**Design system:**
- Vintage Analog / Record Store aesthetic (warm sepia, film grain, Space Grotesk font)
- Must match existing landing page style
- Vinyl logo and parchment feel

**Tech stack constraints:**
- Next.js 14 (App Router)
- Vercel deployment (ready)
- GitHub repo (ready)
- n8n for workflows (Telegram, webhooks)
- Domain ready

**Menu data:**
- PDF menu exists but lacks prices
- Prices will be provided later in EUR
- Categories: коктейли, класика, вино, уиски, бира
- Need to extract menu items from PDF and structure for app

## Constraints

- **Timeline**: Build v1 quickly (owner is waiting)
- **Budget**: Free tier Vercel + n8n cloud
- **Language**: Bulgarian for all UI text
- **Mobile-first**: Customers use phones at tables
- **No backend database initially**: Use file-based or Google Sheets for menu
- **Telegram dependency**: Staff notifications require Telegram bot setup

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over static HTML for menu | Need dynamic menu updates and order submission | — Pending |
| n8n for backend | No custom backend needed, fast workflow setup | — Pending |
| Shared password for staff | Simpler than per-user auth for v1, faster to build | — Pending |
| Telegram for notifications | Staff already uses Telegram, instant push | — Pending |
| Defer Stripe to v2 | Payment not needed for in-venue orders, focus on core ordering flow first | — Pending |
| EUR for prices | International audience in Plovdiv | — Pending |

---
*Last updated: 2026-03-06 after initialization*
