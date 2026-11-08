import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { LeadForm } from "@/components/LeadForm";
import { SHOWROOM_ADDRESS, BUSINESS_HOURS } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Agenda tu cita",
  description: "Agenda una visita al showroom Autosell en Chihuahua.",
};

export default function CitaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <Heading
        as="h1"
        text="Agenda tu cita en showroom"
        highlight="cita"
        className="text-4xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-brand-muted">
        Visítanos en {SHOWROOM_ADDRESS}. Horario: {BUSINESS_HOURS}.
      </p>
      <div className="mt-10">
        <LeadForm />
      </div>
    </div>
  );
}
