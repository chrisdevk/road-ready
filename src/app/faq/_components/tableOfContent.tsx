"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface TableOfContentProps {
  tableOfContent: {
    label: string;
    value: string;
  }[];
}

export const TableOfContent = ({ tableOfContent }: TableOfContentProps) => {
  const [activeId, setActiveId] = useState<string>(tableOfContent[0]?.value);

  useEffect(() => {
    const ids = tableOfContent.map((t) => t.value);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-128px 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tableOfContent]);

  const activeIndex = Math.max(
    0,
    tableOfContent.findIndex((t) => t.value === activeId)
  );
  const progress =
    tableOfContent.length > 1
      ? (activeIndex / (tableOfContent.length - 1)) * 100
      : 0;
  const indicatorHeight = progress <= 0 ? "32px" : `${progress}%`;

  return (
    <aside className="flex h-fit lg:sticky lg:top-32 col-span-12 md:col-span-4">
      <div className="flex flex-col gap-y-10">
        <h3>Table of content</h3>
        <div className="flex gap-x-3">
          <div className="w-px h-full bg-neutral-500 relative">
            <div
              className="w-1 rounded-3xl bg-primary absolute top-0 -left-px transition-[height] duration-300"
              style={{ height: indicatorHeight }}
            />
          </div>
          <ul className="flex flex-col gap-y-5">
            {tableOfContent.map((item) => {
              const isActive = item.value === activeId;
              return (
                <li key={item.value}>
                  <Link
                    href={`#${item.value}`}
                    className={
                      isActive
                        ? "font-semibold text-primary"
                        : "text-neutral-700"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};
