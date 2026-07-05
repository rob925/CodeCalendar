# Supabase Auth Design

## Goal

Add optional user authorization to CodeCalendar so visitors can keep using the static app anonymously, while signed-in users can save selected events to Supabase and see a friendly greeting by name.

## User Experience

- The header toolbar contains the account control beside subject, language, and theme controls.
- Anonymous users see an auth button and can keep using the calendar with local `cc-registered` data.
- The auth dialog supports both sign-in and registration.
- Registration asks for name, email, then password.
- Sign-in asks for email and password only.
- The password must be at least 6 characters and must not contain Russian letters.
- The password field has an 8-character generator button.
- Signed-in users see a short greeting using their saved name.
- Signed-in users can sign out from the same toolbar area.

## Architecture

- Keep the project static: `index.html`, `styles.css`, and `app.js`.
- Use Supabase hosted Auth and PostgreSQL instead of adding a custom backend.
- Load the Supabase browser client from CDN.
- Keep placeholder `SUPABASE_URL` and `SUPABASE_ANON_KEY` constants in `app.js`; the project owner fills them after creating a Supabase project.
- If Supabase is not configured or unavailable, the app falls back to localStorage and stays usable.

## Data Flow

- Anonymous registrations continue to read/write `localStorage.cc-registered`.
- On sign-in, the app loads rows from `user_events` for the current user and replaces `state.registered`.
- On event registration changes while signed in, the app writes to `user_events`.
- On sign-out, the app returns to local registrations from `localStorage.cc-registered`.
- Registration stores the entered name in Supabase user metadata as `name`.

## Supabase Table

Use a `user_events` table with:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `event_id text not null`
- `subject text not null`
- `created_at timestamptz not null default now()`
- `unique(user_id, event_id)`

Row Level Security must let users select, insert, and delete only their own rows.

## Testing

- Add a small Node test for password validation and generation.
- Run `node --check app.js`.
- Run the existing event id/translation duplicate check.
- Manual Supabase login testing is only possible after the project owner adds real Supabase credentials and database policies.
