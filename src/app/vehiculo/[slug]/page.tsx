import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import { Heading } from "@/components/Heading";
import { LeadForm } from "@/components/LeadForm";
import { GuaranteedBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VehicleJsonLd } from "@/components/VehicleJsonLd";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getVehicleBySlug, inventory } from "@/data/inventory";
import { estimateMonthlyPayment } from "@/lib/financing";
import { formatKm, formatPrice } from "@/lib/format";
import { vehicleInterestMessage, whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return inventory.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vehiculo/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehículo" };
  return {
    title: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
    description: vehicle.description,
  };
}

export default async function VehiclePage({
  params,
}: PageProps<"/vehiculo/[slug]">) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const estimate = estimateMonthlyPayment(vehicle.price, 10, 48);
  const wa = whatsappUrl(vehicleInterestMessage(vehicle));
  const modelHighlight = vehicle.model.split(" ").slice(-1)[0];
  const image = vehicle.images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <VehicleJsonLd vehicle={vehicle} />

      <div className="mb-6 flex items-center justify-between gap-3 text-sm">
        <Link href="/catalogo" className="text-brand-muted hover:text-white">
          ← Regresar al catálogo
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-brand-border bg-brand-surface">
            {image ? (
              <Image
                src={image}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-brand-muted">
                Foto principal del auto
              </div>
            )}
            {vehicle.guaranteed ? (
              <GuaranteedBadge className="absolute left-4 top-4" />
            ) : null}
          </div>
        </div>

        <div className="rounded-[24px] border border-brand-border bg-brand-surface p-6 md:p-8">
          <p className="text-sm font-medium text-brand-accent">
            {vehicle.make} · {vehicle.year}
          </p>
          <Heading
            as="h1"
            text={vehicle.model}
            highlight={modelHighlight}
            className="mt-2 text-3xl md:text-4xl"
          />
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-white">
            {formatPrice(vehicle.price)}
          </p>
          <div className="mt-4 rounded-xl border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-muted">
            Mensualidad estimada desde{" "}
            <span className="font-semibold text-white">
              {formatPrice(estimate.monthlyPayment)}/mes
            </span>{" "}
            con {formatPrice(estimate.downPayment)} de enganche.
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Marca", vehicle.make],
              ["Año", String(vehicle.year)],
              ["Kilometraje", formatKm(vehicle.mileage)],
              ["Garantía", "Perfecto funcionamiento"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-brand-border bg-brand-bg px-3 py-3"
              >
                <dt className="text-brand-muted">{label}</dt>
                <dd className="mt-1 font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <Button href={wa} variant="whatsapp" className="w-full">
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
            </Button>
            <Button href="#contacto" variant="secondary" className="w-full">
              Solicitar información
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        <FinancingCalculator
          vehiclePrice={vehicle.price}
          vehicleLabel={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
        />
        <div id="contacto">
          <LeadForm vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}
