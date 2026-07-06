# Next SSR Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Vercel-ready Next.js SSR layer that restores the signed-in user and registered events on first page render.

**Architecture:** Use Next.js pages router and `@supabase/ssr`. Keep the existing DOM app as the client runtime, but render its HTML through `pages/index.jsx` and pass server-loaded auth state through `window.__CODECALENDAR_INITIAL_STATE__`.

**Tech Stack:** Next.js 15.5.20, React 19, Supabase JS v2.110.0, `@supabase/ssr`, Node 22+.

## Global Constraints

- Keep Supabase as the auth/database provider.
- Target Vercel deployment.
- Keep anonymous usage available.
- Do not expose service role keys.
- Preserve existing calendar UI and CSS in the first pass.
- Use Node 22+ locally and on Vercel.

---

### Task 1: Add SSR Regression Test

**Files:**
- Create: `tests/next-ssr.test.js`
- Modify: none

**Interfaces:**
- Produces: A static regression check for `pages/index.jsx`.

- [ ] **Step 1: Write the failing test**

```js
const assert = require("assert");
const fs = require("fs");

const page = fs.readFileSync("pages/index.jsx", "utf8");

assert.ok(page.includes("getServerSideProps"), "SSR page must export getServerSideProps");
assert.ok(page.includes("createServerClient"), "SSR page must create a Supabase server client");
assert.ok(page.includes("createBrowserClient"), "SSR page must create a Supabase browser client");
assert.ok(page.includes("initialState"), "SSR page must pass initialState to the client");
assert.ok(page.includes("__CODECALENDAR_INITIAL_STATE__"), "Client must receive initial auth state");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests\next-ssr.test.js`
Expected: FAIL because `pages/index.jsx` does not exist yet.

### Task 2: Add Next Project Shell

**Files:**
- Create: `package.json`
- Create: `pages/_app.jsx`
- Create: `pages/index.jsx`
- Create: `next.config.js`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: Existing `styles.css`, `app.js`, and `index.html` markup.
- Produces: `npm run dev`, `npm run build`, and SSR page props.

- [ ] **Step 1: Add dependencies and scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@supabase/ssr": "0.8.0",
    "@supabase/supabase-js": "2.110.0",
    "cookie": "1.1.1",
    "next": "15.5.20",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  }
}
```

- [ ] **Step 2: Import global CSS**

`pages/_app.jsx` imports `../styles.css` and returns `<Component {...pageProps} />`.

- [ ] **Step 3: Render the existing page through Next**

`pages/index.jsx` renders the existing `index.html` body markup as JSX and loads `app.js` in a `useEffect`.

### Task 3: Wire Supabase SSR Initial State

**Files:**
- Modify: `pages/index.jsx`
- Modify: `app.js`

**Interfaces:**
- Produces: `window.__CODECALENDAR_INITIAL_STATE__ = { user, registered }`.

- [ ] **Step 1: Server-load auth**

Use `createServerClient(supabaseUrl, supabaseAnonKey, { cookies })`, call `auth.getUser()`, and select `event_id` rows from `user_events` when a user exists.

- [ ] **Step 2: Client consumes initial state**

`app.js` initializes `state.authUser` and `state.registered` from `window.__CODECALENDAR_INITIAL_STATE__` before background sync.

- [ ] **Step 3: Browser auth uses cookie-aware client**

`pages/index.jsx` sets `window.__CODECALENDAR_SUPABASE_CLIENT__ = createBrowserClient()` before importing `app.js`.

### Task 4: Verify

**Files:**
- Modify: none

**Interfaces:**
- Produces: verified local SSR migration.

- [ ] **Step 1: Run auth tests**

Run: `node tests\auth-session.test.js && node tests\auth-email.test.js && node tests\auth-utils.test.js && node tests\next-ssr.test.js`

- [ ] **Step 2: Run syntax and data checks**

Run: `node --check app.js` and the event id duplicate script from `AGENTS.md`.

- [ ] **Step 3: Run Next build**

Run: `npm run build`.
