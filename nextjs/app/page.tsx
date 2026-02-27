import HomeTop from '@/components/home/home-top';
import CategoryBar from '@/components/home/CategoryBar';
import EssayBar from '@/components/home/essay-bar';
import PostList from '@/components/home/post-list';
import AuthorInfoCard from '@/components/home/AuthorInfoCard';
import CalendarCard from '@/components/home/CalendarCard';
import WebInfoCard from '@/components/home/WebInfoCard';
import Footer from '@/components/layout/footer';
import { getPosts, getCategories } from '@/lib/getPosts';

export const metadata = {
  title: '我的博客 - 分享技术、思考与生活',
  description: '热爱技术，喜欢分享。在这里记录学习和成长的点滴。',
};

export default async function Home() {
  const allPosts = await getPosts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      <EssayBar />
      <HomeTop />
      
      {/* 文章区域大容器 */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-4">
        <CategoryBar categories={categories} />
        
        {/* 两栏布局：左侧文章列表，右侧作者卡片 */}
        <div className="flex gap-4">
          {/* 左侧：文章列表 */}
          <div className="flex-1 min-w-0">
            <PostList posts={allPosts} singleColumn={false} />
          </div>
          
          {/* 右侧：作者信息卡片 */}
          <div className="hidden lg:block w-[320px] flex-shrink-0">
            <AuthorInfoCard />
            <CalendarCard />
            <WebInfoCard />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
