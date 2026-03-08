# 🎸 Drift Bar Plovdiv — SKILLS GUIDE

> Пълно ръководство за разработчиците на проекта. Съдържа архитектура, workflows и бест практики.

---

## 📁 Структура на проекта

```
drift-bar-plovdiv/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page (главна страница)
│   ├── landing.module.css        # Стилове за landing
│   ├── menu/                     # Дигитално меню
│   │   ├── page.tsx              # Меню страница
│   │   ├── menu.module.css       # Меню стилове
│   │   └── components/
│   │       ├── MenuItem.tsx      # Компонент за продукт
│   │       ├── CartDrawer.tsx    # Количка (drawer)
│   │       └── OrderSuccess.tsx  # Успешна поръчка
│   ├── reservations/             # Резервации (клиентска форма)
│   │   ├── page.tsx
│   │   └── reservations.module.css
│   ├── staff/                    # Staff Dashboard
│   │   ├── page.tsx
│   │   └── staff.module.css
│   └── api/                      # REST API endpoints
│       ├── menu/route.ts         # GET меню данни
│       ├── order/route.ts        # POST нова поръчка
│       ├── orders/route.ts       # GET всички поръчки
│       ├── reservations/
│       │   ├── route.ts          # GET/POST резервации
│       │   └── [id]/route.ts     # PATCH/DELETE резервация по ID
│       └── availability/route.ts # GET наличност по дата
├── lib/
│   ├── menu-data.ts              # Всички продукти и категории
│   ├── prisma.ts                 # Prisma клиент (singleton)
│   └── generate-placeholder.ts  # SVG placeholder генератор
├── prisma/
│   ├── schema.prisma             # DB схема (5 модела)
│   └── dev.db                   # SQLite база данни
├── public/
│   ├── menu-images/              # ~144 продуктови изображения
│   ├── assets/                   # Снимки на бара
│   └── logo.png
├── content-engine/               # AI Content Generation toolkit
│   ├── tools/
│   │   ├── image_gen.py          # Google AI image generation
│   │   ├── video_gen.py          # Veo video generation
│   │   ├── config.py             # API ключове и настройки
│   │   └── upload.py             # Google Cloud Storage upload
│   ├── generate_menu_images.py   # Batch меню снимки
│   ├── generate_remaining_spirits.py  # Спиртни напитки
│   ├── generate_event_posters.py # Постери за събития
│   └── .claude/.env              # API ключове (НЕ commit-вай!)
├── scripts/
│   └── generate-menu-images.js  # SVG placeholder скрипт
└── next.config.js
```

---

## 🗄️ База данни (Prisma + SQLite)

### Модели

```prisma
# Резервации
Reservation {
  id        String   @id @default(cuid())
  name      String
  email     String?
  phone     String
  date      DateTime
  time      String
  guests    Int
  notes     String?
  status    String   @default("pending")  # pending | confirmed | cancelled
  createdAt DateTime @default(now())
}

# Поръчки
Order {
  id          String      @id @default(cuid())
  tableNumber Int
  status      String      @default("pending")  # pending | preparing | ready | delivered
  totalAmount Float
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  items       OrderItem[]
}

# Артикули в поръчката
OrderItem {
  id        String @id @default(cuid())
  orderId   String
  itemId    String
  name      String
  price     Float
  quantity  Int
  order     Order  @relation(...)
}

# Маси
Table {
  id        Int    @id
  capacity  Int    @default(4)
  isActive  Boolean @default(true)
}

# Наличност
Availability {
  id        String   @id @default(cuid())
  date      DateTime
  timeSlot  String
  maxGuests Int      @default(99)
  booked    Int      @default(0)
}
```

### Prisma команди

```bash
# Прилагане на миграции
npx prisma migrate dev --name <описание>

# Преглед на базата в браузър
npx prisma studio

# Ресет на базата
npx prisma migrate reset

# Генериране на клиент след schema промяна
npx prisma generate
```

---

## 🍸 Меню данни (`lib/menu-data.ts`)

### Структура на категория

```typescript
categoryKey: {
  title: string,          // Заглавие (напр. "Коктейли")
  titleAccent: string,    // Акцент (напр. "& Drinks")
  subtitle: string,       // Подзаглавие (напр. "50 мл")
  type: 'cocktail' | 'simple' | 'wine' | 'food' | 'beer',
  items: MenuItem[]
}
```

### Структура на MenuItem

```typescript
{
  id: string,        // Уникален ID (напр. 'cock-bloody-mary')
  name: string,      // Показвано Бг/Ен наименование
  price: number,     // Цена в EUR
  desc: string,      // Описание / съставки
  image?: string,    // Път до изображение (/menu-images/...)
  tags?: string[],   // ['Premium', 'Aged', 'Non-alc', 'Vegan']
  volume?: string,   // Опционален обем (напр. '50/30 мл')
}
```

