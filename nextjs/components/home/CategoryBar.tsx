"use client";

import Link from "next/link";

interface CategoryBarProps {
  categories: string[];
}

export default function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <div className="category-bar w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-4">
      <div className="category-bar-container flex items-center justify-between bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2">
        <div className="catalog-list flex items-center gap-1 overflow-x-auto scrollbar-hide">
          <Link
            href="/"
            className="catalog-item px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap bg-[var(--zopt-main)] text-white"
          >
            首页
          </Link>
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/categories/${encodeURIComponent(category)}`}
              className="catalog-item px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap text-[var(--zopt-fontcolor)] hover:bg-[var(--zopt-main-op)] hover:text-[var(--zopt-main)]"
            >
              {category}
            </Link>
          ))}
        </div>
        <Link
          href="/categories"
          className="catalog-more px-4 py-2 text-sm font-medium text-[var(--zopt-fontcolor)] hover:text-[var(--zopt-main)] transition-colors duration-300 whitespace-nowrap ml-4"
        >
          更多
        </Link>
      </div>
    </div>
  );
}
