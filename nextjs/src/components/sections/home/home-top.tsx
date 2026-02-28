"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Today } from "@/components/sidebar/cards";

const HOME_TOP = {
  title: "",
  subTitle: "",
  siteText: "",
  category: [
    { name: "前端", path: "/categories/frontend", background: "linear-gradient(to right, #358bff, #15c6ff)" },
    { name: "后端", path: "/categories/backend", background: "linear-gradient(to right, #ff9a9e, #fad0c4)" },
    { name: "开发", path: "/categories/devp", background: "linear-gradient(to right, #11998e, #38ef7d)" },
  ]
};

const CREATIVITY = {
  creativity_list: [
    { name: "HTML5", icon: "https://simpleicons.org/icons/html5.svg", color: "#E34F26" },
    { name: "CSS3", icon: "https://simpleicons.org/icons/css3.svg", color: "#1572B6" },
    { name: "JavaScript", icon: "https://simpleicons.org/icons/javascript.svg", color: "#F7DF1E" },
    { name: "TypeScript", icon: "https://simpleicons.org/icons/typescript.svg", color: "#3178C6" },
    { name: "React", icon: "https://simpleicons.org/icons/react.svg", color: "#61DAFB" },
    { name: "Next.js", icon: "https://simpleicons.org/icons/nextdotjs.svg", color: "#000000" },
    { name: "Tailwind", icon: "https://simpleicons.org/icons/tailwindcss.svg", color: "#06B6D4" },
    { name: "Node.js", icon: "https://simpleicons.org/icons/nodedotjs.svg", color: "#339933" },
  ]
};

export default function HomeTop() {
  const creativityList = useMemo(() => {
    const list = CREATIVITY.creativity_list;
    return [...list, ...list];
  }, []);

  const creativityPairs = useMemo(() => {
    const pairs: Array<[typeof creativityList[0], typeof creativityList[0]]> = [];
    for (let i = 0; i < creativityList.length; i += 2) {
      if (creativityList[i + 1]) {
        pairs.push([creativityList[i], creativityList[i + 1]]);
      }
    }
    return pairs;
  }, [creativityList]);

  return (
    <div className="home-top-container flex w-full gap-2 mt-2 mx-auto max-w-[1400px] px-4 md:px-6">
      <div className="left-section flex flex-col flex-1 gap-3 min-w-0 h-[340px] w-1/2">
        <div className="random-banner relative flex-[3] w-full overflow-hidden bg-[#181818] border border-[var(--border)] rounded-xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group">
          <div className="banners-title absolute top-[2.9rem] left-8 z-[2] mb-2">
            <div className="banners-title-big mb-2 text-5xl font-bold leading-tight text-white">{HOME_TOP.title}</div>
            <div className="banners-title-big mb-2 text-5xl font-bold leading-tight text-white">{HOME_TOP.subTitle}</div>
            <div className="banners-title-small mt-4 mb-2 text-sm leading-none text-gray-400 uppercase tracking-widest">{HOME_TOP.siteText}</div>
          </div>

          <div className="skills-tags-group-all absolute top-0 left-0 z-[1] flex w-full h-full mt-2 transition-all duration-300 -rotate-[30deg] scale-125 opacity-100 md:opacity-100 md:blur-0 translate-x-[20%]">
            <div className="tags-group-wrapper flex flex-nowrap animate-rowup">
              {creativityPairs.map((pair, index) => (
                <div key={index} className="tags-group-icon-pair shrink-0 ml-4">
                  <div className="tags-group-icon flex items-center justify-center w-[120px] h-[120px] rounded-[30px] shadow-[0_2px_16px_-3px_rgba(0,0,0,0.15)]" style={{ background: pair[0].color }}>
                    <Image
                      src={pair[0].icon}
                      alt={pair[0].name}
                      title={pair[0].name}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] object-contain filter brightness-0 invert"
                      unoptimized
                    />
                  </div>
                  <div className="tags-group-icon flex items-center justify-center w-[120px] h-[120px] mt-4 rounded-[30px] shadow-[0_2px_16px_-3px_rgba(0,0,0,0.15)] -translate-x-[60px]" style={{ background: pair[1].color }}>
                    <Image
                      src={pair[1].icon}
                      alt={pair[1].name}
                      title={pair[1].name}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] object-contain filter brightness-0 invert"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/posts/random"
            className="random-hover absolute top-0 left-0 z-[3] flex items-center justify-start w-full h-full pl-8 pr-8 text-white bg-[rgba(66,90,239,0.9)] backdrop-blur-[15px] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.71,0.15,0.16,1.15)] group-hover:opacity-100 group-hover:pl-12 cursor-pointer"
          >
            <div className="banner-text text-[2.5rem] md:text-[3.5rem] font-bold">
              随便逛逛
            </div>
          </Link>
        </div>

        <div className="category-group flex gap-3 flex-1 min-h-0">
          {HOME_TOP.category.map((item, index) => (
            <div 
              key={item.name} 
              className="category-item relative flex-1 min-h-0 group"
              style={{ 
                animation: `categoryFadeIn 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <Link
                href={item.path}
                className="category-button relative flex items-center justify-center px-6 text-white no-underline rounded-xl w-full h-full overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out
                  hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-[1.02]
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
                  hover:before:opacity-100
                  after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent
                  hover:after:left-[100%] after:transition-all after:duration-700 after:ease-out"
                style={{ background: item.background }}
              >
                <span className="category-button-text relative z-10 text-xl font-bold whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:tracking-wider">
                  {item.name}
                </span>
                
                {/* 装饰性圆圈 */}
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full transition-all duration-500 group-hover:scale-150 group-hover:bg-white/20"></div>
                <div className="absolute -left-2 -top-2 w-12 h-12 bg-white/10 rounded-full transition-all duration-500 group-hover:scale-125 group-hover:bg-white/20"></div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="right-section flex flex-col w-1/2 h-[340px] gap-3">
        <Today />
      </div>
    </div>
  );
}
