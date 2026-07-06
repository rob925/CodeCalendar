# CodeCalendar Agent Notes

## Назначение

CodeCalendar — SSR-календарь событий для трёх направлений: IT, физика и математика.
Пользователь смотрит события по месяцам, фильтрует категории, открывает подробности, переходит к источнику и регистрируется в один клик.

Поддерживается:

- русский и английский интерфейс;
- светлая и тёмная темы;
- переключатель `IT / Физика / Математика`;
- предметные категории, события, новости и hero-тексты;
- календарь, список событий, модалка и режим «Мои события».

## Текущая Архитектура

- Проект теперь работает как Next.js SSR-приложение под Vercel.
- `pages/index.jsx` серверно рендерит текущую разметку из `index.html`.
- `data/calendar-data.js` хранит переводы, категории, события и новости.
- `app.js` остаётся legacy runtime: состояние, рендеринг, auth UI, Supabase sync и интерактивность.
- Supabase остаётся источником авторизации и таблицы `user_events`.
- SSR читает Supabase cookies, получает пользователя и его регистрации до первого рендера.
- Клиент получает начальное состояние через `window.__CODECALENDAR_INITIAL_STATE__`.
- После загрузки клиентский Supabase browser client продолжает auth/sync в фоне.
- Целевой домен: `https://code-calendar-app.vercel.app`.

## Файлы

- `pages/index.jsx` — SSR-страница Next.js, читает `index.html`, создаёт Supabase server/browser clients, передаёт `initialState`.
- `pages/_app.jsx` — подключает глобальный `styles.css`.
- `lib/supabase-config.js` — публичный Supabase URL/anon key из env с локальным fallback.
- `index.html` — исходная HTML-разметка приложения без SSR-логики; используется серверной страницей как шаблон body.
- `data/calendar-data.js` — главный источник календарных данных; работает в браузере через `window.CodeCalendarData` и в Node tests через `module.exports`.
- `styles.css` — CSS-переменные, shader-фоны, сетки, карточки, адаптивность.
- `app.js` — главный legacy runtime: состояние, рендеринг, auth UI, Supabase sync.
- `package.json` — Next/Vercel scripts, зависимости и `engines.node >=22`.
- `.env.example` — имена env-переменных для Vercel/local.
- `docs/vercel-ssr-setup.md` — краткая инструкция по Vercel/Supabase env.
- `save.ps1` — pull/rebase/autostash, commit и push.

## Runtime И Деплой

- Локально нужен Node 22+.
- На этой машине portable Node лежит в `C:\Users\Maksim\.codex-tools\node-v22`.
- Для команд в PowerShell можно временно добавить его в PATH:

```powershell
$env:PATH = "$env:USERPROFILE\.codex-tools\node-v22;$env:PATH"
```

- Локальный dev:

```powershell
npm install
npm run dev
```

- Production build:

```powershell
npm run build
```

- Vercel project: `tituname/web`.
- Vercel production alias: `https://code-calendar-app.vercel.app`.
- Vercel env:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase Auth config:
  - `site_url`: `https://code-calendar-app.vercel.app`
  - `uri_allow_list`: `https://code-calendar-app.vercel.app/**,http://localhost:3000/**`

## Структура Данных

Главный источник истины для календарных данных — `data/calendar-data.js`.

- `translations.ru` / `translations.en` — все тексты.
- `translations.*.subjects` — подписи предметного переключателя.
- `translations.*.subjectContent` — hero, tagline и digest для каждого предмета.
- `translations.*.categories` — названия категорий.
- `translations.*.events` — тексты событий.
- `translations.*.news` — тексты локальных новостей.
- `categoriesBySubject` — категории и цвета для `it`, `physics`, `math`.
- `eventsBySubject` — события для `it`, `physics`, `math`.
- `newsItemsBySubject` — fallback-новости для каждого предмета.
- `state.subject` — текущий предмет, хранится как `cc-subject`.
- `state.registered` — регистрации текущего пользователя.
- Для гостей регистрации живут в `localStorage.cc-registered`.
- Для авторизованных пользователей регистрации живут в Supabase `public.user_events`.
- SSR может заполнить `state.authUser` и `state.registered` до фоновой клиентской синхронизации.

