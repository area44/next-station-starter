"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import SharedModal from "@/components/SharedModal";
import type { ImageProps } from "@/lib/types";

export default function Modal({
  images,
  onClose,
}: {
  images: ImageProps[];
  onClose?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const photoId = searchParams.get("photoId");
  const index = photoId ? Number(photoId) : 0;

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  useEffect(() => {
    setCurIndex(index);
  }, [index]);

  function handleClose() {
    router.push("/", { scroll: false });
    onClose?.();
  }

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(`/?photoId=${newVal}`, { scroll: false });
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
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [curIndex, images.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        ref={overlayRef}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleClose}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </div>
  );
}
