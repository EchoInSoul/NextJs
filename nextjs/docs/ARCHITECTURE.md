# Next.js 博客三层架构设计方案

##  目录
1. [架构概览](#架构概览)
2. [新目录结构](#新目录结构)
3. [各层职责](#各层职责)
4. [迁移步骤](#迁移步骤)
5. [示例代码](#示例代码)
6. [长期维护优势](#长期维护优势)

---

##  架构概览

### 三层架构设计

\\\

         Page Layer (app/page.tsx)          页面入口，组合sections
─
      Sections Layer (sections/)            页面模块，业务逻辑

         UI Layer (ui/)                     基础组件，可复用

      Layout Layer (layout/)                页面骨架，Header/Footer

\\\

---

##  新目录结构

\\\
src/
 app/
    layout.tsx                    # 根布局（使用Layout Layer）
    page.tsx                      # 首页（组合Sections）
    posts/
        [slug]/page.tsx

 components/
    layout/                       #  Layout Layer - 页面骨架
       header/
          index.tsx            # Header主组件
          navbar.tsx           # 导航栏
       footer/
          index.tsx            # Footer主组件
       sidebar/
           index.tsx            # 侧边栏容器
   
    sections/                     #  Sections Layer - 页面模块
       home/                    # 首页模块
          hero-section.tsx    # 顶部横幅区域
          essay-section.tsx   # 即刻短文区域
          category-section.tsx # 分类导航区域
          posts-section.tsx   # 文章列表区域
          sidebar-section.tsx # 侧边栏区域
       post/                    # 文章详情模块
          content-section.tsx
          toc-section.tsx
       about/                   # 关于页面模块
   
    ui/                          #  UI Layer - 基础组件
        cards/                   # 卡片组件
           base-card.tsx       # 基础卡片
           author-card.tsx     # 作者卡片
           calendar-card.tsx   # 日历卡片
           web-info-card.tsx   # 网站信息卡片
           post-card.tsx       # 文章卡片
        buttons/                 # 按钮组件
           primary-button.tsx
           icon-button.tsx
        navigation/              # 导航组件
           category-bar.tsx
           breadcrumb.tsx
        common/                  # 通用组件
            loading.tsx
            error-boundary.tsx

 styles/
    globals.css                  # 全局样式
    components/                  # 组件样式（如需要）
       cards.css
       buttons.css
    sections/                    # 模块样式（如需要）

 lib/                             # 工具函数
 config/                          # 配置文件
 types/                           # 类型定义
\\\

---

##  各层职责

### 1. Layout Layer（页面骨架层）
**位置**: \src/components/layout/\

**职责**:
- 定义页面整体结构（Header, Footer, Sidebar）
- 处理全局导航
- 管理页面级别的状态（如侧边栏展开/收起）
- 提供一致的页面框架

**特点**:
-  跨页面复用
-  不包含业务逻辑
-  只关注布局结构
-  不直接获取数据

**示例组件**:
- Header/Navbar
- Footer
- Sidebar Container
- Page Container

---

### 2. Sections Layer（页面模块层）
**位置**: \src/components/sections/\

**职责**:
- 实现具体页面的业务模块
- 组合UI Layer的基础组件
- 处理模块级别的数据和状态
- 实现页面特定的交互逻辑

**特点**:
-  页面级别复用
-  包含业务逻辑
-  可以获取数据
-  组合多个UI组件

**示例组件**:
- HeroSection（首页顶部）
- PostsSection（文章列表区域）
- SidebarSection（侧边栏内容）

---

### 3. UI Layer（基础组件层）
**位置**: \src/components/ui/\

**职责**:
- 提供可复用的基础组件
- 实现通用的UI交互
- 保持组件的纯粹性和独立性
- 支持主题和样式定制

**特点**:
-  高度可复用
-  无业务逻辑
-  通过props配置
-  可独立测试
-  不直接获取数据

**示例组件**:
- Card（卡片）
- Button（按钮）
- Input（输入框）
- Badge（标签）

---

##  迁移步骤

### Phase 1: 创建新目录结构 
\\\ash
mkdir -p src/components/sections/home
mkdir -p src/components/ui/cards
mkdir -p src/components/ui/buttons
mkdir -p src/components/ui/navigation
mkdir -p src/components/ui/common
mkdir -p src/components/layout/header
mkdir -p src/components/layout/footer
\\\

### Phase 2: 迁移UI Layer（基础组件）
**优先级**:  高（其他层依赖）

1. **迁移卡片组件**
   - \home/author-info-card.tsx\  \ui/cards/author-card.tsx\
   - \home/calendar-card.tsx\  \ui/cards/calendar-card.tsx\
   - \home/web-info-card.tsx\  \ui/cards/web-info-card.tsx\
   - \home/post-card.tsx\  \ui/cards/post-card.tsx\

2. **迁移导航组件**
   - \home/category-bar.tsx\  \ui/navigation/category-bar.tsx\

3. **创建基础卡片组件**
   - 新建 \ui/cards/base-card.tsx\（抽取公共样式）

### Phase 3: 迁移Sections Layer（页面模块）
**优先级**:  中

1. **创建首页sections**
   - \home/essay-bar.tsx\  \sections/home/essay-section.tsx\
   - \home/home-top.tsx\  \sections/home/hero-section.tsx\
   - \home/post-list.tsx\  \sections/home/posts-section.tsx\
   - 新建 \sections/home/sidebar-section.tsx\（组合侧边栏卡片）

### Phase 4: 优化Layout Layer
**优先级**:  低

1. **重构Navbar**
   - \layout/navbar.tsx\  \layout/header/navbar.tsx\
   - 新建 \layout/header/index.tsx\

2. **重构Footer**
   - \layout/footer.tsx\  \layout/footer/index.tsx\

### Phase 5: 更新Page组合
**优先级**:  高

更新 \pp/page.tsx\ 使用新的sections

### Phase 6: 清理旧代码
**优先级**:  低

删除 \components/home/\ 目录

---

##  示例代码

### 1. UI Layer - BaseCard
\\\	ypescript
// src/components/ui/cards/base-card.tsx
import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function BaseCard({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md' 
}: BaseCardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={\
      bg-white dark:bg-gray-800 
      rounded-xl 
      border border-gray-200 dark:border-gray-700
      shadow-sm
      \
      \
      \
    \}>
      {children}
    </div>
  );
}
\\\

### 2. UI Layer - AuthorCard
\\\	ypescript
// src/components/ui/cards/author-card.tsx
import BaseCard from './base-card';
import Image from 'next/image';

interface AuthorCardProps {
  name: string;
  avatar: string;
  bio: string;
  stats: {
    posts: number;
    views: number;
  };
}

export default function AuthorCard({ name, avatar, bio, stats }: AuthorCardProps) {
  return (
    <BaseCard hover className=\"text-center\">
      <Image
        src={avatar}
        alt={name}
        width={80}
        height={80}
        className=\"rounded-full mx-auto mb-4\"
      />
      <h3 className=\"text-lg font-bold mb-2\">{name}</h3>
      <p className=\"text-sm text-gray-600 dark:text-gray-400 mb-4\">{bio}</p>
      <div className=\"flex justify-around text-sm\">
        <div>
          <div className=\"font-bold text-blue-500\">{stats.posts}</div>
          <div className=\"text-gray-500\">文章</div>
        </div>
        <div>
          <div className=\"font-bold text-blue-500\">{stats.views}</div>
          <div className=\"text-gray-500\">访问</div>
        </div>
      </div>
    </BaseCard>
  );
}
\\\

### 3. Sections Layer - SidebarSection
\\\	ypescript
// src/components/sections/home/sidebar-section.tsx
import AuthorCard from '@/components/ui/cards/author-card';
import CalendarCard from '@/components/ui/cards/calendar-card';
import WebInfoCard from '@/components/ui/cards/web-info-card';

export default function SidebarSection() {
  return (
    <aside className=\"hidden lg:block w-[320px] flex-shrink-0 space-y-4\">
      <AuthorCard
        name=\"ZeroPoint\"
        avatar=\"/images/avatar.jpg\"
        bio=\"热爱技术，喜欢分享\"
        stats={{ posts: 42, views: 1234 }}
      />
      <CalendarCard />
      <WebInfoCard />
    </aside>
  );
}
\\\

### 4. Sections Layer - PostsSection
\\\	ypescript
// src/components/sections/home/posts-section.tsx
import PostCard from '@/components/ui/cards/post-card';
import { Post } from '@/types/post';

interface PostsSectionProps {
  posts: Post[];
  singleColumn?: boolean;
}

export default function PostsSection({ posts, singleColumn = false }: PostsSectionProps) {
  return (
    <section className=\"flex-1 min-w-0\">
      <div className={\
        grid gap-4
        \
      \}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
\\\

### 5. Page Layer - 组合Sections
\\\	ypescript
// src/app/page.tsx
import EssaySection from '@/components/sections/home/essay-section';
import HeroSection from '@/components/sections/home/hero-section';
import CategorySection from '@/components/sections/home/category-section';
import PostsSection from '@/components/sections/home/posts-section';
import SidebarSection from '@/components/sections/home/sidebar-section';
import { getPosts, getCategories } from '@/lib/getPosts';

export const metadata = {
  title: '我的博客 - 分享技术、思考与生活',
  description: '热爱技术，喜欢分享。在这里记录学习和成长的点滴。',
};

export default async function Home() {
  const allPosts = await getPosts();
  const categories = await getCategories();

  return (
    <div className=\"min-h-screen\">
      {/* 即刻短文 */}
      <EssaySection />
      
      {/* 顶部横幅 */}
      <HeroSection />
      
      {/* 主内容区域 */}
      <div className=\"w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-4\">
        {/* 分类导航 */}
        <CategorySection categories={categories} />
        
        {/* 文章列表 + 侧边栏 */}
        <div className=\"flex gap-4 mt-4\">
          <PostsSection posts={allPosts} />
          <SidebarSection />
        </div>
      </div>
    </div>
  );
}
\\\

---

##  长期维护优势

### 1. 清晰的职责分离
-  每层有明确的职责边界
-  降低组件间的耦合度
-  便于理解和维护

### 2. 高度可复用
-  UI组件可在多个页面复用
-  Sections可在相似页面复用
-  Layout在全站统一

### 3. 易于测试
-  UI组件独立测试
-  Sections集成测试
-  测试覆盖率提升

### 4. 团队协作友好
-  新成员快速理解结构
-  并行开发不冲突
-  Code Review更高效

### 5. 扩展性强
-  新增页面只需组合sections
-  新增功能模块独立开发
-  样式主题统一管理

### 6. 性能优化
-  组件级别的代码分割
-  按需加载sections
-  减少重复渲染

### 7. 类型安全
-  Props接口清晰
-  TypeScript类型推导
-  编译时错误检查

---

##  迁移前后对比

### 迁移前
\\\
 home目录混杂业务和UI组件
 组件职责不清晰
 难以复用
 样式分散
 测试困难
\\\

### 迁移后
\\\
 三层架构清晰
 职责明确
 高度复用
 样式统一
 易于测试
 便于维护
\\\

---

##  下一步行动

1.  创建新目录结构
2.  迁移UI Layer组件
3.  迁移Sections Layer组件
4.  更新Page组合
5.  清理旧代码
6.  更新文档

---

##  注意事项

1. **渐进式迁移**: 不要一次性重构所有代码
2. **保持向后兼容**: 迁移过程中保留旧代码
3. **充分测试**: 每个阶段完成后进行测试
4. **团队沟通**: 确保团队成员理解新架构
5. **文档同步**: 及时更新开发文档

---

##  相关资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 组件设计模式](https://react.dev/learn/thinking-in-react)
- [Tailwind CSS 最佳实践](https://tailwindcss.com/docs/reusing-styles)

---

**Created**: 2026-02-28
**Author**: Senior Frontend Architect
**Version**: 1.0.0
