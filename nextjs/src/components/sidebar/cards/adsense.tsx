"use client";

import { memo, useEffect } from "react";

interface AdsenseCardProps {
  enable?: boolean;
  client?: string;
  slot?: string;
  className?: string;
}

const AdsenseCard = memo(function AdsenseCard({
  enable = false,
  client,
  slot,
  className = ""
}: AdsenseCardProps) {
  useEffect(() => {
    if (!enable || !client || !slot) return;
    
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
    } catch {
      console.warn("Adsense not loaded");
    }
  }, [enable, client, slot]);

  if (!enable || !client || !slot) return null;

  return (
    <div className={`card-widget card-adsense ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          minHeight: "120px",
          minWidth: "100%"
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={client}
        data-ad-slot={slot}
        data-full-width-responsive="true"
      />
    </div>
  );
});

export default AdsenseCard;
