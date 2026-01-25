import Link from "next/link";

import Cobe from "@/components/Cobe";
import Gallery from "@/components/Gallery";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <main className="flex-1 mx-auto max-w-490 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {/* Hero / Intro Card */}
          <div className="relative col-span-1 row-span-3 flex flex-col items-center justify-end gap-4 overflow-hidden rounded-lg border bg-card px-6 pb-16 pt-64 text-center text-balance sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:pt-0 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
            {/* Background Globe + Gradient Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Cobe />
              </span>
              <span className="absolute inset-x-0 bottom-0 h-100 bg-linear-to-b from-card/0 via-card to-card" />
            </div>

            {/* Title & Description */}
            <h1 className="scroll-m-20 text-4xl font-extrabold uppercase tracking-tight lg:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Image Gallery */}
          <Gallery />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:px-8 flex items-center justify-center w-full">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Built by AREA44. The source code is available on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </footer>
    </>
  );
}
