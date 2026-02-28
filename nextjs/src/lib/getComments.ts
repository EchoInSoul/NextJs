/**
 * 评论系统集成
 * 支持多种评论系统：Twikoo, Waline, Giscus 等
 */

import { Comment } from '@/types';

// 评论系统类型
export type CommentSystem = 'twikoo' | 'waline' | 'giscus' | 'mock';

// 评论系统配置
interface CommentConfig {
  system: CommentSystem;
  envId?: string; // Twikoo 环境 ID
  serverURL?: string; // Waline 服务器地址
  repo?: string; // Giscus 仓库
  repoId?: string; // Giscus 仓库 ID
  category?: string; // Giscus 分类
  categoryId?: string; // Giscus 分类 ID
}

// 默认配置
const defaultConfig: CommentConfig = {
  system: 'mock', // 默认使用模拟数据
};

/**
 * 从 Twikoo 获取最新评论
 */
async function fetchTwikooComments(envId: string, limit: number = 5): Promise<Comment[]> {
  try {
    const response = await fetch(`https://${envId}.ap-shanghai.app.tcloudbase.com/twikoo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'COMMENT_GET_RECENT',
        includeReply: true,
        limit,
      }),
      next: { revalidate: 300 }, // 缓存 5 分钟
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Twikoo comments');
    }

    const data = await response.json();
    
    return data.data?.map((item: {
      id: string;
      nick: string;
      avatar?: string;
      comment: string;
      created: string;
      title: string;
      url: string;
    }) => ({
      id: item.id,
      author: item.nick,
      avatar: item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.nick}`,
      content: item.comment,
      date: item.created,
      postTitle: item.title,
      postUrl: item.url,
    })) || [];
  } catch (error) {
    console.error('Error fetching Twikoo comments:', error);
    return [];
  }
}

/**
 * 从 Waline 获取最新评论
 */
async function fetchWalineComments(serverURL: string, limit: number = 5): Promise<Comment[]> {
  try {
    const response = await fetch(`${serverURL}/comment?type=recent&count=${limit}`, {
      next: { revalidate: 300 }, // 缓存 5 分钟
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Waline comments');
    }

    const data = await response.json();
    
    return data.data?.map((item: {
      objectId: string;
      nick: string;
      avatar?: string;
      comment: string;
      createdAt: string;
      title: string;
      url: string;
    }) => ({
      id: item.objectId,
      author: item.nick,
      avatar: item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.nick}`,
      content: item.comment,
      date: item.createdAt,
      postTitle: item.title,
      postUrl: item.url,
    })) || [];
  } catch (error) {
    console.error('Error fetching Waline comments:', error);
    return [];
  }
}

/**
 * 获取模拟评论数据
 */
function getMockComments(limit: number = 5): Comment[] {
  const mockData: Comment[] = [
    {
      id: "1",
      author: "张三",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      content: "这篇文章写得真不错，学到了很多东西！感谢分享。",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      postTitle: "我的第一篇博客",
      postUrl: "/posts/first-post"
    },
    {
      id: "2",
      author: "李四",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      content: "感谢分享，对我帮助很大，期待更多这样的技术文章。",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      postTitle: "Next.js 开发心得",
      postUrl: "/posts/second-post"
    },
    {
      id: "3",
      author: "王五",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      content: "很实用的教程，跟着做了一遍，成功了！",
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      postTitle: "Tailwind CSS 实践",
      postUrl: "/posts/third-post"
    },
    {
      id: "4",
      author: "赵六",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      content: "写得很详细，解决了我的问题，谢谢！",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      postTitle: "我的第一篇博客",
      postUrl: "/posts/first-post"
    },
    {
      id: "5",
      author: "孙七",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
      content: "代码示例很清晰，容易理解。",
      date: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      postTitle: "Next.js 开发心得",
      postUrl: "/posts/second-post"
    },
  ];

  return mockData.slice(0, limit);
}

/**
 * 获取最新评论
 * @param config 评论系统配置
 * @param limit 获取数量限制
 * @returns 评论列表
 */
export async function getComments(
  config: Partial<CommentConfig> = {},
  limit: number = 5
): Promise<Comment[]> {
  const mergedConfig = { ...defaultConfig, ...config };

  switch (mergedConfig.system) {
    case 'twikoo':
      if (!mergedConfig.envId) {
        console.warn('Twikoo envId is required');
        return getMockComments(limit);
      }
      return fetchTwikooComments(mergedConfig.envId, limit);

    case 'waline':
      if (!mergedConfig.serverURL) {
        console.warn('Waline serverURL is required');
        return getMockComments(limit);
      }
      return fetchWalineComments(mergedConfig.serverURL, limit);

    case 'giscus':
      // Giscus 是基于 GitHub Discussions 的，需要客户端渲染
      console.warn('Giscus does not support server-side recent comments');
      return getMockComments(limit);

    case 'mock':
    default:
      return getMockComments(limit);
  }
}

/**
 * 获取评论系统配置
 * 从环境变量读取配置
 */
export function getCommentConfig(): CommentConfig {
  return {
    system: (process.env.NEXT_PUBLIC_COMMENT_SYSTEM as CommentSystem) || 'mock',
    envId: process.env.NEXT_PUBLIC_TWIKOO_ENV_ID,
    serverURL: process.env.NEXT_PUBLIC_WALINE_SERVER_URL,
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  };
}
