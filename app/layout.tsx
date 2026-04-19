import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getMetadataBase, getSiteUrl } from "@/lib/site";

const libertinusSansRegular = localFont({
  src: "../public/Libertinus_Sans/LibertinusSans-Regular.ttf",
  variable: "--font-libertinus-regular",
  weight: "400",
});

const libertinusSansBold = localFont({
  src: "../public/Libertinus_Sans/LibertinusSans-Bold.ttf",
  variable: "--font-libertinus-bold",
  weight: "700",
});

const siteTitle = "EFIK Stories";
const siteDescription =
  "A visual history project documenting Efik power, memory, and culture through cinematic storytelling.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "Efik",
    "Calabar",
    "Old Calabar",
    "Cross River",
    "Nigeria",
    "visual history",
    "documentary",
    "Efik culture",
  ],
  authors: [{ name: "EFIK Stories" }],
  creator: "EFIK Stories",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/ogefik.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/ogefik.png"],
  },
  icons: {
    icon: "/iconn.png",
    shortcut: "/iconn.png",
    apple: "/iconn.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteTitle,
      url: getSiteUrl(),
      description: siteDescription,
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      name: siteTitle,
      url: getSiteUrl(),
      description: siteDescription,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libertinusSansRegular.variable} ${libertinusSansBold.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
