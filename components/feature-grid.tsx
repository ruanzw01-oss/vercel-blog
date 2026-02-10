import type { ComponentType, ReactNode } from 'react'

type Tone = 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'sky'

const toneStyles: Record<Tone, { accent: string; hover: string }> = {
  blue: {
    accent: 'text-blue-500',
    hover: 'group-hover:text-blue-500',
  },
  emerald: {
    accent: 'text-emerald-500',
    hover: 'group-hover:text-emerald-500',
  },
  amber: {
    accent: 'text-amber-500',
    hover: 'group-hover:text-amber-500',
  },
  rose: {
    accent: 'text-rose-500',
    hover: 'group-hover:text-rose-500',
  },
  purple: {
    accent: 'text-purple-500',
    hover: 'group-hover:text-purple-500',
  },
  sky: {
    accent: 'text-sky-500',
    hover: 'group-hover:text-sky-500',
  },
}

type FeatureGridProps = {
  children: ReactNode
  columns?: 1 | 2 | 3
}

const columnStyles: Record<NonNullable<FeatureGridProps['columns']>, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
}

const FeatureGrid = ({ children, columns = 2 }: FeatureGridProps) => {
  return <div className={`grid gap-4 ${columnStyles[columns]}`}>{children}</div>
}

type FeatureCardProps = {
  tone: Tone
  eyebrow: string
  title: string
  icon: ComponentType<{ size?: number; className?: string }>
  children: ReactNode
}

const FeatureCard = ({
  tone,
  eyebrow,
  title,
  icon: Icon,
  children,
}: FeatureCardProps) => {
  const styles = toneStyles[tone]
  return (
    <div className="group rounded-2xl border border-gray-100/80 dark:border-white/10 bg-white/70 dark:bg-gray-900/30 p-5 transition-all hover:border-gray-200 dark:hover:border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className={styles.accent} />
        <span
          className={`text-xs font-bold uppercase tracking-widest ${styles.accent}`}
        >
          {eyebrow}
        </span>
      </div>
      <div
        className={`font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors ${styles.hover}`}
      >
        {title}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export { FeatureCard, FeatureGrid }
export type { FeatureCardProps }
