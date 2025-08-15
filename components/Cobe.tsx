"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Cobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = canvasRef.current.offsetWidth;
    let isVisible = false;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const initGlobe = () => {
      globe?.destroy();
      globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: window.devicePixelRatio || 1,
        width: width * (window.devicePixelRatio || 1),
        height: width * (window.devicePixelRatio || 1),
        phi: 0,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [{ location: [21.18541, 106.07503], size: 0.04 }],
        onRender: (state) => {
          if (isVisible && !document.hidden) {
            state.phi = phi;
            phi += 0.005;
          }
        },
      });
    };

    const resizeHandler = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        initGlobe();
      }
    };

    // Visibility detection
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasRef.current);

    // First render
    initGlobe();
    canvasRef.current.style.opacity = "1";

    window.addEventListener("resize", resizeHandler);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeHandler);
      globe?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="transition-opacity duration-500 ease-in-out"
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "1 / 1",
        opacity: 0,
      }}
    />
  );
}
