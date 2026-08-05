import type { Metadata, Viewport } from "next";
import { Inter, Share_Tech_Mono, Space_Grotesk } from "next/font/google";

import { Providers } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoadieFlow",
  description: "App móvil para roadies — Meta de crecimiento",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#131313",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${shareTechMono.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-background font-sans text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
