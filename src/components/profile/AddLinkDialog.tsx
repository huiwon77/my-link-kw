"use client";

import { useState } from "react";
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

interface AddLinkDialogProps {
  trigger?: React.ReactNode;
}

interface ValidationErrors {
  title?: string;
  url?: string;
  description?: string;
  badge?: string;
}

export function AddLinkDialog({ trigger }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [variant, setVariant] = useState<"primary" | "secondary" | "sublink">("secondary");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState<"main" | "project" | "blog" | "contact">("project");

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const addLink = useProfileStore((state) => state.addLink);

  // URL 유효성 검사 헬퍼
  const validateUrl = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "URL 주소를 입력해주세요.";
    }

    // 내부 앵커(#copy 등) 허용
    if (trimmed.startsWith("#")) {
      return null;
    }

    // mailto: 스키마 검증
    if (trimmed.startsWith("mailto:")) {
      const email = trimmed.replace("mailto:", "");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? null : "올바른 이메일 주소(예: name@example.com)를 입력해주세요.";
    }

    // 일반 웹 URL 형식 검증
    const candidateUrl =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;

    try {
      const parsed = new URL(candidateUrl);
      if (
        !parsed.hostname.includes(".") &&
        parsed.hostname !== "localhost"
      ) {
        return "올바른 도메인 주소(예: example.com)를 입력해주세요.";
      }
      return null;
    } catch {
      return "올바른 웹 주소(예: https://example.com) 형식을 입력해주세요.";
    }
  };

  // 제목 유효성 검사 헬퍼
  const validateTitle = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "링크 제목을 입력해주세요.";
    }
    if (trimmed.length < 2) {
      return "제목은 최소 2글자 이상 입력해주세요.";
    }
    if (trimmed.length > 50) {
      return "제목은 50글자 이하로 입력해주세요.";
    }
    return null;
  };

  // 설명 유효성 검사 헬퍼
  const validateDescription = (value: string): string | null => {
    if (value.length > 100) {
      return "부가 설명은 최대 100글자까지 입력할 수 있습니다.";
    }
    return null;
  };

  // 배지 유효성 검사 헬퍼
  const validateBadge = (value: string): string | null => {
    if (value.length > 15) {
      return "배지 태그는 최대 15글자까지 입력할 수 있습니다.";
    }
    return null;
  };

  // 실시간 입력 변경 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (touched.title) {
      const error = validateTitle(val);
      setErrors((prev) => ({ ...prev, title: error || undefined }));
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);
    if (touched.url) {
      const error = validateUrl(val);
      setErrors((prev) => ({ ...prev, url: error || undefined }));
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDescription(val);
    const error = validateDescription(val);
    setErrors((prev) => ({ ...prev, description: error || undefined }));
  };

  const handleBadgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBadge(val);
    const error = validateBadge(val);
    setErrors((prev) => ({ ...prev, badge: error || undefined }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "title") {
      const error = validateTitle(title);
      setErrors((prev) => ({ ...prev, title: error || undefined }));
    } else if (field === "url") {
      const error = validateUrl(url);
      setErrors((prev) => ({ ...prev, url: error || undefined }));
    }
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setVariant("secondary");
    setBadge("");
    setCategory("project");
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 전체 검증
    const titleError = validateTitle(title);
    const urlError = validateUrl(url);
    const descError = validateDescription(description);
    const badgeError = validateBadge(badge);

    const newErrors: ValidationErrors = {
      title: titleError || undefined,
      url: urlError || undefined,
      description: descError || undefined,
      badge: badgeError || undefined,
    };

    setErrors(newErrors);
    setTouched({ title: true, url: true, description: true, badge: true });

    // 에러가 하나라도 있으면 제출 중단
    if (titleError || urlError || descError || badgeError) {
      return;
    }

    // URL 프로토콜 보정
    let formattedUrl = url.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("#") &&
      !formattedUrl.startsWith("mailto:")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Zustand 스토어에 추가
    addLink({
      title: title.trim(),
      url: formattedUrl,
      description: description.trim() || undefined,
      variant,
      badge: badge.trim() || undefined,
      category,
      isActive: true,
    });

    // 폼 초기화 및 닫기
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) resetForm();
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
            프로필 목록에 표시할 새로운 링크 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 pt-2">
          {/* 1. 링크 제목 (필수) */}
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
                {title.length}/50
              </span>
            </div>
            <Input
              id="link-title"
              value={title}
              onChange={handleTitleChange}
              onBlur={() => handleBlur("title")}
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
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* 2. 링크 URL (필수) */}
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
              value={url}
              onChange={handleUrlChange}
              onBlur={() => handleBlur("url")}
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
                <span>{errors.url}</span>
              </p>
            )}
          </div>

          {/* 3. 부가 설명 (선택) */}
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
                {description.length}/100
              </span>
            </div>
            <Input
              id="link-desc"
              value={description}
              onChange={handleDescriptionChange}
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
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* 4. 버튼 스타일 & 배지 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 스타일 Variant */}
            <div className="flex flex-col gap-1">
              <Label className="text-[13px] font-medium text-[#171A20]">
                버튼 계층 (스타일)
              </Label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as "primary" | "secondary" | "sublink")}
                className="h-10 px-3 text-[13px] rounded-[4px] border border-[#EEEEEE] bg-white text-[#171A20] focus:border-[#3E6AE1] focus:outline-none focus:ring-1 focus:ring-[#3E6AE1] transition-tesla"
              >
                <option value="secondary">Secondary (기본 카드)</option>
                <option value="primary">Primary (Electric Blue 강조)</option>
                <option value="sublink">Sublink (단순 텍스트)</option>
              </select>
            </div>

            {/* 배지 문구 */}
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
                  {badge.length}/15
                </span>
              </div>
              <Input
                id="link-badge"
                value={badge}
                onChange={handleBadgeChange}
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
                  <span>{errors.badge}</span>
                </p>
              )}
            </div>
          </div>

          {/* 5. 카테고리 선택 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] font-medium text-[#171A20]">
              카테고리
            </Label>
            <div className="flex items-center gap-2">
              {(["project", "main", "blog", "contact"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-1.5 text-[12px] font-medium rounded-[4px] border transition-tesla uppercase ${
                    category === cat
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
                resetForm();
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
