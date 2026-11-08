# Business flows

End-to-end journeys for Autosell.MX buyers, sellers, and the sales desk.

## 1. Buyer discovery → conversion

```mermaid
flowchart TD
  A[Landing / Inicio] --> B{Intent}
  B -->|Browse featured| C[Autos destacados]
  B -->|Search| D[SearchBar query]
  B -->|WhatsApp early| W1[General WhatsApp]
  C --> E[VehicleCard]
  D --> F[/catalogo?q=.../]
  F --> G[Apply filters<br/>marca · año · precio]
  G --> E
  E -->|Ver detalles| H[/vehiculo/slug/]
  E -->|WhatsApp| W2[Vehicle-prefilled WhatsApp]
  H --> I[Review specs + GARANTIZADO]
  H --> J[FinancingCalculator]
  H --> K[LeadForm]
  J -->|Cotizar por WhatsApp| W3[Financing WhatsApp]
  K -->|Enviar / Cotizar| W4[Lead WhatsApp with nombre · tel · modalidad]
  W1 --> S[Sales advisor on WhatsApp]
  W2 --> S
  W3 --> S
  W4 --> S
  S --> T{Outcome}
  T -->|Visit| U[Showroom cita]
  T -->|Finance| V[Bank / crédito process]
  T -->|Cash| X[De contado close]
```

## 2. Catalog filtering (shareable state)

```mermaid
sequenceDiagram
  actor Buyer
  participant UI as CatalogFilters / SearchBar
  participant Router as Next.js router
  participant Data as filterVehicles()
  participant Cards as VehicleCard grid

  Buyer->>UI: Select make / year / price / q
  UI->>Router: push /catalogo?make=ford&yearMin=2021...
  Router->>Data: parse searchParams
  Data-->>Cards: Available vehicles matching filters
  Cards-->>Buyer: Updated grid (shareable URL)
```

## 3. Financing simulation → sales handoff

```mermaid
flowchart LR
  P[Vehicle price] --> DP[Enganche slider 10–50%]
  P --> TM[Plazo select 12–60]
  DP --> M[estimateMonthlyPayment]
  TM --> M
  R[Tasa ref. 15%] --> M
  M --> OUT[Pago mensual estimado]
  OUT --> WA[WhatsApp cotización]
  WA --> ADV[Asesor confirma<br/>condiciones reales banco]
```

## 4. Lead generation dual path

```mermaid
flowchart TB
  subgraph FormPath["Form path — red CTA"]
    F1[Nombre · Teléfono · Correo] --> F2[Financiado / De contado]
    F2 --> F3[Enviar]
    F3 --> F4[Open WhatsApp with prefilled body]
  end

  subgraph InstantPath["Instant path — green CTA"]
    G1[Cotizar este auto / WhatsApp] --> G2[Open WhatsApp immediately]
  end

  Vehicle[Vehicle context] --> FormPath
  Vehicle --> InstantPath
  F4 --> Desk[Sales inbox]
  G2 --> Desk
```

## 5. Appointment / showroom visit

```mermaid
flowchart TD
  Nav[Agenda tu cita] --> Page[/cita/]
  Page --> Info[Address + hours]
  Page --> Lead[LeadForm]
  Lead --> WA[WhatsApp to desk]
  WA --> Book[Advisor schedules visit]
  Book --> Show[Showroom · Perif. De la Juventud #7133]
```

## 6. Sell / trade-in intake

```mermaid
flowchart TD
  V[/vende-tu-auto/] --> Msg[Value prop: toma a cuenta / compra]
  Msg --> Lead[LeadForm]
  Lead --> WA[WhatsApp with seller contact]
  WA --> Eval[Advisor requests photos · KM · docs]
  Eval --> Offer[Offer or trade credit]
  Offer --> BuyerFlow[Optionally enter buyer inventory flow]
```

## 7. Internal ops loop (target state)

Current site uses static inventory seed. Intended future loop:

```mermaid
flowchart LR
  Upload[Auto-upload / inventory ops] --> DB[(Inventory source)]
  DB --> Web[auto-web catalog]
  Web --> Leads[WhatsApp / form leads]
  Leads --> CRM[Sales follow-up]
  CRM --> Status[Mark Sold / Available]
  Status --> DB
```

## Role of color in the funnel

| Color | Hex | Business meaning |
| --- | --- | --- |
| Rojo Autosell | `#D81F26` | Decide — catalog, cita, Enviar |
| Verde WhatsApp | `#5BD26F` | Converse — human sales channel |
| Azul Autosell | `#2B9FEA` | Emphasize — one key word per headline |
