# Timeline

Project history for **auto-web** (Autosell.MX website replacement) and planned next phases.

## Chronology

```mermaid
timeline
  title Autosell Auto-web
  section Legacy
    Pre-2026 : Live site autosell.mx PHP/jQuery stack
             : Inventory ops via Auto-upload tooling
  section Foundation · Nov 2026
    2026-11-07 : Brand identity guide delivered (Borrador 1)
               : Next.js 16 scaffold created in Auto-web
               : Design tokens + Manrope applied
               : Navbar · Search · VehicleCard · Calculator · LeadForm
               : Routes for catalog · detail · finance · cita · guarantees
               : Production build verified
               : Initial push to github.com/mg22mex/auto-web
    2026-11-07 evening : Website documentation suite added
  section Near-term roadmap
    Phase 1 : Live inventory API / DB sync from Auto-upload
    Phase 2 : Appointment backend + CRM / Twilio hooks
    Phase 3 : Full media gallery · sold states · analytics
    Phase 4 : Cutover DNS from legacy autosell.mx
```

## Milestone table

| When | Milestone | Evidence |
| --- | --- | --- |
| Pre-project | Legacy public site online | autosell.mx |
| 2026-11-07 | Identity guide locked (colors, Manrope, card/pill rules) | Brand PDF → tokens in `globals.css` |
| 2026-11-07 | App scaffold + core sales UI | Commit `404f729` |
| 2026-11-07 | GitHub remote established | `origin` → `mg22mex/auto-web` |
| 2026-11-07 | Documentation published | `docs/*` (this suite) |

## Git history (repo)

| Commit | Summary |
| --- | --- |
| `75192e1` | Initial commit from Create Next App |
| `404f729` | Build Autosell.MX site with brand tokens and core sales components |

## Roadmap detail

### Phase 1 — Inventory truth
- Replace `src/data/inventory.ts` seed with API/DB
- Keep `Vehicle` type and JSON-LD contract
- Cascading make → model filters (per `.cursorrules`)

### Phase 2 — Lead operations
- Persist LeadForm submissions (not only WhatsApp open)
- Optional Twilio / CRM sync
- Cita calendar or Monday.com / Slack alerts

### Phase 3 — Experience depth
- Multi-image galleries with aspect-ratio grids
- Sold overlays / waitlist
- Analytics (search queries, calculator engagement, WA click-through)

### Phase 4 — Cutover
- Staging parity check vs legacy catalog
- SEO redirects from old vehicle URLs
- DNS / CDN switch to Next deployment
