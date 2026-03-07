# 🔌 Drift Bar Plovdiv — API Reference

> Пълна документация на всички REST API endpoints.
> Base URL: `http://localhost:3000` (dev) | `https://driftbarplovdiv.com` (prod)

---

## 📋 Общо

### Формат на отговорите

Всички endpoints връщат JSON. При грешка:

```json
{
  "error": "Описание на грешката"
}
```

### HTTP статус кодове

| Код | Значение |
|-----|----------|
| `200` | OK — успешен GET |
| `201` | Created — успешно създаден ресурс |
| `400` | Bad Request — липсващи/невалидни данни |
| `404` | Not Found — ресурсът не съществува |
| `500` | Internal Server Error |

---

## 🍸 Menu API

### `GET /api/menu`

Връща всички категории и продукти от менюто.

**Request:** Без параметри

**Response:**
```json
{
  "categories": {
    "cocktails": {
      "title": "Коктейли",
      "titleAccent": "& Drinks",
      "subtitle": "50 мл",
      "type": "cocktail",
      "items": [
        {
          "id": "cock-bloody-mary",
          "name": "Bloody Mary",
          "price": 6,
          "desc": "Водка, доматен сок, фреш лимон",
          "image": "/menu-images/cocktail_bloody_mary.png",
          "tags": []
        }
      ]
    }
  }
}
```

---

## 🛒 Orders API

### `POST /api/order`

Създава нова поръчка от маса.

**Request Body:**
```json
{
  "tableNumber": 5,
  "items": [
    {
      "id": "cock-bloody-mary",
      "name": "Bloody Mary",
      "price": 6,
      "quantity": 2
    },
    {
      "id": "wh-jameson",
      "name": "Jameson",
      "price": 5,
      "quantity": 1
    }
  ]
}
```

**Задължителни полета:**
- `tableNumber` (number) — номер на масата (1–20)
- `items` (array) — масив с минимум 1 артикул
  - `id` (string) — ID на продукта
  - `name` (string) — Наименование
  - `price` (number) — Цена на бройка
  - `quantity` (number) — Количество (≥1)

**Response `201`:**
```json
{
  "success": true,
  "order": {
    "id": "clx123abc...",
    "tableNumber": 5,
    "status": "pending",
    "totalAmount": 17,
    "createdAt": "2026-03-07T15:00:00.000Z",
    "items": [...]
  }
}
```

---

### `GET /api/orders`

Връща всички поръчки (за Staff Dashboard).

**Query параметри:**

| Параметър | Тип | Описание |
|-----------|-----|----------|
| `status` | string | Филтър: `pending`, `preparing`, `ready`, `delivered` |
| `table` | number | Филтър по номер на маса |

**Примери:**
```
GET /api/orders
GET /api/orders?status=pending
GET /api/orders?table=5
```

**Response `200`:**
```json
{
  "orders": [
    {
      "id": "clx123abc...",
      "tableNumber": 5,
      "status": "pending",
      "totalAmount": 17,
      "createdAt": "2026-03-07T15:00:00.000Z",
      "items": [
        {
          "id": "item1",
          "name": "Bloody Mary",
          "price": 6,
          "quantity": 2
        }
      ]
    }
  ]
}
```

---

## 📅 Reservations API

### `POST /api/reservations`

Създава нова резервация.

**Request Body:**
```json
{
  "name": "Иван Петров",
  "email": "ivan@example.com",
  "phone": "+359 88 123 4567",
  "date": "2026-03-14",
  "time": "21:00",
  "guests": 4,
  "notes": "Рожден ден, моля резервирайте маса до сцената"
}
```

**Задължителни полета:**
- `name` (string)
- `phone` (string)
- `date` (string) — формат `YYYY-MM-DD`
- `time` (string) — формат `HH:MM`
- `guests` (number) — 1–6 (за по-големи групи се обадете)

**Опционални:**
- `email` (string)
- `notes` (string)

