# CodeCalendar README Showcase Design

## Goal

Replace the placeholder README with a portfolio-oriented project overview for employers and developers who want to understand CodeCalendar quickly.

## Audience

The primary reader is an employer, reviewer, or another developer opening the repository for the first time. The README should explain what the product does, why the implementation is interesting, how to run it, and where the important files live.

## Selected Approach

Use a portfolio-first README in Russian:

- Start with a concise product description and live demo link.
- Highlight user-facing capabilities before implementation details.
- Explain the technical architecture in compact, readable language.
- Include local setup, environment variables, checks, and project structure.
- Keep deeper Supabase and Vercel setup details in existing files under `docs/`.

## Scope

Modify `README.md` only for the user-facing documentation. Do not change application runtime code, tests, deployment settings, or existing user changes in the working tree.

## Acceptance Criteria

- README no longer references the old GitHub Pages URL as the primary project link.
- README presents `https://code-calendar-app.vercel.app` as the live demo.
- README documents Next.js SSR, Supabase auth, multilingual UI, subjects, themes, event registration, and test/build commands.
- README is readable as a project showcase without requiring prior knowledge of the codebase.

## Self-Review

No placeholders, contradictory scope, or ambiguous implementation requirements remain. The requested deliverable is a single README update, so no broader implementation plan is needed.
