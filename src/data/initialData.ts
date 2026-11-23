import { ProfileData } from "@/types";

export const initialProfileData: ProfileData = {
  username: "tesla_creator",
  displayName: "정희원 (Huiwon Jung)",
  bio: "기술과 인터페이스의 극단적 절제를 지향하는 프론트엔드 엔지니어입니다.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
  theme: {
    accentColor: "#3E6AE1",
    surfaceColor: "#FFFFFF",
    secondarySurface: "#F4F4F4",
    headingColor: "#171A20",
    bodyColor: "#393C41",
    subtextColor: "#5C5E62",
    borderColor: "#EEEEEE",
    borderRadius: "4px",
    transitionTiming: "all 0.33s cubic-bezier(0.5, 0, 0, 0.75)",
  },
  socials: [
    { platform: "github", url: "https://github.com/huiwon77" },
    { platform: "email", url: "mailto:a0507072@gmail.com" },
    { platform: "linkedin", url: "https://linkedin.com/in/example" },
  ],
  links: [
    // 1. 핵심 액션 (Signature Primary CTA)
    {
      id: "link-1",
      title: "1:1 커피챗 & 프로젝트 협업 문의",
      description: "개발 외주, 기술 멘토링, 커피챗 일정을 간편하게 예약하세요.",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=a0507072@gmail.com",
      isActive: true,
      order: 1,
      variant: "primary",
      badge: "Featured",
      category: "contact",
    },

    // 2. 대표 프로젝트 (Secondary CTA)
    {
      id: "link-2",
      title: "MyLink: 테슬라 감성 링크트리 클론 서비스",
      description: "Next.js 16, React 19, Tailwind v4 기반 미니멀 프로필 링크 서비스",
      url: "https://github.com/huiwon77/my-link-kw",
      isActive: true,
      order: 2,
      variant: "secondary",
      badge: "Open Source",
      category: "project",
    },
    {
      id: "link-3",
      title: "온라인 이러닝 플랫폼 (E-Learning LMS)",
      description: "강의 스트리밍 및 학습 진도율 관리 대시보드 웹 애플리케이션",
      url: "https://demo.example.com/elearning",
      isActive: true,
      order: 3,
      variant: "secondary",
      category: "project",
    },

    // 3. 기술 블로그 & 아티클 (Secondary)
    {
      id: "link-4",
      title: "개발 블로그: 테슬라 디자인 시스템 분석기",
      description: "극단적 절제미(Radical Subtraction)를 웹 UI에 녹여내는 방법",
      url: "https://velog.io/@example/tesla-design-system",
      isActive: true,
      order: 4,
      variant: "secondary",
      category: "blog",
    },
    {
      id: "link-5",
      title: "노션(Notion) 이력서 & 포트폴리오 상세",
      description: "학력, 기술 스택, 프로젝트 상세 회고 및 이력 정리",
      url: "https://notion.so/example/resume",
      isActive: true,
      order: 5,
      variant: "secondary",
      category: "main",
    },

    // 4. 네트워킹 & 서브링크 (Sublink)
    {
      id: "link-6",
      title: "LinkedIn 프로필 바로가기",
      url: "https://linkedin.com/in/example",
      isActive: true,
      order: 6,
      variant: "sublink",
      category: "contact",
    },
    {
      id: "link-7",
      title: "프로필 링크 복사하기",
      url: "#copy",
      isActive: true,
      order: 7,
      variant: "sublink",
      category: "main",
    },

    // 5. 비활성화 예시 (isActive: false)
    {
      id: "link-8",
      title: "2026 회고록 (준비 중)",
      description: "한 해 동안의 성장과 도전 회고",
      url: "https://blog.example.com/2026-review",
      isActive: false,
      order: 8,
      variant: "secondary",
      badge: "Soon",
      category: "blog",
    },
  ],
};
