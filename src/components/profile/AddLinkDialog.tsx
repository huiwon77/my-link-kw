"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProfileStore } from "@/store/useProfileStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Zod 스키마 정의
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const linkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "링크 제목을 입력해주세요.")
    .min(2, "제목은 최소 2글자 이상 입력해주세요.")
    .max(50, "제목은 최대 50글자까지 입력할 수 있습니다."),
  url: z
    .string()
    .trim()
    .min(1, "URL 주소를 입력해주세요.")
    .refine(
      (val) => {
        if (!val) return false;
        if (val.startsWith("#")) return true; // #copy 앵커 허용
        if (val.startsWith("mailto:")) {
          return emailRegex.test(val.replace("mailto:", ""));
        }
        if (val.includes("localhost")) return true;
        return urlRegex.test(val);
      },
      {
        message: "올바른 도메인 주소(예: https://example.com) 형식을 입력해주세요.",
      }
    ),
  description: z
    .string()
    .max(100, "부가 설명은 최대 100글자까지 입력할 수 있습니다.")
    .optional()
    .or(z.literal("")),
  variant: z.enum(["primary", "secondary", "sublink"]),
  badge: z
    .string()
    .max(15, "배지 태그는 최대 15글자까지 입력할 수 있습니다.")
    .optional()
    .or(z.literal("")),
  category: z.enum(["main", "project", "blog", "contact"]),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;

interface AddLinkDialogProps {
  trigger?: React.ReactNode;
}

