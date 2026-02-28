"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Comment } from "@/types";

interface NewestCommentsCardProps {
  comments: Comment[];
  maxItems?: number;
  showMoreLink?: string;
  className?: string;
}

const NewestCommentsCard = memo(function NewestCommentsCard({
  comments,
  maxItems = 5,
  showMoreLink,
  className = ""
}: NewestCommentsCardProps) {
  const displayComments = useMemo(() => {
    return comments.slice(0, maxItems);
  }, [comments, maxItems]);

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "刚刚";
    if (diffMins < 60) return `${diffMins} 分钟前`;
    if (diffHours < 24) return `${diffHours} 小时前`;
    if (diffDays < 30) return `${diffDays} 天前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`;
    return `${Math.floor(diffDays / 365)} 年前`;
  };

  if (!displayComments.length) return null;

  return (
    <div className={`card-widget card-recent-comment ${className}`}>
      <div className="item-headline">
        <i className="solitude fas fa-comment" />
        <span>最新评论</span>
        {showMoreLink && (
          <Link
            href={showMoreLink}
            className="recent-comment-more"
            title="查看更多评论"
          >
            <i className="solitude fas fa-circle-chevron-right" />
          </Link>
        )}
      </div>
      <div className="aside-list">
        {displayComments.map((comment, index) => (
          <Link
            key={comment.id}
            href={comment.postUrl || "#"}
            className="aside-list-item comment-item"
            style={{ "--animation-order": index } as React.CSSProperties}
          >
            {comment.avatar && (
              <div className="avatar-wrapper">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  loading="lazy"
                  unoptimized={comment.avatar.startsWith('http')}
                />
              </div>
            )}
            <div className="content">
              <div className="comment-header">
                <span className="author">{comment.author}</span>
                <span className="date">{formatRelativeTime(comment.date)}</span>
              </div>
              <p className="comment-content" title={comment.content}>
                {comment.content}
              </p>
              {comment.postTitle && (
                <span className="post-title">
                  <i className="fas fa-file-alt" />
                  {comment.postTitle}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default NewestCommentsCard;
