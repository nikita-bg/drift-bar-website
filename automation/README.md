# Drift Bar — Automation Setup

## Current Workflows

### Questionnaire Workflow (Active)
- **File:** `drift-bar-questionnaire-workflow-final.json`
- **Purpose:** Google Forms → n8n → Telegram notifications
- **Status:** Configured, awaiting activation

## Setup Instructions

1. Import workflow JSON to n8n instance: `simplifyopsco.app.n8n.cloud`
2. Configure Telegram Bot Token
3. Set `TELEGRAM_CHAT_ID` environment variable
4. Activate workflow

## Future Pipelines (Planned)

See [agents/outputs/06_automation_architecture.md](../agents/outputs/06_automation_architecture.md) for detailed plans:

- **Event Generation Pipeline** — Google Calendar → Claude → Facebook/Instagram
- **Daily Post Queue** — Google Sheets (content queue) → Meta API
- **Reservation Pipeline** — Vercel form → Google Sheets → Email
- **Review Request** — Post-event → Customer outreach (Email/SMS)
- **Weekly Reports** — Analytics aggregation
- **Loyalty System** — QR scans → Points tracking

## n8n Instance

**URL:** https://simplifyopsco.app.n8n.cloud

## Environment Variables Needed

```
TELEGRAM_BOT_TOKEN=<your-bot-token>
TELEGRAM_CHAT_ID=<your-chat-id>
N8N_WEBHOOK_URL=<n8n-webhook-endpoint>
```

## Integration Points

- ✅ Next.js ordering system (`/api/order`) → n8n webhook → Telegram
- ⏳ Google Calendar events → Social media posts (planned)
- ⏳ Google Sheets content queue → Automated posting (planned)
