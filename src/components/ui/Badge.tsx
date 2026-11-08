import { cn } from "@/lib/cn";

export function GuaranteedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-brand-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white",
        className,
      )}
    >
      Garantizado
    </span>
  );
}

export function LocationChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-[13px] font-bold uppercase tracking-wide text-brand-muted",
        className,
      )}
    >
      Seminuevos · Chihuahua
    </span>
  );
}
