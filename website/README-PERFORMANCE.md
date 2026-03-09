# ⚡ Quick Performance Setup

## 🚀 Един команда за всичко (Windows):

```bash
cd website
./setup-performance.bat
```

Това ще:
1. ✅ Инсталира зависимости
2. ✅ Оптимизира изображения (12MB → 1-2MB)
3. ✅ Build проекта

---

## 📋 Или стъпка по стъпка:

### 1. Инсталирай зависимости
```bash
cd website
npm install
```

### 2. Оптимизирай изображения (КРИТИЧНО!)
```bash
npm run optimize-images
```

**Това е най-важната стъпка!** Без това performance score ще остане нисък.

### 3. Build и тест
```bash
npm run build
npm run dev
```

---

## 📊 Очаквани резултати:

| Метрика | Преди | След |
|---------|-------|------|
| **Desktop Performance** | 40-60 ❌ | **85-95** ✅ |
| **Mobile Performance** | 30-50 ❌ | **75-90** ✅ |
| **Image Size** | 12MB | **1-2MB** (90% ⬇️) |
| **LCP** | 4-6s | **< 2.5s** |

---

## ✅ Deploy Checklist:

- [ ] `npm install` завърши успешно
- [ ] `npm run optimize-images` създаде .webp файлове
- [ ] `npm run build` мина без грешки
- [ ] Тествах на http://localhost:3000
- [ ] Commit и push
- [ ] Изчаках 5-10 мин за CDN cache
- [ ] Провери PageSpeed отново

---

## 🔧 Troubleshooting:

### Sharp не се инсталира?
```bash
npm install --save-dev sharp --verbose
```

### Изображенията не се оптимизират?
```bash
# Провери дали файловете са на място
ls public/assets/*.png

# Стартирай директно
node scripts/optimize-images.js
```

---

## 📚 Пълна документация:

Виж [`PERFORMANCE-OPTIMIZATIONS.md`](./PERFORMANCE-OPTIMIZATIONS.md) за детайлна информация.

---

**Направено с ❤️ за Drift Bar Plovdiv**
