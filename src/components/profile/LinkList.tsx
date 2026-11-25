"use client";

import { LinkItem } from "@/types";
import { LinkItemCard } from "./LinkItemCard";
import { AddLinkDialog } from "./AddLinkDialog";

interface LinkListProps {
  links: LinkItem[];
  showAddButton?: boolean;
}

export function LinkList({ links, showAddButton = true }: LinkListProps) {
  // 1. 활성화된 링크만 오더 순으로 정렬
  const activeLinks = [...links]
    .filter((link) => link.isActive)
    .sort((a, b) => a.order - b.order);

  // 2. 메인/프로젝트/블로그 등 버튼형 링크와 서브링크 분리 정돈
  const buttonLinks = activeLinks.filter((l) => l.variant !== "sublink");
  const sublinks = activeLinks.filter((l) => l.variant === "sublink");

  return (
    <div className="w-full flex flex-col gap-2.5 py-4">
      {/* Primary & Secondary Buttons */}
      {buttonLinks.map((link) => (
        <LinkItemCard key={link.id} link={link} />
      ))}

      {/* 새 링크 추가 다이얼로그 트리거 버튼 */}
      {showAddButton && (
        <div className="pt-1">
          <AddLinkDialog />
        </div>
      )}

      {/* Sublinks (프로필 복사, LinkedIn 등) */}
      {sublinks.length > 0 && (
        <div className="pt-3 flex flex-col gap-1 items-center">
          {sublinks.map((link) => (
            <LinkItemCard key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
