"use client";

import { MessageSquare } from "lucide-react";

interface PersistentBottomBarProps {
  email?: string;
}

export function PersistentBottomBar({
  email = "a0507072@gmail.com",
}: PersistentBottomBarProps) {
  return (
    <footer className="w-full bg-white/95 backdrop-blur-md border-t border-[#EEEEEE] py-3.5 px-4 sticky bottom-0 z-40 select-none">
      <div className="max-w-[480px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        {/* Left: Inquiry Prompt */}
        <div className="flex items-center gap-2 text-[#5C5E62]">
          <MessageSquare className="w-4 h-4 text-[#8E8E8E] shrink-0" />
          <span className="text-[12px] font-normal text-[#8E8E8E]">
            프로젝트 제안이나 협업 문의가 있으신가요?
          </span>
        </div>

        {/* Right: Quick Action Email Link */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="text-[12px] font-medium text-[#3E6AE1] hover:underline transition-colors duration-330"
          >
            {email}
          </a>
          <span className="text-[#D0D1D2] hidden sm:inline">|</span>
          <span className="text-[11px] font-normal text-[#8E8E8E] hidden sm:inline">
            Tesla Design System
          </span>
        </div>
      </div>
    </footer>
  );
}
