export type VehicleStatus = "Available" | "Sold";

export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  exteriorColor: string;
  bodyType: string;
  guaranteed: boolean;
  status: VehicleStatus;
  images: string[];
  description: string;
};

export type PurchaseMethod = "financiado" | "contado";

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  purchaseMethod: PurchaseMethod;
  vehicle?: Pick<Vehicle, "make" | "model" | "year" | "price" | "slug">;
  message?: string;
};
