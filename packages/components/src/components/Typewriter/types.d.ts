// types.ts
import type { ComputedRef, Ref } from 'vue'

/** 打字效果配置 */
export interface TypingConfig {
  /** 每次打字字符数 */
  step?: number
  /** 打字间隔（毫秒） */
  interval?: number
  /** 打字光标后缀 */
  suffix?: string
}

/* 打字雾化效果配置 */
export interface TypingFogfig {
  /** 雾化背景色 */
  bgColor?: string
  /* 雾化宽度 */
  width?: string
}

/** 组件 Props 类型 */
export interface TypewriterProps {
  /** 要显示的内容 */
  content?: string
  /** 是否解析为 Markdown */
  isMarkdown?: boolean
  /** 打字效果配置（布尔值启用默认配置） */
  typing?: boolean | TypingConfig
  /* 是否开启打字器雾化效果 */
  isFog?: boolean | TypingFogfig
}

/** 组件实例类型 */
export interface TypewriterInstance {
  /** 中断打字过程 */
  interrupt: () => void
  /** 继续未完成的打字 */
  continue: () => void
  /** 重新开始打字 */
  restart: () => void
  /** 销毁组件（清理资源） */
  destroy: () => void
  /** 当前渲染的内容（响应式） */
  renderedContent: ComputedRef<string>
  /** 是否正在打字（响应式） */
  isTyping: Ref<boolean>
  /** 当前进度百分比（0-100）（响应式） */
  progress: ComputedRef<number>
}
