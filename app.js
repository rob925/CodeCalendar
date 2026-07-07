const CYRILLIC_PATTERN = /[А-Яа-яЁё]/;
const EMAIL_DOMAINS = ["gmail.com", "mail.ru", "yandex.ru", "outlook.com", "icloud.com", "yahoo.com", "proton.me", "rambler.ru"];
const AUTH_ACTIVE_KEY = "cc-auth-active";

function validateAuthPassword(password) {
  if (password.length < 6) return "authPasswordTooShort";
  if (CYRILLIC_PATTERN.test(password)) return "authPasswordCyrillic";
  return "";
}

function validateAuthEmail(email) {
  if (email.length < 6) return "authEmailTooShort";
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return "authEmailAtMissing";
  const domain = email.slice(atIndex + 1);
  const dotIndex = domain.lastIndexOf(".");
  if (dotIndex <= 0 || domain.length - dotIndex - 1 < 2) return "authEmailDomainInvalid";
  return "";
}

function emailSuggestions(email) {
  const [local, typedDomain = ""] = email.split("@");
  if (!local) return [];
  if (!email.includes("@")) {
    const domainHint = EMAIL_DOMAINS.find((domain) => local.toLowerCase().includes(domain.split(".")[0]));
    if (!domainHint) return [];
    const name = local.slice(0, local.toLowerCase().indexOf(domainHint.split(".")[0]));
    if (!name) return [];
    return emailSuggestions(`${name}@${local.slice(name.length)}`);
  }
  const domainPart = typedDomain.toLowerCase();
  if (EMAIL_DOMAINS.includes(domainPart)) return [];
  return EMAIL_DOMAINS.filter((domain) => domain.startsWith(domainPart) || domain.includes(domainPart)).map((domain) => `${local}@${domain}`);
}

function emailGhostSuggestion(email) {
  const [suggestion = ""] = emailSuggestions(email);
  return suggestion && suggestion !== email ? suggestion : "";
}

function shouldRestoreAuthSession(value) {
  return value !== "0";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateAuthPassword, validateAuthEmail, emailSuggestions, emailGhostSuggestion, shouldRestoreAuthSession };
}

