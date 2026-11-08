import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Autosell.MX | Seminuevos premium en Chihuahua",
    template: "%s | Autosell.MX",
  },
  description:
    "Conduce el auto que siempre quisiste. Inventario garantizado, financiamiento desde 10% de enganche y atención en Chihuahua.",
  metadataBase: new URL("https://autosell.mx"),
  openGraph: {
    title: "Autosell.MX | Seminuevos premium en Chihuahua",
    description:
      "Catálogo de seminuevos premium con garantía y financiamiento flexible.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-bg font-sans text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
