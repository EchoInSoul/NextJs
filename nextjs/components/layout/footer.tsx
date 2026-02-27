"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isRotating, setIsRotating] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRefresh = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000);
  };

  const socialLinks = [
    { href: "mailto:multuslver@gmail.com", title: "Email", icon: "email" },
    { href: "https://github.com/multusluvs", title: "GitHub", icon: "github" },
    { href: "https://space.bilibili.com/", title: "Bilibili", icon: "bilibili" },
    { href: "/atom.xml", title: "RSS", icon: "rss" },
  ];

  const footerGroups = [
    {
      title: "服务",
      links: [
        { href: "/atom.xml", title: "站点地图", external: true },
        { href: "https://foreverblog.cn/go.html", title: "十年之约", external: true },
        { href: "https://www.travellings.cn/go.html", title: "开往", external: true },
      ],
    },
    {
      title: "导航",
      links: [
        { href: "/", title: "首页" },
        { href: "/posts", title: "文章" },
        { href: "/about", title: "关于" },
      ],
    },
    {
      title: "协议",
      links: [
        { href: "/privacy", title: "隐私协议" },
        { href: "/cookies", title: "Cookies" },
        { href: "/copyright", title: "版权协议" },
      ],
    },
    {
      title: "友链",
      links: [
        { href: "https://github.com", title: "GitHub", external: true },
        { href: "/link", title: "更多" },
      ],
    },
  ];

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerWrap}>
        <div className={styles.footerLinkGrid}>
          {footerGroups.map((group, index) => (
            <div key={index} className={styles.footerGroup}>
              <div className={styles.footerTitleGroup}>
                <div className={styles.footerTitle}>{group.title}</div>
                {group.title === "友链" && (
                  <button
                    type="button"
                    className={styles.randomFriendsBtn}
                    aria-label="换一批友情链接"
                    title="换一批友情链接"
                    onClick={handleRefresh}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 512 512"
                      style={{ transform: isRotating ? "rotate(360deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                    >
                      <path fill="currentColor" d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32h128c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2l-17.6-17.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0z"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className={styles.footerLinks}>
                {group.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    className={styles.footerItem}
                    href={link.href}
                    title={link.title}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener external nofollow noreferrer" : undefined}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerBottomBar}>
        <div className={styles.barContent}>
          <div className={styles.barLeft}>
            <div className={styles.copyrightInfo}>
              ©2020 - {currentYear} By{" "}
              <a className={styles.barLink} href="/about" target="_blank" rel="noopener">
                ZEROPOINT
              </a>
            </div>
            <div className={styles.recordInfo}>
              <a className={styles.recordLink} href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
                备案号
              </a>
              <a className={styles.uptimeStatusIndicator} href="/status" target="_blank" rel="noopener">
                <span className={styles.statusDot}></span>
                <span className={styles.statusText}>所有业务正常</span>
              </a>
            </div>
          </div>
          <div className={styles.barRight}>
            <a className={styles.barLink} href="/about#post-comment">留言</a>
            <a className={styles.barLink} href="https://github.com" target="_blank" rel="noopener external nofollow noreferrer">
              框架
            </a>
            <a className={styles.barLink} href="/" target="_blank" rel="noopener external nofollow noreferrer">
              主页
            </a>
            <a className={styles.ccLink} href="/copyright" aria-label="CC BY-NC-ND 4.0 协议" target="_blank" rel="noopener">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.288 9.428A4.999 4.999 0 0 0 7 12a4.999 4.999 0 0 0 9.288 2.572l-1.715-1.028A3 3 0 1 1 12 9c1.093 0 2.05.584 2.573 1.457zM22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8s-8-3.58-8-8"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14 7a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1 4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4h1.5v4h3v-4H15zm-3-9C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M4 12a8 8 0 1 1 16 0a8 8 0 0 1-16 0"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M7.094 5.68A8 8 0 0 1 18.32 16.905l-2.154-2.154A2.5 2.5 0 0 0 14 11h-4a.5.5 0 0 1 0-1.001h5.5V8H13V6h-2v2h-1q-.273.001-.53.056zM5.68 7.094L7.835 9.25A2.5 2.5 0 0 0 10 13h4a.5.5 0 0 1 0 1.001H8.5v2H11v2h2v-2h1q.273-.001.53-.056l2.376 2.376A8 8 0 0 1 5.68 7.095"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8 9h8v2H8zm0 6v-2h8v2zm-6-3C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
