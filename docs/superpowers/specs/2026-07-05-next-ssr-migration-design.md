# Next SSR Migration Design

## Goal

Move CodeCalendar from a static HTML app to a Vercel-ready SSR app so a signed-in user's account and registered events are available in the first rendered page.

## Architecture

- Use Next.js pages router with `getServerSideProps` for Vercel SSR.
- Keep Supabase as the auth and PostgreSQL provider.
- Use `@supabase/ssr` so browser sign-in writes cookies that SSR can read on the next request.
- Keep the existing visual UI and legacy `app.js` behavior during the first migration pass.
- Render the existing markup from `pages/index.jsx`, import `styles.css` globally, and load `app.js` on the client after hydration.

## Data Flow

- Server request reads the Supabase session from cookies through `createServerClient`.
- If a session exists, the server selects `event_id` rows from `public.user_events` for the current user.
- The page embeds a small initial state object containing user profile fields and registered event ids.
- Client `app.js` initializes `state.authUser` and `state.registered` from that embedded state before doing background Supabase sync.
- Client sign-in, sign-up, and sign-out use the Supabase browser client from `@supabase/ssr` so cookies stay in sync.

## Constraints

- Do not replace Supabase during this migration.
- Do not rewrite the calendar UI from scratch in the first SSR pass.
- Keep anonymous usage available.
- Keep Vercel deployment as the target.
- Use Node 22+ for local Next and Vercel runtime.
- Do not expose Supabase service role keys in browser code.

## Testing

- Add a Node assertion test that verifies the SSR page uses `getServerSideProps`, creates a Supabase server client, and passes `initialState`.
- Keep existing auth utility tests.
- Run `node --check app.js`.
- Run the event id translation/duplicate check.
