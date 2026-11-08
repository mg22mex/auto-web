import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogFilters } from "@/components/CatalogFilters";
import { Heading } from "@/components/Heading";
import { SearchBar } from "@/components/SearchBar";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { filterVehicles } from "@/data/inventory";
import { generalWhatsappMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora el inventario de seminuevos premium Autosell en Chihuahua.",
};

function CatalogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero-glow">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <p className="text-sm text-brand-muted">Inicio / Catálogo</p>
        <Heading
          as="h1"
          text="Nuestro catálogo"
          highlight="catálogo"
          className="mt-3 text-4xl md:text-5xl"
        />
        <p className="mt-3 max-w-2xl text-brand-muted">
          Filtra por marca, año o precio. Cada unidad incluye opción de
          financiamiento desde 10% de enganche.
        </p>
        {children}
      </div>
    </div>
  );
}

async function CatalogResults({
  searchParams,
}: {
  searchParams: PageProps<"/catalogo">["searchParams"];
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const make = typeof params.make === "string" ? params.make : undefined;
  const yearMin = params.yearMin ? Number(params.yearMin) : undefined;
  const yearMax = params.yearMax ? Number(params.yearMax) : undefined;
  const priceMin = params.priceMin ? Number(params.priceMin) : undefined;
  const priceMax = params.priceMax ? Number(params.priceMax) : undefined;

  const vehicles = filterVehicles({
    q,
    make,
    yearMin: Number.isFinite(yearMin) ? yearMin : undefined,
    yearMax: Number.isFinite(yearMax) ? yearMax : undefined,
    priceMin: Number.isFinite(priceMin) ? priceMin : undefined,
    priceMax: Number.isFinite(priceMax) ? priceMax : undefined,
  });

  return (
    <>
      <div className="mt-8 max-w-3xl">
        <SearchBar initialQuery={q ?? ""} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <CatalogFilters />

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-brand-muted">
              Mostrando {vehicles.length} auto{vehicles.length === 1 ? "" : "s"}
            </p>
          </div>

          {vehicles.length === 0 ? (
            <div className="rounded-[24px] border border-brand-border bg-brand-surface p-10 text-center">
              <p className="text-lg font-semibold text-white">
                No hay resultados con esos filtros
              </p>
              <p className="mt-2 text-brand-muted">
                Ajusta la búsqueda o escríbenos y te ayudamos a encontrar el
                auto.
              </p>
              <Button
                href={whatsappUrl(generalWhatsappMessage())}
                variant="whatsapp"
                className="mt-6"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Escríbenos por WhatsApp
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          <div className="mt-12 rounded-[24px] border border-brand-border bg-brand-surface p-8 text-center">
            <Heading
              as="h2"
              text="¿No encuentras lo que buscas?"
              highlight="buscas"
              className="text-2xl md:text-3xl"
            />
            <p className="mx-auto mt-3 max-w-lg text-brand-muted">
              Cuéntanos qué auto quieres y nuestro equipo te ayuda a
              encontrarlo.
            </p>
            <Button
              href={whatsappUrl(
                "Hola Autosell, no encontré el auto que busco en el catálogo. ¿Me pueden ayudar?",
              )}
              variant="whatsapp"
              className="mt-6"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escríbenos por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function CatalogFallback() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="h-80 animate-pulse rounded-[24px] bg-brand-surface" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-[24px] bg-brand-surface"
          />
        ))}
      </div>
    </div>
  );
}

export default function CatalogoPage({
  searchParams,
}: PageProps<"/catalogo">) {
  return (
    <CatalogShell>
      <Suspense fallback={<CatalogFallback />}>
        <CatalogResults searchParams={searchParams} />
      </Suspense>
    </CatalogShell>
  );
}