## Auth И Supabase

- Supabase проект: `CodeCalendar`, ref `lnqjsoqkybtxmboqisbw`.
- Браузерный auth client создаётся в `pages/index.jsx` через `createBrowserClient()` и кладётся в `window.__CODECALENDAR_SUPABASE_CLIENT__`.
- Server client создаётся в `getServerSideProps()` через `createServerClient()` и читает cookies из запроса.
- Не возвращайся к CDN-only Supabase client как единственному auth источнику: тогда SSR снова не будет знать пользователя.
- Не клади service role key в код, env или браузер. Используется только anon/public key.
- Таблица `public.user_events`: `user_id`, `event_id`, `subject`, `created_at`, unique `(user_id, event_id)`.
- RLS должен разрешать пользователю читать/писать/удалять только свои строки.

## Предметы

Ключи предметов:

```js
it
physics
math
```

Чтобы добавить предмет, обнови:

- `translations.ru.subjects` и `translations.en.subjects`;
- `translations.*.subjectContent`;
- `categoriesBySubject`;
- `eventsBySubject`;
- `newsItemsBySubject`;
- кнопки `[data-subject]` в `index.html`;
- CSS `body[data-subject="..."]`.

## События

Запись календаря:

```js
{ id: "event-id", category: "conference", date: "2026-07-22", url: "https://example.com" }
```

Переводы:

```js
translations.ru.events["event-id"]
translations.en.events["event-id"]
```

Правила:

- `id` уникален во всех направлениях.
- `id` есть в русских и английских переводах.
- `category` есть в `categoriesBySubject[subject]`.
- `date` хранится как `YYYY-MM-DD`.
- `url` ведёт на первичный или достаточно надёжный источник.
- Не удаляй `dateKey(date)`: он защищает календарь от сдвигов дат из-за часовых поясов.

## Категории

- IT: `hackathon`, `olympiad`, `ai`, `conference`, `workshop`, `meetup`.
- Physics: `olympiad`, `conference`, `school`, `workshop`, `lecture`, `research`.
- Math: `olympiad`, `congress`, `conference`, `school`, `seminar`, `contest`.

При новой категории обнови:

- нужный массив `categoriesBySubject`;
- `translations.ru.categories`;
- `translations.en.categories`;
- цвет категории.

## Новости

IT:

- fallback: `newsItemsBySubject.it`;
- live: Hacker News Algolia через `HN_NEWS_URL`;
- при ошибке сети возвращается fallback.

Physics и Math:

- используют только локальные `newsItemsBySubject.physics` и `newsItemsBySubject.math`;
- `refreshNews()` не делает Hacker News запрос для них;
- каждая новость имеет `translations.ru.news[id]` и `translations.en.news[id]`.

## Важные Функции

- `render()` — перерисовывает весь интерфейс.
- `renderStaticText()` — применяет язык и предметные hero/news тексты.
- `renderTheme()` — ставит `data-theme` и `data-subject` на `body`.
- `renderFilters()` — рисует фильтры текущего предмета.
- `renderCalendar()` — рисует месяц и события.
- `renderEventList()` — рисует правый список событий.
- `renderNews()` — рисует digest.
- `refreshNews()` — обновляет IT live-новости или ставит fallback.
- `openEvent(id)` — открывает событие текущего предмета.
- `toggleRegistration()` — меняет регистрацию локально и синхронизирует Supabase для авторизованных пользователей.
- `refreshAuthSession()` — обновляет пользователя из Supabase и не должен блокировать первый показ профиля долгой синхронизацией.
- `syncRegisteredEvents()` — читает регистрации из Supabase.
- `uploadLocalRegisteredEvents()` — переносит гостевые регистрации в аккаунт.
- `syncEventPanelHeight()` — выравнивает правую панель на desktop.

## UI И Фоны

Shader-фоны:

- база: `.shader-bg`, `.shader-layer-a`, `.shader-layer-b`, `.shader-grid`;
- физика: `body[data-subject="physics"]`, холодная циан/синяя палитра;
- математика: `body[data-subject="math"]`, кораллово-голубая палитра;
- dark-версии: `body[data-theme="dark"][data-subject="..."]`.

