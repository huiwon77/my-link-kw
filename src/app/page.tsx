"use client";

import { useState } from "react";
import { Mail, Github, Share2, Check, Sparkles, Code2 } from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 flex flex-col items-center text-center transition-all">
        
        {/* 상단 프로필 아바타 */}
        <div className="relative mb-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 p-1 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-indigo-600 to-sky-500 bg-clip-text text-transparent select-none">
                정
              </span>
            </div>
          </div>
          <span className="absolute bottom-1 right-1 flex items-center justify-center w-7 h-7 bg-white rounded-full shadow border border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </span>
        </div>

        {/* 이름 & 소속 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          정희원
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">@bokbok</p>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Vibe Coding & Learner</span>
        </div>

        {/* 소개글 */}
        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed break-keep max-w-xs">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>

        {/* 키워드 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
            #대학생
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
            #바이브코딩
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
            #웹개발
          </span>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-slate-100 my-6" />

        {/* 소셜 및 액션 버튼 */}
        <div className="w-full flex flex-col gap-3">
          <a
            href="mailto:a0507072@gmail.com"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>이메일 보내기</span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://github.com/huiwon77"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>GitHub (bokbok)</span>
            </a>

            <button
              onClick={handleCopyLink}
              type="button"
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600">복사 완료!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>프로필 공유</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
