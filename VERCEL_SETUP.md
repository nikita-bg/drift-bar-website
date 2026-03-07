# 🚀 Vercel Deployment Guide — Drift Bar Plovdiv

## Проблемът

SQLite не работи на Vercel (serverless среда без persistent файлова система).
Решение: **Neon PostgreSQL** — безплатен, serverless PostgreSQL, перфектен за Vercel.

---

## Стъпка 1: Създай безплатна Neon база данни

1. Отиди на **[neon.tech](https://neon.tech)** и се регистрирай безплатно
2. Кликни **"New Project"**
3. Настрой:
   - **Project name:** `drift-bar-plovdiv`
   - **Region:** `EU Central (Frankfurt)` ← най-близо до България
   - **Database name:** `drift_bar`
4. Кликни **"Create project"**
5. Копирай **Connection string** (изглежда така):
   ```
   postgresql://drift_bar_owner:xxxxx@ep-xxx.eu-central-1.aws.neon.tech/drift_bar?sslmode=require
   ```

---

## Стъпка 2: Добави Database URL в Vercel

1. Отиди в **Vercel Dashboard → твоя проект → Settings → Environment Variables**
2. Добави:
   ```
   Name:  DATABASE_URL
   Value: postgresql://drift_bar_owner:xxxxx@ep-xxx.eu-central-1.aws.neon.tech/drift_bar?sslmode=require
   ```
3. Избери **Production + Preview + Development**
4. Кликни **"Save"**

---

## Стъпка 3: Приложи миграциите

След като добавиш DATABASE_URL локално в `.env`:

```bash
# Генерирай Prisma клиент за PostgreSQL
npx prisma generate

# Приложи схемата към Neon (без migration history)
npx prisma db push

# Провери дали е наред
npx prisma studio
```

---

## Стъпка 4: Redeploy на Vercel

```bash
# Commit промените
git add -A
git commit -m "feat: switch to PostgreSQL (Neon) for Vercel deployment"
git push
```

Vercel автоматично ще направи нов deploy.

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
