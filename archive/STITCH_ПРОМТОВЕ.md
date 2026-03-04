# 🎨 STITCH ПРОМТОВЕ — Drift Bar Plovdiv Website

> **Инструменти:** Stitch MCP (`mcp_stitch_generate_screen_from_text`)
> **Device:** DESKTOP
> **Проект:** Drift Bar Plovdiv

---

## 📋 Как да ги ползваш:

1. Създай проект в Stitch: `mcp_stitch_create_project` → "Drift Bar Plovdiv"
2. За всеки екран: `mcp_stitch_generate_screen_from_text` с промта по-долу
3. Прегледай → редактирай с `mcp_stitch_edit_screens` ако трябва
4. Експортирай кода → вгради в сайта

---

## 🏠 ПРОМТ 1 — Начална Страница (Homepage)

```
Design a premium, dark-themed landing page for "Drift Bar Plovdiv" — a live music rock bar located in Plovdiv, Bulgaria.

LAYOUT (top to bottom):
1. NAVIGATION BAR — sticky, transparent background that becomes solid on scroll. Logo "DRIFT BAR" on left (bold, modern typography). Menu links: Home, Menu, Events, Reserve, Contact. Language toggle BG/EN optional.

2. HERO SECTION — full-width, full-viewport height. Dark atmospheric background (imagine a moody rock bar with warm amber/purple lighting). Large headline: "СЦЕНА ОТ МУЗИКАНТИ ЗА МУЗИКАНТИ" (Scene by Musicians for Musicians). Subheading: "Живо. Чисто. Пловдив." Two CTA buttons: "Запази Маса" (primary, pink/magenta gradient) and "Виж Менюто" (secondary, outline).

3. RESERVATION FORM SECTION — dark card with glassmorphism effect. Title: "🗓️ Запази Маса". Form fields in a row: Date picker, Time selector (18:00-02:00), Number of guests (dropdown 1-10), Phone number, Name. Submit button: gradient pink/purple "Резервирай". Below: small text "Ще получите SMS потвърждение".

4. UPCOMING EVENTS SECTION — Title: "Предстоящи Концерти". 3-4 event cards in a horizontal row. Each card: dark background, date badge (day/month), band name, genre tag, time, small "Запази Маса" link. First card example: "Jazz Night — Този Четвъртък".

5. MENU PREVIEW SECTION — Title: "Опитай Нашите Хитове". 4 circular or rounded-square images of cocktails in a grid. Each with name and price below. CTA button: "Виж Пълното Меню →".

6. ABOUT SECTION — Two columns. Left: atmospheric photo placeholder. Right: short text about Drift Bar's concept, "Сцена от музиканти за музиканти — място където музиката е на първо място."

7. FOOTER — Dark. Address: ул. Сливница 2А, Пловдив. Working hours: 18:00 - 02:00. Social icons: Instagram, Facebook, TikTok. Google Maps embed placeholder. Copyright.

DESIGN SYSTEM:
- Background: #0a0a12 to #1a1a2e gradient
- Primary accent: linear-gradient(135deg, #7b2fbe, #e91e8c) — purple to pink
- Secondary accent: #fb923c (warm amber)
- Text: #ffffff (primary), rgba(255,255,255,0.6) (secondary)
- Cards: rgba(255,255,255,0.04) with border rgba(255,255,255,0.08)
- Border radius: 16px for cards, 50px for buttons
- Font: Inter or similar modern sans-serif
- Glassmorphism on reservation card: backdrop-filter blur(12px)
- Subtle hover animations on cards and buttons
- Mobile responsive
```

---

## 🍹 ПРОМТ 2 — Меню Страница (Menu Page)

```
Design a menu page for "Drift Bar Plovdiv" — a premium rock bar.

LAYOUT:
1. HEADER — Same navigation as homepage. Page title: "НАШЕТО МЕНЮ" with accent underline (pink/purple gradient). Subtitle: "Крафт коктейли, наливни бири и авторски мезета".

2. CATEGORY TABS — horizontal scrollable tabs: "Коктейли" (active), "Бири", "Безалкохолни", "Мезета & Разядки". Active tab has gradient underline.

3. COCKTAILS GRID — 2 columns on desktop, 1 on mobile. Each item card:
   - Left: round or square image of cocktail (placeholder, 120x120px)
   - Right: cocktail name (bold, white), short description (2 lines, light gray), price (gradient text, bold, right-aligned, e.g. "12 лв")
   - Cards have dark background with subtle hover glow effect

   Example cocktails (made up for demo):
   - "Drift Old Fashioned" — Бърбън, ангостура, портокалова кора — 14 лв
   - "Purple Haze" — Джин, лавандула, лимон, тоник — 12 лв
   - "Smoke on the Water" — Мескал, лайм, агаве, опушен — 16 лв
   - "Rock & Rye" — Ръж уиски, мед, цитрус — 13 лв
   - "The Amplifier" — Ром, ананас, кокос, лайм — 11 лв
   - "Backstage Pass" — Водка, маракуя, ванилия — 12 лв

4. BEERS SECTION — Similar grid. Items:
   - "Наливна Каменица" — 0.5L — 5 лв
   - "Загорка IPA" — 0.5L — 6 лв
   - "Craft Пилзнер" — 0.4L — 8 лв

5. SNACKS SECTION — Grid with:
   - "Начос с чедър" — 9 лв
   - "Брускети микс" — 11 лв
   - "Месна дъска" — 18 лв

6. FOOTER — same as homepage.

DESIGN:
- Same dark theme as homepage (#0a0a12)
- Gradient accents (purple-pink)
- Cards: glassmorphism, subtle borders
- Price tags: gradient text (standout)
- Smooth category transitions
- Mobile-first responsive
- Warm amber glow on food/drink images
```

