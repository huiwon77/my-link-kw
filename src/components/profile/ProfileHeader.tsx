"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

export function ProfileHeader({
  displayName,
  username,
  bio,
  avatarUrl,
}: ProfileHeaderProps) {
  const fallbackInitial = displayName ? displayName.trim().charAt(0) : "M";

  return (
    <header className="flex flex-col items-center text-center pt-8 pb-4">
      {/* 1. shadcn/ui 기반 Avatar (Tesla Minimal: Zero Shadow, Circular, 100% Tailwind CSS) */}
      <Avatar className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#EEEEEE] shadow-none bg-[#F4F4F4] mb-4 after:hidden">
        <AvatarImage
          src={avatarUrl}
          alt={displayName}
          className="object-cover"
        />
        <AvatarFallback className="bg-[#F4F4F4] text-[#171A20] text-[28px] sm:text-[32px] font-medium">
          {fallbackInitial}
        </AvatarFallback>
      </Avatar>

      {/* 2. Display Name (Carbon Dark, 500 weight) */}
      <h1 className="text-[20px] sm:text-[22px] font-medium text-[#171A20] tracking-normal leading-[1.25]">
        {displayName}
      </h1>

      {/* 3. Username */}
      <p className="text-[13px] font-medium text-[#5C5E62] tracking-normal mt-0.5">
        @{username}
      </p>

      {/* 4. Bio Text (Graphite, 400 weight, 14px) */}
      <p className="text-[14px] font-normal text-[#393C41] mt-3 max-w-sm leading-[1.43] break-keep px-2">
        {bio}
      </p>
    </header>
  );
}
