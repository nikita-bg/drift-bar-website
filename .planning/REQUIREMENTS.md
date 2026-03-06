# Requirements: Drift Bar Plovdiv

**Defined:** 2026-03-06
**Core Value:** Customers can order drinks and food from their table without waiting for a server, and staff instantly receives orders via Telegram notification.

## v1 Requirements

### Menu System

- [ ] **MENU-01**: Customer can scan QR code and open digital menu
- [ ] **MENU-02**: Menu displays items in categories (коктейли, класика, вино, уиски, бира)
- [ ] **MENU-03**: Each item shows name, description, and price in EUR
- [ ] **MENU-04**: Menu is mobile-responsive (primary use case)
- [ ] **MENU-05**: Menu matches vintage aesthetic of landing page (grain, sepia tones)

### Ordering

- [ ] **ORDER-01**: Customer can select items from menu
- [ ] **ORDER-02**: Customer can specify table number
- [ ] **ORDER-03**: Customer can submit order
- [ ] **ORDER-04**: Order sent to n8n webhook endpoint
- [ ] **ORDER-05**: Order confirmation shown to customer

### Staff Notifications

- [ ] **NOTIF-01**: n8n receives order webhook
- [ ] **NOTIF-02**: Telegram bot sends notification to staff
- [ ] **NOTIF-03**: Notification includes table number, items, timestamp

### Staff Dashboard

- [ ] **DASH-01**: Dashboard displays live orders list
- [ ] **DASH-02**: Each order shows table, items, timestamp
- [ ] **DASH-03**: Dashboard protected by shared password
- [ ] **DASH-04**: Dashboard shows upcoming reservations

### Reservations

- [ ] **RES-01**: Customer can fill reservation form (name, phone, date, time, guests)
- [ ] **RES-02**: Reservation saved to database/sheet
- [ ] **RES-03**: Staff sees reservations in dashboard
- [ ] **RES-04**: Reservation confirmation sent to customer (email or displayed)

### Data Management

- [ ] **DATA-01**: Menu items loaded from structured file (converted from PDF)
- [ ] **DATA-02**: Menu prices editable without redeployment
- [ ] **DATA-03**: Reservation data persisted (database or Google Sheets)

### Deployment

- [ ] **DEPLOY-01**: Next.js app deployed to Vercel
- [ ] **DEPLOY-02**: n8n workflow configured and active
- [ ] **DEPLOY-03**: Telegram bot configured
- [ ] **DEPLOY-04**: QR codes generated for tables
- [ ] **DEPLOY-05**: Custom domain connected

## v2 Requirements

### Payments

- **PAY-01**: Customer can prepay order via Stripe
- **PAY-02**: Reservation requires deposit via Stripe
- **PAY-03**: Payment confirmation triggers order

### Advanced Features

- **ADV-01**: Order status tracking (confirmed/preparing/ready)
- **ADV-02**: Google Calendar sync for reservations
- **ADV-03**: Per-user staff accounts with roles
- **ADV-04**: Menu admin panel for staff to edit items
- **ADV-05**: Order history and analytics

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-language (EN/DE) | Bulgarian-only for v1, defer translations |
| Real-time order updates | Telegram notification sufficient for v1 |
| Customer accounts | Not needed for in-venue ordering |
| Inventory management | Manual tracking for v1 |
| Table availability | No reservation conflicts expected initially |
| Mobile app | PWA/web sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MENU-01 | Phase 1 | Pending |
| MENU-02 | Phase 1 | Pending |
| MENU-03 | Phase 1 | Pending |
| MENU-04 | Phase 1 | Pending |
| MENU-05 | Phase 1 | Pending |
| DATA-01 | Phase 1 | Pending |
| ORDER-01 | Phase 2 | Pending |
| ORDER-02 | Phase 2 | Pending |
| ORDER-03 | Phase 2 | Pending |
| ORDER-04 | Phase 2 | Pending |
| ORDER-05 | Phase 2 | Pending |
| NOTIF-01 | Phase 2 | Pending |
| NOTIF-02 | Phase 2 | Pending |
| NOTIF-03 | Phase 2 | Pending |
| DASH-01 | Phase 3 | Pending |
| DASH-02 | Phase 3 | Pending |
| DASH-03 | Phase 3 | Pending |
| DASH-04 | Phase 3 | Pending |
| RES-01 | Phase 3 | Pending |
| RES-02 | Phase 3 | Pending |
| RES-03 | Phase 3 | Pending |
| RES-04 | Phase 3 | Pending |
| DATA-02 | Phase 3 | Pending |
| DATA-03 | Phase 3 | Pending |
| DEPLOY-01 | Phase 4 | Pending |
| DEPLOY-02 | Phase 4 | Pending |
| DEPLOY-03 | Phase 4 | Pending |
| DEPLOY-04 | Phase 4 | Pending |
| DEPLOY-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29/29 (100%)
- Unmapped: 0

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-06 after roadmap creation*
