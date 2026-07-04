# CodeCalendar Agent Notes

## Назначение

CodeCalendar — статический календарь событий для трёх направлений: IT, физика и математика.
Пользователь смотрит события по месяцам, фильтрует категории, открывает подробности, переходит к источнику и регистрируется в один клик.

Поддерживается:

- русский и английский интерфейс;
- светлая и тёмная темы;
- переключатель `IT / Физика / Математика`;
- предметные категории, события, новости и hero-тексты;
- календарь, список событий, модалка и режим «Мои события».

## Файлы

- `index.html` — разметка приложения, шапка, hero, календарь, новости, список, модалка.
- `styles.css` — CSS-переменные, shader-фоны, сетки, карточки, адаптивность.
- `app.js` — все данные и логика: переводы, категории, события, новости, состояние, рендеринг.
- `save.ps1` — pull/rebase/autostash, commit и push.

## Структура Данных

Главный источник истины — `app.js`.

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
- `state.registered` — регистрации, хранятся как `cc-registered`.

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
- `toggleRegistration()` — пишет регистрацию в `cc-registered`.
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
- После правок проверь категорию, дату, источник, light/dark и запусти проверки.

## Проверки

Синтаксис:

```powershell
node --check app.js
```

Event id и дубли:

```powershell
@'
const fs = require('fs');
const src = fs.readFileSync('app.js', 'utf8');
const ids = [...src.matchAll(/\{ id: "([^"]+)", category/g)].map(m => m[1]);
const missing = ids.filter(id => !src.includes(`"${id}": {`));
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
console.log(missing.length ? `Missing translations: ${missing.join(', ')}` : `All ${ids.length} event ids have translation objects`);
console.log(duplicates.length ? `Duplicate event ids: ${[...new Set(duplicates)].join(', ')}` : "No duplicate event ids");
'@ | node -
```

## Источники

Предпочитай первичные источники: IT — `olimpiada.ru`, `icpc.global`, `devpost.com`, `ctftime.org`, Hacker News; Physics — `ipho-new.org`, `iop.org`, `ictp.it`, `phystec.org`, `home.cern`, `nasa.gov`; Math — `imo-official.org`, `ams.org`, `maa.org`, `siam.org`, `lms.ac.uk`, `arxiv.org`.

## Git И Заметки

- Проект статический, сборка не нужна.
- Для просмотра открыть `index.html`.
- Перед push проверь `git status --short --branch`.
- Если ветка отстаёт от `origin/main`, сначала `git pull --rebase`.
- Быстрое сохранение: `.\save.ps1 "Сообщение коммита"`.
- Маркер «сегодня» жёстко задан как `2026-07-03` в `renderCalendar()`.
- `cc-registered` общий, но счётчик показывает регистрации только текущего предмета.
- `cc-lang`, `cc-theme`, `cc-subject` сохраняют язык, тему и предмет.
- Если Playwright не установлен, минимум запускай `node --check app.js` и проверки данных.