### Категории (ключове)

| Ключ | Категория | Тип |
|------|-----------|-----|
| `cocktails` | Коктейли | cocktail |
| `wine` | Вино | wine |
| `whiskey` | Уиски | simple |
| `bourbon` | Бърбън | simple |
| `vodka` | Водка | simple |
| `gin` | Джин | simple |
| `rum` | Ром | simple |
| `tequila` | Текила | simple |
| `rakiya` | Ракия | simple |
| `brandy` | Бренди / Коняк | simple |
| `liqueurs` | Ликьори | simple |
| `digestifs` | Дижестиви | simple |
| `beer` | Бира | beer |
| `softdrinks` | Безалк. напитки | simple |
| `shots` | Шотове | simple |
| `food` | Хапки | food |

---

## 🖼️ Изображения на продуктите

### Конвенция за именуване

```
/public/menu-images/
├── cocktail_<name>.png           # AI-генерирани коктейлни снимки
├── spirit-<brand>.png            # AI-генерирани premium спиртни
├── wine-<color>-<volume>.png     # AI-генерирани вина
├── wh-<brand>.png                # Уискита
├── bourbon-<brand>.png           # Бърбъни
├── vodka-<brand>.png             # Водки
├── gin-<brand>.png               # Джинове
├── rum-<brand>.png               # Ромове
├── tequila-<brand>.png           # Текили
├── brandy-<brand>.png            # Бренди/Коняци
├── liqueur-<brand>.png           # Ликьори
├── digestif-<brand>.png          # Дижестиви
├── beer-<brand>.png              # Бира
└── <category>-<brand>.svg        # SVG плейсхолдъри
```

### Статус на изображения

- **95 PNG/JPG** — AI-генерирани реални снимки
- **49 SVG** — premium dark-theme плейсхолдъри

### Генериране на нови снимки

```bash
# От content-engine директорията:
cd content-engine

# Генериране на конкретни продукти
python generate_remaining_spirits.py

# Генериране на event постери
python generate_event_posters.py

# Тест на API връзката
python tools/image_gen.py
```

---

## 🤖 Content Engine (AI генерация)

### Конфигурация (`content-engine/.claude/.env`)

```env
GOOGLE_API_KEY=<API ключ от Google AI Studio>
GCS_BUCKET_NAME=drift-bar-generated-content
GOOGLE_SHEETS_ID=<ID на Google Sheet>
GOOGLE_SERVICE_ACCOUNT_JSON=<пълен път към service-account.json>
```

### Използвани модели

| Модел | Цел | Цена |
|-------|-----|------|
| `gemini-3.1-flash-image-preview` | Генериране на изображения | ~$0.067/снимка |
| `veo-3.1` | Генериране на видео | ~$0.50/клип |

### Quota reset
- Ако се изчерпи квотата на Gemini: **~5 часа** до ресет
- Google Cloud API: по-висока квота, ресет всеки 24ч

---

## 📱 Мобилна оптимизация

### Touch targets
- Минимален размер: **44×44px** (Apple HIG стандарт)
- Всички бутони: `min-height: 44px`

### Safe-area insets (iOS notch)
```css
padding-bottom: env(safe-area-inset-bottom);
padding-top: env(safe-area-inset-top);
```

### Scroll indicators
- Хоризонтален scroll с fade индикатори
- `overflow-x: auto` + `-webkit-overflow-scrolling: touch`

---

## 🚀 Dev команди

```bash
# Стартиране на dev сървъра
npm run dev          # → http://localhost:3000

# Production build
npm run build

# Stартиране на production
npm run start

# Prisma Studio (DB преглед)
npx prisma studio    # → http://localhost:5555

# Тип проверка
npx tsc --noEmit

# Lint проверка
npm run lint
```

---

## 📞 Контактна информация (сайта)

| Поле | Стойност |
|------|---------|
| Адрес | ул. „Сливница" 2a, 4003 Кършияка Северен, Пловдив |
| Телефон 1 | +359 98 879 3684 |
| Телефон 2 | +359 98 879 3686 |
| Email 1 | info@driftbarplovdiv.com |
| Email 2 | driftbar@abv.bg |
| Instagram | @drift_bar_plovdiv |
| Facebook | Drift.Bar.Plovdiv |
| Google Maps | https://maps.app.goo.gl/V6z6ackykTwdEzgV7 |

---

## ✅ Завършени фази

| Фаза | Описание | Статус |
|------|----------|--------|
| Phase 1 | Database & Reservation System | ✅ Завършена |
| Phase 2 | Mobile UX & Responsiveness | ✅ Завършена |
| Phase 3 | AI Image Generation (119 продукта) | ✅ Завършена |
| Phase 4 | Documentation | ✅ Завършена |
| Phase 5 | Events & Blog + n8n workflows | 🔜 Следваща |
