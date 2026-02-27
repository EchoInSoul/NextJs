import HomeTop from '@/components/home/home-top';
import EssayBar from '@/components/home/essay-bar';
import Featured from '@/components/home/featured';
import PostList from '@/components/home/post-list';
import About from '@/components/home/about';
import Footer from '@/components/layout/footer';
import { getPosts, getFeaturedPosts } from '@/lib/getPosts';

export const metadata = {
  title: '我的博客 - 分享技术、思考与生活',
  description: '热爱技术，喜欢分享。在这里记录学习和成长的点滴。',
};

export default async function Home() {
  const allPosts = await getPosts();
  const featuredPosts = await getFeaturedPosts();

  return (
    <div>
      <EssayBar />
      <HomeTop />
      <Featured posts={featuredPosts} />
      <PostList posts={allPosts} />
      <About />
      <Footer />
    </div>
  );
}
