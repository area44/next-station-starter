import { Earth } from "lucide-react";
import Link from "next/link";

import Gallery from "@/components/Gallery";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <main className="flex-1 mx-auto max-w-[1960px] p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {/* Hero / Intro Card */}
          <div className="relative col-span-1 row-span-3 flex flex-col items-center justify-end gap-6 overflow-hidden rounded-xl border bg-card px-8 pb-20 pt-72 text-center text-balance sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:pt-0 shadow-sm transition-all hover:shadow-md">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Earth Icon with subtle rotation/float effect in CSS if I could, but let's stick to simple first */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.15]">
                <Earth className="w-[300%] h-[300%] stroke-[0.3] shrink-0 blur-[2px]" />
              </div>
              {/* Radial gradient to create depth */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--card)_80%)]" />
              {/* Subtle accent glow */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Title & Description */}
            <div className="relative z-10 space-y-4">
              <h1 className="scroll-m-20 text-4xl font-black uppercase tracking-tighter lg:text-6xl text-foreground drop-shadow-sm">
                {siteConfig.name}
              </h1>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                {siteConfig.description}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <Gallery />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:px-8 flex items-center justify-center w-full bg-muted/30">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Built with ♥ by{" "}
          <span className="font-semibold text-foreground">AREA44</span>. Source
          on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          .
        </p>
      </footer>
    </>
  );
}
