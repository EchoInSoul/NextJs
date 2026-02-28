"use client";

import { useMemo } from "react";
import Link from "next/link";

interface WebInfoCardProps {
  tags?: Array<{ name: string; count: number }>;
  postsCount?: number;
  siteDays?: number;
  lastUpdate?: string;
  totalWords?: string;
}

export default function WebInfoCard({
  tags = [
    { name: "CSS", count: 1 },
    { name: "Next.js", count: 2 },
    { name: "React", count: 2 },
    { name: "Tailwind", count: 1 },
    { name: "技术", count: 3 }
  ],
  postsCount = 5,
  siteDays = 1045,
  lastUpdate = "2025-08-16",
  totalWords = "7.1k"
}: WebInfoCardProps) {
  
  const lastUpdateText = useMemo(() => {
    const updateDate = new Date(lastUpdate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} 天前`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} 个月前`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} 年前`;
    }
  }, [lastUpdate]);

  return (
    <div className="info-card-widget">
      <div className="card-tag-cloud">
        {tags.map((tag, index) => (
          <Link key={index} href={`/tags/${encodeURIComponent(tag.name)}`} className="tag-link">
            {tag.name}<sup>{tag.count}</sup>
          </Link>
        ))}
      </div>
      
      <hr className="info-divider" />
      
      <div className="webinfo">
        <div className="webinfo-item">
          <div className="item-name">文章总数 :</div>
          <div className="item-count">{postsCount}</div>
        </div>
        <div className="webinfo-item">
          <div className="item-name">建站天数 :</div>
          <div className="item-count">{siteDays} 天</div>
        </div>
        <div className="webinfo-item">
          <div className="item-name">最后更新 :</div>
          <time className="item-count">{lastUpdateText}</time>
        </div>
        <div className="webinfo-item">
          <div className="item-name">全站字数 :</div>
          <div className="item-count">{totalWords}</div>
        </div>
      </div>
    </div>
  );
}
