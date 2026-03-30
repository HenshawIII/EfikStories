'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useStaggerFadeIn } from '@/lib/animations';
import { Image as ImageType } from '@/types/content';

interface ImageGalleryProps {
  images?: ImageType[];
}

// Default images - swap/extend with your real gallery data later.
const defaultImages: ImageType[] = [
  {
    id: '6',
    src: '/ChiefsBrits.jpg',
    alt: 'Chiefs and British Officials at the official opening of the Calabar Watt Market, 1901.',
    title: `Chiefs and British Officials at the official opening of the Calabar Watt Market, 1901.- Chiefs and British Officials at the official opening of the Calabar Watt Market, 1901.`,
  },
  {
    id: '3',
    src: '/OldCal.jpg',
    alt: 'Old Calabar scene',
    title: 'Old Calabar',
  },
  {
    id: '4',
    src: '/Ndem.jpg',
    alt: 'Iban Ndem which translates to women of the deities can be seen crossing the river.',
    title: 'Iban Ndem which translates to women of the deities can be seen crossing the river.',
  },
  {
    id: '5',
    src: '/council.jpg',
    alt: 'Old Calabar Native Council',
    title: `Old Calabar Native Council - Standing back row : Edet Efiong Otu, Esien Ekpe Hogan-Bassey, Eyo Ephraim Adam, Offiong Ekpenyong Eyo II, Okon Efio Efana.
Standing second row : Ekei Ephraim Adam, Enian Esien, Efa Etim Efa, Umo Ephraim Adam, Ekpenyong Nkana, Ekeng Efana, Harold Duke Henshaw.

Sitting : Asuquo Ekpenyong Oku, Ani Eniang Offiong, Bassey Duke Ephraim, Daniel Henshaw, Asuquo Ekpenyong Nsa, Rev Itam Itam Okpo, Efiong Ekpenyong Oku.

Foreground : George Duke Henshaw, Ekpenyong Ekpenyong Eyo II.`,
  },
  {
    id: '2',
    src: '/Obong-Orok.png',
    alt: 'Orok Edem-Odo, Obong of Calabar (1880-1896)',
    title: 'Orok Edem-Odo, Obong of Calabar (1880-1896)',
  },
  {
    id:'9',
    src:"/Brass.jpg",
    alt:"Brass plate depicting the Ekpe spirit",
    title:`Brass plate depicting the Ekpe spirit - 
Decorated brass dish embossed with a central female figure standing in a ceremonial Robe and Mask with a servant to either side and an entwined serpent below.`
  },
  {
    id:'8',
    src:"/EfikWomen.jpg",
    alt:"Beautiful Efik Women",
    title:'Beautiful Efik Women'
  },
  {
    id:"10",
    src:"/Ekpe.jpg",
    alt:"Ekpe Masquerade",
    title:"Ekpe Masquerade"
  },
  {
    id:'7',
    src:"/Ekpe_Nyoro.jpg",
    alt:"The Ekpe Masquerade of the EFIK People",
    title:'The Ekpe Masquerade of the EFIK People'
  },

  {
    id: '1',
    src: '/Obongo.png',
    alt: 'HRM (Obong) Edidem Ekpo Oko Abasi Otu V of Calabar',
    title: 'HRM (Obong) Edidem Ekpo Oko Abasi Otu V of Calabar',
  }
];

