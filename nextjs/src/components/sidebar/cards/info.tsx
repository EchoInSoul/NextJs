"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";

interface Tag {
  name: string;
  count: number;
  slug: string;
  highlight?: boolean;
}

interface WebInfoCardProps {
  tags?: Tag[];
  postsCount?: number;
  lastUpdate?: string;
  totalWords?: string;
  pv?: number;
  uv?: number;
  runtimeEnable?: boolean;
  runtimeStart?: string; // 格式: "2023-04-20 00:00:00"
  showTags?: boolean;
  tagsLimit?: number;
}

const defaultTags: Tag[] = [
  { name: "CSS", count: 1, slug: "css" },
  { name: "Next.js", count: 2, slug: "nextjs", highlight: true },
  { name: "React", count: 2, slug: "react", highlight: true },
  { name: "Tailwind", count: 1, slug: "tailwind" },
  { name: "技术", count: 3, slug: "tech" }
];

export default function WebInfoCard({
  tags = defaultTags,
  postsCount = 5,
  lastUpdate = "2025-08-16",
  totalWords = "7.1k",
  pv,
  uv,
  runtimeEnable = true,
  runtimeStart = "2023-04-20 00:00:00",
  showTags = true,
  tagsLimit = 20
}: WebInfoCardProps) {
  
  const [runtime, setRuntime] = useState<string>("");
  const [showAllTags, setShowAllTags] = useState(false);

  // 计算运行时间的函数
  const calculateRuntime = (startTime: string) => {
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const diff = now - start;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
  };

  // 设置运行时间定时器
  useEffect(() => {
    if (!runtimeEnable || !runtimeStart) return;

    const timer = setInterval(() => {
      setRuntime(calculateRuntime(runtimeStart));
    }, 1000);

    return () => clearInterval(timer);
  }, [runtimeEnable, runtimeStart]);

  // 最后更新时间
  const lastUpdateText = useMemo(() => {
    const updateDate = new Date(lastUpdate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      return "今天";
    } else if (diffDays < 30) {
      return `${diffDays} 天前`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} 个月前`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} 年前`;
    }
  }, [lastUpdate]);

  // 显示的标签
  const displayTags = useMemo(() => {
    if (showAllTags) return tags;
    return tags.slice(0, tagsLimit);
  }, [tags, showAllTags, tagsLimit]);

  const hasMoreTags = tags.length > tagsLimit;

  return (
    <div className="card-widget card-tags card-archives card-webinfo card-allinfo">
      {/* 标签云 */}
      {showTags && tags.length > 0 && (
        <>
          <div className={`card-tag-cloud ${showAllTags ? 'all-tags' : ''}`}>
            {displayTags.map((tag, index) => (
              <Link 
                key={index} 
                href={`/tags/${tag.slug}`} 
                className={`tag-link ${tag.highlight ? 'highlight' : ''}`}
              >
                {tag.name}<sup>{tag.count}</sup>
              </Link>
            ))}
          </div>
          
          {hasMoreTags && !showAllTags && (
            <button
              id="more-tags-btn"
              onClick={() => setShowAllTags(true)}
              aria-label="显示更多标签"
            >
              查看更多标签
            </button>
          )}
          
          <hr className="info-divider" />
        </>
      )}
      
      {/* 网站信息 */}
      <div className="webinfo">
        {/* 文章数量 */}
        <div className="webinfo-item">
          <div className="item-name">文章数量</div>
          <div className="item-count">{postsCount}</div>
        </div>

        {/* PV */}
        {pv !== undefined && (
          <div className="webinfo-item">
            <div className="item-name">本站访问量</div>
            <div className="item-count" id="busuanzi_value_site_pv">
              {pv.toLocaleString()}
            </div>
          </div>
        )}

        {/* UV */}
        {uv !== undefined && (
          <div className="webinfo-item">
            <div className="item-name">本站访客数</div>
            <div className="item-count" id="busuanzi_value_site_uv">
              {uv.toLocaleString()}
            </div>
          </div>
        )}

        {/* 运行时间 */}
        {runtimeEnable && runtime && (
          <div className="webinfo-item">
            <div className="item-name">运行时间</div>
            <div className="item-count" id="runtimeshow">
              {runtime}
            </div>
          </div>
        )}

        {/* 最后更新 */}
        <div className="webinfo-item">
          <div className="item-name">最后更新</div>
          <time className="item-count">{lastUpdateText}</time>
        </div>

        {/* 全站字数 */}
        {totalWords && (
          <div className="webinfo-item">
            <div className="item-name">全站字数</div>
            <div className="item-count">{totalWords}</div>
          </div>
        )}
      </div>
    </div>
  );
}
