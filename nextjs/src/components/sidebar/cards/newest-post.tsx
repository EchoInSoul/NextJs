"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types";

interface NewestPostCardProps {
  posts: Post[];
  maxItems?: number;
  className?: string;
}

const NewestPostCard = memo(function NewestPostCard({ 
  posts, 
  maxItems = 5,
  className = "" 
}: NewestPostCardProps) {
  const sortedPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxItems);
  }, [posts, maxItems]);

  if (!sortedPosts.length) return null;

  return (
    <div className={`card-widget card-recent-post ${className}`}>
      <div className="item-headline">
        <i className="solitude fas fa-map" />
        <span>最新文章</span>
      </div>
      <div className="aside-list">
        {sortedPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="aside-list-item"
            title={post.title}
            style={{ "--animation-order": index } as React.CSSProperties}
          >
            {post.coverImage && (
              <div className="thumbnail">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={80}
                  height={60}
                  loading="lazy"
                  unoptimized={post.coverImage.startsWith('http')}
                />
              </div>
            )}
            <div className="content">
              <span className="title" title={post.title}>
                {post.title}
              </span>
              {post.categories && post.categories[0] && (
                <span className="categories">
                  {post.categories[0]}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default NewestPostCard;
