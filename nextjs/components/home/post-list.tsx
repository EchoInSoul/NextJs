import { Post } from '@/types/post';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
  showAll?: boolean;
}

export default function PostList({ posts, showAll = false }: PostListProps) {
  const displayPosts = showAll ? posts : posts.slice(0, 6);

  return (
    <section id="posts" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">最新文章</h2>
        <div className="space-y-6">
          {displayPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">{post.date}</span>
                    {post.author && (
                      <>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500">{post.author}</span>
                      </>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="text-gray-300">·</span>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="hidden sm:block text-blue-600 group-hover:translate-x-1 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!showAll && posts.length > 6 && (
          <div className="text-center mt-12">
            <Link 
              href="/posts"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              查看更多文章
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
