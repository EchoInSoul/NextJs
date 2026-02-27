import { Post } from '@/types/post';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedProps {
  posts: Post[];
}

export default function Featured({ posts }: FeaturedProps) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">精选文章</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {post.coverImage && (
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              {!post.coverImage && (
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{post.date}</span>
                  {post.tags && post.tags.length > 0 && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
