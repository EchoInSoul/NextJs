# 评论系统集成文档

## 概述
本项目支持多种评论系统的动态集成，包括 Twikoo、Waline、Giscus 等。评论数据会自动获取并显示在侧边栏的"最新评论"卡片中。

## 支持的评论系统

### 1. Mock（模拟数据）
- **用途**: 开发测试
- **配置**: 无需配置，默认启用
- **特点**: 提供 5 条模拟评论数据

### 2. Twikoo
- **官网**: https://twikoo.js.org/
- **特点**: 基于腾讯云开发的评论系统
- **配置**:
  ```env
  NEXT_PUBLIC_COMMENT_SYSTEM=twikoo
  NEXT_PUBLIC_TWIKOO_ENV_ID=your-env-id
  ```

### 3. Waline
- **官网**: https://waline.js.org/
- **特点**: 简洁、安全的评论系统
- **配置**:
  ```env
  NEXT_PUBLIC_COMMENT_SYSTEM=waline
  NEXT_PUBLIC_WALINE_SERVER_URL=https://your-waline-server.com
  ```

### 4. Giscus
- **官网**: https://giscus.app/
- **特点**: 基于 GitHub Discussions
- **注意**: Giscus 不支持服务端获取最新评论，会回退到模拟数据
- **配置**:
  ```env
  NEXT_PUBLIC_COMMENT_SYSTEM=giscus
  NEXT_PUBLIC_GISCUS_REPO=username/repo
  NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
  NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
  NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
  ```

## 配置步骤

### 1. 复制环境变量文件
```bash
cp .env.example .env.local
```

### 2. 编辑 `.env.local` 文件
根据你选择的评论系统，取消注释并填写相应的配置项。

### 3. 重启开发服务器
```bash
npm run dev
```

## API 使用

### 获取评论
```typescript
import { getComments, getCommentConfig } from '@/lib/getComments';

// 使用环境变量配置
const config = getCommentConfig();
const comments = await getComments(config, 5);

// 或者手动指定配置
const comments = await getComments({
  system: 'twikoo',
  envId: 'your-env-id'
}, 5);
```

### 评论数据结构
```typescript
interface Comment {
  id: string;           // 评论 ID
  author: string;       // 评论者昵称
  avatar?: string;      // 评论者头像
  content: string;      // 评论内容
  date: string;         // 评论时间（ISO 8601 格式）
  postTitle?: string;   // 所属文章标题
  postUrl?: string;     // 所属文章链接
}
```

## 缓存策略
- 评论数据会缓存 5 分钟（300 秒）
- 使用 Next.js 的 `revalidate` 机制自动更新
- 可以在 `getComments.ts` 中调整缓存时间

## 错误处理
- 如果评论系统 API 请求失败，会自动回退到模拟数据
- 错误信息会输出到控制台，便于调试
- 不会影响页面正常渲染

## 自定义评论系统
如果需要集成其他评论系统，可以在 `src/lib/getComments.ts` 中添加新的获取函数：

```typescript
async function fetchCustomComments(config: any, limit: number): Promise<Comment[]> {
  // 实现你的评论获取逻辑
  return [];
}

// 在 getComments 函数中添加新的 case
case 'custom':
  return fetchCustomComments(mergedConfig, limit);
```

## 性能优化
1. **服务端渲染**: 评论在服务端获取，首屏加载快
2. **增量静态再生成**: 使用 ISR 策略，定期更新评论
3. **缓存机制**: 减少 API 请求次数
4. **错误降级**: 失败时使用模拟数据，保证用户体验

## 注意事项
1. 确保评论系统的 API 端点可访问
2. Twikoo 需要配置 CORS 允许你的域名
3. Waline 需要部署服务端
4. 生产环境建议使用真实的评论系统
5. 模拟数据仅用于开发测试

## 故障排查

### 评论不显示
1. 检查环境变量是否正确配置
2. 查看浏览器控制台是否有错误
3. 确认评论系统 API 是否正常工作
4. 检查网络请求是否被拦截

### API 请求失败
1. 验证 API 端点 URL 是否正确
2. 检查 CORS 配置
3. 确认 API 密钥或 Token 是否有效
4. 查看服务端日志

## 相关文件
- `src/lib/getComments.ts` - 评论获取逻辑
- `src/components/sidebar/cards/newest-comments.tsx` - 评论展示组件
- `src/types/index.ts` - 类型定义
- `.env.example` - 环境变量示例
