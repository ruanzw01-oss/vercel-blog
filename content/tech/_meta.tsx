
import {
  SiReact,
  SiSpring,
  SiDocker,
  SiGit,
  SiGnubash
} from 'react-icons/si'
import { MonitorCog, Bot, Key } from 'lucide-react'

export default {
  index: {
    title: '概览',
    theme: {
      breadcrumb: false
    }
  },
  frontend: {
    title: (
      <span className="flex items-center gap-2 group">
        <SiReact className="text-blue-500 group-hover:scale-110 transition-transform" />
        前端开发
      </span>
    )
  },
  backend: {
    title: (
      <span className="flex items-center gap-2 group">
        <SiSpring className="text-emerald-500 group-hover:scale-110 transition-transform" />
        后端开发
      </span>
    )
  },
  devops: {
    title: (
      <span className="flex items-center gap-2 group">
        <SiDocker className="text-sky-500 group-hover:scale-110 transition-transform" />
        运维部署
      </span>
    )
  },
  tools: {
    title: (
      <span className="flex items-center gap-2 group">
        <SiGit className="text-orange-600 group-hover:scale-110 transition-transform" />
        工具效率
      </span>
    )
  },
  shell: {
    title: (
      <span className="flex items-center gap-2 group">
        <SiGnubash className="text-gray-600 group-hover:scale-110 transition-transform" />
        Shell 技巧
      </span>
    )
  },
  'env-setup': {
    title: (
      <span className="flex items-center gap-2 group">
        <MonitorCog className="text-blue-500 group-hover:scale-110 transition-transform" size={16} />
        开发环境
      </span>
    )
  },
  'llm-content-loss': {
    title: (
      <span className="flex items-center gap-2 group">
        <Bot className="text-violet-500 group-hover:scale-110 transition-transform" size={16} />
        AI 提示技巧
      </span>
    )
  },
  'kimi-api-integration': {
    title: (
      <span className="flex items-center gap-2 group">
        <Key className="text-amber-500 group-hover:scale-110 transition-transform" size={16} />
        Kimi API 集成
      </span>
    )
  }
}
