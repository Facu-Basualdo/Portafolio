import type { Metadata, Viewport } from "next";
import { Geist_Mono, Geist_Pixel } from "next/font/google";
import { Proveedores } from "@/components/proveedores";
import { perfil } from "@/data/perfil";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

// ELSH es el eje de forma del píxel; las letras lo animan (ver .letra-pixel).
const geistPixel = Geist_Pixel({
  variable: "--font-geist-pixel",
  subsets: ["latin", "latin-ext"],
  axes: ["ELSH"],
  // Next no tiene métricas de Geist Pixel para ajustar un fallback.
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

const titulo = `${perfil.nombre} — ${perfil.rol}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://basualdo.dev"),
  title: titulo,
  description: perfil.resumen,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: perfil.nombre,
    title: titulo,
    description: perfil.resumen,
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: perfil.resumen,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`dark ${geistMono.variable} ${geistPixel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono">
        <Proveedores>{children}</Proveedores>
      </body>
    </html>
  );
}
