# Next.js 博客三层架构文档

## 📋 重构概述

本项目已成功重构为清晰的三层架构，实现了组件的职责分离和可维护性提升。

## 🏗️ 三层架构设计

```
src/components/
├── layout/          # Layout Layer - 页面骨架层
├── sections/        # Sections Layer - 页面模块层
└── ui/              # UI Layer - 基础组件层
```

---

## 📁 完整目录结构

```
nextjs/src/
├── app/                          # Next.js App Router
│   ├── posts/[slug]/
│   ├── layout.tsx               # 根布局（使用 Layout Layer）
│   ├── page.tsx                 # 首页（组合 Sections Layer）
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── layout/                  # 🔷 Layout Layer
│   │   ├── navbar.tsx          # 导航栏
│   │   ├── footer.tsx          # 页脚
│   │   ├── footer.module.css
│   │   └── index.ts            # 统一导出
│   │
│   ├── sections/                # 🔶 Sections Layer
│   │   └── home/               # 首页模块
│   │       ├── home-top.tsx    # 顶部横幅
│   │       ├── essay-bar.tsx   # 即刻短文
│   │       ├── category-bar.tsx # 分类栏
│   │       ├── post-list.tsx   # 文章列表
│   │       ├── hero.tsx        # 英雄区
│   │       ├── featured.tsx    # 精选文章
│   │       └── index.ts        # 统一导出
│   │
│   └── ui/                      # 🔸 UI Layer
│       ├── cards/              # 卡片组件
│       │   ├── post-card.tsx
│       │   ├── author-info-card.tsx
│       │   ├── author-info-card.module.css
│       │   ├── calendar-card.tsx
│       │   ├── calendar-card.module.css
│       │   ├── web-info-card.tsx
│       │   ├── web-info-card.module.css
│       │   ├── today-card.tsx
│       │   └── index.ts        # 统一导出
│       │
│       └── buttons/            # 按钮组件（预留）
│
├── lib/                         # 工具函数
│   └── getPosts.ts
│
├── config/                      # 配置文件
│   └── nav.config.ts
│
├── types/                       # TypeScript 类型
│   └── post.ts
│
└── styles/                      # 全局样式
    └── globals.css
```

---

## 🎯 各层职责说明

### 1️⃣ Layout Layer（布局层）
**职责：** 定义页面的整体结构和骨架

**特点：**
- 全局共享的结构组件
- 在 `app/layout.tsx` 中使用
- 不包含业务逻辑
- 跨页面复用

**组件列表：**
- `Navbar` - 顶部导航栏
- `Footer` - 底部页脚

**使用示例：**
```typescript
// src/app/layout.tsx
import { Navbar } from "@/components/layout";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        {/* Footer 在各页面中按需引入 */}
      </body>
    </html>
  );
}
```

---

### 2️⃣ Sections Layer（页面模块层）
**职责：** 组织页面级别的功能模块

**特点：**
- 页面特定的业务模块
- 按页面分组（home, about, blog等）
- 可组合 UI Layer 组件
- 包含页面业务逻辑

**组件列表（home）：**
- `HomeTop` - 首页顶部横幅（包含技能标签动画）
- `EssayBar` - 即刻短文轮播
- `CategoryBar` - 分类导航栏
- `PostList` - 文章列表容器
- `Hero` - 英雄区块
- `Featured` - 精选文章展示

**使用示例：**
```typescript
// src/app/page.tsx
import { HomeTop, EssayBar, CategoryBar, PostList } from '@/components/sections/home';

export default function Home() {
  return (
    <div>
      <EssayBar />
      <HomeTop />
      <CategoryBar />
      <PostList posts={posts} />
    </div>
  );
}
```

---

### 3️⃣ UI Layer（基础组件层）
**职责：** 提供可复用的基础UI组件

**特点：**
- 高度可复用
- 无业务逻辑
- 通过 props 配置
- 按类型分组（cards, buttons, forms等）

**组件列表（cards）：**
- `PostCard` - 文章卡片
- `AuthorInfoCard` - 作者信息卡片
- `CalendarCard` - 日历卡片
- `WebInfoCard` - 网站信息卡片
- `TodayCard` - 今日卡片

**使用示例：**
```typescript
// 在 sections 中使用
import { PostCard, AuthorInfoCard } from '@/components/ui/cards';

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <AuthorInfoCard />
    </div>
  );
}
```

---

## 📦 统一导出（Index Pattern）

每个目录都包含 `index.ts` 文件，实现统一导出：

### layout/index.ts
```typescript
export { default as Navbar } from './navbar';
export { default as Footer } from './footer';
```

### sections/home/index.ts
```typescript
export { default as HomeTop } from './home-top';
export { default as EssayBar } from './essay-bar';
export { default as CategoryBar } from './category-bar';
export { default as PostList } from './post-list';
export { default as Hero } from './hero';
export { default as Featured } from './featured';
```

### ui/cards/index.ts
```typescript
export { default as PostCard } from './post-card';
export { default as AuthorInfoCard } from './author-info-card';
export { default as CalendarCard } from './calendar-card';
export { default as WebInfoCard } from './web-info-card';
export { default as TodayCard } from './today-card';
```

**优势：**
- 简化导入语句
- 统一管理导出
- 便于重构和维护

---

## 🔄 导入路径规范

### ✅ 推荐方式（使用索引导出）
```typescript
// 从 layout 导入
import { Navbar, Footer } from '@/components/layout';

// 从 sections/home 导入
import { HomeTop, EssayBar, PostList } from '@/components/sections/home';

// 从 ui/cards 导入
import { PostCard, AuthorInfoCard } from '@/components/ui/cards';
```

