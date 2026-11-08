/** Simple amortization estimate used by the payment calculator. */
export function estimateMonthlyPayment(
  price: number,
  downPaymentPercent: number,
  termMonths: number,
  annualRate = 0.15,
): {
  downPayment: number;
  financedAmount: number;
  monthlyPayment: number;
} {
  const downPayment = Math.round(price * (downPaymentPercent / 100));
  const financedAmount = Math.max(price - downPayment, 0);

  if (financedAmount === 0 || termMonths <= 0) {
    return { downPayment, financedAmount, monthlyPayment: 0 };
  }

  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  const monthlyPayment = Math.round(
    (financedAmount * monthlyRate * factor) / (factor - 1),
  );

  return { downPayment, financedAmount, monthlyPayment };
}

export const TERM_OPTIONS = [12, 24, 36, 48, 60] as const;
export const MIN_DOWN_PAYMENT_PERCENT = 10;
export const MAX_DOWN_PAYMENT_PERCENT = 50;
export const DEFAULT_ANNUAL_RATE = 0.15;
