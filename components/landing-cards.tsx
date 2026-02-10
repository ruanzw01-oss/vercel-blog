import type { ComponentType, ReactElement, ReactNode } from 'react'
import { Cards } from 'nextra/components'

type Tone = 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'sky'

const toneStyles: Record<Tone, { surface: string; icon: string }> = {
  blue: {
    surface:
      'bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/30 dark:to-blue-600/20 ring-1 ring-blue-500/20',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  emerald: {
    surface:
      'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 dark:from-emerald-500/30 dark:to-emerald-600/20 ring-1 ring-emerald-500/20',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    surface:
      'bg-gradient-to-br from-amber-500/20 to-amber-600/10 dark:from-amber-500/30 dark:to-amber-600/20 ring-1 ring-amber-500/20',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  rose: {
    surface:
      'bg-gradient-to-br from-rose-500/20 to-rose-600/10 dark:from-rose-500/30 dark:to-rose-600/20 ring-1 ring-rose-500/20',
    icon: 'text-rose-600 dark:text-rose-400',
  },
  purple: {
    surface:
      'bg-gradient-to-br from-purple-500/20 to-purple-600/10 dark:from-purple-500/30 dark:to-purple-600/20 ring-1 ring-purple-500/20',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  sky: {
    surface:
      'bg-gradient-to-br from-sky-500/20 to-sky-600/10 dark:from-sky-500/30 dark:to-sky-600/20 ring-1 ring-sky-500/20',
    icon: 'text-sky-600 dark:text-sky-400',
  },
}

type LandingCardsProps = {
  children: ReactNode
  columns?: 1 | 2 | 3
}

type LandingCardProps = {
  tone: Tone
  title: string
  href: string
  icon: ComponentType<{ size?: number; className?: string }>
  children: ReactNode
}

type LandingCardIconProps = {
  tone: Tone
  children: ReactNode
}

type LandingCardsComponent = ((props: LandingCardsProps) => ReactElement) & {
  Card: (props: LandingCardProps) => ReactElement
  Icon: (props: LandingCardIconProps) => ReactElement
}

const LandingCardIcon = ({ tone, children }: LandingCardIconProps) => {
  const styles = toneStyles[tone]
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl p-3 ${styles.surface}`}
    >
      <span className={styles.icon}>{children}</span>
    </div>
  )
}

const LandingCards = (({ children, columns = 2 }: LandingCardsProps) => {
  return <Cards num={columns}>{children}</Cards>
}) as LandingCardsComponent

LandingCards.Icon = LandingCardIcon

const LandingCard = ({
  tone,
  title,
  href,
  icon: Icon,
  children,
}: LandingCardProps) => {
  return (
    <Cards.Card
      icon={
        <LandingCardIcon tone={tone}>
          <Icon size={24} />
        </LandingCardIcon>
      }
      title={title}
      href={href}
      arrow
    >
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {children}
      </div>
    </Cards.Card>
  )
}

LandingCards.Card = LandingCard

export { LandingCard, LandingCards }
export type { LandingCardProps, LandingCardsProps, Tone }
