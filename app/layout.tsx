import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.variable} font-sans bg-black antialiased selection:bg-white selection:text-black`}
      >
        {/* Ambient Background Glows */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] h-[70%] w-[70%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute -bottom-[10%] left-[20%] h-[50%] w-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>

        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}
