'use client';

import { useFadeIn } from '@/lib/animations';

export default function Intro() {
  const introRef = useFadeIn();

  return (
    <section className="pt-12! pb-0! md:pt-28! px-6! bg-secondary">
      <div ref={introRef} className="w-full flex flex-col md:flex-row md:items-center md:gap-10 gap-6">
        {/* Text (order changes so the video sits below on mobile) */}
        <p className="order-1 md:order-2 w-full text-lg md:text-3xl max-w-3xl text-foreground leading-relaxed mx-auto md:mx-0 md:ml-auto">
          <span className="font-bold text-5xl">EFIK Stories</span> is a visual history project documenting Efik power, memory, and culture through cinematic storytelling. Each episode draws from archival records, oral traditions, and historical research to reconstruct moments often left out of dominant historical narratives.
        </p>

        {/* Video */}
        <div className="order-2 md:order-1 relative aspect-video bg-secondary rounded-lg overflow-hidden w-full md:w-[45%]">
          <video
            className="w-full h-full object-contain"
            src="/LogoVid.mp4"
            muted
            autoPlay
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

