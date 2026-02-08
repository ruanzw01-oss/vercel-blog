import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Inter } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import './globals.css'

// 使用 Inter 字体 - 现代、清晰、专业
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: {
    default: '我的知识库',
    template: '%s | 我的知识库'
  },
  description: '技术、理财、阅读与生活思考',
}

// 渐变 Logo
const navbar = (
  <Navbar
    logo={
      <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
        我的知识库
      </span>
    }
  />
)

// 简洁页脚
const footer = (
  <Footer>
    <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>© {new Date().getFullYear()} 我的知识库</span>
      <span className="text-xs">Built with Nextra & ❤️</span>
    </div>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning className={inter.variable}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/your-username/your-repo/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true, toggleButton: true }}
          toc={{ title: '本页目录', backToTop: true }}
          editLink="在 GitHub 上编辑"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
