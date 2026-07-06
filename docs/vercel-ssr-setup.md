# Vercel SSR Setup

## Runtime

Set the project to Node 22+. The repository also declares this in `package.json`:

```json
"engines": {
  "node": ">=22"
}
```

## Environment Variables

Add these variables in Vercel Project Settings -> Environment Variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Use the same Supabase project URL and anon/public key that the app already uses.

## Build Settings

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave default

## Supabase Auth URL

In Supabase Authentication -> URL Configuration, add the deployed Vercel domain to allowed redirect/site URLs.

## Local Development

Install Node 22+ locally, then run:

```powershell
npm install
npm run dev
```

Open the URL printed by Next, usually `http://localhost:3000`.
