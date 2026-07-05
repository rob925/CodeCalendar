# Supabase Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional Supabase authentication and cloud-saved event registrations.

**Architecture:** Keep CodeCalendar static and call Supabase directly from the browser. Local users keep localStorage behavior; signed-in users sync registrations through `user_events`.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Supabase browser client CDN, Node syntax checks.

## Global Constraints

- Do not add a custom backend for this feature.
- Password minimum length is 6 characters.
- Chrome/Google Password Manager handles password suggestions through `autocomplete="new-password"`; the app does not render its own generator button.
- Russian letters are not allowed in passwords.
- The site remains usable without authentication and without Supabase credentials.

---

### Task 1: Password Validation Test

**Files:**
- Create: `tests/auth-utils.test.js`
- Modify: `app.js`

**Interfaces:**
- Produces: `validateAuthPassword(password)` returning a translation key string or empty string.
- Produces: `validateAuthPassword(password)` returning a translation key string or empty string.

- [ ] **Step 1: Write the failing test**

```js
const assert = require("assert");
const { validateAuthPassword } = require("../app.js");

assert.strictEqual(validateAuthPassword("abc12"), "authPasswordTooShort");
assert.strictEqual(validateAuthPassword("abcdef"), "");
assert.strictEqual(validateAuthPassword("пароль12"), "authPasswordCyrillic");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/auth-utils.test.js`

Expected: FAIL because `app.js` does not export these functions.

- [ ] **Step 3: Implement minimal functions and CommonJS export guard**

Add the two functions near app state setup and export them only when `module.exports` exists.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/auth-utils.test.js`

Expected: PASS with exit code 0.

### Task 2: Auth UI and Supabase Sync

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Interfaces:**
- Consumes: `validateAuthPassword(password)`.
- Produces: account toolbar controls, auth dialog, Supabase session handling, `syncRegisteredEvents()`.

- [ ] **Step 1: Add Supabase CDN and auth dialog markup**
- [ ] **Step 2: Add compact toolbar account controls and responsive styles**
- [ ] **Step 3: Add translations for auth labels, errors, and greeting**
- [ ] **Step 4: Add Supabase client initialization guarded by placeholder credentials**
- [ ] **Step 5: Add sign-in, registration, sign-out, and event sync handlers**
- [ ] **Step 6: Verify with `node --check app.js`, `node tests/auth-utils.test.js`, and event id check**

### Task 3: Setup Documentation

**Files:**
- Create: `docs/supabase-setup.md`

**Interfaces:**
- Produces: exact owner steps for creating Supabase credentials, table, RLS policies, and Auth settings.

- [ ] **Step 1: Document Supabase project setup**
- [ ] **Step 2: Document SQL table and RLS policies**
- [ ] **Step 3: Document where to paste `SUPABASE_URL` and `SUPABASE_ANON_KEY`**