export default function ImageGallery({ images = defaultImages }: ImageGalleryProps) {
  const galleryRef = useStaggerFadeIn(0.1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewAnimating, setPreviewAnimating] = useState(false);
  const [previewDir, setPreviewDir] = useState<'left' | 'right'>('left');
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const safeImages = useMemo(() => images?.length ? images : defaultImages, [images]);

  const activeImage = safeImages[activeIndex];

  const openAt = (index: number) => {
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    setPreviewAnimating(false);
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const goPrev = () => {
    setActiveIndex((idx) => (idx - 1 + safeImages.length) % safeImages.length);
  };

  const goNext = () => {
    setActiveIndex((idx) => (idx + 1) % safeImages.length);
  };

  const slidePrev = () => {
    if (previewAnimating) return;
    setPreviewDir('right');
    setPreviewAnimating(true);
    previewTimerRef.current = setTimeout(() => {
      goPrev();
      setPreviewAnimating(false);
    }, 180);
  };

  const slideNext = () => {
    if (previewAnimating) return;
    setPreviewDir('left');
    setPreviewAnimating(true);
    previewTimerRef.current = setTimeout(() => {
      goNext();
      setPreviewAnimating(false);
    }, 180);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    setPreviewAnimating(false);

    // Lock scrolling while modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    // Cleanup any pending preview timer.
    return () => {
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    };
  }, []);

  return (
    <section className="py-12! md:pb-18! md:pt-16! px-6! md:px-12! bg-secondary ">
      <div className="max-w-7xl mx-auto!">
        <div ref={galleryRef} className="w-full! mx-auto!">
          {/* Slideshow Preview */}
          <div className="relative rounded-2xl overflow-hidden  bg-secondary w-full! mx-auto!">
            {/* Arrows */}
            <button
              type="button"
              onClick={() => slidePrev()}
              aria-label="Previous image"
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16 md:h-18 md:w-18 rounded-full bg-black/70 hover:bg-black/90 border-2 border-white/35 shadow-2xl shadow-black/45 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 inline-flex items-center justify-center"
            >
              <ChevronLeft className="h-9 w-9 md:h-10 md:w-10 text-secondary" strokeWidth={2.8} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => slideNext()}
              aria-label="Next image"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16 md:h-18 md:w-18 rounded-full bg-black/70 hover:bg-black/90 border-2 border-white/35 shadow-2xl shadow-black/45 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 inline-flex items-center justify-center"
            >
              <ChevronRight className="h-9 w-9 md:h-10 md:w-10 text-secondary" strokeWidth={2.8} aria-hidden />
            </button>

            {/* Image */}
            <div
              className="group cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => openAt(activeIndex)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openAt(activeIndex);
              }}
            >
              <div
                className={[
                  'aspect-16/10 md:aspect-video relative overflow-hidden transition-all duration-200',
                  previewAnimating
                    ? previewDir === 'left'
                      ? '-translate-x-6 opacity-0'
                      : 'translate-x-6 opacity-0'
                    : 'translate-x-0 opacity-100',
                ].join(' ')}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  loading="lazy"
                />

                {/* Hover caption */}
                <div className="absolute inset-0 bg-gray-50/20 opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex items-end justify-center p-6">
                  <p className="text-black font-heading text-lg md:text-xl leading-snug text-center">
                    {activeImage.title ?? activeImage.alt}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Caption / Position */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="text-foreground/60 text-sm md:text-base font-heading tracking-wide uppercase">
              {activeIndex + 1} / {safeImages.length}
            </div>
            {/* <div className="text-primary text-base md:text-lg font-heading">
              {activeImage.title ?? activeImage.alt}
            </div> */}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {isOpen && activeImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery viewer"
          onMouseDown={() => close()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-5xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              {/* Arrows */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16 md:h-18 md:w-18 rounded-full bg-black/75 hover:bg-black/95 border-2 border-white/40 shadow-2xl shadow-black/50 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 inline-flex items-center justify-center"
              >
                <ChevronLeft className="h-9 w-9 md:h-10 md:w-10 text-secondary" strokeWidth={2.8} aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16 md:h-18 md:w-18 rounded-full bg-black/75 hover:bg-black/95 border-2 border-white/40 shadow-2xl shadow-black/50 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 inline-flex items-center justify-center"
              >
                <ChevronRight className="h-9 w-9 md:h-10 md:w-10 text-secondary" strokeWidth={2.8} aria-hidden />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 h-14 w-14 rounded-full bg-black/75 hover:bg-black/95 border-2 border-white/40 shadow-xl shadow-black/40 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 inline-flex items-center justify-center"
              >
                <X className="h-7 w-7 text-secondary" strokeWidth={2.8} aria-hidden />
              </button>

              <div className="aspect-16/10 md:aspect-video relative">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="text-secondary/80 text-sm md:text-base font-heading tracking-wide uppercase">
                {activeIndex + 1} / {safeImages.length}
              </div>

              <div className="text-secondary text-base md:text-lg font-heading">
                {activeImage.title ?? activeImage.alt}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

