"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import type { TocItem } from "@/types";

interface TocCardProps {
  items: TocItem[];
  className?: string;
}

function TocItemComponent({ 
  item, 
  activeId, 
  onItemClick,
  level = 1 
}: { 
  item: TocItem; 
  activeId: string | null;
  onItemClick: (id: string) => void;
  level?: number;
}) {
  const isActive = activeId === item.id;
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <li className="toc-item-wrapper">
      <a
        href={`#${item.id}`}
        className={`toc-item toc-level-${level} ${isActive ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onItemClick(item.id);
        }}
        title={item.text}
      >
        <span className="toc-text">{item.text}</span>
      </a>
      {hasChildren && (
        <ul className="toc-children">
          {item.children!.map((child) => (
            <TocItemComponent
              key={child.id}
              item={child}
              activeId={activeId}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const TocItemMemo = memo(TocItemComponent);

function TocCard({ items, className = "" }: TocCardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const tocRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .flatMap(item => {
        const flatItems = [item];
        if (item.children) {
          flatItems.push(...item.children);
        }
        return flatItems;
      })
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => 
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0
      }
    );

    headings.forEach(heading => {
      observerRef.current?.observe(heading);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  useEffect(() => {
    if (!activeId || !tocRef.current) return;

    const activeElement = tocRef.current.querySelector(`a[href="#${activeId}"]`);
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  const tocContent = useMemo(() => {
    if (!items.length) {
      return (
        <div className="toc-empty">
          <span>暂无目录</span>
        </div>
      );
    }

    return (
      <ul className="toc-list">
        {items.map((item) => (
          <TocItemMemo
            key={item.id}
            item={item}
            activeId={activeId}
            onItemClick={handleClick}
          />
        ))}
      </ul>
    );
  }, [items, activeId, handleClick]);

  if (!items.length) return null;

  return (
    <div className={`card-widget card-toc ${className}`}>
      <div className="item-headline">
        <i className="solitude fas fa-bars" />
        <span>目录</span>
      </div>
      <div className="toc-content" ref={tocRef as React.RefObject<HTMLDivElement>}>
        {tocContent}
      </div>
    </div>
  );
}

export default memo(TocCard);
