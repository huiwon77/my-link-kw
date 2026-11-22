import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "정희원 | 프로필",
  description: "안녕하세요! 바이브 코딩을 배우고 있는 대학생 정희원의 프로필입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
