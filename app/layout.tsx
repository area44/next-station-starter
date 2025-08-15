import "@/app/globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased flex flex-col text-foreground",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
