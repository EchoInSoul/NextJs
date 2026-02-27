import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          欢迎来到我的博客
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
          分享技术、思考与生活，记录成长的每一步
        </p>
        <Link 
          href="#posts"
          className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
        >
          开始阅读
        </Link>
      </div>
    </section>
  );
}