export function AddLinkDialog({ trigger }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const addLink = useProfileStore((state) => state.addLink);

  // 2. React Hook Form (RHF) + Zod Resolver 연동
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: "onChange", // 실시간 유효성 검사
    defaultValues: {
      title: "",
      url: "",
      description: "",
      variant: "secondary",
      badge: "",
      category: "project",
    },
  });

  const titleValue = watch("title") || "";
  const descValue = watch("description") || "";
  const badgeValue = watch("badge") || "";
  const selectedCategory = watch("category");

  const onSubmit = (data: LinkFormValues) => {
    // URL 프로토콜 보정
    let formattedUrl = data.url.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("#") &&
      !formattedUrl.startsWith("mailto:")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Zustand 스토어에 추가 (LocalStorage에 자동 동기화)
    addLink({
      title: data.title.trim(),
      url: formattedUrl,
      description: data.description?.trim() || undefined,
      variant: data.variant,
      badge: data.badge?.trim() || undefined,
      category: data.category,
      isActive: true,
    });

    // 폼 초기화 및 닫기
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              variant="secondary"
              className="w-full h-11 border border-dashed border-[#D0D1D2] hover:border-[#171A20] bg-white hover:bg-[#F4F4F4] text-[#171A20] rounded-[4px] flex items-center justify-center gap-2 transition-tesla text-[13px] font-medium"
            >
              <Plus className="w-4 h-4 text-[#5C5E62]" />
              <span>새 링크 추가하기</span>
            </Button>
          )
        }
      />

      <DialogContent className="max-w-[420px] rounded-[4px] p-6 bg-white border border-[#EEEEEE] shadow-none">
        <DialogHeader className="gap-1 text-left pb-2 border-b border-[#EEEEEE]">
          <DialogTitle className="text-[17px] font-medium text-[#171A20] tracking-normal">
            새 링크 추가
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[#5C5E62] leading-relaxed">
            React Hook Form과 Zod 스키마로 검증된 새 링크 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 pt-2">
          {/* 1. 링크 제목 (필수, RHF + Zod) */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="link-title"
                className={cn(
                  "text-[13px] font-medium",
                  errors.title ? "text-red-500" : "text-[#171A20]"
                )}
              >
                링크 제목 <span className="text-[#3E6AE1]">*</span>
              </Label>
              <span className="text-[11px] text-[#8E8E8E] font-normal">
                {titleValue.length}/50
              </span>
            </div>
            <Input
              id="link-title"
              {...register("title")}
              placeholder="예: 최신 프로젝트 라이브 데모"
              maxLength={50}
              aria-invalid={!!errors.title}
              className={cn(
                "h-10 text-[14px] rounded-[4px] transition-tesla",
                errors.title
                  ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500/30"
                  : "border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1]"
              )}
            />
            {errors.title && (
              <p className="text-[12px] text-red-500 font-normal mt-0.5 flex items-center gap-1 animate-in fade-in-50 duration-200">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.title.message}</span>
              </p>
            )}
          </div>

          {/* 2. 링크 URL (필수, RHF + Zod) */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="link-url"
                className={cn(
                  "text-[13px] font-medium",
                  errors.url ? "text-red-500" : "text-[#171A20]"
                )}
              >
                URL 주소 <span className="text-[#3E6AE1]">*</span>
              </Label>
              <span className="text-[11px] text-[#8E8E8E] font-normal">
                웹 주소, 이메일, #앵커 지원
              </span>
            </div>
            <Input
              id="link-url"
              {...register("url")}
              placeholder="예: https://github.com/my-project"
              aria-invalid={!!errors.url}
              className={cn(
                "h-10 text-[14px] rounded-[4px] transition-tesla",
                errors.url
                  ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500/30"
                  : "border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1]"
              )}
            />
            {errors.url && (
              <p className="text-[12px] text-red-500 font-normal mt-0.5 flex items-center gap-1 animate-in fade-in-50 duration-200">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.url.message}</span>
              </p>
            )}
          </div>

          {/* 3. 부가 설명 (선택, RHF + Zod) */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="link-desc"
                className={cn(
                  "text-[13px] font-medium",
                  errors.description ? "text-red-500" : "text-[#171A20]"
                )}
              >
                부가 설명 <span className="text-[11px] text-[#8E8E8E] font-normal">(선택)</span>
              </Label>
              <span className="text-[11px] text-[#8E8E8E] font-normal">
                {descValue.length}/100
              </span>
            </div>
            <Input
              id="link-desc"
              {...register("description")}
              placeholder="예: Next.js와 Tailwind로 제작된 웹 서비스"
              maxLength={100}
              className={cn(
                "h-10 text-[14px] rounded-[4px] transition-tesla",
                errors.description
                  ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500/30"
                  : "border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1]"
              )}
            />
            {errors.description && (
              <p className="text-[12px] text-red-500 font-normal mt-0.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.description.message}</span>
              </p>
            )}
          </div>

          {/* 4. 버튼 스타일 & 배지 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 스타일 Variant (RHF register) */}
            <div className="flex flex-col gap-1">
              <Label className="text-[13px] font-medium text-[#171A20]">
                버튼 계층 (스타일)
              </Label>
              <select
                {...register("variant")}
                className="h-10 px-3 text-[13px] rounded-[4px] border border-[#EEEEEE] bg-white text-[#171A20] focus:border-[#3E6AE1] focus:outline-none focus:ring-1 focus:ring-[#3E6AE1] transition-tesla"
              >
                <option value="secondary">Secondary (기본 카드)</option>
                <option value="primary">Primary (Electric Blue 강조)</option>
                <option value="sublink">Sublink (단순 텍스트)</option>
              </select>
            </div>

            {/* 배지 문구 (RHF register) */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="link-badge"
                  className={cn(
                    "text-[13px] font-medium",
                    errors.badge ? "text-red-500" : "text-[#171A20]"
                  )}
                >
                  배지 <span className="text-[11px] text-[#8E8E8E] font-normal">(선택)</span>
                </Label>
                <span className="text-[11px] text-[#8E8E8E] font-normal">
                  {badgeValue.length}/15
                </span>
              </div>
              <Input
                id="link-badge"
                {...register("badge")}
                placeholder="예: NEW, Demo"
                maxLength={15}
                className={cn(
                  "h-10 text-[14px] rounded-[4px] transition-tesla",
                  errors.badge
                    ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500/30"
                    : "border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1]"
                )}
              />
              {errors.badge && (
                <p className="text-[12px] text-red-500 font-normal mt-0.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.badge.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* 5. 카테고리 선택 (RHF setValue) */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-[#171A20]">
              카테고리
            </Label>
            <div className="flex items-center gap-2">
              {(["project", "main", "blog", "contact"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setValue("category", cat, { shouldValidate: true })}
                  className={`flex-1 py-1.5 text-[12px] font-medium rounded-[4px] border transition-tesla uppercase ${
                    selectedCategory === cat
                      ? "border-[#3E6AE1] bg-[#3E6AE1]/5 text-[#3E6AE1]"
                      : "border-[#EEEEEE] text-[#5C5E62] hover:bg-[#F4F4F4]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-[#EEEEEE] gap-2 flex flex-row justify-end sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              className="rounded-[4px] h-9 px-4 text-[13px] font-medium"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="rounded-[4px] h-9 px-5 text-[13px] font-medium"
            >
              추가 완료
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
