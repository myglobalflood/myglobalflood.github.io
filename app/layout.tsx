import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ahs-lab-lzu.sappy-seed-4321.chatgpt.site/";
const socialImage = new URL("assets/og.png", siteUrl).toString();
const favicon = new URL("favicon.svg", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AHS Lab · Floods & Global Change",
    template: "%s · AHS Lab",
  },
  description:
    "Advanced Hydrological Simulation and Application at Lanzhou University — high-performance flood modelling, attribution and monitoring.",
  keywords: ["hydrology", "flood modelling", "global change", "Lanzhou University", "Jie Wang"],
  icons: {
    icon: [{ url: favicon, type: "image/svg+xml" }],
    shortcut: favicon,
  },
  openGraph: {
    title: "AHS Lab · Floods & Global Change",
    description: "High-performance modelling for floods, climate change and resilient water systems.",
    type: "website",
    images: [{ url: socialImage, width: 1732, height: 908, alt: "AHS Lab — Floods, understood." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AHS Lab · Floods & Global Change",
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
