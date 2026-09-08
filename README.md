# Shop on EMI

A full-stack product page for buying smartphones on EMI, with plans "backed by mutual funds" — inspired by Snapmint's product pages. Built as a full-stack engineering assignment, with an emphasis on doing the boring parts (schema design, API shape, deployment) properly rather than just making the UI look right.

**Live app:** https://1-fi-assignment-seven.vercel.app/
**API:** https://onefi-assignment-dzv9.onrender.com/health

## What it does

You land on a small catalog of three phones, each with a couple of color/storage variants. Click into one and you get the actual product page: photo, price against the MRP, and a list of EMI plans you can pick between — different monthly amounts depending on how many months you spread the payment over, with 0% interest on the shorter plans and 10.5% once you go past two years, plus a flat cashback on every plan. Pick one, hit proceed, and you land on a small receipt-style confirmation showing what you chose and what it adds up to.

Nothing here is hardcoded — the products, variants, and every EMI number are rows in a Postgres database, served through a couple of REST endpoints.

## Stack

- **Frontend** — React + Vite, styled with Tailwind CSS v4
- **Backend** — Node.js + Express
- **Database** — PostgreSQL, hosted on Supabase
- **Deployment** — Vercel (frontend), Render (backend), both on free tiers

## Project structure

This is a monorepo — two independent apps living side by side, deployed separately.

```
emi-shop/
├── frontend/          React + Vite app
│   ├── src/
│   │   ├── components/    VariantSwatch, EmiPlanOption, skeletons, Header, Layout
│   │   ├── pages/          HomePage, ProductPage, OrderConfirmationPage
│   │   ├── lib/            api.js (fetch helpers), format.js (currency formatting)
│   │   └── main.jsx        routes
│   └── vercel.json         SPA rewrite so deep links don't 404 on refresh
├── backend/           Express API
│   ├── routes/products.js  GET /api/products, GET /api/products/:slug
│   ├── lib/supabaseClient.js
│   ├── scripts/
│   │   ├── seed.js          seeds products/variants/EMI plans
│   │   └── uploadImages.js  uploads product photos to Supabase Storage and links them
│   └── index.js
└── README.md
```

## Data model

Three tables, one straightforward chain of relationships:

```
products
  └── product_variants  (color / storage combination, its own price + MRP + image)
        └── emi_plans   (tenure, monthly amount, interest rate, cashback)
```

A phone is a `product`. Each color/storage combo you can buy is a `product_variant` — pricing lives here, not on the product, since an iPhone in different storage tiers costs differently. Each variant has its own set of EMI plans, since the monthly amount obviously depends on the price of that specific variant. This is what lets the product page swap price and EMI numbers instantly when you tap a different color swatch, without needing a second API call.


## API

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/health` | `{ status, message }` — quick liveness check |
| GET | `/api/products` | Array of products, each with a `defaultVariant` (for the home page grid) |
| GET | `/api/products/:slug` | One product, with every variant nested inside, and every variant's EMI plans nested inside that |

A request for a slug that doesn't exist returns a `404` with `{"error": "Product not found"}`, which the frontend uses to show a proper "we couldn't find that" page rather than a broken one.

## Design notes

The visual direction leans into the EMI ledger idea rather than a generic e-commerce card grid — the plan list on the product page is one continuous sheet with hairline dividers instead of seven separate boxes, prices use tabular figures so they line up like a real statement would, and the palette (a deep emerald plus a muted amber) is meant to read as "money" without falling back on the obvious green-means-go, red-means-stop defaults.

Product photos are placeholder-quality on purpose. Rather than hotlink real Apple/Samsung/Google marketing photography (fragile, and murky on licensing for something outside their own site), images are uploaded to Supabase Storage and served from there — swapping in real photos later is a one-line update to `image_url`, no code changes needed.

## Known trade-offs

Being upfront about the free-tier realities rather than pretending they don't exist:

- **Render's free web service spins down after 15 minutes of inactivity.** The first request after a quiet period takes 30–60 seconds to wake back up. The frontend shows a loading state rather than hanging, but it's worth knowing about if a page seems slow on first load.
- **Supabase's free database pauses after 7 days with no activity.** If the live demo has been untouched for a week, it needs a manual resume from the Supabase dashboard before the API will respond again.
- **"Proceed with selected plan" doesn't create a real order.** It navigates to a confirmation page showing what was selected, but nothing gets written back to the database — there's no `orders` table, and no payment integration. That felt like the right scope for this assignment; see below for what I'd add if this needed to be real.

## What I'd add next

If this were headed toward being a real product rather than an assignment:

- An `orders` table and a `POST /api/orders` endpoint, so "proceed" actually persists something instead of just passing state through the router
- Real product photography, properly licensed
- Basic auth, so EMI selection could be tied to an actual user
- An admin view for adding products/variants without touching SQL directly

## Author's note

Built end to end — schema, API, UI, deployment — as a demonstration of shipping a small full-stack feature the way I'd actually approach it at work: get the data model right first, build the UI against realistic mock data before wiring up the real thing, and treat the unglamorous parts (loading states, error handling, free-tier limitations) as part of the deliverable, not an afterthought.