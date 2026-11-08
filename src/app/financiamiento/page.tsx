import type { Metadata } from "next";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import { Heading } from "@/components/Heading";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Financiamiento",
  description:
    "Simula tu mensualidad con enganche desde 10% y plazos flexibles en Autosell Chihuahua.",
};

export default function FinanciamientoPage() {
  return (
    <div className="hero-glow">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <Heading
          as="h1"
          text="Financiamiento a tu medida"
          highlight="medida"
          className="text-4xl md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-brand-muted md:text-lg">
          Enganche desde el 10% o elige cuánto quieres pagar al mes. Nosotros te
          ayudamos a tramitar tu crédito.
        </p>

        <div className="mt-10">
          <FinancingCalculator vehiclePrice={709_000} vehicleLabel="ejemplo Sierra AT4" />
        </div>

        <div className="mt-10">
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