if (typeof window !== "undefined") {
const { translations, categoriesBySubject, eventsBySubject, newsItemsBySubject } = window.CodeCalendarData || {};
if (!translations || !categoriesBySubject || !eventsBySubject || !newsItemsBySubject) {
  throw new Error("CodeCalendar data must be loaded before app.js");
}
const NEWS_REFRESH_INTERVAL = 5 * 60 * 60 * 1000;
const LIVE_NEWS_CACHE_TTL = 14 * 24 * 60 * 60 * 1000;
const HN_NEWS_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=18";
const SUPABASE_URL = "https://lnqjsoqkybtxmboqisbw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucWpzb3FreWJ0eG1ib3Fpc2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTE0NzgsImV4cCI6MjA5ODgyNzQ3OH0.U_plSDL6ACvf-fpEZD2RZuvSA5mFZpiQoZ2tMAdN6-E";
const newsColors = ["#0f766e", "#2563eb", "#be123c", "#c2410c", "#7c3aed", "#9333ea", "#0e7490", "#a16207"];
const initialServerState = window.__CODECALENDAR_INITIAL_STATE__ || {};
const initialRegisteredEvents = Array.isArray(initialServerState.registered) ? initialServerState.registered : null;
const savedLang = localStorage.getItem("cc-lang");
const savedTheme = localStorage.getItem("cc-theme");
const savedSubject = localStorage.getItem("cc-subject");
const initialLang = Object.prototype.hasOwnProperty.call(translations, savedLang) ? savedLang : "ru";
const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
const initialSubject = Object.prototype.hasOwnProperty.call(eventsBySubject, savedSubject) ? savedSubject : "it";

const state = {
  lang: initialLang,
  theme: initialTheme,
  subject: initialSubject,
  month: new Date(2026, 6, 1),
  activeCategory: "all",
  calendarExpanded: false,
  registeredOnly: false,
  registered: new Set(initialServerState.user && initialRegisteredEvents ? initialRegisteredEvents : JSON.parse(localStorage.getItem("cc-registered") || "[]")),
  activeEventId: null,
  newsItems: newsItemsBySubject[initialSubject],
  newsLastUpdated: null,
  newsUsesFallback: true,
  authMode: "signin",
  authUser: initialServerState.user || null,
  authMessage: "",
  authPending: false,
  authSessionRequest: 0
};

const supabaseClient =
  window.__CODECALENDAR_SUPABASE_CLIENT__ ||
  (SUPABASE_URL.startsWith("http") && SUPABASE_ANON_KEY.length > 40 && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null);

function markAuthActive() {
  localStorage.setItem(AUTH_ACTIVE_KEY, "1");
}

function clearAuthActive() {
  localStorage.removeItem(AUTH_ACTIVE_KEY);
}

const els = {
  html: document.documentElement,
  subjectSwitcher: document.getElementById("subjectSwitcher"),
  filters: document.getElementById("filters"),
  expandCalendar: document.getElementById("expandCalendar"),
  collapseCalendar: document.getElementById("collapseCalendar"),
  weekdayRow: document.getElementById("weekdayRow"),
  calendarGrid: document.getElementById("calendarGrid"),
  calendarColumn: document.querySelector(".calendar-column"),
  eventListPanel: document.querySelector(".event-list-panel"),
  newsPanel: document.querySelector(".news-panel"),
  newsList: document.getElementById("newsList"),
  newsUpdated: document.querySelector("[data-i18n='newsUpdated']"),
  eventList: document.getElementById("eventList"),
  monthTitle: document.getElementById("monthTitle"),
  registeredCount: document.getElementById("registeredCount"),
  visibleCount: document.getElementById("visibleCount"),
  showRegistered: document.getElementById("showRegistered"),
  dialog: document.getElementById("eventDialog"),
  dialogMedia: document.getElementById("dialogMedia"),
  dialogCategory: document.getElementById("dialogCategory"),
  dialogDate: document.getElementById("dialogDate"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogDescription: document.getElementById("dialogDescription"),
  dialogDetails: document.getElementById("dialogDetails"),
  dialogLink: document.getElementById("dialogLink"),
  registerButton: document.getElementById("registerButton"),
  themeToggle: document.getElementById("themeToggle"),
  themeIcon: document.getElementById("themeIcon"),
  accountGreeting: document.getElementById("accountGreeting"),
  authOpenButton: document.getElementById("authOpenButton"),
  signOutButton: document.getElementById("signOutButton"),
  authDialog: document.getElementById("authDialog"),
  closeAuthDialog: document.getElementById("closeAuthDialog"),
  authForm: document.getElementById("authForm"),
  authTitle: document.getElementById("authTitle"),
  authEyebrow: document.getElementById("authEyebrow"),
  authName: document.getElementById("authName"),
  authEmailSignIn: document.getElementById("authEmailSignIn") || document.getElementById("authEmail"),
  authEmailSignUp: document.getElementById("authEmailSignUp") || document.getElementById("authEmail"),
  emailGhostSignIn: document.getElementById("emailGhostSignIn") || document.getElementById("emailGhost"),
  emailGhostSignUp: document.getElementById("emailGhostSignUp") || document.getElementById("emailGhost"),
  emailSignInField: document.getElementById("emailSignInField"),
  emailSignUpField: document.getElementById("emailSignUpField"),
  authPasswordSignIn: document.getElementById("authPasswordSignIn") || document.getElementById("authPassword"),
  authPasswordSignUp: document.getElementById("authPasswordSignUp") || document.getElementById("authPassword"),
  passwordSignInField: document.getElementById("passwordSignInField"),
  passwordSignUpField: document.getElementById("passwordSignUpField"),
  nameField: document.getElementById("nameField"),
  authMessage: document.getElementById("authMessage"),
  authSubmit: document.getElementById("authSubmit"),
  authModeToggle: document.getElementById("authModeToggle")
};

function t(path) {
  const current = path.split(".").reduce((acc, key) => acc?.[key], translations[state.lang]);
  if (current !== undefined) return current;
  return path.split(".").reduce((acc, key) => acc?.[key], translations.ru) ?? "";
}

function currentCategories() {
  return categoriesBySubject[state.subject] || categoriesBySubject.it;
}

function currentEvents() {
  return eventsBySubject[state.subject] || eventsBySubject.it;
}

function currentFallbackNews() {
  return newsItemsBySubject[state.subject] || newsItemsBySubject.it;
}

function liveNewsCacheKey(subject) {
  return `cc-live-news-${subject}`;
}

function liveNewsEndpoint(subject) {
  return `/api/news?subject=${encodeURIComponent(subject)}`;
}

function isLiveNewsSubject(subject) {
  return subject === "physics" || subject === "math";
}

function readLiveNewsCache(subject) {
  try {
    const cache = JSON.parse(localStorage.getItem(liveNewsCacheKey(subject)) || "null");
    if (!cache || !Array.isArray(cache.items) || !cache.items.length || !cache.savedAt) return null;
    if (Date.now() - cache.savedAt > LIVE_NEWS_CACHE_TTL) return null;
    return cache;
  } catch {
    return null;
  }
}

function writeLiveNewsCache(subject, items) {
  localStorage.setItem(
    liveNewsCacheKey(subject),
    JSON.stringify({
      savedAt: Date.now(),
      items
    })
  );
}

function mergeLiveNewsItems(primaryItems, secondaryItems = []) {
  const seen = new Set();
  return [...primaryItems, ...secondaryItems]
    .filter((item) => {
      const key = item.id || item.url || item.copy?.en?.title || item.copy?.ru?.title;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 8);
}

function applyLiveNewsItems(subject, items, updatedAt = new Date()) {
  if (state.subject !== subject) return false;
  state.newsItems = items;
  state.newsLastUpdated = updatedAt;
  state.newsUsesFallback = false;
  renderNews();
  scheduleLayoutSync();
  return true;
}

function eventCopy(event) {
  return (
    translations[state.lang].events[event.id] ||
    translations.ru.events[event.id] || {
      title: event.id,
      description: "",
      format: "",
      level: "",
      location: "",
      deadline: ""
    }
  );
}

function eventCategory(event) {
  return currentCategories().find((category) => category.id === event.category) || currentCategories()[0];
}

function filteredEvents() {
  return currentEvents().filter((event) => {
    const categoryMatches = state.activeCategory === "all" || event.category === state.activeCategory;
    const registrationMatches = !state.registeredOnly || state.registered.has(event.id);
    return categoryMatches && registrationMatches;
  });
}

function formatDate(dateString, options = { day: "numeric", month: "long" }) {
  return new Intl.DateTimeFormat(state.lang === "ru" ? "ru-RU" : "en-US", options).format(new Date(`${dateString}T12:00:00`));
}

function formatTime(date) {
  return new Intl.DateTimeFormat(state.lang === "ru" ? "ru-RU" : "en-US", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
  els.subjectSwitcher.querySelectorAll("[data-subject]").forEach((button) => {
    button.textContent = t(`subjects.${button.dataset.subject}`);
    button.classList.toggle("active", button.dataset.subject === state.subject);
  });

  const subjectCopy = t(`subjectContent.${state.subject}`) || t("subjectContent.it") || {};
  Object.entries(subjectCopy).forEach(([key, value]) => {
    const node = document.querySelector(`[data-i18n="${key}"]`);
    if (node) node.textContent = value;
  });
  renderAuth();
}

function userDisplayName() {
  return state.authUser?.user_metadata?.name || state.authUser?.email?.split("@")[0] || "";
}

function renderAuth() {
  const isSignedIn = Boolean(state.authUser);
  const name = userDisplayName();
  els.accountGreeting.textContent = isSignedIn && name ? t("authGreeting").replace("{name}", name) : "";
  els.authOpenButton.classList.toggle("hidden", isSignedIn);
  els.signOutButton.classList.toggle("hidden", !isSignedIn);
  els.nameField.classList.toggle("hidden", state.authMode !== "signup");
  els.authName.required = state.authMode === "signup";
  els.emailSignInField?.classList.toggle("hidden", state.authMode === "signup");
  els.emailSignUpField?.classList.toggle("hidden", state.authMode !== "signup");
  if (els.authEmailSignIn) els.authEmailSignIn.required = state.authMode !== "signup";
  if (els.authEmailSignUp) els.authEmailSignUp.required = state.authMode === "signup";
  els.passwordSignInField?.classList.toggle("hidden", state.authMode === "signup");
  els.passwordSignUpField?.classList.toggle("hidden", state.authMode !== "signup");
  if (els.authPasswordSignIn) els.authPasswordSignIn.required = state.authMode !== "signup";
  if (els.authPasswordSignUp) els.authPasswordSignUp.required = state.authMode === "signup";
  els.authTitle.textContent = state.authMode === "signup" ? t("authSignUpTitle") : t("authSignInTitle");
  els.authEyebrow.textContent = state.authMode === "signup" ? t("authEyebrowSignUp") : t("authEyebrowSignIn");
  els.authSubmit.textContent = state.authPending
    ? state.authMode === "signup"
      ? t("authSigningUp")
      : t("authSigningIn")
    : state.authMode === "signup"
      ? t("signUp")
      : t("signIn");
  els.authSubmit.disabled = state.authPending;
  els.authModeToggle.disabled = state.authPending;
  els.authModeToggle.textContent = state.authMode === "signup" ? t("haveAccount") : t("createAccount");
  els.authMessage.textContent = state.authMessage;
}

async function refreshAuthSession() {
  if (!supabaseClient) return;
  if (!shouldRestoreAuthSession(localStorage.getItem(AUTH_ACTIVE_KEY))) return;
  const requestId = ++state.authSessionRequest;
  let data;
  let error;
  try {
    ({ data, error } = await withTimeout(supabaseClient.auth.getSession(), 15000));
  } catch (timeoutError) {
    console.error("Could not refresh Supabase session", timeoutError);
    return;
  }
  if (requestId !== state.authSessionRequest) return;
  if (error) {
    console.error("Could not refresh Supabase session", error);
    return;
  }
  state.authUser = data.session?.user || null;
  if (state.authUser) {
    markAuthActive();
    render();
    try {
      await withTimeout(uploadLocalRegisteredEvents(), 15000);
      if (requestId !== state.authSessionRequest) return;
      await withTimeout(syncRegisteredEvents(), 15000);
      if (requestId !== state.authSessionRequest) return;
    } catch (syncError) {
      console.error("Could not sync registered events", syncError);
    }
  } else {
    clearAuthActive();
    state.registered = new Set(JSON.parse(localStorage.getItem("cc-registered") || "[]"));
    render();
  }
}

function renderEmailSuggestions() {
  const input = activeEmailInput();
  const ghostNode = activeEmailGhost();
  const typed = input.value.trim();
  const ghost = emailGhostSuggestion(typed);
  if (ghostNode) ghostNode.textContent = ghost && ghost.startsWith(typed) ? `${typed}${ghost.slice(typed.length)}` : "";
}

function applyEmailSuggestion(email) {
  activeEmailInput().value = email;
  renderEmailSuggestions();
}

function activeEmailInput() {
  return state.authMode === "signup" ? els.authEmailSignUp : els.authEmailSignIn;
}

function activeEmailGhost() {
  return state.authMode === "signup" ? els.emailGhostSignUp : els.emailGhostSignIn;
}

function renderFilters() {
  const filterItems = [{ id: "all", color: "var(--text)" }, ...currentCategories()];
  els.filters.innerHTML = filterItems
    .map((category) => {
      const label = category.id === "all" ? t("all") : t(`categories.${category.id}`);
      return `
        <button class="filter-chip ${state.activeCategory === category.id ? "active" : ""}" type="button" data-category="${category.id}">
          <span class="filter-dot" style="color: ${category.color}"></span>
          ${label}
        </button>
      `;
    })
    .join("");
}

function renderWeekdays() {
  els.weekdayRow.innerHTML = t("weekdays").map((day) => `<div>${day}</div>`).join("");
}

function renderCalendar() {
  const year = state.month.getFullYear();
  const month = state.month.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - startOffset);
  const visible = filteredEvents();
  const todayKey = "2026-07-03";

  els.monthTitle.textContent = `${t("months")[month]} ${year}`;
  els.calendarGrid.innerHTML = "";

  for (let i = 0; i < 42; i += 1) {
    const cellDate = new Date(gridStart);
    cellDate.setDate(gridStart.getDate() + i);
    const cellDateKey = dateKey(cellDate);
    const dayEvents = visible.filter((event) => event.date === cellDateKey);
    const cell = document.createElement("div");
    cell.className = `calendar-cell ${cellDate.getMonth() !== month ? "is-muted" : ""}`;
    cell.innerHTML = `
      <div class="day-number ${cellDateKey === todayKey ? "today" : ""}"><span>${cellDate.getDate()}</span></div>
      <div class="day-events"></div>
    `;

    const dayEventsNode = cell.querySelector(".day-events");
    dayEvents.forEach((event) => {
      const copy = eventCopy(event);
      const category = eventCategory(event);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `event-chip ${state.registered.has(event.id) ? "is-registered" : ""}`;
      button.style.setProperty("--event-color", category.color);
      button.innerHTML = `<strong>${copy.title}</strong><span>${t(`categories.${event.category}`)}</span>`;
      button.addEventListener("click", () => openEvent(event.id));
      dayEventsNode.append(button);
    });

    els.calendarGrid.append(cell);
  }
}

function renderEventList() {
  const visible = filteredEvents().sort((a, b) => a.date.localeCompare(b.date));
  els.eventList.innerHTML = visible.length
    ? ""
    : `<div class="event-card"><p>${state.registeredOnly ? t("registeredOnly") : t("empty")}</p></div>`;

  visible.forEach((event) => {
    const copy = eventCopy(event);
    const category = eventCategory(event);
    const card = document.createElement("article");
    card.className = `event-card ${state.registered.has(event.id) ? "is-registered" : ""}`;
    card.style.setProperty("--event-color", category.color);
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="event-card-top">
        <span class="pill">${t(`categories.${event.category}`)}</span>
        ${state.registered.has(event.id) ? `<span class="registered-badge">${t("registered")}</span>` : ""}
      </div>
      <h3>${copy.title}</h3>
      <p>${formatDate(event.date, { day: "numeric", month: "long", year: "numeric" })} · ${copy.location}</p>
      <p>${copy.description}</p>
    `;
    card.addEventListener("click", () => openEvent(event.id));
    card.addEventListener("keydown", (eventKey) => {
      if (eventKey.key === "Enter") openEvent(event.id);
    });
    els.eventList.append(card);
  });
}

function renderNews() {
  if (!els.newsList) return;
  els.newsUpdated.textContent = state.newsUsesFallback
    ? t("newsFallbackLabel")
    : `${t("newsAutoLabel")} ${formatTime(state.newsLastUpdated)}`;

  els.newsList.innerHTML = state.newsItems
    .map((item) => {
      const copy = item.live
        ? item.copy[state.lang] || item.copy.ru
        : translations[state.lang].news[item.id] || translations.ru.news[item.id];
      if (!copy) return "";
      return `
        <a class="news-card" href="${item.url}" target="_blank" rel="noreferrer" style="--news-color: ${item.color}">
          <div class="news-meta">
            <span class="news-tag">${copy.tag}</span>
            <time datetime="${item.date}">${formatDate(item.date, { day: "numeric", month: "long" })}</time>
          </div>
          <h3>${copy.title}</h3>
          <p>${copy.summary}</p>
          <span class="news-source">${copy.source}</span>
        </a>
      `;
    })
    .join("");
}

function hostnameFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Hacker News";
  }
}

function newsTagForTitle(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("ai") || lowerTitle.includes("llm") || lowerTitle.includes("model")) return "AI";
  if (lowerTitle.includes("security") || lowerTitle.includes("vulnerability") || lowerTitle.includes("breach")) return "Security";
  if (lowerTitle.includes("open source") || lowerTitle.includes("github")) return "Open source";
  if (lowerTitle.includes("startup") || lowerTitle.includes("funding")) return "Startups";
  if (lowerTitle.includes("chip") || lowerTitle.includes("hardware")) return "Hardware";
  return "Tech";
}

function liveNewsCopy(title, source) {
  return {
    ru: {
      title,
      summary: `Свежая история из технологической ленты Hacker News. Источник: ${source}.`,
      tag: newsTagForTitle(title),
      source
    },
    en: {
      title,
      summary: `A fresh story from the Hacker News technology feed. Source: ${source}.`,
      tag: newsTagForTitle(title),
      source
    }
  };
}

function mapHackerNewsItems(hits) {
  const seen = new Set();
  return hits
    .map((hit, index) => {
      const title = hit.title || hit.story_title;
      const url = hit.url || hit.story_url || `https://news.ycombinator.com/item?id=${hit.objectID}`;
      if (!title || seen.has(title)) return null;
      seen.add(title);

      const source = hostnameFromUrl(url);
      return {
        id: `hn-${hit.objectID}`,
        live: true,
        date: (hit.created_at || new Date().toISOString()).slice(0, 10),
        color: newsColors[index % newsColors.length],
        url,
        copy: liveNewsCopy(title, source)
      };
    })
    .filter(Boolean)
    .slice(0, 8);
}

async function refreshNews() {
  const requestedSubject = state.subject;

  if (isLiveNewsSubject(requestedSubject)) {
    const cached = readLiveNewsCache(requestedSubject);
    if (cached) {
      applyLiveNewsItems(requestedSubject, cached.items, new Date(cached.savedAt));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(liveNewsEndpoint(requestedSubject), { signal: controller.signal });
      if (!response.ok) throw new Error(`News request failed: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.items) || data.items.length < 2) throw new Error("Not enough live news items");

      const mergedItems = mergeLiveNewsItems(data.items, cached?.items);
      writeLiveNewsCache(requestedSubject, mergedItems);
      applyLiveNewsItems(requestedSubject, mergedItems, data.updatedAt ? new Date(data.updatedAt) : new Date());
    } catch {
      if (state.subject !== requestedSubject || cached) return;
      state.newsItems = currentFallbackNews();
      state.newsLastUpdated = null;
      state.newsUsesFallback = true;
      renderNews();
      scheduleLayoutSync();
    } finally {
      clearTimeout(timeoutId);
    }
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(HN_NEWS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`News request failed: ${response.status}`);

    const data = await response.json();
    const liveItems = mapHackerNewsItems(data.hits || []);
    if (liveItems.length < 4) throw new Error("Not enough live news items");

    if (state.subject !== requestedSubject) return;
    state.newsItems = liveItems;
    state.newsLastUpdated = new Date();
    state.newsUsesFallback = false;
    renderNews();
    scheduleLayoutSync();
  } catch {
    if (state.subject !== requestedSubject) return;
    state.newsItems = currentFallbackNews();
    state.newsUsesFallback = true;
    renderNews();
    scheduleLayoutSync();
  } finally {
    clearTimeout(timeoutId);
  }
}

function renderStats() {
  els.registeredCount.textContent = currentEvents().filter((event) => state.registered.has(event.id)).length;
  els.visibleCount.textContent = filteredEvents().length;
  els.showRegistered.classList.toggle("active", state.registeredOnly);
}

let layoutSyncFrame = 0;

function syncEventPanelHeight() {
  const isDesktop = window.matchMedia("(min-width: 1121px)").matches;
  const cards = [...els.eventList.querySelectorAll(".event-card")];
  els.eventList.classList.remove("is-fitted");
  els.eventList.style.height = "";

  cards.forEach((card) => {
    card.hidden = false;
  });

  els.eventListPanel.style.height = "";
  els.eventListPanel.style.maxHeight = "";
  els.eventListPanel.style.marginTop = "";
  if (!isDesktop) return;

  const leftColumnRect = els.calendarColumn.getBoundingClientRect();
  const panelNaturalRect = els.eventListPanel.getBoundingClientRect();
  const targetHeight = Math.max(0, Math.round(leftColumnRect.bottom - panelNaturalRect.top));

  els.eventListPanel.style.height = `${targetHeight}px`;
  els.eventListPanel.style.maxHeight = `${targetHeight}px`;

  const panelRect = els.eventListPanel.getBoundingClientRect();
  const listRect = els.eventList.getBoundingClientRect();
  const newsCards = [...els.newsList.querySelectorAll(".news-card")];
  const lastNewsCard = newsCards.at(-1);
  const targetListBottom = lastNewsCard ? lastNewsCard.getBoundingClientRect().bottom : panelRect.bottom - 16;
  const listHeight = Math.max(0, targetListBottom - listRect.top);
  els.eventList.style.height = `${listHeight}px`;

  const panelBottom = targetListBottom;
  let shouldHideRest = false;

  cards.forEach((card) => {
    if (shouldHideRest || card.getBoundingClientRect().bottom > panelBottom) {
      card.hidden = true;
      shouldHideRest = true;
    }
  });

  els.eventList.classList.add("is-fitted");
}

function scheduleLayoutSync() {
  if (layoutSyncFrame) {
    cancelAnimationFrame(layoutSyncFrame);
  }

  layoutSyncFrame = requestAnimationFrame(() => {
    layoutSyncFrame = requestAnimationFrame(() => {
      layoutSyncFrame = 0;
      syncEventPanelHeight();
    });
  });
}

function renderTheme() {
  document.body.dataset.theme = state.theme;
  document.body.dataset.subject = state.subject;
  document.body.classList.toggle("is-calendar-expanded", state.calendarExpanded);
  els.themeIcon.textContent = state.theme === "dark" ? "☼" : "☾";
}

function renderCalendarExpansion() {
  const label = t(state.calendarExpanded ? "collapseCalendar" : "expandCalendar");
  els.expandCalendar.setAttribute("aria-label", label);
  els.expandCalendar.setAttribute("aria-expanded", String(state.calendarExpanded));
  els.expandCalendar.title = label;
  els.expandCalendar.textContent = state.calendarExpanded ? "×" : "⛶";
  els.collapseCalendar.setAttribute("aria-label", t("collapseCalendar"));
  els.collapseCalendar.title = t("collapseCalendar");
}

function closeExpandedCalendar() {
  if (!state.calendarExpanded) return;
  state.calendarExpanded = false;
  renderTheme();
  renderCalendarExpansion();
  scheduleLayoutSync();
}

function render() {
  renderStaticText();
  renderTheme();
  renderCalendarExpansion();
  renderFilters();
  renderWeekdays();
  renderCalendar();
  renderNews();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
}

function openEvent(id) {
  const event = currentEvents().find((item) => item.id === id);
  const copy = eventCopy(event);
  const category = eventCategory(event);
  state.activeEventId = id;

  els.dialog.style.setProperty("--event-color", category.color);
  els.dialogMedia.style.setProperty("--event-color", category.color);
  els.dialogCategory.textContent = t(`categories.${event.category}`);
  els.dialogDate.textContent = formatDate(event.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  els.dialogTitle.textContent = copy.title;
  els.dialogDescription.textContent = copy.description;
  els.dialogLink.href = event.url;
  els.dialogDetails.innerHTML = ["format", "level", "location", "deadline"]
    .map((key) => `<div><span>${t(`details.${key}`)}</span><strong>${copy[key]}</strong></div>`)
    .join("");
  updateRegisterButton();
  if (!els.dialog.open) {
    els.dialog.showModal();
  }
}

function updateRegisterButton() {
  const isRegistered = state.registered.has(state.activeEventId);
  els.registerButton.textContent = isRegistered ? t("unregister") : t("register");
  els.registerButton.classList.toggle("is-registered", isRegistered);
}

function eventSubject(eventId) {
  return Object.keys(eventsBySubject).find((key) => eventsBySubject[key].some((event) => event.id === eventId)) || state.subject;
}

async function syncRegisteredEvents() {
  if (!supabaseClient || !state.authUser) return;
  const userId = state.authUser.id;
  const { data, error } = await supabaseClient.from("user_events").select("event_id").eq("user_id", userId);
  if (state.authUser?.id !== userId) return;
  if (error) {
    console.error("Could not load registered events", error);
    return;
  }
  state.registered = new Set((data || []).map((row) => row.event_id));
  renderCalendar();
  renderEventList();
  renderStats();
}

async function uploadLocalRegisteredEvents() {
  if (!supabaseClient || !state.authUser) return;
  const localIds = JSON.parse(localStorage.getItem("cc-registered") || "[]");
  if (!localIds.length) return;
  const rows = localIds.map((eventId) => ({
    user_id: state.authUser.id,
    event_id: eventId,
    subject: eventSubject(eventId)
  }));
  const { error } = await supabaseClient.from("user_events").upsert(rows, { onConflict: "user_id,event_id" });
  if (error) console.error("Could not upload local registered events", error);
}

async function saveRegisteredEvent(eventId, isRegistered) {
  if (!supabaseClient || !state.authUser) return;
  if (isRegistered) {
    const { error } = await supabaseClient.from("user_events").upsert(
      {
        user_id: state.authUser.id,
        event_id: eventId,
        subject: eventSubject(eventId)
      },
      { onConflict: "user_id,event_id" }
    );
    if (error) console.error("Could not save registered event", error);
    return;
  }
  const { error } = await supabaseClient.from("user_events").delete().eq("user_id", state.authUser.id).eq("event_id", eventId);
  if (error) console.error("Could not delete registered event", error);
}

async function toggleRegistration() {
  if (!state.activeEventId) return;
  const eventId = state.activeEventId;
  const willRegister = !state.registered.has(eventId);
  if (state.registered.has(eventId)) {
    state.registered.delete(eventId);
  } else {
    state.registered.add(eventId);
  }
  if (state.authUser) {
    await saveRegisteredEvent(eventId, willRegister);
  } else {
    localStorage.setItem("cc-registered", JSON.stringify([...state.registered]));
  }
  updateRegisterButton();
  renderCalendar();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
}

function openAuthDialog(mode = "signin") {
  state.authMode = mode;
  state.authMessage = supabaseClient ? "" : t("authSupabaseMissing");
  if (mode === "signup" && els.authEmailSignUp) els.authEmailSignUp.value = "";
  renderAuth();
  renderEmailSuggestions();
  if (!els.authDialog.open) els.authDialog.showModal();
}

class TimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}

function withTimeout(promise, ms, message = "Request timed out") {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new TimeoutError(message)), ms))
  ]);
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (state.authPending) return;
  if (!supabaseClient) {
    state.authMessage = t("authSupabaseMissing");
    renderAuth();
    return;
  }

  const name = els.authName.value.trim();
  const email = activeEmailInput().value.trim();
  const password = state.authMode === "signup" ? els.authPasswordSignUp.value : els.authPasswordSignIn.value;
  const emailError = validateAuthEmail(email);
  const passwordError = validateAuthPassword(password);
  if (state.authMode === "signup" && !name) {
    state.authMessage = t("authNameRequired");
    renderAuth();
    return;
  }
  if (emailError) {
    state.authMessage = t(emailError);
    renderAuth();
    return;
  }
  if (passwordError) {
    state.authMessage = t(passwordError);
    renderAuth();
    return;
  }

  state.authPending = true;
  state.authMessage = "";
  renderAuth();

  let result;
  try {
    const authPromise =
      state.authMode === "signup"
        ? supabaseClient.auth.signUp({ email, password, options: { data: { name } } })
        : supabaseClient.auth.signInWithPassword({ email, password });
    result = await withTimeout(authPromise, 15000);
  } catch (error) {
    state.authPending = false;
    state.authMessage = error.name === "TimeoutError" ? t("authTimeout") : (error.message || t("authError"));
    renderAuth();
    return;
  }
  if (result.error) {
    state.authPending = false;
    state.authMessage = result.error.message || t("authError");
    renderAuth();
    return;
  }

  const signedInUser = result.data.session?.user || null;
  if (signedInUser) markAuthActive();
  state.authPending = false;
  state.authUser = signedInUser;
  state.authMessage = state.authUser ? t("authWelcome") : t("authCheckEmail");
  renderAuth();
  if (state.authUser) {
    els.authDialog.close();
    render();
    syncAfterAuth().catch((error) => {
      console.error("Could not sync registered events after auth", error);
    });
  } else {
    render();
  }
}

async function syncAfterAuth() {
  await withTimeout(uploadLocalRegisteredEvents(), 15000);
  await withTimeout(syncRegisteredEvents(), 15000);
  render();
}

function signOut() {
  clearAuthActive();
  state.authSessionRequest += 1;
  state.authUser = null;
  state.authMessage = t("authSignedOut");
  state.registered = new Set(JSON.parse(localStorage.getItem("cc-registered") || "[]"));
  render();
  if (supabaseClient) {
    supabaseClient.auth.signOut().catch((error) => {
      console.error("Could not finish Supabase sign out", error);
    });
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  state.month.setMonth(state.month.getMonth() - 1);
  renderCalendar();
  scheduleLayoutSync();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  state.month.setMonth(state.month.getMonth() + 1);
  renderCalendar();
  scheduleLayoutSync();
});

els.filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.activeCategory = button.dataset.category;
  renderFilters();
  renderCalendar();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
});

els.expandCalendar.addEventListener("click", () => {
  state.calendarExpanded = !state.calendarExpanded;
  renderTheme();
  renderCalendarExpansion();
  scheduleLayoutSync();
});

els.collapseCalendar.addEventListener("click", closeExpandedCalendar);

document.addEventListener("click", (event) => {
  if (!state.calendarExpanded) return;
  if (event.target.closest(".calendar-wrap") || event.target.closest("#expandCalendar") || event.target.closest(".event-dialog")) return;
  closeExpandedCalendar();
});

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    localStorage.setItem("cc-lang", state.lang);
    render();
    refreshAuthSession();
    if (els.dialog.open && state.activeEventId) openEvent(state.activeEventId);
  });
});

els.subjectSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-subject]");
  if (!button || button.dataset.subject === state.subject) return;

  const previousSubject = state.subject;
  state.subject = button.dataset.subject;
  state.activeCategory = "all";
  state.registeredOnly = false;
  state.activeEventId = null;
  state.newsItems = currentFallbackNews();
  state.newsLastUpdated = null;
  state.newsUsesFallback = true;
  localStorage.setItem("cc-subject", state.subject);

  if (els.dialog.open) els.dialog.close();
  try {
    render();
    refreshNews();
    refreshAuthSession();
  } catch (error) {
    console.error("Subject switch failed", error);
    state.subject = previousSubject;
    state.newsItems = currentFallbackNews();
    render();
  }
});

els.themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("cc-theme", state.theme);
  renderTheme();
  scheduleLayoutSync();
});

els.showRegistered.addEventListener("click", () => {
  state.registeredOnly = !state.registeredOnly;
  renderEventList();
  renderCalendar();
  renderStats();
  scheduleLayoutSync();
});

document.getElementById("closeDialog").addEventListener("click", () => els.dialog.close());
els.dialog.addEventListener("click", (event) => {
  if (event.target === els.dialog) els.dialog.close();
});
els.registerButton.addEventListener("click", toggleRegistration);
els.authOpenButton.addEventListener("click", () => openAuthDialog("signin"));
els.signOutButton.addEventListener("click", signOut);
els.closeAuthDialog.addEventListener("click", () => els.authDialog.close());
els.authDialog.addEventListener("click", (event) => {
  if (event.target === els.authDialog) els.authDialog.close();
});
els.authModeToggle.addEventListener("click", () => {
  state.authMode = state.authMode === "signup" ? "signin" : "signup";
  state.authMessage = "";
  if (els.emailGhostSignIn) els.emailGhostSignIn.textContent = "";
  if (els.emailGhostSignUp) els.emailGhostSignUp.textContent = "";
  if (state.authMode === "signup" && els.authEmailSignUp) els.authEmailSignUp.value = "";
  if (els.authPasswordSignIn) els.authPasswordSignIn.value = "";
  if (els.authPasswordSignUp && els.authPasswordSignUp !== els.authPasswordSignIn) els.authPasswordSignUp.value = "";
  renderAuth();
  renderEmailSuggestions();
});
[els.authEmailSignIn, els.authEmailSignUp].forEach((input) => {
  if (!input) return;
  input.addEventListener("input", renderEmailSuggestions);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const suggestion = emailGhostSuggestion(input.value.trim());
      if (suggestion) {
        event.preventDefault();
        applyEmailSuggestion(suggestion);
      }
    }
  });
});
els.authForm.addEventListener("submit", handleAuthSubmit);
window.addEventListener("resize", scheduleLayoutSync);
window.addEventListener("load", scheduleLayoutSync);

if (document.fonts?.ready) {
  document.fonts.ready.then(scheduleLayoutSync);
}

if ("ResizeObserver" in window) {
  const layoutObserver = new ResizeObserver(scheduleLayoutSync);
  layoutObserver.observe(els.calendarColumn);
  layoutObserver.observe(els.newsList);
}

render();
refreshNews();
setInterval(refreshNews, NEWS_REFRESH_INTERVAL);

if (supabaseClient) {
  refreshAuthSession();
  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    state.authSessionRequest += 1;
    state.authUser = session?.user || null;
    if (state.authUser) {
      markAuthActive();
      render();
      try {
        await withTimeout(uploadLocalRegisteredEvents(), 15000);
        await withTimeout(syncRegisteredEvents(), 15000);
      } catch (error) {
        console.error("Could not sync registered events on auth state change", error);
      }
    } else {
      clearAuthActive();
      render();
    }
  });
}
}

