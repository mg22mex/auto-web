import type { Vehicle } from "@/lib/types";

export const inventory: Vehicle[] = [
  {
    id: "1",
    slug: "gmc-sierra-at4-2020",
    make: "GMC",
    model: "Sierra AT4",
    year: 2020,
    price: 709_000,
    mileage: 71_000,
    transmission: "Automática",
    exteriorColor: "Negro",
    bodyType: "Pickup",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1231/big_v7di025w.jpeg",
    ],
    description:
      "Pickup premium con paquete AT4, lista para carretera y trabajo pesado con garantía Autosell.",
  },
  {
    id: "2",
    slug: "ford-ranger-raptor-2023",
    make: "Ford",
    model: "Ranger Raptor",
    year: 2023,
    price: 900_000,
    mileage: 48_000,
    transmission: "Automática",
    exteriorColor: "Naranja",
    bodyType: "Pickup",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1230/big_k3ofpaox.jpeg",
    ],
    description:
      "Raptor 2023 con bajo kilometraje. Potencia off-road y acabados deportivos.",
  },
  {
    id: "3",
    slug: "nissan-march-active-2020",
    make: "Nissan",
    model: "March Active",
    year: 2020,
    price: 160_000,
    mileage: 53_000,
    transmission: "Manual",
    exteriorColor: "Plata",
    bodyType: "Hatchback",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1229/big_5jnh869b.jpeg",
    ],
    description:
      "Compacto eficiente, ideal para ciudad. Enganche accesible y financiamiento flexible.",
  },
  {
    id: "4",
    slug: "ford-lobo-platinum-2024",
    make: "Ford",
    model: "Lobo Platinum",
    year: 2024,
    price: 1_290_000,
    mileage: 70_000,
    transmission: "Automática",
    exteriorColor: "Blanco",
    bodyType: "Pickup",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1228/big_9tdd80df.jpeg",
    ],
    description:
      "Lobo Platinum reciente con lujo y capacidad. Una de las unidades más solicitadas.",
  },
  {
    id: "5",
    slug: "porsche-cayenne-gts-2023",
    make: "Porsche",
    model: "Cayenne GTS",
    year: 2023,
    price: 1_890_000,
    mileage: 24_000,
    transmission: "Automática",
    exteriorColor: "Gris",
    bodyType: "SUV",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1227/big_682hrB20.jpeg",
    ],
    description:
      "SUV de alto desempeño con poco uso. Experiencia premium Autosell.",
  },
  {
    id: "6",
    slug: "chevrolet-tahoe-high-country-2021",
    make: "Chevrolet",
    model: "Tahoe High Country",
    year: 2021,
    price: 950_000,
    mileage: 91_800,
    transmission: "Automática",
    exteriorColor: "Negro",
    bodyType: "SUV",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1225/big_v6o61njh.jpeg",
    ],
    description:
      "SUV familiar full-size con paquete High Country y amplio espacio interior.",
  },
  {
    id: "7",
    slug: "chevrolet-blazer-2019",
    make: "Chevrolet",
    model: "Blazer",
    year: 2019,
    price: 359_000,
    mileage: 53_213,
    transmission: "Automática",
    exteriorColor: "Rojo",
    bodyType: "SUV",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1224/big_m13esagm.jpeg",
    ],
    description: "SUV versátil con estilo deportivo y excelente relación valor-precio.",
  },
  {
    id: "8",
    slug: "toyota-rav4-xle-2022",
    make: "Toyota",
    model: "RAV4 XLE",
    year: 2022,
    price: 489_000,
    mileage: 75_000,
    transmission: "Automática",
    exteriorColor: "Blanco",
    bodyType: "SUV",
    guaranteed: true,
    status: "Available",
    images: [
      "https://www.autosell.mx/public/uploads/catalogo/obj1223/big_94xi4896.jpeg",
    ],
    description:
      "RAV4 XLE confiable, ideal para familia y aventuras de fin de semana.",
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return inventory.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(limit = 3): Vehicle[] {
  return inventory.filter((v) => v.status === "Available").slice(0, limit);
}

export function searchVehicles(query: string): Vehicle[] {
  const q = query.trim().toLowerCase();
  if (!q) return inventory.filter((v) => v.status === "Available");

  return inventory.filter((v) => {
    if (v.status !== "Available") return false;
    const haystack = [
      v.make,
      v.model,
      v.bodyType,
      String(v.year),
      v.exteriorColor,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterVehicles(params: {
  make?: string;
  q?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
}): Vehicle[] {
  return inventory.filter((v) => {
    if (v.status !== "Available") return false;
    if (params.make && v.make.toLowerCase() !== params.make.toLowerCase()) {
      return false;
    }
    if (params.yearMin && v.year < params.yearMin) return false;
    if (params.yearMax && v.year > params.yearMax) return false;
    if (params.priceMin && v.price < params.priceMin) return false;
    if (params.priceMax && v.price > params.priceMax) return false;
    if (params.q) {
      const haystack = `${v.make} ${v.model} ${v.bodyType} ${v.year}`.toLowerCase();
      if (!haystack.includes(params.q.toLowerCase())) return false;
    }
    return true;
  });
}

export const brands = Array.from(new Set(inventory.map((v) => v.make))).sort();
