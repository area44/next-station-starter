import fs from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";
import sharp from "sharp";
import type { ImageProps } from "./types";

let cachedImages: ImageProps[] | null = null;

export async function getImages(): Promise<ImageProps[]> {
  if (cachedImages) {
    return cachedImages;
  }

  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const files = await glob("**/*.{jpg,jpeg,png,webp}", { cwd: galleryDir });
  files.sort();

  const images: ImageProps[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;

    const filePath = path.join(galleryDir, file);
    const fileBuffer = await fs.readFile(filePath);

    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    const width = metadata.width ? String(metadata.width) : "800";
    const height = metadata.height ? String(metadata.height) : "600";
    const format = metadata.format || path.extname(file).replace(".", "");

    const blurBuffer = await image
      .resize(16, 16, { fit: "inside" })
      .toFormat("jpeg", { quality: 20 })
      .toBuffer();

    const blurDataUrl = `data:image/jpeg;base64,${blurBuffer.toString("base64")}`;

    images.push({
      id: i,
      height,
      width,
      public_id: file,
      format,
      blurDataUrl,
    });
  }

  cachedImages = images;
  return images;
}
