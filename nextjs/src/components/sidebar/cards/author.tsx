"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthorConfig {
  author: {
    img: string;
    sticker?: string;
  };
  description: string;
  content?: string;
  state: {
    morning: string;
    noon: string;
    afternoon: string;
    night: string;
    goodnight: string;
  };
  witty_words?: string[];
  information: Record<string, string>; // format: "url || icon"
}

interface AuthorInfoCardProps {
  config?: Partial<AuthorConfig>;
  ownerName?: string;
}

const defaultConfig: AuthorConfig = {
  author: {
    img: "/img/logo.svg",
    sticker: "https://upload-bbs.miyoushe.com/upload/2025/08/04/125766904/e3433dc6f4f78a9257060115e339f018_1105042150723011388.png?x-oss-process=image/format,avif"
  },
  description: "只有迎风，风筝才能飞得更高。",
  content: "这有关于<b>产品、设计、开发</b>相关的问题和看法，还有<b>文章翻译</b>和<b>分享</b>。<br/><br/>相信你可以在这里找到对你有用的<b>知识</b>和<b>教程</b>。",
  state: {
    morning: "✨ 早上好，新的一天开始了",
    noon: "🍲 午餐时间",
    afternoon: "🌞 下午好",
    night: "早点休息",
    goodnight: "晚安 😴"
  },
  witty_words: [
    "你可以的",
    "你一定可以的",
    "祝你好运，陌生人",
    "集中精力，攻克难关",
    "今天也要加油哦！",
    "学习使我快乐",
    "代码改变世界"
  ],
  information: {
    Github: "https://github.com || fab fa-github",
    Email: "mailto:example@example.com || fas fa-envelope"
  }
};

function getRandomIndex(length: number): number {
  return length > 0 ? Math.floor(Math.random() * length) : 0;
}

function getTimeState(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 14) return "noon";
  if (hour >= 14 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 22) return "night";
  return "goodnight";
}

export default function AuthorInfoCard({ config, ownerName = "ZEROPOINT" }: AuthorInfoCardProps) {
  const mergedConfig = useMemo(() => ({
    ...defaultConfig,
    ...config,
    author: { ...defaultConfig.author, ...config?.author },
    state: { ...defaultConfig.state, ...config?.state }
  }), [config]);

  const [showSkill, setShowSkill] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(() => getRandomIndex(defaultConfig.witty_words?.length || 0));
  const [timeState, setTimeState] = useState<string>(() => getTimeState());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(getTimeState());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const greetings = useMemo(
    () => mergedConfig.witty_words && mergedConfig.witty_words.length > 0 
      ? mergedConfig.witty_words 
      : ["你可以的"],
    [mergedConfig.witty_words]
  );

  const displayGreeting = useMemo(() => {
    if (!showSkill) {
      return mergedConfig.state[timeState as keyof typeof mergedConfig.state] || "欢迎光临";
    }
    return greetings[currentGreetingIndex] || "你可以的";
  }, [showSkill, timeState, greetings, currentGreetingIndex, mergedConfig]);

  const changeSayHelloText = () => {
    if (!showSkill) {
      setShowSkill(true);
      return;
    }

    const totalGreetings = greetings.length;
    if (totalGreetings <= 1) return;
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * totalGreetings);
    } while (newIndex === currentGreetingIndex);
    setCurrentGreetingIndex(newIndex);
  };

  const renderSocialIcon = (name: string, value: string) => {
    const [url, iconClass] = value.split("||").map(s => s.trim());
    if (!url || !iconClass) return null;

    return (
      <a
        key={name}
        className="flex items-center justify-center ml-2.5 w-10 h-10 p-2 text-white/90 bg-white/20 rounded-full cursor-pointer transition-all duration-300 ease-in-out no-underline hover:text-[var(--zopt-main)] hover:bg-[var(--zopt-secondbg)] hover:scale-110 hover:shadow-lg"
        href={url}
        aria-label={name}
        rel="external nofollow noreferrer"
        target="_blank"
        title={name}
      >
        <i className={iconClass} />
      </a>
    );
  };

  return (
    <div className="card-widget card-info relative overflow-hidden rounded-xl border-0 p-0 w-[283px] group">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--zopt-main)] via-[var(--zopt-main-op-deep)] to-[var(--zopt-main)] bg-[length:400%_400%] animate-[gradient_15s_ease_infinite]" />
      
      <div className="card-content relative w-[283px] h-[320px] p-4 px-5">
        {/* Top group with greeting */}
        <div className="card-info-avatar is-center">
          <div className="top-group">
            <button
              id="sayhi"
              onClick={changeSayHelloText}
              className="sayhi mx-auto w-fit px-2 py-0.5 text-xs text-white bg-white/20 rounded-xl cursor-pointer select-none transition-all duration-300 hover:text-[var(--zopt-fontcolor)] hover:bg-[var(--card)] hover:scale-110 active:opacity-80 active:scale-95"
              aria-label="切换问候语"
            >
              {displayGreeting}
            </button>
          </div>
        </div>

        {/* Avatar section */}
        <div className="avatar relative flex justify-center w-[118px] h-[118px] mx-auto my-11 select-none transition-all duration-300 ease-[cubic-bezier(0.69,0.39,0,1.21)] origin-bottom group-hover:opacity-0 group-hover:scale-0">
          <Image
            className="w-full h-full object-cover border-[5px] border-[var(--zopt-main)] rounded-full bg-[var(--zopt-secondbg)] opacity-0 animate-[avatarFadeIn_0.6s_ease_forwards]"
            src={mergedConfig.author.img}
            alt={`${ownerName} avatar`}
            width={118}
            height={118}
            priority
            unoptimized={mergedConfig.author.img.startsWith('http')}
          />
          {mergedConfig.author.sticker && (
            <div className="sticker absolute right-0.5 bottom-0.5 flex items-center justify-center w-[33px] h-[33px] overflow-hidden bg-white rounded-full transition-all duration-300 delay-200 group-hover:opacity-0 group-hover:scale-0">
              <Image
                className="sticker-img w-[26px] h-[26px] rounded-none opacity-0 animate-[statusFadeIn_0.6s_ease_0.2s_forwards]"
                src={mergedConfig.author.sticker}
                alt="status"
                width={26}
                height={26}
                unoptimized={mergedConfig.author.sticker.startsWith('http')}
              />
            </div>
          )}
        </div>

        {/* Description - shows on hover */}
        <div 
          className="description absolute top-[50px] left-0 w-full px-5 py-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 [&_div]:my-2.5 [&_div]:leading-[1.38] [&_div]:text-white/80 [&_div]:text-justify [&_b]:text-white"
          dangerouslySetInnerHTML={{ __html: mergedConfig.content || mergedConfig.description }}
        />

        {/* Bottom info section */}
        <div className="bottom-group flex items-center justify-between w-full">
          <span className="left">
            <Link 
              href="/about" 
              className="no-underline transition-transform duration-200 hover:scale-105"
              aria-label={`关于 ${ownerName}`}
            >
              <div className="name mt-0 mb-1 text-xl font-bold leading-none text-white text-left">
                {ownerName}
              </div>
              <div className="desc text-xs leading-none text-white/60">
                {mergedConfig.description}
              </div>
            </Link>
          </span>
          
          <div className="social-icons is-center flex flex-wrap min-w-[100px] m-0">
            {Object.entries(mergedConfig.information || {}).map(([name, value]) => 
              renderSocialIcon(name, value)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
