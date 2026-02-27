import { Post } from '@/types/post';

const CACHE_REVALIDATE = 3600;

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [
    {
      slug: 'first-post',
      title: '我的第一篇博客',
      date: '2024-01-15',
      excerpt: '这是我的第一篇博客文章，分享一些有趣的内容...',
      content: '文章内容...',
      featured: true,
      tags: ['技术', 'Next.js']
    },
    {
      slug: 'second-post',
      title: 'Next.js 开发心得',
      date: '2024-01-20',
      excerpt: '使用 Next.js 开发的一些经验和技巧分享...',
      content: '文章内容...',
      featured: true,
      tags: ['Next.js', 'React']
    },
    {
      slug: 'third-post',
      title: 'Tailwind CSS 实践',
      date: '2024-01-25',
      excerpt: 'Tailwind CSS 在实际项目中的应用...',
      content: '文章内容...',
      tags: ['CSS', 'Tailwind']
    }
  ];

  return posts;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(post => post.featured);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getPosts();
  const categoriesSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => categoriesSet.add(tag));
    }
  });
  
  return Array.from(categoriesSet).sort();
}

export const revalidate = CACHE_REVALIDATE;
