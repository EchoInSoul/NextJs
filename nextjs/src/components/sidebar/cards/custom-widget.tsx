"use client";

import { memo, useRef, useEffect } from "react";
import type { CustomWidgetConfig } from "@/types";

interface CustomWidgetProps {
  config: CustomWidgetConfig;
  className?: string;
}

const CustomWidget = memo(function CustomWidget({
  config,
  className = ""
}: CustomWidgetProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const {
    class: customClass,
    id,
    icon,
    title,
    no_head = false,
    content_class,
    content_id,
    content_css,
    content_html
  } = config;

  useEffect(() => {
    if (content_css && contentRef.current) {
      contentRef.current.style.cssText = content_css;
    }
  }, [content_css]);

  return (
    <div
      className={`card-widget custom-widget ${customClass || ""} ${className}`}
      id={id}
    >
      {!no_head && (icon || title) && (
        <div className="item-headline">
          {icon && <i className={icon} />}
          {title && <span>{title}</span>}
        </div>
      )}
      <div
        ref={contentRef}
        className={content_class || "item-content"}
        id={content_id}
        dangerouslySetInnerHTML={{ __html: content_html || "" }}
      />
    </div>
  );
});

export default CustomWidget;
