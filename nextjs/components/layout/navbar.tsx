'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { navConfig } from '@/config/nav.config';

// 默认配置
const defaultConfig = navConfig;

export default function Navbar({ config = defaultConfig }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollLockRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrolled = window.scrollY > 50;
        setIsScrolled(scrolled);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = useCallback(() => {
    if (scrollLockRef.current) return;
    
    scrollLockRef.current = true;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      scrollLockRef.current = false;
    }, 1000);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      scrollToTop();
    }
  };

  const parseMenuItem = (value: string) => {
    const parts = value.split('||').map(s => s.trim());
    return {
      url: parts[0],
      icon: parts[1] || '',
    };
  };

  return (
    <nav 
      id="nav" 
      role="navigation"
      aria-label="主导航"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'nav-scrolled shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-900'
      }`}
      style={{ 
        height: '60px',
        willChange: 'background-color, box-shadow'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] h-full">
        <div id="nav-group" className="flex items-center justify-between h-full relative">
          
          {/* 左侧区域：盒子菜单 + 首页链接 */}
          <div id="blog_name" className="flex items-center gap-2 z-[102] transition-all duration-300">
            {/* 盒子菜单（Group Menu） */}
            {config.group && Object.keys(config.group).length > 0 && (
              <div className="nav-item relative hidden lg:block group">
                <div className="menus_item relative">
                  <button
                    type="button"
                    aria-label="分组导航"
                    className="site-page group w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 
                      text-gray-700 dark:text-gray-200
                      hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105
                      group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:scale-105
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      active:scale-95"
                  >
                    <i className="fas fa-bars-progress text-lg"></i>
                  </button>

                  {/* 盒子菜单下拉内容 */}
                  <div 
                    className="absolute left-0 transition-all duration-300 z-[9999] opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto" 
                    style={{ top: 'calc(100% + 8px)' }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-xl transform transition-all duration-300 origin-top-left scale-95 group-hover:scale-100 group-hover:border-blue-500">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2 w-[300px]">
                          {Object.entries(config.group).map(([label, value]) => {
                            const { url, icon } = parseMenuItem(value as string);
                            return (
                              <Link
                                key={label}
                                href={url}
                                className="flex items-center m-1 px-2 py-2 rounded-lg transition-all duration-300
                                  text-gray-700 dark:text-gray-200
                                  hover:bg-blue-500 hover:text-white hover:scale-105"
                              >
                                {icon && <i className={`${icon} text-base mr-2`}></i>}
                                <span className="text-sm">{label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 首页链接 (Blog Name) */}
            <Link 
              href="/" 
              id="site-name"
              aria-label={`返回首页 - ${config.siteName}`}
              onClick={handleHomeClick}
              className="site-page flex items-center justify-center px-4 h-9 rounded-full font-bold text-lg transition-all duration-300 
                text-gray-700 dark:text-gray-200
                hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105
                active:scale-95"
            >
              <i className="fas fa-home text-lg"></i>
              <span className="hidden">{config.siteName}</span>
            </Link>
          </div>

          {/* 中间区域：主菜单 */}
          <div id="menus" className="hidden lg:flex absolute left-0 right-0 justify-center h-[60px] items-center pointer-events-none">
            <div className="menus_items flex flex-row justify-center items-center gap-1 pointer-events-auto">
              {Object.entries(config.menu).map(([label, value]) => {
                if (typeof value === 'string') {
                  const { url, icon } = parseMenuItem(value);
                  return (
                    <div key={label} className="menus_item px-2">
                      <Link
                        href={url}
                        className="site-page inline-flex items-center h-9 leading-9 px-3 rounded-full font-bold tracking-wider transition-all duration-300
                          text-gray-700 dark:text-gray-200
                          hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105
                          active:scale-95"
                      >
                         <i className={`${icon} mr-1`}></i>
                        {label}
                      </Link>
                    </div>
                  );
                } else {
                  return (
                    <div 
                      key={label} 
                      className="menus_item px-2 relative group"
                    >
                      <button 
                        className="site-page h-9 leading-9 px-3 rounded-full font-bold tracking-wider transition-all duration-300 flex items-center gap-1
                          text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105
                          group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:scale-105"
                      >
                        <span>{label}</span>
                      </button>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto" 
                        style={{ top: 'calc(100% + 8px)' }}
                      >
                        <ul className="px-1 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl whitespace-nowrap transform transition-all duration-300 origin-top -translate-y-2 scale-95 group-hover:translate-y-0 group-hover:scale-100 group-hover:border-blue-500">
                          {Object.entries(value).map(([childLabel, childValue]) => {
                            const { url, icon } = parseMenuItem(childValue);
                            return (
                              <li key={childLabel} className="inline-flex list-none rounded-lg mx-1 mb-1 last:mb-0">
                                <Link
                                  href={url}
                                  className="flex items-center rounded-lg px-3 py-2 w-full transition-all duration-300
                                    text-gray-700 dark:text-gray-200
                                    hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105"
                                >
                                  {icon && <i className={`${icon} text-base mr-2 w-5 text-center`}></i>}
                                  <span className="text-sm">{childLabel}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* 右侧区域：功能按钮 */}
          <div id="nav-right" className="flex items-center gap-2 z-[102]">
            {config.showRandom && (
              <div className="menus_item relative">
                <button
                  aria-label="随机文章"
                  className="site-page w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300
                    text-gray-700 dark:text-gray-200
                    hover:bg-blue-500 hover:text-white hover:scale-105
                    active:scale-95"
                >
                  <i className="fas fa-dice-d6 text-lg"></i>
                </button>
              </div>
            )}

            {config.showSearch && (
              <div className="menus_item relative">
                <button
                  aria-label="搜索"
                  className="site-page w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300
                    text-gray-700 dark:text-gray-200
                    hover:bg-blue-500 hover:text-white hover:scale-105
                    active:scale-95"
                >
                  <i className="fas fa-magnifying-glass text-lg"></i>
                </button>
              </div>
            )}

            {/* 移动端菜单开关 */}
            <div className="menus_item relative lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
                className="site-page w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300
                  text-gray-700 dark:text-gray-200
                  hover:bg-blue-500 hover:text-white hover:scale-105
                  active:scale-95"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单下拉内容 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 absolute top-full left-0 right-0 
            bg-white dark:bg-gray-900 shadow-lg max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            {Object.entries(config.menu).map(([label, value]) => {
              if (typeof value === 'string') {
                const { url, icon } = parseMenuItem(value);
                return (
                  <Link
                    key={label}
                    href={url}
                    className="flex items-center px-4 py-3 transition-colors duration-300 rounded-lg mx-2
                      text-gray-700 dark:text-gray-200
                      hover:bg-blue-500 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                     {icon && <i className={`${icon} w-6 text-center mr-2`}></i>}
                    {label}
                  </Link>
                );
              } else {
                return (
                  <div key={label} className="mb-2">
                    <div className="px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 mx-4 mb-2">
                      {label}
                    </div>
                    {Object.entries(value).map(([childLabel, childValue]) => {
                      const { url, icon } = parseMenuItem(childValue);
                      return (
                        <Link
                          key={childLabel}
                          href={url}
                          className="flex items-center px-8 py-2 transition-colors duration-300 rounded-lg mx-2
                            text-gray-700 dark:text-gray-200
                            hover:bg-blue-500 hover:text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {icon && <i className={`${icon} w-6 text-center mr-2`}></i>}
                          {childLabel}
                        </Link>
                      );
                    })}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
