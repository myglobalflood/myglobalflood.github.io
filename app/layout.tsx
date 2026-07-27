import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://zmxxhyjie.github.io/";
const socialImage = new URL("assets/og.png", siteUrl).toString();
const favicon = new URL("favicon.svg", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flood Global Group · Lanzhou University",
    template: "%s · Flood Global Group",
  },
  description:
    "Flood Global Group at Lanzhou University — high-performance flood modelling, change attribution and multi-scale monitoring.",
  keywords: ["Flood Global Group", "FGG", "hydrology", "flood modelling", "global change", "Lanzhou University", "Jie Wang"],
  icons: {
    icon: [{ url: favicon, type: "image/svg+xml" }],
    shortcut: favicon,
  },
  openGraph: {
    title: "Flood Global Group · Lanzhou University",
    description: "High-performance modelling for floods, climate change and resilient water systems.",
    type: "website",
    images: [{ url: socialImage, width: 1732, height: 908, alt: "Flood Global Group — Floods, understood." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flood Global Group · Lanzhou University",
    description: "High-performance modelling for floods, climate change and resilient water systems.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
