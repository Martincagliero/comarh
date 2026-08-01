import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Cursor from "@/components/ui/Cursor";
import Loader from "@/components/layout/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/ui/ContactModal";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Serif display de alto contraste (aprox. libre a la serif de eleos.la).
// Variable font: peso "variable" + eje opsz alto para el wordmark gigante.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.comarh.com.ar"),
  title: {
    default: "COMARH S.A. — Consultora en Medio Ambiente y Recursos Hídricos",
    template: "%s · COMARH S.A.",
  },
  description:
    "Consultora ambiental y de recursos hídricos. Diseño, desarrollo de proyectos, asistencia técnica y consultoría con rigor técnico. Sunchales, Santa Fe.",
  keywords: [
    "consultora ambiental",
    "recursos hídricos",
    "estudio de impacto ambiental",
    "tratamiento de efluentes",
    "Santa Fe",
    "COMARH",
  ],
  openGraph: {
    title: "COMARH S.A. — Consultora en Medio Ambiente y Recursos Hídricos",
    description:
      "Diseño, desarrollo de proyectos, asistencia técnica y consultoría ambiental a medida de cada cliente.",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/logoentero.png", width: 596, height: 842, alt: "COMARH S.A." }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScrollProvider>
          <Loader />
          <Cursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ContactModal />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
