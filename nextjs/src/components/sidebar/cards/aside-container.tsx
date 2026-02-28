"use client";

import { memo, useMemo, ReactNode } from "react";
import AuthorInfoCard from "./author";
import WebInfoCard from "./info";
import TocCard from "./toc";
import NewestPostCard from "./newest-post";
import NewestCommentsCard from "./newest-comments";
import AdsenseCard from "./adsense";
import CustomWidget from "./custom-widget";
import type { 
  Post, 
  Tag, 
  Comment, 
  TocItem, 
  AuthorConfig, 
  WebInfo,
  CustomWidgetConfig,
  AsideWidgetConfig 
} from "@/types";

interface AsideContainerProps {
  config: AsideWidgetConfig;
  pageType?: "home" | "post" | "page" | "archive";
  showToc?: boolean;
  tocItems?: TocItem[];
  authorConfig?: Partial<AuthorConfig>;
  ownerName?: string;
  posts?: Post[];
  tags?: Tag[];
  comments?: Comment[];
  webInfo?: Partial<WebInfo>;
  customWidgets?: CustomWidgetConfig[];
  adsenseConfig?: {
    enable: boolean;
    client: string;
    slot: string;
  };
  className?: string;
}

const AsideContainer = memo(function AsideContainer({
  config,
  pageType = "home",
  showToc = false,
  tocItems = [],
  authorConfig,
  ownerName,
  posts = [],
  tags = [],
  comments = [],
  webInfo,
  customWidgets = [],
  adsenseConfig,
  className = ""
}: AsideContainerProps) {
  const { noSticky = [], sticky = [] } = config;

  const renderWidget = (widgetName: string): ReactNode => {
    switch (widgetName) {
      case "about":
        return (
          <AuthorInfoCard 
            key="about" 
            config={authorConfig} 
            ownerName={ownerName} 
          />
        );
      
      case "newestPost":
        return (
          <NewestPostCard 
            key="newestPost" 
            posts={posts} 
          />
        );
      
      case "allInfo":
        return (
          <WebInfoCard
            key="allInfo"
            tags={tags}
            postsCount={webInfo?.postsCount}
            lastUpdate={webInfo?.lastUpdate}
            pv={webInfo?.pv}
            uv={webInfo?.uv}
            runtimeStart={webInfo?.runtimeStart}
            totalWords={webInfo?.totalWords}
          />
        );
      
      case "ads":
        return adsenseConfig ? (
          <AdsenseCard
            key="ads"
            enable={adsenseConfig.enable}
            client={adsenseConfig.client}
            slot={adsenseConfig.slot}
          />
        ) : null;
      
      case "newest_comment":
        return (
          <NewestCommentsCard
            key="newest_comment"
            comments={comments}
          />
        );
      
      default:
        const customConfig = customWidgets.find(w => w.name === widgetName);
        if (customConfig) {
          return (
            <CustomWidget
              key={customConfig.name}
              config={customConfig}
            />
          );
        }
        return null;
    }
  };

  const noStickyWidgets = useMemo(() => {
    return noSticky.map(name => renderWidget(name)).filter(Boolean);
  }, [noSticky, authorConfig, ownerName, posts, tags, comments, webInfo, customWidgets, adsenseConfig]);

  const stickyWidgets = useMemo(() => {
    return sticky.map(name => renderWidget(name)).filter(Boolean);
  }, [sticky, authorConfig, ownerName, posts, tags, comments, webInfo, customWidgets, adsenseConfig]);

  const hasContent = noStickyWidgets.length > 0 || stickyWidgets.length > 0 || showToc;

  if (!hasContent) {
    return null;
  }

  return (
    <div className={`aside-content ${className}`} id="aside-content">
      {noStickyWidgets}
      
      <div className="sticky_layout">
        {showToc && tocItems.length > 0 && (
          <TocCard items={tocItems} />
        )}
        {stickyWidgets}
      </div>
    </div>
  );
});

export default AsideContainer;
