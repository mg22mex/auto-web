import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS_HOURS,
  PHONE_DISPLAY,
  SHOWROOM_ADDRESS,
  WHATSAPP_NUMBER,
  whatsappUrl,
  generalWhatsappMessage,
} from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-border bg-brand-bg">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Image
            src="/logo.png"
            alt="Autosell.MX"
            width={160}
            height={38}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">
            Seminuevos premium en Chihuahua. Inventario garantizado,
            financiamiento flexible y atención personalizada.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Vehículos
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            <li>
              <Link href="/catalogo" className="hover:text-white">
                Catálogo completo
              </Link>
            </li>
            <li>
              <Link href="/financiamiento" className="hover:text-white">
                Financiamiento
              </Link>
            </li>
            <li>
              <Link href="/garantias" className="hover:text-white">
                Garantías
              </Link>
            </li>
            <li>
              <Link href="/vende-tu-auto" className="hover:text-white">
                Vende tu auto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            <li>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white">
                Tel: {PHONE_DISPLAY}
              </a>
            </li>
            <li>{SHOWROOM_ADDRESS}</li>
            <li>{BUSINESS_HOURS}</li>
            <li>
              <a
                href={whatsappUrl(generalWhatsappMessage())}
                className="text-brand-whatsapp hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-brand-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 Autosell.MX. Todos los derechos reservados.</p>
          <p>
            <Link href="/nosotros" className="hover:text-white">
              Aviso de privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
