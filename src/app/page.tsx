import Link from "next/link";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import { Heading } from "@/components/Heading";
import { LeadForm } from "@/components/LeadForm";
import { SearchBar } from "@/components/SearchBar";
import { LocationChip } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VehicleCard } from "@/components/VehicleCard";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getFeaturedVehicles } from "@/data/inventory";
import {
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  generalWhatsappMessage,
  whatsappUrl,
} from "@/lib/whatsapp";

export default function Home() {
  const featured = getFeaturedVehicles(3);

  return (
    <>
      <section className="hero-glow">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <LocationChip className="animate-fade-up" />
            <h1 className="animate-fade-up-delay mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl md:leading-[1.05]">
              Conduce el auto que siempre{" "}
              <span className="text-brand-accent">quisiste</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-brand-muted md:text-lg">
              Inventario premium en Chihuahua, garantía de perfecto funcionamiento
              y mensualidades flexibles desde 10% de enganche.
            </p>
            <div className="mx-auto mt-8 max-w-2xl animate-fade-up-delay">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={whatsappUrl(generalWhatsappMessage())} variant="whatsapp">
                <WhatsAppIcon className="h-4 w-4" />
                Escríbenos por WhatsApp
              </Button>
              <Button href="/catalogo" variant="secondary">
                Ver catálogo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Heading
            as="h2"
            text="Autos destacados"
            highlight="destacados"
            className="text-3xl md:text-4xl"
          />
          <Link
            href="/catalogo"
            className="text-sm font-semibold text-brand-accent hover:underline"
          >
            Ver catálogo completo →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={i === 0} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-brand-border bg-brand-surface p-8">
            <Heading
              as="h2"
              text="Mensualidades flexibles: tú eliges cuánto pagar"
              highlight="tú"
              className="text-2xl md:text-3xl"
            />
            <p className="mt-3 text-brand-muted">
              Enganche desde el 10%. Simula tu plan y nosotros te ayudamos a
              tramitar el crédito.
            </p>
            <Button href="/financiamiento" variant="primary" className="mt-6">
              Simula tu financiamiento
            </Button>
          </div>
          <div className="rounded-[24px] border border-brand-border bg-brand-surface p-8">
            <Heading
              as="h2"
              text="Compra y venta con seguridad"
              highlight="seguridad"
              className="text-2xl md:text-3xl"
            />
            <p className="mt-3 text-brand-muted">
              Unidades revisadas, documentación clara y garantía Autosell de
              perfecto funcionamiento.
            </p>
            <Button href="/garantias" variant="secondary" className="mt-6">
              Conoce nuestras garantías
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Variedad de marcas", "SUV, pickup, sedán y más."],
            ["Autos garantizados", "Revisión y respaldo Autosell."],
            ["Financiamiento", "Planes desde 10% de enganche."],
            ["Atención a la medida", "Asesoría presencial y WhatsApp."],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[24px] border border-brand-border bg-brand-surface p-5"
            >
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-1 text-sm text-brand-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-brand-red px-6 py-8 md:flex-row md:items-center md:px-10">
          <p className="max-w-xl text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Comencemos juntos la búsqueda de tu auto ideal.
          </p>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-bg px-5 py-2.5 text-sm font-semibold text-white"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <FinancingCalculator vehiclePrice={709_000} vehicleLabel="GMC Sierra AT4 2020" />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <LeadForm />
      </section>
    </>
  );
}
