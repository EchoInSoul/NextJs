export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  categories?: string[];
  featured?: boolean;
}

export interface Tag {
  name: string;
  count: number;
  slug: string;
  highlight?: boolean;
}

export interface Category {
  name: string;
  count: number;
  slug: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  postTitle?: string;
  postUrl?: string;
}

export interface WebInfo {
  postsCount: number;
  pv?: number;
  uv?: number;
  runtimeStart?: string;
  lastUpdate: string;
  totalWords?: string;
}

export interface AuthorConfig {
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
  information: Record<string, string>;
}

export interface AsideWidgetConfig {
  noSticky: string[];
  sticky: string[];
}

export interface CustomWidgetConfig {
  name: string;
  class?: string;
  id?: string;
  icon?: string;
  title?: string;
  no_head?: boolean;
  content_class?: string;
  content_id?: string;
  content_css?: string;
  content_html?: string;
}
