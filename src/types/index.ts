export interface LinkItem {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  order: number;
  variant?: "primary" | "secondary" | "sublink"; // 테슬라 버튼 계층
  description?: string;                          // 부가 설명
  badge?: string;                                // 배지 (Featured, Open Source 등)
  category?: "main" | "project" | "blog" | "contact"; // 카테고리 분류
}

export type SocialPlatform = 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'github' | 'email' | 'linkedin';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface TeslaThemeConfig {
  accentColor: string;       // #3E6AE1 (Electric Blue)
  surfaceColor: string;      // #FFFFFF (Pure White)
  secondarySurface: string;  // #F4F4F4 (Light Ash)
  headingColor: string;      // #171A20 (Carbon Dark)
  bodyColor: string;         // #393C41 (Graphite)
  subtextColor: string;      // #5C5E62 (Pewter)
  borderColor: string;       // #EEEEEE (Cloud Gray)
  borderRadius: string;      // 4px (Barely-rounded)
  transitionTiming: string;  // 0.33s cubic-bezier(0.5, 0, 0, 0.75)
}

export interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: TeslaThemeConfig;
  socials: SocialLink[];
  links: LinkItem[];
}
