const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("es-MX");

export function formatPrice(value: number): string {
  return mxn.format(value);
}

export function formatKm(value: number): string {
  return `${number.format(value)} km`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
