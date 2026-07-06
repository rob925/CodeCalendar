# CodeCalendar

SSR-календарь событий для IT, физики и математики. Проект помогает находить олимпиады, конференции, школы, митапы и другие события, фильтровать их по направлению и категории, открывать подробности и сохранять интересное в личный список.

**Live demo:** https://code-calendar-app.vercel.app

## Что внутри

- календарь событий по месяцам с отдельными направлениями `IT / Физика / Математика`;
- русская и английская локализация интерфейса, событий, категорий и новостей;
- светлая и тёмная темы с предметными визуальными стилями;
- фильтры категорий, список ближайших событий и модальное окно с деталями;
- режим «Мои события» для сохранённых регистраций;
- авторизация через Supabase и синхронизация сохранённых событий между устройствами;
- серверный рендеринг на Next.js: пользователь и его регистрации подставляются до первого клиентского рендера;
- fallback-новости для всех направлений и live-новости Hacker News для IT.

## Почему проект интересен

CodeCalendar начинался как статическое приложение, но был переведён на Next.js SSR без переписывания всей клиентской логики. `index.html` остаётся источником разметки, `data/calendar-data.js` хранит календарный контент, `app.js` содержит legacy runtime с интерактивностью, а `pages/index.jsx` серверно подготавливает страницу, читает Supabase cookies и передаёт начальное состояние в браузер.

Такой подход показывает аккуратную миграцию: приложение получает преимущества SSR и auth-aware первого рендера, но сохраняет рабочую структуру уже написанного UI.

## Стек

- **Frontend:** JavaScript, HTML, CSS, React runtime через Next.js pages router
- **SSR:** Next.js 15
- **Auth и данные пользователя:** Supabase Auth, Supabase table `user_events`, RLS policies
- **Деплой:** Vercel
- **Тесты:** Node-based smoke/unit tests, Playwright e2e для UI, mobile и auth-form сценариев

## Архитектура

```text
pages/index.jsx
  -> читает index.html как шаблон body
  -> создаёт Supabase server client
  -> получает текущего пользователя и сохранённые события
  -> загружает data/calendar-data.js перед app.js
  -> передаёт initialState в браузер

data/calendar-data.js
  -> хранит переводы, категории, события и новости
  -> экспортируется в Node.js tests и кладёт данные в window.CodeCalendarData для браузера

app.js
  -> управляет состоянием календаря
  -> рендерит фильтры, календарь, список, новости, модалку и auth UI
  -> синхронизирует регистрации с Supabase после загрузки

styles.css
  -> темы, адаптивность, предметные фоны и все визуальные состояния
```

Главные данные календаря находятся в `data/calendar-data.js`:

- `translations.ru` / `translations.en` — тексты интерфейса, событий и новостей;
- `categoriesBySubject` — категории и цвета для каждого направления;
- `eventsBySubject` — календарные события;
- `newsItemsBySubject` — локальные новости и fallback-дайджесты.

## Локальный запуск

Нужен Node.js 22+.

```powershell
npm install
npm run dev
```

После запуска открой адрес, который выведет Next.js, обычно:

```text
http://localhost:3000
```

Для локальной разработки можно использовать Supabase fallback из проекта или задать свои переменные окружения:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Проверки

Перед первым запуском e2e на новой машине установи браузер Playwright:

```powershell
npx playwright install chromium
```

```powershell
npm test
npm run test:e2e
node --check app.js
node --check data/calendar-data.js
node --check next.config.js
npm run build
```

Дополнительно для аудита зависимостей:

```powershell
npm audit --audit-level=moderate
```

## Структура проекта

```text
pages/index.jsx              SSR-страница Next.js и Supabase server/browser clients
pages/_app.jsx               подключение глобальных стилей
pages/_document.jsx          базовый HTML-документ и подключение Google Fonts
lib/supabase-config.js       публичная Supabase-конфигурация из env с fallback
index.html                   HTML-шаблон приложения
data/calendar-data.js        переводы, категории, события и новости
app.js                       состояние, рендеринг и клиентская синхронизация
styles.css                   темы, layout, адаптивность и визуальные эффекты
tests/                       проверки данных, auth, email utils, SSR и e2e
playwright.config.js         e2e-конфигурация с автозапуском Next dev server
docs/vercel-ssr-setup.md     заметки по деплою на Vercel
docs/supabase-setup.md       настройка Supabase table, RLS и auth
```

## Возможные улучшения

- расширить набор live-источников новостей для физики и математики;
- постепенно перевести legacy runtime на компонентную структуру React.