**Response `201`:**
```json
{
  "success": true,
  "reservation": {
    "id": "clx456def...",
    "name": "Иван Петров",
    "email": "ivan@example.com",
    "phone": "+359 88 123 4567",
    "date": "2026-03-14T00:00:00.000Z",
    "time": "21:00",
    "guests": 4,
    "notes": "Рожден ден...",
    "status": "pending",
    "createdAt": "2026-03-07T15:00:00.000Z"
  }
}
```

---

### `GET /api/reservations`

Връща всички резервации (за Staff Dashboard).

**Query параметри:**

| Параметър | Тип | Описание |
|-----------|-----|----------|
| `date` | string | Филтър по дата `YYYY-MM-DD` |
| `status` | string | `pending`, `confirmed`, `cancelled` |

**Примери:**
```
GET /api/reservations
GET /api/reservations?date=2026-03-14
GET /api/reservations?status=pending
```

**Response `200`:**
```json
{
  "reservations": [
    {
      "id": "clx456def...",
      "name": "Иван Петров",
      "phone": "+359 88 123 4567",
      "date": "2026-03-14T00:00:00.000Z",
      "time": "21:00",
      "guests": 4,
      "status": "pending",
      "notes": "",
      "createdAt": "2026-03-07T15:00:00.000Z"
    }
  ]
}
```

---

### `PATCH /api/reservations/[id]`

Обновява статуса на резервация.

**URL параметри:**
- `id` — ID на резервацията

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Валидни статуси:** `pending` | `confirmed` | `cancelled`

**Response `200`:**
```json
{
  "success": true,
  "reservation": {
    "id": "clx456def...",
    "status": "confirmed",
    ...
  }
}
```

---

### `DELETE /api/reservations/[id]`

Изтрива резервация.

**Response `200`:**
```json
{
  "success": true
}
```

---

## 📊 Availability API

### `GET /api/availability`

Проверява наличността за конкретна дата.

**Query параметри:**

| Параметър | Тип | Задължителен | Описание |
|-----------|-----|-------------|----------|
| `date` | string | ✅ | Дата `YYYY-MM-DD` |

**Пример:**
```
GET /api/availability?date=2026-03-14
```

**Response `200`:**
```json
{
  "date": "2026-03-14",
  "timeSlots": [
    {
      "time": "20:00",
      "available": true,
      "bookedGuests": 12,
      "maxGuests": 99,
      "remainingCapacity": 87
    },
    {
      "time": "21:00",
      "available": true,
      "bookedGuests": 35,
      "maxGuests": 99,
      "remainingCapacity": 64
    },
    {
      "time": "22:00",
      "available": false,
      "bookedGuests": 99,
      "maxGuests": 99,
      "remainingCapacity": 0
    }
  ],
  "totalBooked": 146,
  "totalCapacity": 297
}
```

---

## 🌐 Страници (SSR/SSG)

| Route | Тип | Описание |
|-------|-----|----------|
| `/` | Static | Landing page |
| `/menu` | Static | Дигитално меню с количка |
| `/reservations` | Static | Клиентска форма за резервации |
| `/staff` | Static | Staff Dashboard (поръчки + резервации) |

---

## 📦 n8n Webhooks (Phase 5)

> Тези endpoints ще бъдат добавени в Phase 5.

| Webhook | Цел |
|---------|-----|
| `/api/webhooks/new-order` | → Telegram уведомление за нова поръчка |
| `/api/webhooks/new-reservation` | → Telegram/Email за нова резервация |
| `/api/webhooks/order-status` | → Уведомление за промяна на статус |

---

## 🔧 Примерни cURL заявки

```bash
# Нова поръчка
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "tableNumber": 3,
    "items": [{"id": "cock-margarita", "name": "Margarita", "price": 7, "quantity": 2}]
  }'

# Всички чакащи резервации
curl "http://localhost:3000/api/reservations?status=pending"

# Наличност за дата
curl "http://localhost:3000/api/availability?date=2026-03-14"

# Потвърди резервация
curl -X PATCH http://localhost:3000/api/reservations/clx456def \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```
