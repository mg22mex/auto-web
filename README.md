# Autosell.MX Web

High-performance Next.js replacement for [autosell.mx](https://autosell.mx) — premium pre-owned vehicles in Chihuahua.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 with Autosell design tokens
- Manrope (400–800)

## Brand tokens

| Token | Hex | Use |
| --- | --- | --- |
| Marino profundo | `#061630` | Page background |
| Marino superficie | `#082347` | Cards / panels |
| Borde azul | `#1B3A6B` | 1px borders |
| Azul Autosell | `#2B9FEA` | One-word headline highlights |
| Rojo Autosell | `#D81F26` | Primary CTAs |
| Verde WhatsApp | `#5BD26F` | WhatsApp only |

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Core modules

- `Navbar`, `SearchBar`, `VehicleCard`
- `FinancingCalculator` (enganche ≥ 10%)
- `LeadForm` (form + WhatsApp prefill)
- Catalog filters synced to URL search params
- JSON-LD `schema.org/Vehicle` on detail pages