Дизайн-правила:

- Первая страница — рабочий календарь, не landing page.
- Не вкладывай карточки в карточки.
- Не добавляй декоративные орбы и случайные SVG.
- Длинные русские строки не должны распирать кнопки и карточки.
- У предметов должны отличаться не только цвета, но и тексты, события, новости.

## Мобильная Версия

Брейкпоинты:

- `1120px` — hero и workspace переходят в одну колонку.
- `820px` — шапка и control-band складываются, toolbar становится сеткой.
- `640px` — телефонный режим, компактные карточки и календарь.

Проверяй:

- нет горизонтального переполнения;
- `.toolbar` вмещает subject switcher, язык и тему;
- фильтры горизонтально прокручиваются;
- 7 дней календаря видны на ширине около `390px`;
- маленькие маркеры событий кликабельны;
- модалка не выходит за экран.

## Типовые Изменения

- Событие: добавь запись в `eventsBySubject[subject]`, затем `translations.ru.events[id]` и `translations.en.events[id]`.
- Новость: добавь запись в `newsItemsBySubject[subject]`, затем `translations.ru.news[id]` и `translations.en.news[id]`.
- Hero: редактируй `translations.*.subjectContent[subject]`.
- Фон: начни с `body[data-subject="..."]`, затем правь `.shader-bg`, `.shader-layer-a`, `.shader-layer-b`.
- SSR/auth: начинай с `pages/index.jsx`, затем проверяй, как `app.js` читает `window.__CODECALENDAR_INITIAL_STATE__`.
- Разметка UI: меняй `index.html`, потому что SSR-страница читает body именно оттуда.
- Календарные данные: меняй `data/calendar-data.js`; он должен загружаться перед `app.js`.
- После правок проверь категорию, дату, источник, light/dark и запусти проверки.

## Проверки

Базовый набор:

```powershell
$env:PATH = "$env:USERPROFILE\.codex-tools\node-v22;$env:PATH"
npm test
node --check app.js
node --check next.config.js
npm run build
npm audit --audit-level=moderate
```

Синтаксис:

```powershell
node --check app.js
```

Event id и дубли:

```powershell
@'
const data = require('./data/calendar-data.js');
const ids = Object.values(data.eventsBySubject).flat().map(event => event.id);
const missing = ids.filter(id => !data.translations.ru.events[id] || !data.translations.en.events[id]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
console.log(missing.length ? `Missing translations: ${missing.join(', ')}` : `All ${ids.length} event ids have translation objects`);
console.log(duplicates.length ? `Duplicate event ids: ${[...new Set(duplicates)].join(', ')}` : "No duplicate event ids");
'@ | node -
```

## Источники

Предпочитай первичные источники: IT — `olimpiada.ru`, `icpc.global`, `devpost.com`, `ctftime.org`, Hacker News; Physics — `ipho-new.org`, `iop.org`, `ictp.it`, `phystec.org`, `home.cern`, `nasa.gov`; Math — `imo-official.org`, `ams.org`, `maa.org`, `siam.org`, `lms.ac.uk`, `arxiv.org`.

## Git И Заметки

- Проект больше не чисто статический: основная разработка идёт через Next.js.
- Для просмотра запускай `npm run dev`, обычно `http://localhost:3000`.
- Старый `index.html` всё ещё важен как шаблон разметки.
- Перед push проверь `git status --short --branch`.
- Если ветка отстаёт от `origin/main`, сначала `git pull --rebase`.
- Быстрое сохранение: `.\save.ps1 "Сообщение коммита"`.
- Маркер «сегодня» жёстко задан как `2026-07-03` в `renderCalendar()`.
- `cc-registered` общий, но счётчик показывает регистрации только текущего предмета.
- `cc-lang`, `cc-theme`, `cc-subject` сохраняют язык, тему и предмет.
- `.vercel/` не коммитить.
- Если Playwright не установлен, минимум запускай `npm test`, `node --check app.js`, `npm run build` и проверки данных.
