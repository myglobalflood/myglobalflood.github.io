import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grups666.github.io/WJGroup/"),
  title: "AHS Lab · Floods & Global Change",
  description:
    "Advanced Hydrological Simulation and Application at Lanzhou University — high-performance flood modelling, attribution and monitoring.",
  keywords: [
    "hydrology",
    "flood modelling",
    "global change",
    "Lanzhou University",
    "Jie Wang",
  ],
  openGraph: {
    title: "AHS Lab · Floods & Global Change",
    description:
      "High-performance modelling for floods, climate change and resilient water systems.",
    type: "website",
    images: [
      {
        url: "/WJGroup/assets/og.png",
        width: 1732,
        height: 908,
        alt: "AHS Lab — Floods, understood.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AHS Lab · Floods & Global Change",
    description:
      "High-performance modelling for floods, climate change and resilient water systems.",
    images: ["/WJGroup/assets/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
