'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Video, Short } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoGalleryProps {
  videos?: Video[];
  shorts?: Short[];
}

const defaultVideos: Video[] = [
  {
    id: '1',
    title: 'When twins were feared',
    youtubeId: 'cdP1NK0ugYg',
    description: 'In Efik culture, twins were once considered a source of fear and danger. This episode explores the traditional beliefs and practices surrounding twins, including the belief that they bring misfortune or evil spirits.',
  },
  {
    id: '2',
    title: 'James Watts and the Ransom of Old Calabar',
    youtubeId: '2dALIi2zV9Y',
    description: 'James Watts was a British merchant who was captured by the Efik people in the 18th century. He was held for ransom by the Efik people, and eventually released after a large sum of money was paid. This episode explores the story of James Watts and the ransom of Old Calabar.',
  },
  {
    id: '3',
    title: 'Betrayal of 1767',
    youtubeId: '_uJCOLIOaPY',
    description: 'This episode introduces the complex political and trade landscape of Old Calabar in 1767, where three distinct Efik towns—Old Town, Duke Town, and Creek Town—competed for dominance along the Cross River',
  },
  
];

const defaultShorts: Short[] = [
  { id: 's15', title: 'Efik Culture Episode 7', youtubeId: 'ozp8HkKAFus' },
  { id: 's14', title: 'Efik Culture Episode 6', youtubeId: 'LiGSJKjIxRc' },
  { id: 's13', title: 'Efik Culture Episode 5', youtubeId: 'QKSIii_jNbM' },
  { id: 's12', title: 'Efik Culture Episode 4', youtubeId: 'KV7PzGVhays' },
  { id: 's11', title: 'Efik Culture Episode 3', youtubeId: 'C020Xohotjg' },
  { id: 's1', title: 'Quick Efik Greetings', youtubeId: '4W_a2i2yOVg' },
  { id: 's2', title: 'Traditional Dance Snippet', youtubeId: 'LZYPZWa3ec0' },
  { id: 's3', title: 'Recipe Highlights', youtubeId: 'BK3gukPgAMg' },
  { id: 's4', title: 'Proverb of the Day', youtubeId: 'cDCpRmLF5ZQ' },
  { id: 's5', title: 'Cultural Moment', youtubeId: 'iOTGssibSx4' },
  { id: 's6', title: 'Artisan Spotlight', youtubeId: 'oBHorTMnbw4' },
  { id: 's7', title: 'Efik Head-Tie Tutorial', youtubeId: 'oHfrVidKjH4' },
  { id: 's8', title: 'Festive Street Parade', youtubeId: '4W_a2i2yOVg' },
  { id: 's9', title: 'Folktale in 60 Seconds', youtubeId: 'zz1HWG5yj88' },
  { id: 's10', title: 'Language Challenge', youtubeId: 'ET3TElupD8o' },
];

export default function VideoGallery({ videos = defaultVideos, shorts = defaultShorts }: VideoGalleryProps) {
  const episodesRef = useRef<HTMLDivElement>(null);
  const shortsRef = useRef<HTMLDivElement>(null);
  const shortsScrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!episodesRef.current) return;

    const children = episodesRef.current.children;
    gsap.fromTo(
      Array.from(children),
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: episodesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!shortsRef.current) return;

    gsap.fromTo(
      shortsRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: shortsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  useEffect(() => {
    const scroller = shortsScrollerRef.current;
    if (!scroller) return;

    const updateScrollState = () => {
      const maxLeft = scroller.scrollWidth - scroller.clientWidth;
      const left = scroller.scrollLeft;
      setCanScrollLeft(left > 2);
      setCanScrollRight(left < maxLeft - 2);
    };

    updateScrollState();
    scroller.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      scroller.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [shorts.length]);

  const scrollShorts = (direction: 'left' | 'right') => {
    const scroller = shortsScrollerRef.current;
    if (!scroller) return;

    const amount = Math.max(scroller.clientWidth * 0.75, 220);
    scroller.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-6! md:py-14! px-6 bg-secondary">
      <div className="w-full flex flex-col gap-12 max-w-full md:px-12! px-6! items-center mx-auto overflow-x-hidden">
        {/* Main Episodes Section */}
        <div className="w-full min-w-0">
        <h2 className="text-5xl md:text-5xl font-bold text-foreground text-left ">
          Episodes
        </h2>
        </div>
        <div ref={episodesRef} className="flex flex-col gap-16 md:gap-24 w-full">
          {videos.map((video, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={video.id}
                className="w-full flex flex-col md:flex-row md:items-stretch gap-6 md:gap-8 overflow-hidden"
              >
                {/* Video block - 60% on desktop */}
                <div
                  className={`relative aspect-video bg-foreground/5 rounded-lg overflow-hidden shrink-0 md:w-[55%] ${
                    isReversed ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {/* Description block - 40% on desktop */}
                <div
                  className={`flex flex-col justify-center md:w-[45%] ${
                    isReversed ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <h3 className="font-heading text-primary text-xl md:text-2xl mb-3">{video.title}</h3>
                  <p className="text-foreground/85 leading-relaxed">
                    {video.description ?? 'Explore Efik culture and traditions.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shorts Section */}
        <div ref={shortsRef} className="w-full min-w-0 mt-24 md:mt-24!">
          <h2 className="text-5xl md:text-5xl font-bold text-foreground text-left mb-8 md:mb-12!">
            Shorts
          </h2>
          <div className="relative">
            {canScrollLeft && (
              <button
                type="button"
                aria-label="Scroll shorts left"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollShorts('left');
                }}
                className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/65 hover:bg-black/85 border border-white/20 shadow-lg shadow-black/30 backdrop-blur-sm inline-flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-7 w-7 text-secondary" strokeWidth={2.6} />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                aria-label="Scroll shorts right"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollShorts('right');
                }}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/65 hover:bg-black/85 border border-white/20 shadow-lg shadow-black/30 backdrop-blur-sm inline-flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-7 w-7 text-secondary" strokeWidth={2.6} />
              </button>
            )}
          <div
            ref={shortsScrollerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden pb-2 -mx-px scrollbar-hide snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {shorts.map((short) => (
              <div
                key={short.id}
                className="shrink-0 w-[180px] sm:w-[200px] md:w-[240px] snap-start"
              >
                <div className="relative aspect-9/16 bg-foreground/5 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${short.youtubeId}`}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {/* <p className="mt-2 text-foreground/85 text-sm line-clamp-2">{short.title}</p> */}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
