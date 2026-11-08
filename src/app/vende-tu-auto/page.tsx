import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Vende tu auto",
  description: "Vende o cambia tu auto con Autosell en Chihuahua.",
};

export default function VendeTuAutoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <Heading
        as="h1"
        text="Vende o cambia tu auto"
        highlight="cambia"
        className="text-4xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-brand-muted md:text-lg">
        Evalúa tu unidad con nosotros. Podemos tomarla a cuenta o hacer una
        oferta de compra directa.
      </p>
      <div className="mt-10">
        <LeadForm />
      </div>
    </div>
  );
}
