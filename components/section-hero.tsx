import type { ReactNode } from 'react'

type Tone = 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'sky'

const toneStyles: Record<
  Tone,
  { surface: string; glowPrimary: string; glowSecondary: string }
> = {
  blue: {
    surface:
      'bg-gradient-to-br from-white via-white to-blue-50/70 dark:from-gray-950 dark:via-gray-950 dark:to-slate-900/70 border-blue-100/60 dark:border-blue-500/20',
    glowPrimary: 'from-blue-500/35 to-purple-500/10',
    glowSecondary: 'from-sky-400/20 to-emerald-400/10',
  },
  emerald: {
    surface:
      'bg-gradient-to-br from-white via-white to-emerald-50/70 dark:from-gray-950 dark:via-gray-950 dark:to-emerald-950/40 border-emerald-100/60 dark:border-emerald-500/20',
    glowPrimary: 'from-emerald-500/35 to-teal-500/10',
    glowSecondary: 'from-sky-400/20 to-emerald-400/10',
  },
  amber: {
    surface:
      'bg-gradient-to-br from-white via-white to-amber-50/70 dark:from-gray-950 dark:via-gray-950 dark:to-amber-950/35 border-amber-100/60 dark:border-amber-500/20',
    glowPrimary: 'from-amber-500/35 to-orange-500/10',
    glowSecondary: 'from-rose-400/15 to-amber-400/10',
  },
  rose: {
    surface:
      'bg-gradient-to-br from-white via-white to-rose-50/70 dark:from-gray-950 dark:via-gray-950 dark:to-rose-950/35 border-rose-100/60 dark:border-rose-500/20',
    glowPrimary: 'from-rose-500/35 to-fuchsia-500/10',
    glowSecondary: 'from-amber-400/15 to-rose-400/10',
  },
  purple: {
    surface:
      'bg-gradient-to-br from-white via-white to-purple-50/70 dark:from-gray-950 dark:via-gray-950 dark:to-purple-950/35 border-purple-100/60 dark:border-purple-500/20',
    glowPrimary: 'from-purple-500/35 to-blue-500/10',
    glowSecondary: 'from-sky-400/15 to-purple-400/10',
  },
  sky: {
    surface:
      'bg-gradient-to-br from-white via-white to-sky-50/70 dark:from-gray-950 dark:via-gray-950 dark:to-sky-950/35 border-sky-100/60 dark:border-sky-500/20',
    glowPrimary: 'from-sky-500/35 to-blue-500/10',
    glowSecondary: 'from-emerald-400/15 to-sky-400/10',
  },
}

type SectionHeroProps = {
  tone: Tone
  children: ReactNode
}

const SectionHero = ({ tone, children }: SectionHeroProps) => {
  const styles = toneStyles[tone]
  return (
    <div
      className={`relative mb-12 overflow-hidden rounded-3xl border ${styles.surface}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${styles.glowPrimary} blur-2xl`}
      ></div>
      <div
        className={`absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-gradient-to-tr ${styles.glowSecondary} blur-2xl`}
      ></div>
      <div className="relative px-6 py-10 md:px-10 md:py-12">{children}</div>
    </div>
  )
}

type SectionHeroEyebrowProps = {
  children: ReactNode
}

const SectionHeroEyebrow = ({ children }: SectionHeroEyebrowProps) => {
  return (
    <p className="text-xs uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">
      {children}
    </p>
  )
}

type SectionHeroTitleProps = {
  children: ReactNode
}

const SectionHeroTitle = ({ children }: SectionHeroTitleProps) => {
  return (
    <h1 className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
      {children}
    </h1>
  )
}

type SectionHeroLeadProps = {
  children: ReactNode
}

const SectionHeroLead = ({ children }: SectionHeroLeadProps) => {
  return (
    <div className="mt-5 text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-relaxed [&>p]:m-0 [&>p+p]:mt-3">
      {children}
    </div>
  )
}

type SectionHeroTagsProps = {
  children: ReactNode
}

const SectionHeroTags = ({ children }: SectionHeroTagsProps) => {
  return <div className="mt-6 flex flex-wrap gap-3 text-xs">{children}</div>
}

type SectionHeroTagProps = {
  children: ReactNode
}

const SectionHeroTag = ({ children }: SectionHeroTagProps) => {
  return (
    <span className="rounded-full border border-gray-200/70 dark:border-gray-800 px-3 py-1 text-gray-500 dark:text-gray-400">
      {children}
    </span>
  )
}

export { SectionHero, SectionHeroEyebrow, SectionHeroLead, SectionHeroTag, SectionHeroTags, SectionHeroTitle }
export type { Tone }
