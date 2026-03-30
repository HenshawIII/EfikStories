export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail?: string;
  description?: string;
}

export interface Short {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail?: string;
}

export interface Image {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'x' | 'tiktok' | 'facebook' | 'youtube';
  url: string;
  label: string;
}

