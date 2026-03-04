# 🚀 Настройка на Интерактивен Въпросник - Drift Bar Plovdiv

## 📋 Общ Преглед

Този проект съдържа:
1. **questionnaire.html** - Интерактивна HTML форма със запазване на отговори
2. **drift-bar-questionnaire-workflow.json** - n8n автоматизация за обработка

## 🔧 Стъпка 1: Импорт на n8n Workflow

### 1.1 Отвори n8n
- Влез в твоя n8n инстанция (cloud или self-hosted)
- Кликни на **"Workflows"** → **"Import from File"**

### 1.2 Импортирай workflow
- Качи файла: `drift-bar-questionnaire-workflow.json`
- Workflow-ът ще се отвори автоматично

### 1.3 Настрой Webhook URL
1. Кликни на node-а **"Webhook (Прием на данни)"**
2. Кликни **"Test URL"** или **"Production URL"**
3. Копирай URL-а (ще изглежда така):
   ```
   https://your-n8n-instance.com/webhook/drift-bar-questionnaire
   ```

---

## 🔑 Стъпка 2: Настрой Credentials (Важно!)

### 2.1 Google Sheets (за запазване на отговори)

1. Кликни на node-а **"Запази в Google Sheets"**
2. Кликни **"Create New Credential"**
3. Избери **"Google Sheets OAuth2"**
4. Следвай инструкциите за OAuth authentication
5. След свързване, избери:
   - **Document:** Създай нов Google Sheet наречен "Drift Bar - Questionnaire Responses"
   - **Sheet:** Sheet1

**Структура на Google Sheet (първи ред):**
Отвори Google Sheet и добави тези колони в първия ред:

```
timestamp | logo_delivery | photos_interior | photos_bar | photos_stage | photos_concerts | photos_drinks | photos_exterior | photos_delivery | monday | tuesday | wednesday | thursday | friday | saturday | sunday | closing_time | band1_genre | band1_description | band2_genre | band2_description | band3_genre | band3_description | google_email | reservations | num_tables | max_per_table | domain | domain_other | ad_budget | capacity | total_tables | brand_voice_professional | brand_voice_fun | brand_voice_edgy | brand_voice_warm | brand_voice_other | free_text_wishes | formatted_date
```

### 2.2 Email (за notification на теб)

1. Кликни на node-а **"Изпрати Email"**
2. Кликни **"Create New Credential"**
3. Избери **"SMTP"**
4. Попълни данни:

**За Gmail:**
```
Host: smtp.gmail.com
Port: 465 (или 587)
SSL/TLS: Enabled
User: ncracholov3@gmail.com
Password: [App Password - НЕ личната парола!]
```

**Как да вземеш App Password за Gmail:**
1. Влез в Google Account: https://myaccount.google.com/
2. Отиди на Security → 2-Step Verification
3. Scroll до **"App passwords"**
4. Генерирай нов App Password за "Mail"
5. Копирай 16-символния код

### 2.3 Viber (опционално - сега е disabled)

Ако искаш да получаваш и Viber notification:
1. Enable node-а **"Изпрати Viber (опционално)"**
2. Създай Viber Bot: https://partners.viber.com/
3. Вземи API token
4. Настрой credentials

---

## 🌐 Стъпка 3: Обнови HTML Файла

### 3.1 Отвори questionnaire.html

Намери този ред (около ред 631):
```javascript
const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';
```

### 3.2 Замени с твоя n8n webhook URL:
```javascript
const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/drift-bar-questionnaire';
```

---

## 🧪 Стъпка 4: Тестване

### 4.1 Test Workflow в n8n

1. В n8n, кликни **"Test Workflow"** (горе вдясно)
2. Workflow-ът ще чака за webhook данни

### 4.2 Отвори HTML Файла

1. Отвори `questionnaire.html` в браузър (double-click или drag-and-drop в Chrome)
2. Попълни формата (може частично за тест)
3. Кликни **"Изпрати Отговори 🚀"**

### 4.3 Провери Резултатите

Трябва да видиш:
- ✅ Success message в браузъра
- ✅ Нов ред в Google Sheets
- ✅ Email на ncracholov3@gmail.com
- ✅ Execution в n8n със статус "Success"

---

## 🚀 Стъпка 5: Deploy

### Вариант А: Hosting на HTML (Препоръчително)

