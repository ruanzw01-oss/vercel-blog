import nextra from 'nextra'

// Nextra v4 配置
const withNextra = nextra({
  // Nextra 配置选项
  defaultShowCopyCode: true,
  latex: true,
})

export default withNextra({
  reactStrictMode: true,
})
