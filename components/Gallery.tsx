import { glob } from "glob";
import Image from "next/image";
import sharp from "sharp";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ImageMetadata = {
  src: string;
  width: number;
  height: number;
  base64: string;
};

async function fetchImageMetadata(pattern: string): Promise<ImageMetadata[]> {
  try {
    const files = glob.sync(pattern, { posix: true });

    const imagePromises = files.map(async (file) => {
      try {
        const src = file.replace(/^public/, "");
        const image = sharp(file);
        const metadata = await image.metadata();

        if (!metadata?.width || !metadata?.height || !metadata.format) {
          throw new Error(`Incomplete metadata for ${file}`);
        }

        const mimeType = metadata.format === "jpeg" ? "jpg" : metadata.format;
        const buffer = await image
          .clone()
          .resize(10, 10, { fit: "inside" })
          .toBuffer();
        const base64 = `data:image/${mimeType};base64,${buffer.toString(
          "base64"
        )}`;

        return { src, width: metadata.width, height: metadata.height, base64 };
      } catch (err) {
        console.warn(`Skipping image ${file}:`, err);
        return null;
      }
    });

    return (await Promise.all(imagePromises)).filter(
      (img): img is ImageMetadata => Boolean(img)
    );
  } catch (error) {
    console.error("Error fetching image metadata:", error);
    return [];
  }
}

const Gallery = async () => {
  const images = await fetchImageMetadata(
    "public/gallery/*.{jpg,jpeg,png,webp}"
  );

  if (!images.length) {
    return (
      <p className="col-span-full py-10 text-center text-muted-foreground">
        No images found in the gallery.
      </p>
    );
  }

  return images.map(({ src, height, width, base64 }) => {
    const altText =
      src
        .split("/")
        .pop()
        ?.replace(/\..+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim() || "Gallery image";

    return (
      <Dialog key={src}>
        <DialogTrigger render={<div />}>
          <div className="group relative cursor-zoom-in overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md aspect-3/2">
            <Image
              src={src}
              placeholder="blur"
              blurDataURL={base64}
              alt={altText}
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Overlay for aesthetic */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </DialogTrigger>
        <DialogContent
          className="w-auto h-auto max-w-[95vw] max-h-[95vh] border-none bg-transparent p-0 shadow-none sm:max-w-[95vw] flex items-center justify-center"
          showCloseButton={false}
        >
          <span className="sr-only">
            <DialogTitle>{altText}</DialogTitle>
          </span>
          <Image
            src={src}
            placeholder="blur"
            blurDataURL={base64}
            height={height}
            width={width}
            alt={altText}
            className="h-auto w-auto max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    );
  });
};

export default Gallery;