**Vercel (безплатно):**
1. Качи `questionnaire.html` в GitHub repo
2. Свържи GitHub с Vercel: https://vercel.com/
3. Deploy → автоматично ще има URL като `https://drift-bar-questionnaire.vercel.app`

**Netlify (безплатно):**
1. Drag-and-drop `questionnaire.html` в Netlify Drop: https://app.netlify.com/drop
2. Instant deployment

**GitHub Pages (безплатно):**
1. Качи в GitHub repo
2. Settings → Pages → Enable
3. URL: `https://yourusername.github.io/drift-bar-questionnaire`

### Вариант Б: Локално използване

- Просто изпрати HTML файла на клиента
- Те го отварят в браузър
- Работи offline (data се запазва в localStorage)
- При submit, изпраща към n8n webhook

---

## 📊 Стъпка 6: Споделяне с Клиента

### Изпрати на клиента:

**Вариант 1: Hosted URL**
```
Здравейте!

Попълнете този въпросник за уебсайта:
👉 https://drift-bar-questionnaire.vercel.app

Отнема 5-10 минути.
Благодаря! 🚀
```

**Вариант 2: HTML файл**
```
Здравейте!

Изпращам ви въпросник за уебсайта.

Стъпки:
1. Отворете приложения файл (questionnaire.html) в браузър
2. Попълнете формата
3. Кликнете "Изпрати Отговори"

Отнема 5-10 минути. Данните се запазват автоматично.
Благодаря! 🚀
```

---

## ⚙️ Допълнителни Функции

### Auto-Save (Вградено)

Формата автоматично запазва отговорите в browser localStorage:
- Клиентът може да затвори браузъра
- Когато отвори отново, отговорите са запазени
- Не губи прогрес

### Responsive Design

- Работи на телефон, таблет, компютър
- Optimized за мобилни устройства
- Touch-friendly

### Validation

- Required полета са маркирани
- Email validation
- Number validation

---

## 🔒 Сигурност и Privacy

### CORS
- Webhook-ът приема заявки от всякъде (`*`)
- За production, може да ограничиш до конкретен домейн

### Data Storage
- Данните се запазват в твоя Google Sheets (не се споделят)
- Email се изпраща само на теб
- localStorage е само на клиентското устройство

---

## 🛠️ Troubleshooting

### Грешка: "Failed to fetch"
- Провери дали n8n workflow е активен (Test Workflow)
- Провери WEBHOOK_URL в HTML файла
- Провери CORS настройки на webhook

### Грешка: Google Sheets не записва
- Провери OAuth credentials
- Провери дали Sheet има правилни колони
- Провери дали node-а е enabled

### Грешка: Email не се изпраща
- Провери SMTP credentials
- За Gmail - използвай App Password, НЕ обикновена парола
- Провери дали 2FA е enabled (необходимо за App Password)

### Данните се губят
- localStorage работи само в същия браузър
- За production, webhook трябва да е винаги активен
- Провери дали n8n инстанцията е достъпна

---

## 📞 Поддръжка

Ако нещо не работи:
1. Провери n8n execution log
2. Отвори Developer Console в браузъра (F12)
3. Провери Network tab за HTTP заявки
4. Виж Console tab за JavaScript грешки

---

## 🎨 Customization

### Промяна на цветове

В `questionnaire.html`, редактирай CSS променливите:
```css
/* Основен dark тон */
background: linear-gradient(135deg, #0D0D0D 0%, #1C1917 100%);

/* Златен акцент */
color: #CA8A04;

/* CTA бутон */
background: linear-gradient(135deg, #CA8A04 0%, #D4A027 100%);
```

### Промяна на текст

Редактирай директно HTML-а - всичко е в обикновен текст.

### Добавяне на нови полета

1. Добави input в HTML
2. Добави колона в Google Sheets
3. Обнови email template в n8n node "Изпрати Email"

---

## 🚀 Готово!

След настройка, системата работи така:

```
Клиент попълва форма
    ↓
Submit → n8n webhook
    ↓
n8n обработва данните
    ↓
┌─────────────────┬─────────────────┬──────────────────┐
│ Google Sheets   │ Email до теб    │ Viber (optional) │
│ (запазване)     │ (notification)  │ (notification)   │
└─────────────────┴─────────────────┴──────────────────┘
    ↓
Успешен отговор към клиента
```

**Благодаря! 🎸 Успех с Drift Bar Plovdiv!**
