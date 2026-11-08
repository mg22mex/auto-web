"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { brands } from "@/data/inventory";
import { cn } from "@/lib/cn";

const YEAR_RANGES = [
  { label: "2024–2026", min: 2024, max: 2026 },
  { label: "2021–2023", min: 2021, max: 2023 },
  { label: "2018–2020", min: 2018, max: 2020 },
  { label: "Antes 2018", min: 2000, max: 2017 },
] as const;

export function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedMake = searchParams.get("make") ?? "";
  const yearMin = searchParams.get("yearMin");
  const yearMax = searchParams.get("yearMax");
  const priceMin = searchParams.get("priceMin") ?? "";
  const priceMax = searchParams.get("priceMax") ?? "";

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (!value) next.delete(key);
        else next.set(key, value);
      }
      router.push(`/catalogo?${next.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <aside className="space-y-4 rounded-[24px] border border-brand-border bg-brand-surface p-5">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-white">
          Marca
        </h2>
        <ul className="mt-3 space-y-2">
          {brands.map((brand) => {
            const active = selectedMake.toLowerCase() === brand.toLowerCase();
            return (
              <li key={brand}>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      update({ make: active ? null : brand.toLowerCase() })
                    }
                    className="size-4 rounded border-brand-border accent-brand-accent"
                  />
                  {brand}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-white">
          Año
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {YEAR_RANGES.map((range) => {
            const active =
              yearMin === String(range.min) && yearMax === String(range.max);
            return (
              <button
                key={range.label}
                type="button"
                onClick={() =>
                  update({
                    yearMin: active ? null : String(range.min),
                    yearMax: active ? null : String(range.max),
                  })
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold min-h-9",
                  active
                    ? "border-brand-accent bg-brand-bg text-white"
                    : "border-brand-border text-brand-muted hover:text-white",
                )}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-white">
          Precio
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Mínimo"
            value={priceMin}
            onChange={(e) => update({ priceMin: e.target.value || null })}
            className="field !rounded-full !py-2 text-sm"
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="Máximo"
            value={priceMax}
            onChange={(e) => update({ priceMax: e.target.value || null })}
            className="field !rounded-full !py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/catalogo")}
        className="text-sm font-medium text-brand-accent hover:underline"
      >
        Limpiar filtros
      </button>
    </aside>
  );
}
