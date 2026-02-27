"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  isDoubleColumn?: boolean;
  animationOrder?: number;
}

export default function PostCard({ post, isDoubleColumn = false, animationOrder = 0 }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      if (diffDays === 0) return "今天";
      if (diffDays === 1) return "昨天";
      return `${diffDays}天前`;
    }
    
    return date.toLocaleDateString('zh-CN', {
      month: 'numeric',
      day: 'numeric'
    });
  };

  const isNewPost = () => {
    const date = new Date(post.date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const isNew = isNewPost();

  return (
    <article
      className={`post-card-item ${isDoubleColumn ? "double-column" : ""}`}
      style={{ "--animation-order": animationOrder } as React.CSSProperties}
    >
      <div className="post-cover">
        <Link href={`/posts/${post.slug}`} title={post.title}>
          {post.coverImage ? (
            <div className="post-bg-wrapper">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="post-bg"
              />
            </div>
          ) : (
            <div className="post-bg post-bg-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
          )}
        </Link>
      </div>

      <div className="recent-post-info">
        <div className="recent-post-info-top">
          <div className="recent-post-info-top-tips">
            {post.featured && (
              <span className="meta-tag sticky-tag">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
                </svg>
                <span>置顶</span>
              </span>
            )}
            {isNew && !post.featured && (
              <span className="meta-tag newest-tag">最新</span>
            )}
            {post.tags && post.tags.length > 0 && (
              <Link 
                href={`/categories/${encodeURIComponent(post.tags[0])}`}
                className="meta-tag category-tag"
              >
                {post.tags[0]}
              </Link>
            )}
          </div>

          <Link href={`/posts/${post.slug}`} className="article-title" title={post.title}>
            {post.title}
          </Link>

          {post.excerpt && (
            <div className="article-excerpt">
              {post.excerpt}
            </div>
          )}
        </div>

        <div className="article-meta-wrap">
          <span className="tags">
            {post.tags && post.tags.slice(0, 2).map((tag, index) => (
              <Link 
                key={index}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="article-meta-tags"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                  <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                </svg>
                {tag}
              </Link>
            ))}
          </span>
          <span className="post-meta-date">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
        </div>
      </div>
    </article>
  );
}
