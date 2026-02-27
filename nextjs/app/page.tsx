import HomeTop from '@/components/home/home-top';
import CategoryBar from '@/components/home/category-bar';
import EssayBar from '@/components/home/essay-bar';
import PostList from '@/components/home/post-list';
import AuthorInfoCard from '@/components/home/author-info-card';
import CalendarCard from '@/components/home/calendar-card';
import WebInfoCard from '@/components/home/web-info-card';
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
      
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-4">
        <CategoryBar categories={categories} />
        
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <PostList posts={allPosts} singleColumn={false} />
          </div>
          
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
