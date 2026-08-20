"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Share2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import type { ImageProps } from "@/lib/types";

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  changePhotoId?: (newVal: number) => void;
  closeModal?: () => void;
  navigation?: boolean;
  currentPhoto?: ImageProps;
  direction?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [_loaded, setLoaded] = useState(false);

  const currentImage = images ? images[index] : currentPhoto;
  if (!currentImage) return null;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (images && index < images.length - 1) {
        changePhotoId?.(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId?.(index - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-3/2 w-full max-w-7xl items-center wide:h-full wide:max-h-[867px]"
        {...handlers}
      >
        {/* Main image container */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden h-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={`/gallery/${currentImage.public_id}`}
                width={Number(currentImage.width)}
                height={Number(currentImage.height)}
                priority
                alt="Gallery photo"
                onLoad={() => setLoaded(true)}
                placeholder={currentImage.blurDataUrl ? "blur" : "empty"}
                {...(currentImage.blurDataUrl
                  ? { blurDataURL: currentImage.blurDataUrl }
                  : {})}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons / Controls Overlay */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-between p-4 pointer-events-none">
          {/* Top Control Bar */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 z-30 pointer-events-auto">
            {navigation ? (
              <button
                type="button"
                onClick={() => closeModal?.()}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white cursor-pointer"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            ) : (
              <a
                href={`/gallery/${currentImage.public_id}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                title="Open original"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "Photo",
                        url: window.location.href,
                      })
                      .catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white cursor-pointer"
                title="Share photo"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <a
                href={`/gallery/${currentImage.public_id}`}
                download={`${currentImage.public_id}`}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                title="Download photo"
              >
                <ArrowDown className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Previous / Next Arrow Controls */}
          {navigation && images && (
            <>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => changePhotoId?.(index - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white pointer-events-auto cursor-pointer"
                  title="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {index < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => changePhotoId?.(index + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white pointer-events-auto cursor-pointer"
                  title="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {navigation && images && (
          <div className="absolute bottom-0 inset-x-0 z-30 flex justify-center overflow-x-auto p-4 gap-2 bg-linear-to-t from-black/80 to-transparent pointer-events-auto">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => changePhotoId?.(i)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md transition cursor-pointer ${
                  i === index
                    ? "brightness-110 ring-2 ring-white scale-105 z-10"
                    : "brightness-50 hover:brightness-75"
                }`}
              >
                <Image
                  src={`/gallery/${img.public_id}`}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
