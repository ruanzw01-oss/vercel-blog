
import { 
  SiReact, 
  SiSpring, 
  SiDocker, 
  SiGit 
} from 'react-icons/si'

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
  }
}
