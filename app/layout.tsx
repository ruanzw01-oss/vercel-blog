import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: '我的知识库',
    template: '%s | 我的知识库'
  },
  description: '技术、理财、阅读与生活思考',
}

// 顶部横幅
const banner = (
  <Banner storageKey="welcome-banner">
    🎉 欢迎来到我的知识库！持续更新中...
  </Banner>
)

// 导航栏
const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 700, fontSize: '1.2rem' }}>📚 我的知识库</span>}
  />
)

// 页脚
const footer = (
  <Footer>
    <span>
      {new Date().getFullYear()} © 我的知识库 | Built with ❤️ using Nextra
    </span>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/your-username/your-repo/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ title: '本页目录', backToTop: true }}
          editLink="在 GitHub 上编辑"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
