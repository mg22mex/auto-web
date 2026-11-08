import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { SHOWROOM_ADDRESS, BUSINESS_HOURS, PHONE_DISPLAY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Autosell.MX — seminuevos premium en Chihuahua.",
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Heading
        as="h1"
        text="Somos Autosell"
        highlight="Autosell"
        className="text-4xl md:text-5xl"
      />
      <p className="mt-4 text-lg leading-relaxed text-brand-muted">
        Somos una agencia de seminuevos premium en Chihuahua. Combinamos
        inventario selecto, financiamiento flexible y atención cercana para que
        conduzcas el auto que siempre quisiste.
      </p>
      <div className="mt-8 rounded-[24px] border border-brand-border bg-brand-surface p-6 text-sm text-brand-muted">
        <p>
          <span className="font-semibold text-white">Showroom:</span>{" "}
          {SHOWROOM_ADDRESS}
        </p>
        <p className="mt-2">
          <span className="font-semibold text-white">Tel:</span> {PHONE_DISPLAY}
        </p>
        <p className="mt-2">
          <span className="font-semibold text-white">Horario:</span>{" "}
          {BUSINESS_HOURS}
        </p>
      </div>
    </div>
  );
}
