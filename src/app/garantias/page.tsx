import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Garantías",
  description: "Garantía de perfecto funcionamiento en seminuevos Autosell.",
};

export default function GarantiasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Heading
        as="h1"
        text="Autos garantizados"
        highlight="garantizados"
        className="text-4xl md:text-5xl"
      />
      <p className="mt-4 text-lg text-brand-muted">
        Cada unidad pasa por revisión mecánica y se entrega con respaldo Autosell
        de perfecto funcionamiento, para que compres con tranquilidad.
      </p>
      <ul className="mt-8 space-y-3 text-brand-muted">
        <li>• Inspección previa a la entrega</li>
        <li>• Documentación clara y transparente</li>
        <li>• Soporte postventa en Chihuahua</li>
      </ul>
      <Button href="/catalogo" variant="primary" className="mt-8">
        Ver inventario garantizado
      </Button>
    </div>
  );
}
