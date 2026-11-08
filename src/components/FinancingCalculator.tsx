"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_ANNUAL_RATE,
  MAX_DOWN_PAYMENT_PERCENT,
  MIN_DOWN_PAYMENT_PERCENT,
  TERM_OPTIONS,
  estimateMonthlyPayment,
} from "@/lib/financing";
import { formatPercent, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { financingWhatsappMessage, whatsappUrl } from "@/lib/whatsapp";

type FinancingCalculatorProps = {
  vehiclePrice: number;
  vehicleLabel?: string;
};

export function FinancingCalculator({
  vehiclePrice,
  vehicleLabel,
}: FinancingCalculatorProps) {
  const [downPercent, setDownPercent] = useState(MIN_DOWN_PAYMENT_PERCENT);
  const [termMonths, setTermMonths] = useState<(typeof TERM_OPTIONS)[number]>(48);

  const result = useMemo(
    () =>
      estimateMonthlyPayment(
        vehiclePrice,
        downPercent,
        termMonths,
        DEFAULT_ANNUAL_RATE,
      ),
    [vehiclePrice, downPercent, termMonths],
  );

  const wa = whatsappUrl(
    financingWhatsappMessage(result.monthlyPayment, vehiclePrice),
  );

  return (
    <section className="rounded-[24px] border border-brand-border bg-brand-surface p-6 md:p-8">
      <p className="mb-2 text-[13px] font-bold uppercase tracking-wide text-brand-accent">
        Simula tu financiamiento
      </p>
      <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
        Calculadora de <span className="text-brand-accent">pagos</span>
      </h2>

      {vehicleLabel ? (
        <p className="mb-6 text-sm text-brand-muted">
          Estimación para {vehicleLabel} · Precio {formatPrice(vehiclePrice)}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <label htmlFor="down-payment" className="font-medium text-white">
                Enganche
              </label>
              <span className="text-brand-muted">
                {formatPercent(downPercent)} · {formatPrice(result.downPayment)}
              </span>
            </div>
            <input
              id="down-payment"
              type="range"
              min={MIN_DOWN_PAYMENT_PERCENT}
              max={MAX_DOWN_PAYMENT_PERCENT}
              step={1}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="brand-range w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-brand-muted">
              <span>{MIN_DOWN_PAYMENT_PERCENT}%</span>
              <span>{MAX_DOWN_PAYMENT_PERCENT}%</span>
            </div>
          </div>

          <div>
            <label htmlFor="term" className="mb-2 block text-sm font-medium text-white">
              Plazo
            </label>
            <select
              id="term"
              value={termMonths}
              onChange={(e) =>
                setTermMonths(Number(e.target.value) as (typeof TERM_OPTIONS)[number])
              }
              className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-3 text-white outline-none focus:border-brand-accent"
            >
              {TERM_OPTIONS.map((months) => (
                <option key={months} value={months}>
                  {months} meses
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-brand-border bg-brand-bg px-4 py-3">
              <p className="text-xs text-brand-muted">Tasa anual</p>
              <p className="text-lg font-bold text-white">
                {formatPercent(DEFAULT_ANNUAL_RATE * 100)}*
              </p>
            </div>
            <div className="rounded-xl border border-brand-border bg-brand-bg px-4 py-3">
              <p className="text-xs text-brand-muted">Monto a financiar</p>
              <p className="text-lg font-bold text-white">
                {formatPrice(result.financedAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[20px] border border-brand-border bg-brand-bg p-6">
          <div>
            <p className="text-sm text-brand-muted">Pago mensual estimado</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {formatPrice(result.monthlyPayment)}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-brand-muted">
              *Estimado informativo con tasa de referencia. El plan final depende
              de aprobación crediticia y condiciones del banco.
            </p>
          </div>
          <Button href={wa} variant="whatsapp" className="w-full">
            <WhatsAppIcon className="h-4 w-4" />
            Cotizar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
