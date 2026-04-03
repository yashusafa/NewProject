# FitBudget (MVP)

FitBudget is a **budget-aware outfit-building website**. Users set a budget range, choose categories that count toward budget, pick a style/occasion, browse products from multiple vendors, build an outfit, preview it on a simple 2D avatar, and save looks.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui-compatible component structure
- Supabase-ready data approach
- Prisma ORM (Postgres schema)
- Zod validation
- Vitest unit tests
- Playwright e2e tests
- Vercel-ready Next.js layout

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Prepare DB and seed:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. Run app:
   ```bash
   npm run dev
   ```

## Seeded vendors and ingestion
- Three mock vendors are provided in `src/lib/vendors/mockVendors.ts`.
- Vendor-specific structures are accessed through a `VendorAdapter` interface.
- Normalization and ranking logic lives in `src/lib/vendors/normalize.ts`.
- This keeps source-specific feed logic out of UI pages.

## How to add future vendor adapters
1. Create a new adapter implementing `VendorAdapter` in `src/lib/vendors/`.
2. Parse source format (CSV/JSON/XML/API).
3. Return `SourceProduct[]`.
4. Register the adapter in adapter list.
5. Run through normalization pipeline before exposing to UI.

## Current MVP boundaries (intentional)
- No checkout/payments
- No fit prediction/body scanning
- No cloth physics / heavy 3D
- No large-scale scraping engine
- No social/community layer

## Architecture summary
- `src/lib/budget`: Pure budget engine + tests.
- `src/lib/avatar`: Simple 2D layered avatar rendering metadata.
- `src/lib/vendors`: Adapter interfaces + mock vendors + ranking.
- `prisma/`: Data model and seed data.
- `tests/unit`: Budget engine coverage (edge cases included).
- `tests/e2e`: Basic end-to-end MVP flow.
