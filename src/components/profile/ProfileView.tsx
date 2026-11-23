"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { ProfileHeader } from "./ProfileHeader";
import { SocialRibbon } from "./SocialRibbon";
import { LinkList } from "./LinkList";
import { PersistentBottomBar } from "./PersistentBottomBar";
import { initialProfileData } from "@/data/initialData";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";

export function ProfileView() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const storeProfile = useProfileStore((state) => state.profile);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 단계와 hydration 이전에는 initialProfileData를 사용하여 Hydration mismatch 방지
  const profile = mounted ? storeProfile : initialProfileData;

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("링크가 복사되었습니다.");
      }
    }
  };

  const emailSocial = profile.socials.find((s) => s.platform === "email");
  const emailAddress = emailSocial
    ? emailSocial.url.replace("mailto:", "")
    : "a0507072@gmail.com";

  return (
    <div className="min-h-screen bg-white text-[#171A20] flex flex-col justify-between selection:bg-[#3E6AE1] selection:text-white">
      {/* 1. Tesla Minimal Header */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-transparent">
        <div className="max-w-[480px] mx-auto px-5 h-12 flex items-center justify-between">
          <span className="font-medium text-[12px] tracking-[0.2em] text-[#171A20] select-none uppercase">
            M Y L I N K
          </span>
          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="text-[13px] font-medium text-[#5C5E62] hover:text-[#171A20] hover:bg-black/5 rounded-[4px] h-8 px-2.5 gap-1.5 transition-tesla"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#3E6AE1]" />
                <span className="text-[#3E6AE1]">복사됨</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#5C5E62]" />
                <span>공유</span>
              </>
            )}
          </Button>
        </div>
      </header>

      {/* 2. Main Viewport Container (Centered max-w-[480px], 100% Tailwind CSS) */}
      <main className="flex-1 w-full max-w-[480px] mx-auto px-5 pb-16 flex flex-col items-center">
        {/* Profile Avatar, Title & Bio */}
        <ProfileHeader
          displayName={profile.displayName}
          username={profile.username}
          bio={profile.bio}
          avatarUrl={profile.avatarUrl}
        />

        {/* Monochrome Social Ribbon */}
        <SocialRibbon socials={profile.socials} />

        {/* Links List (Primary, Secondary, Sublinks) */}
        <div className="w-full mt-2">
          <LinkList links={profile.links} />
        </div>
      </main>

      {/* 3. Persistent Bottom Bar */}
      <PersistentBottomBar email={emailAddress} />
    </div>
  );
}