---

## 💼 ПРОМТ 3 — Оферта / Презентация Страница

```
Design a marketing proposal landing page that Nikita (marketing expert) will send to potential clients. Dark premium design.

LAYOUT:
1. HERO — Full width. Headline: "Вашият Бар Заслужава Повече Клиенти" Subheading: "AI-задвижвано маркетингово решение — уебсайт, реклами, социални мрежи и SEO на цената на 1 служител." CTA: "Вижте Предложението ↓"

2. PROBLEM SECTION — Title: "Текущо Състояние". Data table or cards showing current metrics (Instagram: 41 followers, Facebook: 251, Google: Not setup, Website: None). Each with a red/yellow status chip. Dramatic, clear.

3. SERVICES GRID — Title: "Какво Получавате". 6 service cards in a 3×2 grid:
   - 🌐 AI Уебсайт (24-48ч)
   - 🎬 AI Видео Реклами
   - 📱 Автоматизиран Контент
   - 📍 Локално SEO + Google
   - 🤖 AI Управление на Реклами
   - 🎨 Пълен Брандинг
   Each with icon, title, 2-line description. Hover glow effect.

4. BONUSES SECTION — Title: "🎁 Безплатни Бонуси". Table showing market value vs "You pay: 0 лв". Items: Website (2000-5000 лв), Marketing Analysis (800-2500 лв), Branding (800-2500 лв), Google Setup (300-800 лв). Total: "5,300 – 14,800 лв → БЕЗПЛАТНО". Big visual impact.

5. PRICING SECTION — 3 pricing cards side by side:
   - Card 1: "% от Печалба" — 3% + 100 EUR мин.
   - Card 2: "Фиксиран" — 300 лв/мес (featured/highlighted)
   - Card 3: "Хибриден" — 150 лв + 2%
   Each with feature checklist. Middle card slightly larger (featured).

6. RESULTS SECTION — "Какво Очаквате за 3 Месеца". Before/After comparison:
   - Instagram: 41 → 1,500+
   - Google Reviews: 0 → 50+
   - Website: None → 500+ visits/month

7. EVALUATION SECTION — "Вие Оценявате Нашата Работа". Icons showing: Monthly reports, Client evaluation after Month 1, Transparent metrics, 30-day exit after 3 months.

8. CTA SECTION — Large card: "Готови ли сте?" Steps: 1. Choose plan → 2. Sign → 3. Website in 48h. Contact info. Button: "Свържете се с нас"

9. FOOTER — "Никита Недялков Крачолов · AI Marketing Expert"

DESIGN:
- Background: deep dark (#0a0a0f to #0d0d18)
- Primary gradient: purple (#7b2fbe) to pink (#e91e8c)
- Cards: glassmorphism, rgba(255,255,255,0.04)
- Typography: Inter, bold headlines
- Smooth scroll animations (fade-in on scroll)
- Premium, modern SaaS-like aesthetic
- Fully responsive
```

---

## 🖼️ NANOBANANA / GENERATE_IMAGE ПРОМТОВЕ

### Hero изображение:
```
Dark atmospheric interior of a modern rock bar at night. Warm amber and purple lighting.
Small stage with electric guitar and microphone in the background. Polished wooden bar
counter with 3 craft cocktails glowing under spotlights. Exposed brick walls with
concert posters. Moody, cinematic feel. People enjoying drinks in soft focus.
Professional architectural photography. 16:9 aspect ratio.
```

### Коктейл — Old Fashioned:
```
Professional food photography of a craft Old Fashioned cocktail in a crystal rocks glass.
Large clear ice cube. Garnished with orange peel and Luxardo cherry. Dark moody bar
background with warm bokeh lights. Amber tones. Shot from 45-degree angle. Studio quality
lighting. Shallow depth of field. 1:1 square format.
```

### Коктейл — Purple Haze:
```
Professional food photography of a purple gin cocktail in a coupe glass. Lavender garnish
floating on top. Purple and violet hues. Dark bar background with soft purple neon glow.
Condensation on glass. Elegant and moody. Studio quality. 1:1 square format.
```

### Коктейл — Smoke on the Water:
```
Professional food photography of a smoky mezcal cocktail in a rocks glass. Visible smoke
wisps rising from the glass. Dark charred lime wheel garnish. Dramatic low-key lighting
with orange/amber tones. Dark background. Mysterious and premium feel. 1:1 square.
```

### Интериор — Сцена:
```
Small intimate live music stage in a rock bar. Drum kit, guitar amplifiers, microphones.
Warm stage lighting in amber and red. Empty before the show. Vintage concert posters on
brick walls. Professional photography with depth. Atmospheric and inviting. 16:9.
```

### Мезета — Месна дъска:
```
Professional food photography of a charcuterie board on a dark wooden table. Cured meats,
cheeses, olives, nuts, bread. Rustic bar setting in background. Warm lighting. Top-down
angle. Appetizing and premium. Dark moody aesthetic. 1:1 square format.
```

---

## 🔄 Ред на Изпълнение

```
1. ✅ Промтове готови (този файл)
2. → Създай Stitch проект
3. → Генерирай 3 екрана (Home, Menu, Offer)
4. → Генерирай визуали с generate_image / nanobanana
5. → Build уебсайта с кода от Stitch
6. → Deploy на Vercel
7. → Изпрати линковете на клиента
```
