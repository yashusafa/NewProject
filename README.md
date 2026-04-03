# FitBudget (Production-Style First Release)

FitBudget is a browser-based, budget-aware fashion website. Users sign up, set profile and avatar preferences, define budget constraints by category, choose a style/occasion mode, browse normalized multi-vendor products, build outfits, preview looks on a 2D avatar, and save outfits for later.

## Product scope
### Core capabilities
- Budget-first outfit planning
- Category-aware budget accounting
- Style/occasion guided product ranking
- Multi-vendor product browsing via normalized ingestion pipeline
- 2D layered avatar preview
- Saved outfits and account review

### Deferred intentionally
- Cloth physics
- Exact fit prediction / body scanning
- Native mobile apps
- Checkout / payments
- Scraping-first ingestion architecture

## Architecture overview
- **Next.js + TypeScript** App Router pages for product flows and account management.
- **Supabase-ready auth client** with local fallback session flow for offline/demo environments.
- **Prisma schema** for Postgres models: `User`, `AvatarProfile`, `BudgetProfile`, `Vendor`, `Product`, `ProductVariant`, `Outfit`, `OutfitItem`, `SavedOutfit`.
- **Vendor ingestion isolation** in `src/lib/vendors/*` using adapter interfaces + normalization.
- **Budget engine isolation** in `src/lib/budget/engine.ts` with unit tests.
- **Avatar renderer isolation** in `src/components/AvatarPreview.tsx` and `src/lib/avatar/layers.ts`.
- **Deterministic recommendation service** in `src/lib/services/recommendation.ts`.

## Routes
- `/` marketing landing
- `/login` login
- `/signup` signup
- `/onboarding` profile/avatar setup
- `/budget` budget profile setup
- `/style` style/occasion mode selection
- `/shop` multi-vendor browsing
- `/outfit-builder` outfit assembly and budget summary
- `/saved-outfits` saved outfits history
- `/account` account/profile summary

## Tech stack
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui-compatible component organization
- Supabase (Auth/Postgres/Storage integration path)
- Prisma ORM
- Zod validation
- Vitest unit tests
- Playwright e2e tests
- Vercel-ready config

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Configure database and Supabase values in `.env`.
4. Generate Prisma client and migrate:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
5. Seed demo data:
   ```bash
   npm run prisma:seed
   ```
6. Start app:
   ```bash
   npm run dev
   ```

## Environment variables
```env
DATABASE_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Testing
- Unit tests:
  ```bash
  npm run test
  ```
- E2E tests:
  ```bash
  npm run test:e2e
  ```

## Seed workflow (admin-friendly)
- Seed script: `prisma/seed.ts`
- Includes:
  - Demo user/profile/budget
  - 3 vendors
  - Products + variants
  - Saved outfit snapshot

## Vendor adapter extension guide
1. Implement `VendorAdapter` in `src/lib/vendors/types.ts`.
2. Add source-specific fetch/parse logic (CSV/JSON/XML/API/Affiliate).
3. Return `SourceProduct[]` from adapter.
4. Register adapter in ingestion pipeline.
5. Normalize into `NormalizedProduct` via `ingestAndNormalizeProducts()`.

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import into Vercel.
3. Set environment variables in Vercel project settings.
4. Run Prisma migration against production database.
5. Deploy.

## Known environment constraints for this coding workspace
This workspace currently blocks npm/GitHub network operations (403 tunnel/policy), so dependency installation and push verification may need to be run on your local machine.
