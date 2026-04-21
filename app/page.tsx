import Image from "next/image";
import { HanoiLogo } from "@/components/HanoiLogo";

export default function Home() {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2070",
    },
  ];

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {/* Introduction Card */}
      <div className="mb-8 flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-3xl lg:min-h-[600px]">
        <div className="mb-8">
          <HanoiLogo className="h-20 w-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>

        <h1 className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl lg:text-9xl">
          Next Station <br /> Starter
        </h1>

        <p className="mt-6 max-w-xl text-lg font-medium text-white/60">
          An image gallery starter built with Next.js.
        </p>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            2025 Edition
          </span>
          <div className="h-px w-8 bg-white/20" />
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-white/5"
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-80 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
