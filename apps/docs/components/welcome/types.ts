import type { CSSProperties } from 'vue'

export type SemanticType = 'title' | 'description' | 'icon' | 'extra'

export interface WelcomeProps {
  prefixCls?: string
  rootClassName?: string
  className?: string
  style?: CSSProperties
  variant?: 'filled' | 'borderless'
  classNames?: Partial<Record<SemanticType, string>>
  styles?: Partial<Record<SemanticType, CSSProperties>>
  icon?: string
  title?: string
  description?: string
  extra?: string
  direction?: 'ltr' | 'rtl'
}
