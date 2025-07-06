import type {Article} from './types'

// 模拟的博客文章数据
const allArticles: Article[] = [
  {
    id: 1,
    title: '深入理解 React Hooks',
    summary: '本文将带你从零开始，彻底搞懂 React Hooks 的工作原理和最佳实践。',
    isHot: true,
    createdAt: '2025-07-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Next.js 14 App Router 完全指南',
    summary: 'App Router 是 Next.js 的未来。学习如何利用它构建高性能应用。',
    isHot: true,
    createdAt: '2025-06-28T11:00:00Z',
  },
  {
    id: 3,
    title: '如何高效地进行代码审查 (Code Review)',
    summary: '代码审查是保证代码质量的关键环节，本文分享了一些实用技巧。',
    isHot: false,
    createdAt: '2025-06-25T14:00:00Z',
  },
  {
    id: 4,
    title: 'Tailwind CSS vs. CSS-in-JS',
    summary: '比较两种现代 CSS 方案的优缺点，帮助你做出正确的技术选型。',
    isHot: true,
    createdAt: '2025-06-20T09:00:00Z',
  },
  {
    id: 5,
    title: '构建一个安全可靠的 Node.js 后端服务',
    summary: '从身份验证到错误处理，全面覆盖了构建生产级后端服务的要点。',
    isHot: false,
    createdAt: '2025-07-02T12:00:00Z',
  },
  {
    id: 6,
    title: 'TypeScript 高级类型技巧',
    summary:
      '探索 TypeScript 的泛型、条件类型等高级特性，提升你的代码类型安全。',
    isHot: false,
    createdAt: '2025-07-03T08:00:00Z',
  },
]

// 模拟异步获取数据
export const getArticles = async (): Promise<Article[]> => {
  // 在真实应用中，这里会是数据库查询或 API 请求
  await new Promise((resolve) => setTimeout(resolve, 100))
  return allArticles
}

export const getHotArticles = async (): Promise<Article[]> => {
  const articles = await getArticles()
  return articles.filter((article) => article.isHot)
}

export const getLatestArticles = async (): Promise<Article[]> => {
  const articles = await getArticles()
  return articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
