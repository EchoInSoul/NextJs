'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HomeTopContainerProps {
  bannerTitle?: string[];
  bannerSubtitle?: string;
  categories?: Array<{
    name: string;
    href: string;
    gradient: string;
  }>;
  todayCard?: {
    title: string;
    href: string;
    image: string;
  };
}

const defaultCategories = [
  { name: '前端', href: '/categories/frontend', gradient: 'linear-gradient(to right, #358bff, #15c6ff)' },
  { name: '生活', href: '/categories/life', gradient: 'linear-gradient(to right, #ff9a9e, #fad0c4)' },
  { name: '技术', href: '/categories/tech', gradient: 'linear-gradient(to right, #11998e, #38ef7d)' },
];

const skills = [
  { name: 'HTML5', color: '#E34F26', icon: 'https://simpleicons.org/icons/html5.svg' },
  { name: 'CSS3', color: '#1572B6', icon: 'https://simpleicons.org/icons/css.svg' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'https://simpleicons.org/icons/javascript.svg' },
  { name: 'TypeScript', color: '#3178C6', icon: 'https://simpleicons.org/icons/typescript.svg' },
  { name: 'React', color: '#61DAFB', icon: 'https://simpleicons.org/icons/react.svg' },
  { name: 'Next.js', color: '#000000', icon: 'https://simpleicons.org/icons/nextdotjs.svg' },
  { name: 'Tailwind', color: '#06B6D4', icon: 'https://simpleicons.org/icons/tailwindcss.svg' },
  { name: 'Node.js', color: '#339933', icon: 'https://simpleicons.org/icons/nodedotjs.svg' },
];

export default function HomeTopContainer({
  bannerTitle = ['生活明朗', '万物可爱。'],
  bannerSubtitle = 'ZEROPOINT',
  categories = defaultCategories,
  todayCard = {
    title: '最新文章',
    href: '/posts',
    image: 'https://upload-bbs.mihoyo.com/upload/2022/10/22/197021670/e727e2a4066263e8df749772d24e776e_2274636367732297640.jpg',
  },
}: HomeTopContainerProps) {
  return (
    <div className="home-top-container flex w-full gap-2 mt-2 mx-auto max-w-[1400px] px-4 md:px-6">
      <div className="left-section flex flex-col flex-1 gap-3 min-w-0 h-[340px] w-1/2">
        <div className="random-banner relative flex-[3] w-full overflow-hidden bg-[#181818] border border-[var(--border)] rounded-xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group">
          <div className="banners-title absolute top-[2.9rem] left-8 z-[2] mb-2">
            <div className="banners-title-big mb-2 text-5xl font-bold leading-tight text-white">
              {bannerTitle[0]}
            </div>
            <div className="banners-title-big mb-2 text-5xl font-bold leading-tight text-white">
              {bannerTitle[1]}
            </div>
            <div className="banners-title-small mt-4 mb-2 text-sm leading-none text-gray-400 uppercase tracking-widest">
              {bannerSubtitle}
            </div>
          </div>

          <div className="skills-tags-group-all absolute top-0 left-0 z-[1] flex w-full h-full mt-2 transition-all duration-300 -rotate-[30deg] scale-125 opacity-100 md:opacity-100 md:blur-0 translate-x-[20%]">
            <div className="tags-group-wrapper flex flex-nowrap animate-rowup">
              {[...skills, ...skills].map((skill, index) => (
                <div key={index} className="tags-group-icon-pair shrink-0 ml-4">
                  <div 
                    className="tags-group-icon flex items-center justify-center w-[120px] h-[120px] rounded-[30px] shadow-[0_2px_16px_-3px_rgba(0,0,0,0.15)]"
                    style={{ background: skill.color }}
                  >
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      title={skill.name} 
                      width="60" 
                      height="60" 
                      className="w-[60px] h-[60px] object-contain filter brightness-0 invert"
                    />
                  </div>
                  {index % 2 === 0 && skills[(Math.floor(index / 2) + 1) % skills.length] && (
                    <div 
                      className="tags-group-icon flex items-center justify-center w-[120px] h-[120px] mt-4 rounded-[30px] shadow-[0_2px_16px_-3px_rgba(0,0,0,0.15)] -translate-x-[60px]"
                      style={{ background: skills[(Math.floor(index / 2) + 1) % skills.length].color }}
                    >
                      <img 
                        src={skills[(Math.floor(index / 2) + 1) % skills.length].icon} 
                        alt={skills[(Math.floor(index / 2) + 1) % skills.length].name} 
                        title={skills[(Math.floor(index / 2) + 1) % skills.length].name} 
                        width="60" 
                        height="60" 
                        className="w-[60px] h-[60px] object-contain filter brightness-0 invert"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link 
            href="/posts/random"
            className="random-hover absolute top-0 left-0 z-[3] flex flex-col items-start justify-center w-full h-full pl-8 text-white bg-[rgba(66,90,239,0.9)] backdrop-blur-[15px] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.71,0.15,0.16,1.15)] group-hover:opacity-100 group-hover:pl-12 cursor-pointer overflow-hidden"
          >
            <div className="text-[3.5rem] md:text-[4.5rem] leading-none mb-2 md:mb-4 flex-shrink-0" style={{ width: '4.5rem', height: '4.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </div>
            <div className="banner-text flex items-center text-[2.5rem] md:text-[3.5rem] font-bold flex-shrink-0">
              随便逛逛
              <div className="text-[3rem] md:text-[4.5rem] ml-2 md:ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M438.6 278.6c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="category-group flex gap-3 flex-1 min-h-0">
          {categories.map((category, index) => (
            <div key={index} className="category-item relative flex-1 min-h-0 transition-all duration-300 hover:scale-[1.02] group">
              <Link 
                href={category.href}
                className="category-button flex items-center justify-start px-6 text-white no-underline rounded-xl w-full h-full overflow-hidden shadow-md"
                style={{ background: category.gradient }}
              >
                <span className="category-button-text text-xl font-bold whitespace-nowrap">
                  {category.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="right-section flex flex-col w-1/2 h-[340px] gap-3">
        <Link 
          href={todayCard.href}
          className="today-card relative w-full h-full min-h-[160px] bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer group"
        >
          <div className="today-card-info absolute top-0 left-0 w-full h-full z-[2] p-6 flex flex-col justify-between pointer-events-none">
            <div className="today-card-tips w-fit px-2 py-1 text-xs text-white bg-[rgba(0,0,0,0.5)] rounded-[8px] backdrop-blur-[10px]">
              置顶
            </div>
            <div className="today-card-title text-2xl font-bold text-white leading-tight">
              {todayCard.title}
            </div>
          </div>
          <div 
            className="today-card-cover absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-600 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url('${todayCard.image}')` }}
          >
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
