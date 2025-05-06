import type { VNode as ComponentVNode, CSSProperties } from 'vue'

export interface PromptsItemsProps {
  key: string | number
  label?: string
  icon?: ComponentVNode
  description?: string
  disabled?: boolean
  itemStyle?: CSSProperties
  itemHoverStyle?: CSSProperties
  itemActiveStyle?: CSSProperties
  children?: PromptsItemsProps[]
}

export interface PromptsProps {
  title?: string
  items?: PromptsItemsProps[]
  wrap?: boolean
  vertical?: boolean
  style?: CSSProperties
}
