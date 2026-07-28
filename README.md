# Sarco Appliances

Regional appliance retailer platform inspired by the information architecture and shopping flow of established appliance dealers — with original **Sarco Appliances** branding, content, and UI.

**Tagline:** Appliances, Delivery, Installation & Repair  

Brand and contact details live in [`src/config/business.ts`](src/config/business.ts) and [`src/config/site.ts`](src/config/site.ts).

## Phase 1 (this release)

- Multi-layer retailer header (accessibility, utility, quick links, search, mega menu)
- Store / ZIP selector (Zustand + mock locations)
- Search autocomplete (products, categories, brands, popular)
- Mobile accordion drawer + sticky bottom nav
- Homepage in the exact Spichers-inspired section order (mock data)
- Dense multi-column footer with store locations
- Prisma schema + seed for categories, brands, products, stores, promotions, reviews
- Stub routes for catalog/repair/company links; working search, cart, and product detail shells

## Requirements

- Node.js 20+
- npm
- Optional: PostgreSQL for Prisma migrate/seed

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional database

```bash
# Start Postgres and set DATABASE_URL in .env, then:
npx prisma db push
npm run db:seed
```

Phase 1 homepage and catalog UI use TypeScript mock data under `src/data/` so the site runs without Postgres.

## Homepage structure checklist

Header (1–5): Accessibility → Utility → Store/Account → Search → Mega nav  

Then: Rebate bar → Hero carousel → Service cards → Kitchen packages → Featured products → Laundry banner → Shop by category → Outdoor cooking → Repair → Smart home → Builders → Reviews → Social → VIP newsletter → Footer

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js development server |
| `npm run build` | Prisma generate + production build |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed sample retailer data |

## Stack

Next.js App Router · React · TypeScript · Tailwind CSS v4 · Zustand · Zod · Prisma · PostgreSQL (schema ready)
