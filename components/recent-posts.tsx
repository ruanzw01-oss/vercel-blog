import type { ReactElement } from 'react'
import { Clock, ArrowRight } from 'lucide-react'

// 分类颜色映射
const categoryStyles: Record<string, { bg: string; text: string }> = {
  技术: { bg: 'bg-blue-500/15 dark:bg-blue-500/25', text: 'text-blue-600 dark:text-blue-400' },
  理财: { bg: 'bg-emerald-500/15 dark:bg-emerald-500/25', text: 'text-emerald-600 dark:text-emerald-400' },
  阅读: { bg: 'bg-amber-500/15 dark:bg-amber-500/25', text: 'text-amber-600 dark:text-amber-400' },
  社交: { bg: 'bg-rose-500/15 dark:bg-rose-500/25', text: 'text-rose-600 dark:text-rose-400' },
  思考: { bg: 'bg-purple-500/15 dark:bg-purple-500/25', text: 'text-purple-600 dark:text-purple-400' },
  生活: { bg: 'bg-sky-500/15 dark:bg-sky-500/25', text: 'text-sky-600 dark:text-sky-400' },
}

export type RecentPost = {
  /** 文章标题 */
  title: string
  /** 文章链接（相对路径） */
  href: string
  /** 发布/更新日期，格式 YYYY-MM-DD */
  date: string
  /** 分类标签：技术 | 理财 | 阅读 | 社交 | 思考 | 生活 */
  category: string
  /** 一句话简介 */
  summary: string
}

type RecentPostsProps = {
  posts: RecentPost[]
}

// 单篇文章卡片
function PostCard({ post }: { post: RecentPost }): ReactElement {
  const cat = categoryStyles[post.category] || categoryStyles['技术']

  return (
    <a
      href={post.href}
      className="group block rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 p-4 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_-5px_rgba(59,130,246,0.1)] no-underline"
    >
      {/* 顶部：日期 + 分类 */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <Clock size={12} />
          {post.date}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}
        >
          {post.category}
        </span>
      </div>

      {/* 标题 */}
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1 mb-1.5">
        {post.title}
      </h3>

      {/* 简介 */}
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-2.5">
        {post.summary}
      </p>

      {/* 底部阅读链接 */}
      <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        阅读全文
        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </a>
  )
}

// 最新发布列表
export function RecentPosts({ posts }: RecentPostsProps): ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.href} post={post} />
      ))}
    </div>
  )
}
