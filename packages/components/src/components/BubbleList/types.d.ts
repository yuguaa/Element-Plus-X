import type { BubbleProps } from '../Bubble/types'

// 暂时这样包一层，后续看有没有拓展
export interface BubbleListItemProps extends BubbleProps {}

export interface BubbleListProps<T extends BubbleListItemProps = BubbleListItemProps> {
  list: T[]
  maxHeight?: string
  triggerIndices?: 'only-last' | 'all' | number[]
}

// 定义组件实例类型
// 定义组件实例类型
export interface BubbleListInstance {
  scrollToTop: () => void
  scrollToBottom: () => void
  scrollToBubble: (index: number) => void
}
