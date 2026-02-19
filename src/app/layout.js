import { Spline_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const splineSans = Spline_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://gta6portal.com"),
  alternates: { canonical: "./" },
  title: {
    default: "GTA 6 Portal - Todo sobre Grand Theft Auto VI",
    template: "%s | VI Portal",
  },
  description: "El portal definitivo de GTA 6. Noticias verificadas, rumores clasificados, análisis de trailers frame a frame, evolución del mapa de Leonida y cuenta atrás para el lanzamiento.",
  keywords: ["GTA 6", "Grand Theft Auto VI", "GTA VI", "Rockstar Games", "Vice City", "Leonida", "noticias GTA 6", "rumores GTA 6", "mapa GTA 6", "trailer GTA 6"],
  openGraph: {
    title: "GTA 6 Portal - Todo sobre Grand Theft Auto VI",
    description: "El portal definitivo de GTA 6. Noticias, rumores, mapa, trailers y más.",
    type: "website",
    locale: "es_ES",
    siteName: "VI Portal",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${splineSans.variable} font-display bg-background-dark text-white antialiased overflow-x-hidden selection:bg-primary selection:text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow page-enter">
          {children}
        </main>
        <Footer />
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />

        {/* JSON-LD: WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "VI Portal - GTA 6",
              "url": "https://gta6portal.com",
              "description": "El portal definitivo de GTA 6. Noticias verificadas, rumores clasificados y análisis de trailers.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gta6portal.com/noticias?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
