"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SharedModal from "@/components/SharedModal";
import type { ImageProps } from "@/lib/types";
import { useLastViewedPhoto } from "@/lib/useLastViewedPhoto";

export default function Carousel({
  index,
  images,
}: {
  index: number;
  images: ImageProps[];
}) {
  const router = useRouter();
  const [, setLastViewedPhoto] = useLastViewedPhoto();
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    setLastViewedPhoto(String(newVal));
    router.push(`/p/${newVal}`, { scroll: false });
  }

  function closeModal() {
    setLastViewedPhoto(String(curIndex));
    router.push("/");
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (curIndex + 1 < images.length) {
          changePhotoId(curIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (curIndex > 0) {
          changePhotoId(curIndex - 1);
        }
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [curIndex, images.length]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-2xl">
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={closeModal}
        navigation={true}
      />
    </div>
  );
}
