"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { INoteItem } from "@/libs/prisma";

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
  lng,
}: {
  id: string;
  title: INoteItem["title"];
  children: React.ReactNode;
  expandedChildren: React.ReactNode;
  lng: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selectedId = pathname?.split("/")[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current?.classList.add("flash");
    }
  }, [title]);

  const onAnimationEnd = () => {
    itemRef.current?.classList.remove("flash");
  };

  const handleClickNote = () => {
    const sidebarToggle = document.getElementById(
      "sidebar-toggle"
    ) as HTMLInputElement;
    if (sidebarToggle) {
      sidebarToggle.checked = true;
    }

    router.push(
      `/note/${id}${params.size ? `?${params.toString()}` : ""}`
    );
  };

  return (
    <div
      ref={itemRef}
      onAnimationEnd={onAnimationEnd}
      className={[
        "sidebar-note-list-item",
        isExpanded ? "note-expanded" : "",
      ].join(" ")}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? "var(--gray-80)"
            : isActive
            ? "var(--tertiary-blue)"
            : "",
          border: isActive
            ? "1px solid var(--primary-border)"
            : "1px solid transparent",
        }}
        onClick={handleClickNote}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
