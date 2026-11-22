"use client";

import { useState } from "react";
import { 
  Mail, 
  Share2, 
  Check, 
  MessageSquare,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
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

  return (
    <div className="min-h-screen bg-white text-[#171A20] flex flex-col justify-between selection:bg-[#3E6AE1] selection:text-white relative">
      
      {/* 1. Tesla Inspired Floating Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-[1383px] mx-auto px-6 h-14 flex items-center justify-between">
          
          {/* Wordmark (Spaced Uppercase) */}
          <div className="flex items-center">
            <span className="font-medium text-[13px] tracking-[0.22em] text-[#171A20] select-none">
              H U I W O N &nbsp; J U N G
            </span>
          </div>

          {/* Center Category Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a 
              href="#overview" 
              className="text-[14px] font-medium text-[#171A20] px-3.5 py-1 rounded-[4px] hover:bg-black/5 transition-colors duration-300"
            >
              Overview
            </a>
            <a 
              href="#experience" 
              className="text-[14px] font-medium text-[#171A20] px-3.5 py-1 rounded-[4px] hover:bg-black/5 transition-colors duration-300"
            >
              Experience
            </a>
            <a 
              href="https://github.com/huiwon77" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[14px] font-medium text-[#171A20] px-3.5 py-1 rounded-[4px] hover:bg-black/5 transition-colors duration-300 flex items-center gap-1"
            >
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5E62]" />
            </a>
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              type="button"
              className="text-[14px] font-medium text-[#171A20] px-3 py-1 rounded-[4px] hover:bg-black/5 transition-colors duration-300 flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#3E6AE1]" />
                  <span className="text-[#3E6AE1]">복사됨</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#5C5E62]" />
                  <span>공유</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Full-Viewport Hero Section (Radical Subtraction & Pure Whitespace) */}
      <main id="overview" className="flex-1 flex flex-col justify-between items-center px-6 pt-12 pb-24 text-center max-w-[1383px] mx-auto w-full">
        
        {/* Top: Model & Title Hierarchy */}
        <div className="pt-4 sm:pt-8 flex flex-col items-center">
          <p className="text-[14px] font-medium text-[#5C5E62] tracking-normal mb-1">
            Vibe Coding & Learner
          </p>
          <h1 className="text-[32px] sm:text-[40px] font-medium text-[#171A20] tracking-normal leading-[1.2]">
            정희원
          </h1>
          <p className="text-[14px] font-normal text-[#393C41] mt-2 max-w-md leading-[1.43] break-keep">
            안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다. 복잡함을 덜어내고 본질에 집중하는 웹 경험을 탐구합니다.
          </p>
        </div>

        {/* Center: Clean Architectural Presentation / Spec Showcase */}
        <div className="my-auto py-10 sm:py-16 flex flex-col items-center">
          {/* Minimalist Profile Silhouette Frame */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F4F4F4] flex items-center justify-center mb-8 border border-[#EEEEEE]">
            <span className="text-[28px] sm:text-[32px] font-medium text-[#171A20] select-none">
              정
            </span>
          </div>

          {/* Tesla-Style Key Specifications Bar */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 pt-2">
            <div className="flex flex-col items-center">
              <span className="text-[20px] sm:text-[24px] font-medium text-[#171A20] leading-none">
                학부생
              </span>
              <span className="text-[12px] font-normal text-[#5C5E62] mt-2">
                Status
              </span>
            </div>

            <div className="w-[1px] h-8 bg-[#EEEEEE]" />

            <div className="flex flex-col items-center">
              <span className="text-[20px] sm:text-[24px] font-medium text-[#171A20] leading-none">
                Next.js 15
              </span>
              <span className="text-[12px] font-normal text-[#5C5E62] mt-2">
                Core Stack
              </span>
            </div>

            <div className="w-[1px] h-8 bg-[#EEEEEE]" />

            <div className="flex flex-col items-center">
              <span className="text-[20px] sm:text-[24px] font-medium text-[#171A20] leading-none">
                웹 개발
              </span>
              <span className="text-[12px] font-normal text-[#5C5E62] mt-2">
                Focus Area
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Action Section: Signature Tesla Button Pair & Sub-link */}
        <div className="w-full max-w-[420px] flex flex-col items-center gap-3">
          
          {/* Two-Button Pair (Electric Blue Primary + Light Ash Secondary) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary CTA (Electric Blue) */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=a0507072@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[200px] h-[40px] bg-[#3E6AE1] hover:bg-[#345ac2] text-white text-[14px] font-medium rounded-[4px] flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>이메일 보내기</span>
            </a>

            {/* Secondary CTA (Light Ash) */}
            <a
              href="https://github.com/huiwon77"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[200px] h-[40px] bg-[#F4F4F4] hover:bg-[#EAEAEA] text-[#393C41] text-[14px] font-medium rounded-[4px] flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub 보기</span>
            </a>
          </div>

          {/* Tertiary Sub-link (Pewter with Underline Animation) */}
          <button
            onClick={handleCopyLink}
            type="button"
            className="text-[14px] font-normal text-[#5C5E62] hover:text-[#171A20] hover:underline pt-2 transition-colors duration-300 flex items-center gap-1.5"
          >
            {copied ? (
              <span className="text-[#3E6AE1] font-medium">프로필 링크가 클립보드에 복사되었습니다</span>
            ) : (
              <span>프로필 링크 복사하기</span>
            )}
          </button>
        </div>

      </main>

      {/* 3. Persistent Bottom Bar (Tesla "Ask a Question" Bar Concept) */}
      <footer className="w-full bg-white border-t border-[#EEEEEE] py-3.5 px-6 sticky bottom-0 z-40">
        <div className="max-w-[1383px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          {/* Left: Chat / Inquiry Prompt */}
          <div className="flex items-center gap-2.5 text-[#5C5E62]">
            <MessageSquare className="w-4 h-4 text-[#8E8E8E]" />
            <span className="text-[13px] font-normal text-[#8E8E8E]">
              프로젝트 제안이나 협업 문의가 있으신가요?
            </span>
          </div>

          {/* Right: Quick Action Link */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:a0507072@gmail.com"
              className="text-[13px] font-medium text-[#3E6AE1] hover:underline transition-colors duration-300"
            >
              a0507072@gmail.com
            </a>
            <span className="text-[#D0D1D2] hidden sm:inline">|</span>
            <span className="text-[12px] font-normal text-[#8E8E8E] hidden sm:inline">
              Inspired by Tesla Design System
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
