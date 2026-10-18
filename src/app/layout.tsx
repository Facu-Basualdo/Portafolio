import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { perfil } from "@/data/perfil";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  themeColor: "#06090f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
