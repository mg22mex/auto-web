import type { Vehicle } from "@/lib/types";

export function VehicleJsonLd({ vehicle }: { vehicle: Vehicle }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    color: vehicle.exteriorColor,
    vehicleTransmission: vehicle.transmission,
    bodyType: vehicle.bodyType,
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: vehicle.price,
      availability:
        vehicle.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      itemCondition: "https://schema.org/UsedCondition",
    },
    image: vehicle.images,
    description: vehicle.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
