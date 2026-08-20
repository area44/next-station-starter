"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import HanoiLogo from "@/components/HanoiLogo";
import { siteConfig } from "@/lib/config";
import type { ImageProps } from "@/lib/types";
import { useLastViewedPhoto } from "@/lib/useLastViewedPhoto";

export default function GalleryGrid({ images }: { images: ImageProps[] }) {
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && lastViewedPhotoRef.current) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [lastViewedPhoto, setLastViewedPhoto]);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* Intro Card */}
        <div className="after:content-[''] relative col-span-1 row-span-3 flex flex-col items-center justify-end gap-4 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-6 pb-16 pt-64 text-center text-white sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <HanoiLogo />
          </div>
          <h1 className="relative z-10 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="relative z-10 text-muted-foreground text-sm sm:text-base">
            {siteConfig.description}
          </p>
        </div>

        {/* Gallery Images */}
        {images.map(({ id, public_id, blurDataUrl }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
            className="after:content-[''] group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-lg bg-white/10 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              alt="Gallery Photo"
              className="transform rounded-lg object-cover brightness-90 transition group-hover:brightness-110 group-hover:scale-105"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder={blurDataUrl ? "blur" : "empty"}
              {...(blurDataUrl ? { blurDataURL: blurDataUrl } : {})}
              src={`/gallery/${public_id}`}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
