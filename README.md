# Autosell.MX Web

High-performance Next.js replacement for [autosell.mx](https://autosell.mx) — premium pre-owned vehicles in Chihuahua.

**Docs:** see the full suite in [`docs/`](./docs/README.md) (architecture, business flows, brand, timeline, stats, tools).

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

## Documentation map

| Doc | Description |
| --- | --- |
| [docs/overview.md](./docs/overview.md) | Product & audiences |
| [docs/architecture.md](./docs/architecture.md) | Technical structure + diagrams |
| [docs/business-flows.md](./docs/business-flows.md) | Sales / lead Mermaid flows |
| [docs/brand-system.md](./docs/brand-system.md) | Visual identity rules |
| [docs/timeline.md](./docs/timeline.md) | History & roadmap |
| [docs/stats.md](./docs/stats.md) | Repo & product metrics |
| [docs/tools.md](./docs/tools.md) | Stack & workflow tooling |

## Repository

https://github.com/mg22mex/auto-web
