
import {
  Code2,
  TrendingUp,
  BookOpen,
  Users,
  Lightbulb,
  NotebookText,
  Rss,
  Scissors
} from 'lucide-react'

export default {
  index: {
    display: 'hidden' 
  },
  tech: {
    title: (
      <span className="flex items-center gap-2">
        <Code2 size={18} className="text-blue-500" />
        技术笔记
      </span>
    ),
    type: 'page'
  },
  finance: {
    title: (
      <span className="flex items-center gap-2">
        <TrendingUp size={18} className="text-emerald-500" />
        理财投资
      </span>
    ),
    type: 'page'
  },
  reading: {
    title: (
      <span className="flex items-center gap-2">
        <BookOpen size={18} className="text-amber-500" />
        阅读感悟
      </span>
    ),
    type: 'page'
  },
  social: {
    title: (
      <span className="flex items-center gap-2">
        <Users size={18} className="text-rose-500" />
        人际交往
      </span>
    ),
    type: 'page'
  },
  thoughts: {
    title: (
      <span className="flex items-center gap-2">
        <Lightbulb size={18} className="text-purple-500" />
        思考随笔
      </span>
    ),
    type: 'page'
  },
  life: {
    title: (
      <span className="flex items-center gap-2">
        <NotebookText size={18} className="text-sky-500" />
        生活记录
      </span>
    ),
    type: 'page'
  },
  wechat: {
    title: (
      <span className="flex items-center gap-2">
        <Rss size={18} className="text-green-500" />
        公众号
      </span>
    ),
    type: 'page'
  },
  clips: {
    title: (
      <span className="flex items-center gap-2">
        <Scissors size={18} className="text-orange-500" />
        片段摘录
      </span>
    ),
    type: 'page'
  }
}
