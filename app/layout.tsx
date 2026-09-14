import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jireh — Entiende la Biblia en orden",
  description:
    "App de devocional y lectura bíblica: entiende la Biblia en orden, en 5 minutos al día. Contexto, enseñanza y una ruta clara de principio a fin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sora.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
