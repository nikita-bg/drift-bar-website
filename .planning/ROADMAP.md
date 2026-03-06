# Roadmap: Drift Bar Plovdiv - Digital Menu & Reservation System

## Overview

Transform Drift Bar Plovdiv into a digitally-enabled venue where customers scan QR codes to order from their table and staff receives instant Telegram notifications. Build on existing landing page aesthetic and deploy a Next.js app with n8n-powered backend workflows for menu browsing, ordering, reservations, and staff management.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Menu** - Next.js setup, menu data structure, digital menu display
- [ ] **Phase 2: Ordering System** - Order submission, n8n webhook, Telegram notifications
- [ ] **Phase 3: Staff Dashboard & Reservations** - Staff interface, reservations, dashboard protection
- [ ] **Phase 4: Deployment & Polish** - Vercel deployment, QR codes, domain, production readiness

## Phase Details

### Phase 1: Foundation & Menu
**Goal**: Customers can scan QR code and browse digital menu on mobile
**Depends on**: Nothing (first phase)
**Requirements**: MENU-01, MENU-02, MENU-03, MENU-04, MENU-05, DATA-01
**Success Criteria** (what must be TRUE):
  1. Customer can scan QR code and open menu in mobile browser
  2. Menu displays all items grouped by category (коктейли, класика, вино, уиски, бира)
  3. Each menu item shows name, description, and price in EUR
  4. Menu matches vintage aesthetic of landing page (grain, sepia tones, Space Grotesk font)
  5. Menu is fully responsive on mobile devices
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Next.js setup with TypeScript and vintage aesthetic foundation
- [ ] 01-02-PLAN.md — Menu data structure and API route
- [ ] 01-03-PLAN.md — Responsive menu UI components with vintage styling

### Phase 2: Ordering System
**Goal**: Customers can submit orders and staff receives instant Telegram notifications
**Depends on**: Phase 1
**Requirements**: ORDER-01, ORDER-02, ORDER-03, ORDER-04, ORDER-05, NOTIF-01, NOTIF-02, NOTIF-03
**Success Criteria** (what must be TRUE):
  1. Customer can select menu items and add them to order
  2. Customer can specify table number before submitting
  3. Customer receives confirmation after order submission
  4. Staff receives Telegram notification with table number, ordered items, and timestamp
  5. n8n workflow successfully processes order webhook and sends notification
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Staff Dashboard & Reservations
**Goal**: Staff can view live orders and reservations in protected dashboard
**Depends on**: Phase 2
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, RES-01, RES-02, RES-03, RES-04, DATA-02, DATA-03
**Success Criteria** (what must be TRUE):
  1. Staff can access dashboard with shared password
  2. Dashboard displays all submitted orders with table number, items, and timestamp
  3. Customers can submit reservation form (name, phone, date, time, guests)
  4. Staff sees list of upcoming reservations in dashboard
  5. Reservation data persists across sessions
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Deployment & Polish
**Goal**: System is live in production with QR codes at tables
**Depends on**: Phase 3
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05
**Success Criteria** (what must be TRUE):
  1. Next.js app deployed to Vercel and accessible via custom domain
  2. n8n workflows configured and active in production
  3. Telegram bot configured and sending notifications to staff
  4. QR codes generated for each table and point to correct menu URLs
  5. Menu prices editable without redeployment
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Menu | 0/3 | Planned | - |
| 2. Ordering System | 0/TBD | Not started | - |
| 3. Staff Dashboard & Reservations | 0/TBD | Not started | - |
| 4. Deployment & Polish | 0/TBD | Not started | - |
