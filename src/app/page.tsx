"use client";

import { useState } from "react";
import { 
  Mail, 
  Github, 
  Share2, 
  Check, 
  Sparkles, 
  Code2, 
  ExternalLink,
  Zap,
  Terminal,
  Heart,
  Laptop
} from "lucide-react";

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("링크가 복사되었습니다!");
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FFFDF5] text-black flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
      {/* 네오브루탈리즘 격자 도트 배경 */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#000000 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* 배경 장식 스티커 / 기하학 도형들 (데스크톱 와이드 화면 xl(1280px)+에서만 안전하게 노출하여 768px 태블릿 짤림 방지) */}
      <div className="absolute top-10 left-10 hidden xl:flex items-center gap-2 bg-[#FFE600] border-2 border-black px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_#000] -rotate-6 font-black text-xs">
        <Sparkles className="w-3.5 h-3.5 text-black" />
        <span>VIBE CODING MODE</span>
      </div>

      <div className="absolute bottom-12 left-12 hidden xl:block bg-[#A3E635] border-2 border-black px-3.5 py-1.5 rounded-md shadow-[4px_4px_0px_0px_#000] rotate-3 font-mono text-xs font-bold">
        {"<hello-world />"}
      </div>

      <div className="absolute top-16 right-16 hidden xl:flex items-center gap-1.5 bg-[#FF6B6B] text-white border-2 border-black px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_#000] rotate-6 font-black text-xs">
        <Zap className="w-3.5 h-3.5 fill-current" />
        <span>POWERED BY AGY</span>
      </div>

      <div className="absolute bottom-14 right-16 hidden xl:block bg-[#BAE6FD] border-2 border-black px-3 py-1.5 rounded-md shadow-[3px_3px_0px_0px_#000] -rotate-3 font-mono text-xs font-bold">
        ★ NEXT.JS 15
      </div>

      {/* 메인 프로필 윈도우 카드 */}
      <div className="relative w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_#000] sm:shadow-[10px_10px_0px_0px_#000] overflow-hidden transition-transform duration-200">
        
        {/* 상단 윈도우 탑바 (Mac/Retro OS 스타일) */}
        <div className="bg-[#FFE600] border-b-4 border-black px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
          </div>
          <span className="font-mono text-xs font-black tracking-wider bg-black text-[#FFE600] px-2.5 py-0.5 rounded border border-black">
            bokbok.profile
          </span>
          <div className="flex items-center gap-1 font-mono text-xs font-bold text-black">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-[11px]">ONLINE</span>
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">

          {/* 프로필 아바타 영역 */}
          <div className="relative mb-5">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#FFE600] border-4 border-black shadow-[5px_5px_0px_0px_#000] flex items-center justify-center -rotate-2 hover:rotate-0 transition-transform duration-200">
              <span className="text-5xl sm:text-6xl font-black text-black tracking-tight select-none">
                정
              </span>
            </div>
            {/* 아바타 부착 스티커 */}
            <span className="absolute -bottom-2 -right-3 flex items-center gap-1 bg-[#FF6B6B] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] px-2 py-0.5 rounded-md text-xs font-black rotate-12">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>DEV</span>
            </span>
          </div>

          {/* 이름 & 핸들 */}
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mt-1">
            정희원
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-black text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
              @bokbok
            </span>
            <span className="bg-[#BAE6FD] text-black border-2 border-black text-xs font-bold px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_0px_#000]">
              대학생
            </span>
          </div>

          {/* 배지 (롤 스티커) */}
          <div className="inline-flex items-center gap-1.5 mt-3.5 px-3.5 py-1.5 rounded-lg bg-[#A3E635] text-black border-2 border-black text-xs font-black shadow-[3px_3px_0px_0px_#000] -rotate-1 hover:rotate-0 transition-transform">
            <Code2 className="w-4 h-4 stroke-[2.5]" />
            <span>Vibe Coding & Learner</span>
          </div>

          {/* 소개글 (네오브루탈 메모지 스타일) */}
          <div className="relative w-full mt-5 bg-[#FEF08A] border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] rotate-[0.5deg]">
            {/* 상단 마스킹 테이프 데코 */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/80 border border-black/30 shadow-xs -rotate-2 pointer-events-none" />
            <p className="text-black font-bold text-sm sm:text-base leading-relaxed break-keep">
              안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다. 코드로 새로운 가능성을 만들고 성장하는 여정을 즐깁니다!
            </p>
          </div>

          {/* 키워드 태그 스티커 칩들 */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            <span className="px-3 py-1 rounded-lg bg-[#FED7AA] border-2 border-black text-black font-black text-xs shadow-[3px_3px_0px_0px_#000] -rotate-2 hover:rotate-0 hover:-translate-y-0.5 transition-all">
              #대학생
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#E9D5FF] border-2 border-black text-black font-black text-xs shadow-[3px_3px_0px_0px_#000] rotate-2 hover:rotate-0 hover:-translate-y-0.5 transition-all">
              #바이브코딩
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#BAE6FD] border-2 border-black text-black font-black text-xs shadow-[3px_3px_0px_0px_#000] -rotate-1 hover:rotate-0 hover:-translate-y-0.5 transition-all">
              #웹개발
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#BBF7D0] border-2 border-black text-black font-black text-xs shadow-[3px_3px_0px_0px_#000] rotate-1 hover:rotate-0 hover:-translate-y-0.5 transition-all">
              #프론트엔드
            </span>
          </div>

          {/* 미니 스탯 / 인포 박스 그리드 */}
          <div className="grid grid-cols-3 gap-2.5 w-full mt-5">
            <div className="bg-[#F8FAFC] border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center">
              <Laptop className="w-4 h-4 text-black mb-1 stroke-[2.5]" />
              <span className="text-[10px] font-mono font-bold text-slate-500">ROLE</span>
              <span className="text-xs font-black text-black">Learner</span>
            </div>
            <div className="bg-[#F8FAFC] border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center">
              <Terminal className="w-4 h-4 text-black mb-1 stroke-[2.5]" />
              <span className="text-[10px] font-mono font-bold text-slate-500">TECH</span>
              <span className="text-xs font-black text-black">Next.js</span>
            </div>
            <div className="bg-[#F8FAFC] border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mb-1" />
              <span className="text-[10px] font-mono font-bold text-slate-500">MOOD</span>
              <span className="text-xs font-black text-black">Excited</span>
            </div>
          </div>

          {/* 네오브루탈 구분선 */}
          <div className="w-full h-1 bg-black my-6 rounded-full" />

          {/* 액션 버튼 영역 */}
          <div className="w-full flex flex-col gap-3">
            {/* 이메일 보내기 버튼 (Gmail 메일쓰기 직행 링크) */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=a0507072@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#FFE600] text-black font-black text-sm border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 stroke-[2.5]" />
              <span>이메일 보내기</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* 서브 버튼 2열 */}
            <div className="grid grid-cols-2 gap-3">
              {/* GitHub 버튼 */}
              <a
                href="https://github.com/huiwon77"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-white text-black font-black text-xs sm:text-sm border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4 stroke-[2.5]" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 stroke-[2.5]" />
              </a>

              {/* 링크 복사 버튼 (비비드 시안 / 성공 시 민트) */}
              <button
                onClick={handleCopyLink}
                type="button"
                className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  copied 
                    ? "bg-[#86EFAC] text-black" 
                    : "bg-[#67E8F9] text-black"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 stroke-[2.5]" />
                    <span>프로필 공유</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 하단 푸터 텍스트 */}
          <p className="mt-6 font-mono text-[11px] font-bold text-slate-500">
            CRAFTED WITH 🖤 & VIBE CODING
          </p>

        </div>
      </div>
    </main>
  );
}
