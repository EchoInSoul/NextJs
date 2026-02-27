"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "./author-info-card.module.css";

interface AuthorConfig {
  description: string;
  statusImg: string;
  skills: string[];
  social: Record<string, { icon: string; link: string }>;
  userAvatar: string;
  ownerName: string;
  subTitle: string;
}

interface AuthorInfoCardProps {
  config?: Partial<AuthorConfig>;
}

const defaultConfig: AuthorConfig = {
  description: `这有关于<b>产品、设计、开发</b>相关的问题和看法，还有<b>文章翻译</b>和<b>分享</b>。<br/><br/>相信你可以在这里找到对你有用的<b>知识</b>和<b>教程</b>。`,
  statusImg: "https://upload-bbs.miyoushe.com/upload/2025/08/04/125766904/e3433dc6f4f78a9257060115e339f018_1105042150723011388.png?x-oss-process=image/format,avif",
  skills: ["集中精力，攻克难关", "今天也要加油哦！", "学习使我快乐", "代码改变世界"],
  social: {
    GitHub: {
      icon: "mdi:github",
      link: "https://github.com"
    },
    Twitter: {
      icon: "mdi:twitter",
      link: "https://twitter.com"
    },
    Email: {
      icon: "mdi:email",
      link: "mailto:example@example.com"
    }
  },
  userAvatar: "/static/img/avatar.jpg",
  ownerName: "ZEROPOINT",
  subTitle: "生活明朗，万物可爱"
};

function getRandomIndex(length: number): number {
  return length > 0 ? Math.floor(Math.random() * length) : 0;
}

export default function AuthorInfoCard({ config }: AuthorInfoCardProps) {
  const mergedConfig = { ...defaultConfig, ...config };

  const greetings = useMemo(
    () => (mergedConfig.skills?.length > 0 ? mergedConfig.skills : ["集中精力，攻克难关"]),
    [mergedConfig.skills]
  );

  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(() => getRandomIndex(greetings.length));
  const [showSkill, setShowSkill] = useState(false);

  const currentGreeting = useMemo(
    () => greetings[currentGreetingIndex] || "集中精力，攻克难关",
    [greetings, currentGreetingIndex]
  );

  const displayGreeting = useMemo(() => {
    if (!showSkill) {
      return "欢迎光临";
    }
    return currentGreeting;
  }, [showSkill, currentGreeting]);

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

  const renderSocialIcon = (name: string, social: { icon: string; link: string }) => {
    if (!social.icon) return null;
    const isImageUrl = social.icon?.startsWith("http://") || social.icon?.startsWith("https://");
    const isIconify = social.icon?.includes(":");

    if (!isImageUrl && !isIconify) return null;

    return (
      <a
        key={name}
        className={styles.socialIcon}
        href={social.link}
        aria-label={name}
        rel="external nofollow noreferrer"
        target="_blank"
        title={name}
      >
        {isImageUrl ? (
          <img src={social.icon} alt={name} className={styles.socialIconImg} width={24} height={24} />
        ) : (
          <svg className={styles.socialIconSvg} viewBox="0 0 24 24" fill="currentColor">
            {name === "GitHub" && (
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            )}
            {name === "Twitter" && (
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            )}
            {name === "Email" && (
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            )}
          </svg>
        )}
      </a>
    );
  };

  return (
    <div className={styles.cardInfo}>
      <div className={styles.cardContent}>
        <div className={styles.authorInfoSayhi} onClick={changeSayHelloText}>
          {displayGreeting}
        </div>

        <div className={styles.authorInfoAvatar}>
          <img
            className={styles.avatarImg}
            src={mergedConfig.userAvatar}
            alt="avatar"
            width={118}
            height={118}
            loading="lazy"
          />
          {mergedConfig.statusImg && (
            <div className={styles.authorStatus}>
              <img
                className={styles.gStatus}
                src={mergedConfig.statusImg}
                alt="status"
                width={26}
                height={26}
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className={styles.authorInfoDescription} dangerouslySetInnerHTML={{ __html: mergedConfig.description }} />

        <div className={styles.authorInfoBottomGroup}>
          <Link href="/about" className={styles.authorInfoBottomGroupLeft}>
            <h1 className={styles.authorInfoName}>{mergedConfig.ownerName}</h1>
            <div className={styles.authorInfoDesc}>{mergedConfig.subTitle}</div>
          </Link>
          <div className={styles.cardInfoSocialIcons}>
            {Object.entries(mergedConfig.social || {}).map(([name, social]) => renderSocialIcon(name, social))}
          </div>
        </div>
      </div>
    </div>
  );
}
