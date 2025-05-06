import type { AnyObject } from 'typescript-api-pro'
import type { CSSProperties, Component } from 'vue'

// 基础ConversationItem接口
export type ConversationItem<T extends AnyObject = AnyObject> = T & {
  group?: string
  icon?: Component | null
  disabled?: boolean
  label?: string
  prefixIcon?: Component | null
  suffixIcon?: Component | null
}

export type ConversationItemUseOptions<T extends AnyObject = AnyObject> = T & {
  uniqueKey: string | number;
  label: string;
  icon?: Component | null;
  disabled?: boolean;
  prefixIcon?: Component | null;
  suffixIcon?: Component | null;
}

export type ConversationMenuCommand = string | number | object

export interface ConversationMenu {
  label: string
  key: string
  icon?: Component | null
  disabled?: boolean
  divided?: boolean
  command?: ConversationMenuCommand
  menuItemStyle?: CSSProperties
  menuItemHoverStyle?: CSSProperties
}

// 分组选项
export interface GroupableOptions {
  // 组排序方法
  sort?: (a: string, b: string) => number
}

export interface Conversation<T extends AnyObject = AnyObject> {
  items: ConversationItem<T>[]
  itemsStyle?: CSSProperties
  itemsHoverStyle?: CSSProperties
  itemsActiveStyle?: CSSProperties
  itemsMenuOpenedStyle?: CSSProperties
  style?: CSSProperties
  labelMaxWidth?: number
  labelHeight?: number
  showTooltip?: boolean
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  tooltipOffset?: number
  // 允许boolean或GroupableOptions类型
  groupable?: boolean | GroupableOptions
  // 未分组的标题，默认为"未分组"
  ungroupedTitle?: string
  menu?: ConversationMenu[]
  showBuiltInMenu?: boolean
  menuPlacement?: 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  menuOffset?: number
  menuShowArrow?: boolean
  menuMaxHeight?: number
  menuStyle?: CSSProperties
  menuClassName?: string
  menuTeleported?: boolean
  loadMore?: () => void
  loadMoreLoading?: boolean
  showToTopBtn?: boolean
  rowKey?: keyof T
  labelKey?: keyof T
}

export interface GroupItem {
  title: string
  key: string
  children: ConversationItemUseOptions<T>[]
  isUngrouped?: boolean // 标记是否为未分组
}
