'use client';

import { useFadeIn } from '@/lib/animations';

export default function About() {
  const aboutRef = useFadeIn();

  return (
    <section id="about" className="py-12! md:px-12! px-6! bg-secondary">
      <div
        ref={aboutRef}
        className="w-full max-w-full mx-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-24">
        

          <div className="flex-1 min-w-0">
            <p className="text-lg md:text-3xl text-foreground leading-relaxed max-w-5xl">
              The Efik people are a historic group of Southern Nigeria, closely associated with the Cross River
              region and the coastal life of Old Calabar. Their culture is shaped by trade, memory, leadership,
              art and oral tradition—preserving stories of the past through generations.
            </p>

            <p className="mt-6 text-foreground/80 leading-relaxed">
              For further reading, visit{' '}
              <a
                href="https://efikeburutu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary border-b-2 border-primary pb-0.5 hover:opacity-70 transition-opacity"
              >
                efikeburutu.org
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

