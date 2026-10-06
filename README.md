# Chipflow

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/hero-reduced.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/hero-light.svg">
    <img src="assets/hero/hero-motion.svg" alt="ChipFlow — animated project plate showing request &rarr; authenticate &rarr; authorise &rarr; record &rarr; reject. Motion depicts this project's real state transition." width="100%">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/computational-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/computational-light.svg">
    <img src="assets/hero/computational-motion.svg" alt="State machine: request &rarr; authenticate &rarr; authorise &rarr; record &rarr; reject." width="100%">
  </picture>
</p>

Real-time allocation, logistics, and risk monitoring MVP for semiconductor buyers and manufacturers.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Prisma + SQLite
- pnpm

## Routes
- `/` product overview
- `/planner` semiconductor supply dashboard
- `/dashboard` allocation tracker
- `/dashboard/runs/[id]` run detail
- `/pricing` enterprise pricing

## Commands
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm db:push`
