import { HomeTop, Category, Essay, Post } from '@/components/sections/home';
import { Author, Calendar, Info } from '@/components/sidebar/cards';
import { Footer } from '@/components/layout';
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
      <Essay />
      <HomeTop />
      
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-4">
        <Category categories={categories} />
        
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <Post posts={allPosts} singleColumn={false} />
          </div>
          
          <div className="hidden lg:block w-[320px] shrink-0">
            <Author />
            <Calendar />
            <Info />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