### ⚠️ 备选方式（直接导入）
```typescript
// 当需要单独导入时
import Navbar from '@/components/layout/navbar';
import PostCard from '@/components/ui/cards/post-card';
```

### ❌ 避免方式
```typescript
// 不要使用相对路径
import Navbar from '../../components/layout/navbar';

// 不要跨层级导入
import PostCard from '@/components/sections/home/post-card'; // 错误！
```

---

## 🎨 样式管理

### CSS Modules
- 与组件同目录放置
- 命名格式：`component-name.module.css`
- 仅用于特殊样式需求

**示例：**
```
ui/cards/
├── author-info-card.tsx
├── author-info-card.module.css
├── calendar-card.tsx
└── calendar-card.module.css
```

### Tailwind CSS（主要方式）
- 优先使用 Tailwind 工具类
- 保持组件样式内联
- 减少 CSS 文件数量

---

## 📊 组件依赖关系

```
┌─────────────────────────────────────┐
│         app/page.tsx                │
│    (页面组合层 - 组装各模块)          │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│      components/sections/           │
│    (页面模块层 - 业务功能模块)        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│         components/ui/              │
│    (基础组件层 - 可复用UI组件)        │
└─────────────────────────────────────┘
```

**依赖规则：**
1. ✅ `app/page.tsx` → `sections` → `ui`
2. ✅ `sections` → `ui`
3. ❌ `ui` → `sections`（禁止反向依赖）
4. ❌ `layout` → `sections`（布局层独立）

---

## 🚀 迁移步骤回顾

### 步骤 1：创建新目录结构
```bash
mkdir -p src/components/sections/home
mkdir -p src/components/ui/cards
mkdir -p src/components/ui/buttons
```

### 步骤 2：迁移文件
- ✅ 卡片组件 → `ui/cards/`
- ✅ 页面模块 → `sections/home/`
- ✅ 保留布局组件在 `layout/`

### 步骤 3：更新导入路径
- ✅ 更新 `app/page.tsx`
- ✅ 更新 `app/layout.tsx`
- ✅ 更新 `sections/home/*` 内部导入

### 步骤 4：创建索引文件
- ✅ `layout/index.ts`
- ✅ `sections/home/index.ts`
- ✅ `ui/cards/index.ts`

### 步骤 5：删除旧目录
- ✅ 删除 `components/home/`

### 步骤 6：验证构建
```bash
npm run build  # ✅ 构建成功
```

---

## 💡 长期维护优势

### 1. 清晰的职责分离
- 每层有明确的职责边界
- 降低组件间耦合
- 便于团队协作

### 2. 高度可复用性
- UI 组件可跨页面使用
- 减少重复代码
- 提高开发效率

### 3. 易于扩展
- 新增页面：在 `sections/` 下创建新目录
- 新增组件：在 `ui/` 下按类型分组
- 新增布局：在 `layout/` 下添加

### 4. 便于测试
- 每层可独立测试
- UI 组件测试简单
- 业务逻辑集中在 sections

### 5. 更好的代码组织
- 按功能分组，而非文件类型
- 目录结构反映应用架构
- 新成员快速理解项目

### 6. 优化的导入体验
- 使用索引导出简化导入
- 统一的导入路径风格
- 减少导入语句长度

---

## 📝 最佳实践

### 创建新组件时

1. **确定组件层级**
   - 全局结构？→ `layout/`
   - 页面模块？→ `sections/[page]/`
   - 可复用UI？→ `ui/[type]/`

2. **命名规范**
   - 使用 kebab-case：`post-card.tsx`
   - 组件名使用 PascalCase：`PostCard`
   - CSS Modules：`post-card.module.css`

3. **导入规范**
   - 优先使用 `@/` 别名
   - 使用索引导出
   - 避免相对路径

4. **样式规范**
   - 优先使用 Tailwind CSS
   - 特殊需求使用 CSS Modules
   - 避免全局样式污染

---

## 🔍 示例：添加新页面

假设要添加 "关于" 页面：

### 1. 创建 sections 目录
```bash
mkdir src/components/sections/about
```

### 2. 创建页面模块
```typescript
// src/components/sections/about/about-hero.tsx
export default function AboutHero() {
  return <div>About Hero</div>;
}

// src/components/sections/about/team-section.tsx
export default function TeamSection() {
  return <div>Team Section</div>;
}

// src/components/sections/about/index.ts
export { default as AboutHero } from './about-hero';
export { default as TeamSection } from './team-section';
```

### 3. 创建页面
```typescript
// src/app/about/page.tsx
import { AboutHero, TeamSection } from '@/components/sections/about';

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <TeamSection />
    </div>
  );
}
```

### 4. 复用 UI 组件
```typescript
// src/components/sections/about/team-section.tsx
import { PostCard } from '@/components/ui/cards';

export default function TeamSection() {
  return (
    <div>
      <PostCard {...props} />
    </div>
  );
}
```

---

## ✅ 重构完成清单

- [x] 创建三层目录结构
- [x] 迁移所有组件文件
- [x] 更新所有导入路径
- [x] 创建索引导出文件
- [x] 删除旧的 home 目录
- [x] 验证构建成功
- [x] 创建架构文档

---

## 📚 相关文档

- [项目结构说明](./PROJECT_STRUCTURE.md)
- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

## 🎉 总结

通过本次重构，项目实现了：
- ✅ 清晰的三层架构
- ✅ 组件职责分离
- ✅ 高度可复用性
- ✅ 统一的导入规范
- ✅ 易于维护和扩展

**重构前：** `components/home/` 混杂所有组件  
**重构后：** `layout/` + `sections/` + `ui/` 清晰分层

项目现在具备了更好的可维护性和可扩展性，为后续开发奠定了坚实基础！
