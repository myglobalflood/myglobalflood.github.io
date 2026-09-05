import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://myglobalflood.github.io/";
const socialImage = new URL("assets/og.png", siteUrl).toString();
const favicon = new URL("assets/flood-global-change-logo-frosted.png", siteUrl).toString();
const themeBootScript = `(function(){var t="light";try{if(localStorage.getItem("fgcg-theme")==="dark")t="dark"}catch(e){}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flood & Global Change Group · Lanzhou University",
    template: "%s · Flood & Global Change Group",
  },
  description:
    "Flood & Global Change Group at Lanzhou University — high-performance flood modelling, change attribution and multi-scale monitoring.",
  keywords: ["Flood and Global Change Group", "hydrology", "flood modelling", "global change", "Lanzhou University", "Jie Wang"],
  icons: {
    icon: [{ url: favicon, type: "image/png" }],
    shortcut: favicon,
    apple: favicon,
  },
  openGraph: {
    title: "Flood & Global Change Group · Lanzhou University",
    description: "High-performance modelling for floods, climate change and resilient water systems.",
    type: "website",
    images: [{ url: socialImage, width: 1732, height: 908, alt: "Flood and Global Change Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flood & Global Change Group · Lanzhou University",
    description: "High-performance modelling for floods, climate change and resilient water systems.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
