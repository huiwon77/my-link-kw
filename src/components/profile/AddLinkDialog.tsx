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
import { Plus } from "lucide-react";

interface AddLinkDialogProps {
  trigger?: React.ReactNode;
}

export function AddLinkDialog({ trigger }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [variant, setVariant] = useState<"primary" | "secondary" | "sublink">("secondary");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState<"main" | "project" | "blog" | "contact">("project");

  const addLink = useProfileStore((state) => state.addLink);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("링크 제목을 입력해주세요.");
      return;
    }

    if (!url.trim()) {
      alert("URL 주소를 입력해주세요.");
      return;
    }

    // URL 프로토콜 보정
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://") && !formattedUrl.startsWith("#") && !formattedUrl.startsWith("mailto:")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Zustand 스토어에 새 링크 추가 (로컬 스토리지에 자동 영속화)
    addLink({
      title: title.trim(),
      url: formattedUrl,
      description: description.trim() || undefined,
      variant,
      badge: badge.trim() || undefined,
      category,
      isActive: true,
    });

    // 폼 초기화 및 다이얼로그 닫기
    setTitle("");
    setUrl("");
    setDescription("");
    setVariant("secondary");
    setBadge("");
    setCategory("project");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            프로필 목록에 표시할 새로운 링크 정보를 입력하세요. (로컬 상태에 즉시 반영됩니다)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {/* 1. 링크 제목 (필수) */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-title" className="text-[13px] font-medium text-[#171A20]">
              링크 제목 <span className="text-[#3E6AE1]">*</span>
            </Label>
            <Input
              id="link-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 최신 프로젝트 라이브 데모"
              required
              className="h-10 text-[14px] rounded-[4px] border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1] transition-tesla"
            />
          </div>

          {/* 2. 링크 URL (필수) */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-url" className="text-[13px] font-medium text-[#171A20]">
              URL 주소 <span className="text-[#3E6AE1]">*</span>
            </Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="예: https://github.com/my-project"
              required
              className="h-10 text-[14px] rounded-[4px] border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1] transition-tesla"
            />
          </div>

          {/* 3. 부가 설명 (선택) */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-desc" className="text-[13px] font-medium text-[#171A20]">
              부가 설명 <span className="text-[11px] text-[#8E8E8E] font-normal">(선택)</span>
            </Label>
            <Input
              id="link-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="예: Next.js와 Tailwind로 제작된 웹 서비스"
              className="h-10 text-[14px] rounded-[4px] border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1] transition-tesla"
            />
          </div>

          {/* 4. 버튼 스타일 & 배지 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 스타일 Variant */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-medium text-[#171A20]">
                버튼 계층 (스타일)
              </Label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as "primary" | "secondary" | "sublink")}
                className="h-10 px-3 text-[13px] rounded-[4px] border border-[#EEEEEE] bg-white text-[#171A20] focus:border-[#3E6AE1] focus:outline-none focus:ring-1 focus:ring-[#3E6AE1] transition-tesla"
              >
                <option value="secondary">Secondary (일반 카드)</option>
                <option value="primary">Primary (Electric Blue 강조)</option>
                <option value="sublink">Sublink (단순 텍스트)</option>
              </select>
            </div>

            {/* 배지 문구 */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="link-badge" className="text-[13px] font-medium text-[#171A20]">
                배지 태그 <span className="text-[11px] text-[#8E8E8E] font-normal">(선택)</span>
              </Label>
              <Input
                id="link-badge"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="예: NEW, Demo"
                className="h-10 text-[14px] rounded-[4px] border-[#EEEEEE] focus-visible:border-[#3E6AE1] focus-visible:ring-1 focus-visible:ring-[#3E6AE1] transition-tesla"
              />
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
              onClick={() => setOpen(false)}
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
