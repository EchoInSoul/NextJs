import { Post } from '@/types/post';
import Link from 'next/link';
import PostCard from './post-card';

interface PostListProps {
  posts: Post[];
  showAll?: boolean;
  singleColumn?: boolean;
}

export default function PostList({ posts, showAll = false, singleColumn = false }: PostListProps) {
  const displayPosts = showAll ? posts : posts.slice(0, 6);

  return (
    <>
      <div className="post-list-grid flex flex-wrap gap-4">
        {displayPosts.map((post, index) => (
          <PostCard 
            key={post.slug}
            post={post}
            isDoubleColumn={!singleColumn}
            animationOrder={index}
          />
        ))}
      </div>
      {!showAll && posts.length > 6 && (
        <div className="text-center mt-12">
          <Link 
            href="/posts"
            className="inline-block bg-[var(--zopt-main)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            查看更多文章
          </Link>
        </div>
      )}
    </>
  );
}
