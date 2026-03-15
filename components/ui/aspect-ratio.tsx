"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.ComponentPropsWithoutRef<"div"> {
  ratio?: number;
}

function AspectRatio({
  ratio = 1,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{
        aspectRatio: ratio,
        ...style,
      }}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { AspectRatio };
