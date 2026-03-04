# 🏎️ Drift Bar Plovdiv — Claude Code Project

## Project Overview
Drift Bar Plovdiv е нов бар в Пловдив. Проектът включва пълна дигитална маркетинг стратегия:
- Уебсайт и landing page
- Social media съдържание и стратегия
- n8n автоматизации за маркетинг
- Брандинг и дизайн система
- Email маркетинг кампании

---

## 🛠️ Активни Скилове

### 1. 🎨 UI/UX Pro Max
**Път:** `~/.claude/skills/ui-ux-pro-max/SKILL.md`
**Описание:** 50+ UI стила, 97 цветови палитри, 57 font пейрингове — генерира дизайн система.
**Използвай:** При изграждане на уебсайт, landing pages, social media templates.
```bash
# Търсене на дизайн стил
python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "nightlife bar" --domain style
python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "dark luxury" --domain color
python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "landing page bar" --domain landing
```

### 2. 🧠 NotebookLM
**Път:** `~/.claude/skills/notebooklm/SKILL.md`
**Описание:** Пълен API достъп до Google NotebookLM — notebooks, sources, podcasts, quizzes.
**Използвай:** За research на конкуренти, синтез на маркетинг данни, генериране на podcasts.
```bash
notebooklm login          # Влез преди използване
notebooklm list           # Виж notebooks
notebooklm create "Drift Bar Research"
notebooklm source add "https://..."
notebooklm generate audio "Focus on bar marketing trends"
```

### 3. 🤖 n8n Автоматизации
**MCP сървър:** n8n-mcp (директно достъпен)
**Описание:** Знание за всички 1,084 n8n nodes — изгражда production-ready автоматизации.
**Използвай:** За автоматизиране на social media постове, email кампании, CRM интеграции.

### 4. 💾 Claude Mem
**Път:** `~/.claude/skills/claude-mem/`
**Описание:** Автоматично запазва контекст от сесии и го инжектира в бъдещи сесии.
**Скилове:**
- `mem-search` — Търси в паметта
- `smart-explore` — Умно разглеждане на кода
- `make-plan` — Прави план
- `do` — Изпълнява задача

### 5. ✅ GSD (Get Shit Done)
**Път:** `~/.claude/get-shit-done/`
**Версия:** v1.22.0
**Описание:** Spec-driven development — интервюира те, прави план, изпълнява фаза по фаза.
**Използвай:** `/gsd` или `get-shit-done` за структурирани задачи.

### 6. 🦸 Superpowers
**Път:** `~/.claude/skills/superpowers/`
**Описание:** Автоматично налага brainstorming, планиране, TDD и code review.
**Скилове:**
- `brainstorming` — Структуриран brainstorming
- `writing-plans` — Техническо планиране
- `dispatching-parallel-agents` — Паралелни агенти
- `subagent-driven-development` — Агент-driven разработка
- `test-driven-development` — TDD
- `systematic-debugging` — Дебъгване
- `verification-before-completion` — Верификация

### 7. 📚 Obsidian Skills
**Път:** `~/.claude/skills/obsidian-skills/`
**Описание:** Управление на Obsidian vault като AI-powered second brain.
**Скилове:**
- `obsidian-cli` — CLI управление
- `obsidian-markdown` — Markdown управление
- `obsidian-bases` — Бази данни
- `json-canvas` — Canvas файлове
- `defuddle` — Уеб съдържание → vault

### 8. 🌟 Awesome Claude Code
**Път:** `~/.claude/skills/awesome-claude-code/`
**Описание:** Директория на всички Claude Code скилове, плъгини, hooks и инструменти.

---

## 📁 Структура на Проекта

```
Drift Bar Plovdiv/
├── CLAUDE.md              # Този файл — project context
├── website/               # Уебсайт на бара
├── social-media/          # Social media материали
│   ├── instagram/
│   ├── facebook/
│   └── tiktok/
├── marketing/             # Маркетинг стратегия
│   ├── strategy.md
│   ├── content-calendar/
│   └── campaigns/
├── branding/              # Брандинг активи
│   ├── logo/
│   ├── colors.md
│   └── fonts.md
└── automation/            # n8n workflow файлове
```

---

## 🎯 Маркетинг Контекст

**Клиент:** Drift Bar Plovdiv
**Локация:** Пловдив, България
**Концепция:** Нов бар — drift/racing тематика
**Цел аудитория:** TBD (уточни с клиента)
**Тон:** TBD
**Конкуренти:** TBD

---

## 🚀 Бързи Команди

```bash
# GSD за структурирана задача
/gsd

# NotebookLM research
notebooklm create "Drift Bar - Competitor Research"

# UI/UX стил търсене
python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "racing nightlife" --domain style

# n8n автоматизация — директно питай агента
# "Създай n8n workflow за автоматичен Instagram пост"
```
