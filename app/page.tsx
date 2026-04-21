import Link from "next/link";
import Gallery from "@/components/Gallery";
import { HanoiLogo } from "@/components/HanoiLogo";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <main className="flex-1 mx-auto max-w-[1960px] p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {/* Hero / Intro Card */}
          <div className="relative col-span-1 row-span-3 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-card px-10 py-20 text-center text-balance sm:col-span-2 lg:col-span-1 lg:row-span-2">
            {/* Hanoi Logo */}
            <div className="relative z-10 flex items-center justify-center">
              <HanoiLogo className="w-24 h-24 text-foreground" />
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="relative z-10 scroll-m-20 text-4xl font-extrabold uppercase tracking-widest lg:text-5xl">
                {siteConfig.name}
              </h1>
              <p className="relative z-10 text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
                {siteConfig.description}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <Gallery />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:px-8 flex items-center justify-center w-full mt-8">
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
