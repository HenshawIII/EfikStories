import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "EFIK Stories",
  description: "A visual history project documenting Efik power, memory, and culture through cinematic storytelling.",
  icons: {
    icon: "/iconn.png",
    shortcut: "/iconn.png",
    apple: "/iconn.png",
  },
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
        {children}
      </body>
    </html>
  );
}
