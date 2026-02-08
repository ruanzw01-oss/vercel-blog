
import { 
  Code2, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Lightbulb 
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
  }
}
