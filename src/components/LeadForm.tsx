"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Heading } from "@/components/Heading";
import { cn } from "@/lib/cn";
import type { PurchaseMethod, Vehicle } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { vehicleInterestMessage, whatsappUrl } from "@/lib/whatsapp";

type LeadFormProps = {
  vehicle?: Pick<Vehicle, "make" | "model" | "year" | "price" | "slug">;
  className?: string;
};

export function LeadForm({ vehicle, className }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<PurchaseMethod>("financiado");
  const [sent, setSent] = useState(false);

  const title = vehicle
    ? `¿Te interesa este ${vehicle.model}?`
    : "¿Listo para encontrar tu auto?";
  const highlight = vehicle ? vehicle.model.split(" ").slice(-1)[0] : "auto";

  function buildWhatsAppBody() {
    const base = vehicle
      ? vehicleInterestMessage(vehicle)
      : "Hola Autosell, quiero asesoría para comprar un seminuevo.";
    return [
      base,
      "",
      `Nombre: ${name || "(sin nombre)"}`,
      `Teléfono: ${phone || "(sin teléfono)"}`,
      email ? `Correo: ${email}` : null,
      `Modalidad: ${method === "financiado" ? "Financiado" : "De contado"}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    window.open(whatsappUrl(buildWhatsAppBody()), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      className={cn(
        "rounded-[24px] border border-brand-border bg-brand-surface p-6 md:p-8",
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Heading
            as="h2"
            text={title}
            highlight={highlight}
            className="text-2xl md:text-3xl"
          />
          <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">
            Déjanos tus datos o escríbenos por WhatsApp. Nuestro equipo en
            Chihuahua te responde con opciones claras
            {vehicle
              ? ` para el ${vehicle.make} ${vehicle.model} ${vehicle.year} (${formatPrice(vehicle.price)}).`
              : "."}
          </p>
          <Button
            href={whatsappUrl(buildWhatsAppBody())}
            variant="whatsapp"
            className="mt-6"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {vehicle ? "Cotizar este auto" : "Escríbenos por WhatsApp"}
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="lead-name" className="mb-1.5 block text-sm text-brand-muted">
              Nombre
            </label>
            <input
              id="lead-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
              placeholder="Tu nombre completo"
              autoComplete="name"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lead-phone" className="mb-1.5 block text-sm text-brand-muted">
                Teléfono
              </label>
              <input
                id="lead-phone"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="field"
                placeholder="614..."
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="lead-email" className="mb-1.5 block text-sm text-brand-muted">
                Correo
              </label>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                placeholder="correo@ejemplo.com"
                autoComplete="email"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm text-brand-muted">
              ¿Cómo te interesa comprarlo?
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["financiado", "Financiado"],
                  ["contado", "De contado"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMethod(value)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-sm font-semibold transition-colors min-h-11",
                    method === value
                      ? "border-brand-accent bg-brand-bg text-white"
                      : "border-brand-border bg-transparent text-brand-muted hover:text-white",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <Button type="submit" variant="primary" className="w-full">
            Enviar
          </Button>
          {sent ? (
            <p className="text-center text-sm text-brand-accent">
              Abrimos WhatsApp con tu mensaje prellenado.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
