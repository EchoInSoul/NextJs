"use client";

import { useMemo } from "react";
import Link from "next/link";
import TodayCard from "./today-card";

// 模拟配置数据
const HOME_TOP = {
  title: "生活明朗",
  subTitle: "万物可爱。",
  siteText: "ZEROPOINT",
  category: [
    { name: "语文", path: "/categories/语文", background: "linear-gradient(to right, #358bff, #15c6ff)" },
    { name: "数学", path: "/categories/数学", background: "linear-gradient(to right, #ff9a9e, #fad0c4)" },
    { name: "英语", path: "/categories/英语", background: "linear-gradient(to right, #11998e, #38ef7d)" },
  ]
};

// 创意图标配置
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
  // 创意图标列表（重复一次用于无限滚动）
  const creativityList = useMemo(() => {
    const list = CREATIVITY.creativity_list;
    return [...list, ...list];
  }, []);

  // 创意图标配对
  const creativityPairs = useMemo(() => {
    const pairs: Array<[(typeof creativityList)[0], (typeof creativityList)[0]]> = [];
    for (let i = 0; i < creativityList.length; i += 2) {
      if (creativityList[i + 1]) {
        pairs.push([creativityList[i], creativityList[i + 1]]);
      }
    }
    return pairs;
  }, [creativityList]);

  return (
    <div className="home-top-container flex w-full gap-2 mt-2 mx-auto max-w-[1400px] px-4 md:px-6">
      {/* 左侧区域 */}
      <div className="left-section flex flex-col flex-1 gap-3 min-w-0 h-[340px] w-1/2">
        {/* 随机 Banner */}
        <div className="random-banner relative flex-[3] w-full overflow-hidden bg-[#181818] border border-[var(--border)] rounded-xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group">
          {/* 标题 */}
          <div className="banners-title absolute top-[2.9rem] left-8 z-[2] mb-2">
            <div className="banners-title-big mb-2 text-5xl font-bold leading-tight text-white">{HOME_TOP.title}</div>
            <div className="banners-title-big mb-2 text-5xl font-bold leading-tight text-white">{HOME_TOP.subTitle}</div>
            <div className="banners-title-small mt-4 mb-2 text-sm leading-none text-gray-400 uppercase tracking-widest">{HOME_TOP.siteText}</div>
          </div>

          {/* 创意图标区域 */}
          <div className="skills-tags-group-all absolute top-0 left-0 z-[1] flex w-full h-full mt-2 transition-all duration-300 -rotate-[30deg] scale-125 opacity-100 md:opacity-100 md:blur-0 translate-x-[20%]">
            <div className="tags-group-wrapper flex flex-nowrap animate-rowup">
              {creativityPairs.map((pair, index) => (
                <div key={index} className="tags-group-icon-pair shrink-0 ml-4">
                  <div className="tags-group-icon flex items-center justify-center w-[120px] h-[120px] rounded-[30px] shadow-[0_2px_16px_-3px_rgba(0,0,0,0.15)]" style={{ background: pair[0].color }}>
                    <img
                      src={pair[0].icon}
                      alt={pair[0].name}
                      title={pair[0].name}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div className="tags-group-icon flex items-center justify-center w-[120px] h-[120px] mt-4 rounded-[30px] shadow-[0_2px_16px_-3px_rgba(0,0,0,0.15)] -translate-x-[60px]" style={{ background: pair[1].color }}>
                    <img
                      src={pair[1].icon}
                      alt={pair[1].name}
                      title={pair[1].name}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 随便逛逛按钮 (Hover时显示) */}
          <Link
            href="/posts/random"
            className="random-hover absolute top-0 left-0 z-[3] flex flex-col items-start justify-center w-full h-full pl-8 text-white bg-[rgba(66,90,239,0.9)] backdrop-blur-[15px] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.71,0.15,0.16,1.15)] group-hover:opacity-100 group-hover:pl-12 cursor-pointer overflow-hidden"
          >
            <div className="banner-text flex items-center text-[2.5rem] md:text-[3.5rem] font-bold flex-shrink-0">
              随便逛逛
              <div className="text-[3rem] md:text-[4.5rem] ml-2 md:ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* 分类按钮组 */}
        <div className="category-group flex gap-3 flex-1 min-h-0">
          {HOME_TOP.category.map((item) => (
            <div key={item.name} className="category-item relative flex-1 min-h-0 transition-all duration-300 hover:scale-[1.02] group">
              <Link
                href={item.path}
                className="category-button flex items-center justify-start px-6 text-white no-underline rounded-xl w-full h-full overflow-hidden shadow-md"
                style={{ background: item.background }}
              >
                <span className="category-button-text text-xl font-bold whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧区域 */}
      <div className="right-section flex flex-col w-1/2 h-[340px] gap-3">
        <TodayCard />
      </div>
    </div>
  );
}
