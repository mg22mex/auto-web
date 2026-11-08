"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  initialQuery?: string;
  className?: string;
  placeholder?: string;
};

export function SearchBar({
  initialQuery = "",
  className,
  placeholder = "Busca por marca, modelo, tipo (SUV, pickup...) o año...",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/catalogo${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full items-center gap-2 rounded-full border border-brand-border bg-brand-surface p-1.5 pl-4 shadow-[0_0_0_1px_rgba(27,58,107,0.35)]",
        className,
      )}
      role="search"
    >
      <svg
        className="h-5 w-5 shrink-0 text-brand-muted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-brand-muted/80 md:text-base"
        aria-label="Buscar vehículos"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c01b21] min-h-11"
      >
        Buscar
      </button>
    </form>
  );
}
