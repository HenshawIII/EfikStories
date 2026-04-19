'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  backgroundImageDesktop?: string;
  backgroundImageMobile?: string;
}

export default function Hero({ backgroundImageDesktop, backgroundImageMobile }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !backgroundRef.current || !curtainRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const background = backgroundRef.current;
    const curtain = curtainRef.current;

    // Set initial states
    gsap.set(background, { opacity: 0 });
    gsap.set(curtain, { y: 0 });

    // Create the curtain scroll effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate curtain (content) moving up
    tl.to(curtain, {
      y: '-100%',
      ease: 'power2.inOut',
      duration: 1,
    })
      // Reveal background image as curtain moves up
      .to(
        background,
        {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 1,
        },
        0 // Start at the same time as curtain animation
      );

    // Slide the logo text up on first reveal.
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [backgroundImageDesktop, backgroundImageMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary"
    >
      {/* Background Image - hidden initially, revealed on scroll */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
      >
        {/* Desktop background */}
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: backgroundImageDesktop
              ? `url(${backgroundImageDesktop})`
              : 'linear-gradient(135deg, var(--primary) 0%, rgba(4, 73, 151, 0.8) 100%)',
          }}
        />

        {/* Mobile background */}
        <div
          className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: backgroundImageMobile
              ? `url(${backgroundImageMobile})`
              : 'linear-gradient(135deg, var(--primary) 0%, rgba(4, 73, 151, 0.8) 100%)',
          }}
        />
      </div>
      
      {/* Curtain wrapper - contains the content that will scroll up */}
      <div
        ref={curtainRef}
        className="absolute inset-0 flex items-center justify-center bg-secondary z-20"
      >
        {/* Animated top strip */}
        <div className="absolute inset-x-0 top-0 h-8 md:h-11 overflow-hidden pointer-events-none z-30">
          <div className="hero-strip-track hero-strip-track-left">
            <div className="hero-strip-segment" style={{ backgroundImage: 'url(/strip.png)' }} />
            <div className="hero-strip-segment" style={{ backgroundImage: 'url(/strip.png)' }} />
          </div>
        </div>

        {/* Animated bottom strip */}
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-11 overflow-hidden pointer-events-none z-30">
          <div className="hero-strip-track hero-strip-track-right">
            <div className="hero-strip-segment" style={{ backgroundImage: 'url(/strip.png)' }} />
            <div className="hero-strip-segment" style={{ backgroundImage: 'url(/strip.png)' }} />
          </div>
        </div>

        {/* Main Content */}
        <div
          ref={contentRef}
          className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-0! md:gap-0!"
        >
          {/* Intro-like video centered above the heading */}
          <div className="w-full max-w-[320px] md:max-w-[260px] aspect-square md:aspect-4/3">
            <video
              className="w-full h-full object-contain md:scale-125"
              src="/LogoVid.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              aria-label="EFIK Stories logo animation"
            />
          </div>

          <div ref={textRef} className="w-full md:flex-1 flex md:justify-start justify-center">
            <img
              src="/HeroText.png"
              alt=""
              className="w-[200px] sm:w-[200px] md:w-[280px] lg:w-[280px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

