import Link from 'next/link';

export default function About() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">关于我</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          热爱技术，喜欢分享。在这里记录学习和成长的点滴，希望能对你有所帮助。
        </p>
        <Link 
          href="/about"
          className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
        >
          了解更多
        </Link>
      </div>
    </section>
  );
}
