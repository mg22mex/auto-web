import type { Vehicle } from "@/lib/types";
import { formatPrice } from "@/lib/format";

/** Autosell WhatsApp business line — E.164 without + */
export const WHATSAPP_NUMBER = "526142274381";
export const PHONE_DISPLAY = "(614) 227 4381";
export const SHOWROOM_ADDRESS = "Perif. De la Juventud #7133, Chihuahua";
export const BUSINESS_HOURS = "L - V: 10 am a 7 pm · S - D: 10 am a 4 pm";

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function vehicleInterestMessage(
  vehicle: Pick<Vehicle, "make" | "model" | "year" | "price">,
): string {
  return `Hola, estoy interesado en el vehículo: ${vehicle.make} ${vehicle.model} ${vehicle.year} (${formatPrice(vehicle.price)})`;
}

export function generalWhatsappMessage(): string {
  return "Hola Autosell, me gustaría recibir asesoría sobre su inventario de seminuevos.";
}

export function financingWhatsappMessage(monthly: number, price: number): string {
  return `Hola Autosell, quiero simular financiamiento. Precio aprox. ${formatPrice(price)}, mensualidad estimada ${formatPrice(monthly)}.`;
}
