import Image from "next/image";
import Link from "next/link";
import { GuaranteedBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { formatKm, formatPrice } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { vehicleInterestMessage, whatsappUrl } from "@/lib/whatsapp";

type VehicleCardProps = {
  vehicle: Vehicle;
  priority?: boolean;
};

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const href = `/vehiculo/${vehicle.slug}`;
  const wa = whatsappUrl(vehicleInterestMessage(vehicle));
  const image = vehicle.images[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-[24px] border border-brand-border bg-brand-surface">
      <Link href={href} className="relative block aspect-[16/10] bg-brand-bg">
        {image ? (
          <Image
            src={image}
            alt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0a2a52] to-[#061630] text-sm font-medium text-brand-muted">
            Foto del auto
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-brand-bg/80 px-2 py-1 text-xs font-bold text-white backdrop-blur">
          {vehicle.year}
        </span>
        {vehicle.guaranteed ? (
          <GuaranteedBadge className="absolute bottom-3 left-3" />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-brand-accent">{vehicle.make}</p>
            <h3 className="text-[22px] font-bold leading-tight text-white">
              <Link href={href} className="hover:underline">
                {vehicle.model}
              </Link>
            </h3>
          </div>
          <p className="shrink-0 text-lg font-bold text-white">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        <p className="text-sm text-brand-muted">
          {vehicle.year} · {formatKm(vehicle.mileage)} · Enganche desde 10%
        </p>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button href={href} variant="secondary" className="flex-1">
            Ver detalles
          </Button>
          <Button href={wa} variant="whatsapp" className="flex-1">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </div>
    </article>
  );
}
