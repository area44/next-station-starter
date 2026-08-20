import { Suspense } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import Modal from "@/components/Modal";
import { getImages } from "@/lib/images";

export default async function Home(props: {
  searchParams: Promise<{ photoId?: string }>;
}) {
  const searchParams = await props.searchParams;
  const photoId = searchParams.photoId;
  const images = await getImages();

  return (
    <>
      <GalleryGrid images={images} />
      {photoId !== undefined && (
        <Suspense>
          <Modal images={images} />
        </Suspense>
      )}
    </>
  );
}
