'use client';

import { useFadeIn } from '@/lib/animations';
import { SocialLink } from '@/types/content';

interface FooterProps {
  socialLinks?: SocialLink[];
}

const defaultSocialLinks: SocialLink[] = [
  { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
  { platform: 'x', url: 'https://x.com', label: 'X (Twitter)' },
  { platform: 'tiktok', url: 'https://tiktok.com', label: 'TikTok' },
  { platform: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
  { platform: 'youtube', url: 'https://youtube.com', label: 'YouTube' },
];

function SocialIcon({ platform }: { platform: SocialLink['platform'] }) {
  const size = 20;
  const stroke = 'currentColor';
  switch (platform) {
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'x':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          <path d="M17 4v8a4 4 0 0 1-4 4H7" />
        </svg>
      );
    case 'facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill={stroke} />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer({ socialLinks = defaultSocialLinks }: FooterProps) {
  const footerRef = useFadeIn();

  return (
    <footer className="bg-foreground text-secondary">
      <div
        ref={footerRef}
        className="w-full max-w-full px-6! md:px-12! py-20! mx-auto"
      >
        <div className="flex flex-col gap-16! md:flex-row md:items-end md:justify-between">
          {/* Brand */}
          <div className="space-y-2!">
            <h3 className="font-heading text-2xl md:text-3xl text-secondary tracking-tight">
              EFIK Stories
            </h3>
            <p className="text-sm text-secondary/70 max-w-xs">
              Documenting Efik culture through visual storytelling
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-secondary/50">
              Follow
            </span>
            <nav
              className="flex flex-wrap gap-8"
              aria-label="Social links"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  aria-label={link.label}
                >
                  <SocialIcon platform={link.platform} />
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div
          className="mt-16! pt-8! border-t border-secondary/15 text-secondary/50 text-sm"
          role="contentinfo"
        >
          <p>&copy; {new Date().getFullYear()} EFIK Stories</p>
        </div>
      </div>
    </footer>
  );
}
