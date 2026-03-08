# 🚀 Vercel Deployment Guide — Drift Bar Plovdiv

## ✅ Статус: База данни конфигурирана

**Neon PostgreSQL** проектът е създаден и работещ:
- 🆔 Project ID: `damp-mountain-67011816`
- 📍 Region: `EU Central (Frankfurt)`
- 🗄️ Database: `neondb`
- ✅ Prisma schema синхронизиран
- ✅ Next.js build успешен локално

---

## 🔧 Следващи стъпки за Vercel deployment

### Стъпка 1: Добави DATABASE_URL в Vercel

1. Отиди в **Vercel Dashboard → твоя проект → Settings → Environment Variables**
2. Добави:
   ```
   Name:  DATABASE_URL
   Value: postgresql://neondb_owner:npg_mWKtVoa0XG1Q@ep-royal-cell-ala6if81-pooler.c-3.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
   ```
3. Избери **Production + Preview + Development**
4. Кликни **"Save"**

> ⚠️ **Важно:** Не добавяй DATABASE_URL в git - той вече е в `.env` (който е в `.gitignore`)

---

### Стъпка 2: Redeploy на Vercel

След като добавиш DATABASE_URL:

1. **Vercel Dashboard → Deployments → Redeploy**
   ИЛИ
2. Push промени към git:
   ```bash
   git push origin master
   ```

Vercel автоматично ще deploy-не с новата база данни.

---

## 📊 Локална разработка

DATABASE_URL вече е конфигуриран в `.env` файла. За да работиш локално:

```bash
# Провери дали Prisma Client е генериран
npx prisma generate

# Отвори Prisma Studio за да видиш таблиците
npx prisma studio

# Стартирай dev сървър
npm run dev
```

---

## Опционални Environment Variables

Добави в Vercel Dashboard ако искаш Telegram уведомления:

| Ключ | Стойност | Описание |
|------|----------|----------|
| `N8N_WEBHOOK_URL` | `https://...` | n8n webhook URL |
| `TELEGRAM_BOT_TOKEN` | `123456:ABC...` | Telegram бот токен |
| `TELEGRAM_CHAT_ID` | `-100123456` | ID на чат/група |

---

## Локална разработка с Neon

Добави в `.env` файла:
```env
DATABASE_URL="postgresql://drift_bar_owner:xxxxx@ep-xxx.eu-central-1.aws.neon.tech/drift_bar?sslmode=require"
```

> 💡 **Алтернатива за локала:** Инсталирай PostgreSQL локално или използвай Docker:
> ```bash
> docker run --name drift-bar-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=drift_bar -p 5432:5432 -d postgres
> # DATABASE_URL="postgresql://postgres:postgres@localhost:5432/drift_bar"
> ```

---

## Checklist

- [ ] Neon акаунт създаден
- [ ] DATABASE_URL добавен в Vercel
- [ ] `npx prisma db push` изпълнен
- [ ] Vercel deploy успешен
- [ ] `/api/availability` работи
- [ ] `/api/reservations` работи
- [ ] Staff Dashboard зарежда резервации
