"use client";

import { useState } from "react";
import { LinkItem } from "@/types";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LinkItemCardProps {
  link: LinkItem;
}

export function LinkItemCard({ link }: LinkItemCardProps) {
  const [copied, setCopied] = useState(false);
  const isCopyLink = link.url === "#copy";
  const variant = link.variant || "secondary";

  const handleCopy = async (e: React.MouseEvent) => {
    if (isCopyLink) {
      e.preventDefault();
      if (typeof window !== "undefined") {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          alert("링크가 클립보드에 복사되었습니다.");
        }
      }
    }
  };

  // 1. Sublink Variant (shadcn/ui Button variant="sublink")
  if (variant === "sublink") {
    return (
      <div className="w-full flex justify-center py-1">
        <Button
          variant="sublink"
          render={
            <a
              href={link.url}
              onClick={handleCopy}
              target={isCopyLink ? undefined : "_blank"}
              rel={isCopyLink ? undefined : "noopener noreferrer"}
            />
          }
          className="group inline-flex items-center gap-1.5 text-[14px] text-[#5C5E62] hover:text-[#171A20] select-none transition-tesla"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#3E6AE1]" />
              <span className="text-[#3E6AE1] font-medium">
                링크가 클립보드에 복사되었습니다
              </span>
            </>
          ) : (
            <>
              {isCopyLink && (
                <Copy className="w-3.5 h-3.5 text-[#5C5E62] group-hover:text-[#171A20]" />
              )}
              <span>{link.title}</span>
              {!isCopyLink && (
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              )}
            </>
          )}
        </Button>
      </div>
    );
  }

  // 2. Primary / Secondary Button (shadcn/ui Button 기반 재사용 카드)
  const isPrimary = variant === "primary";

  return (
    <Button
      variant={isPrimary ? "primary" : "secondary"}
      render={
        <a
          href={link.url}
          onClick={handleCopy}
          target={isCopyLink ? undefined : "_blank"}
          rel={isCopyLink ? undefined : "noopener noreferrer"}
        />
      }
      className={cn(
        "group relative w-full h-auto min-h-[52px] px-4 py-3 justify-between items-center text-left transition-tesla select-none whitespace-normal",
        isPrimary ? "text-white" : "text-[#171A20]"
      )}
    >
      <div className="flex flex-col pr-3 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium truncate">
            {isCopyLink && copied ? "클립보드에 복사됨" : link.title}
          </span>

          {link.badge && (
            <Badge
              variant="outline"
              className={cn(
                "h-5 px-1.5 py-0 text-[10px] font-medium rounded-[3px] uppercase tracking-wide border-transparent",
                isPrimary
                  ? "bg-white/20 text-white"
                  : "bg-white text-[#5C5E62] border-[#EEEEEE]"
              )}
            >
              {link.badge}
            </Badge>
          )}
        </div>

        {link.description && (
          <p
            className={cn(
              "text-[12px] font-normal mt-0.5 leading-snug line-clamp-1",
              isPrimary ? "text-white/80" : "text-[#5C5E62]"
            )}
          >
            {link.description}
          </p>
        )}
      </div>

      <div className="shrink-0 flex items-center pl-2">
        {isCopyLink && copied ? (
          <Check
            className={cn(
              "w-4 h-4",
              isPrimary ? "text-white" : "text-[#3E6AE1]"
            )}
          />
        ) : (
          <ArrowUpRight
            className={cn(
              "w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity",
              isPrimary ? "text-white" : "text-[#5C5E62]"
            )}
          />
        )}
      </div>
    </Button>
  );
}
