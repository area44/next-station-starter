import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import { getImages } from "@/lib/images";

export async function generateStaticParams() {
  const images = await getImages();
  return images.map((image) => ({
    photoId: String(image.id),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ photoId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const images = await getImages();
  const currentPhoto = images.find((img) => String(img.id) === params.photoId);

  if (!currentPhoto) {
    return {
      title: "Photo Not Found",
    };
  }

  return {
    title: `Photo ${currentPhoto.id}`,
    openGraph: {
      images: [
        {
          url: `/gallery/${currentPhoto.public_id}`,
        },
      ],
    },
  };
}

export default async function PhotoPage(props: {
  params: Promise<{ photoId: string }>;
}) {
  const params = await props.params;
  const images = await getImages();
  const index = Number(params.photoId);

  return (
    <main className="mx-auto max-w-full">
      <Carousel index={index} images={images} />
    </main>
  );
}
