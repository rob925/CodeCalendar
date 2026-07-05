# Supabase Setup For CodeCalendar

## 1. Create A Supabase Project

1. Open `https://supabase.com`.
2. Create a new project.
3. Wait until the project is ready.
4. Open `Project Settings` -> `API`.
5. Copy:
   - `Project URL`
   - `anon public` key

## 2. Paste Keys Into `app.js`

In `app.js`, replace:

```js
const SUPABASE_URL = "PASTE_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_SUPABASE_ANON_KEY_HERE";
```

with your real values:

```js
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-public-key";
```

The key named `anon public` is safe to use in frontend code. Do not paste the `service_role` key into this project.

## 3. Create The User Events Table

Open `SQL Editor` in Supabase and run:

```sql
create table if not exists public.user_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null,
  subject text not null,
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);
```

## 4. Enable Row Level Security

Run this SQL:

```sql
alter table public.user_events enable row level security;
```

## 5. Add Access Policies

Run this SQL:

```sql
create policy "Users can read own events"
on public.user_events
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own events"
on public.user_events
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete own events"
on public.user_events
for delete
to authenticated
using (auth.uid() = user_id);
```

## 6. Enable Email And Password Auth

1. Open `Authentication` -> `Providers`.
2. Enable `Email`.
3. Make sure password signups are allowed.
4. Optional for easier local testing: open `Authentication` -> `Sign In / Providers` or `Settings` and disable email confirmation. If confirmation stays enabled, users must confirm email before normal sign-in.

## 7. Test It

1. Open `index.html`.
2. Click `Войти`.
3. Switch to registration.
4. Enter name, email, and password.
5. Use a password with at least 6 symbols and no Russian letters.
6. After sign-in, save an event.
7. Refresh the page and check that the event is still marked after the session restores.

If the auth dialog says `Добавьте Supabase URL и anon key в app.js`, the app is still using placeholder values.
