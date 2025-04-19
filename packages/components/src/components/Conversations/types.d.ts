import type { VNode as ComponentVNode, CSSProperties } from 'vue'

// 基础ConversationItem接口
export interface BaseConversationItem {
  key: string
  label: string
  group?: string
  icon?: ComponentVNode | null
  disabled?: boolean
  prefixIcon?: ComponentVNode | null
  suffixIcon?: ComponentVNode | null
}

// 当groupable为true时，timestamp必须存在
export type ConversationItem<G extends boolean = false> = G extends true
  ? BaseConversationItem & { timestamp: number }
  : BaseConversationItem & { timestamp?: number }

export interface ConversationMenu {
  label: string
  key: string
  icon?: ComponentVNode | null
  disabled?: boolean
  onClick?: () => void
}

// 时间范围类型
export interface TimeRange {
  start: number
  end: number
}

// 分组选项
export interface GroupableOptions {
  // 组排序方法
  sort?: (a: string, b: string) => number
  // 自定义组标题渲染
  title?: ComponentVNode | ((groupName: string) => ComponentVNode)
}

// 时间戳函数或数值
export type TimestampValue = number | (() => number)

export interface Conversation {
  items: ConversationItem<boolean>[]
  style?: CSSProperties
  labelMaxWidth?: number
  showTooltip?: boolean
  // 允许boolean或GroupableOptions类型或空字符串('')
  // 当为空字符串时，等同于传入groupable但不赋值，相当于groupable=true
  groupable?: boolean | GroupableOptions | ''
  // 时间快捷方式，key为分组标题，值为时间戳或时间戳函数
  shortcuts?: Record<string, TimestampValue | TimeRange>
  // 未分组的标题，默认为"未分组"
  ungroupedTitle?: string
  menu?: ConversationMenu[]
  loadMore?: () => void
  search?: string
  /**
   * 搜索方法，接收搜索值作为参数
   * 用户可以在此方法中处理异步搜索逻辑，然后自行更新items数据
   * @param searchValue 搜索值
   */
  searchMethod?: (searchValue: string) => void
}
