import type { Component } from 'vue'
import type { TypingConfig } from '../Typewriter/types'

/**
 * 思考节点的id类型
 */
type ThinkingItemId = string | number

export type ThinkType = 'info' | 'success' | 'warning' | 'danger' | 'primary'

export interface ThinkStatusEnum {
  loading: {
    value: string | number
    type: ThinkType
  }
  error: {
    value: string | number
    type: ThinkType
  }
  success: {
    value: string | number
    type: ThinkType
  }
}

/**
 * 思考节点的基础类型
 */
export interface ThinkingItemBase {
  /**
   * 唯一标识
   */
  id: ThinkingItemId
  /**
   * 节点标题
   */
  title?: string
  /**
   * 思考的内容 没有展开选项时content会作为思维显示的内容
   * 当展开选项时content会作为展开选项的标题 `thinkTitle` 会作为展开选项后显示的思维内容
   */
  thinkTitle?: string
  /**
   * 展开思考的详细内容
   */
  thinkContent?: string
  // /**
  //  * 节点的图标
  //  */
  // 去掉, 使用slot处理
  // dotIcon: Component
  status?: 'loading' | 'error' | 'success',
  /**
   * 节点类型
   */
  // type?: 'info' | 'success' | 'warning' | 'danger' | 'primary',
  /**
   * footer对齐位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 是否可以展开
   */
  isCanExpand?: boolean | ((item: ThinkingItemBase)=> boolean)
  /**
   * 是否默认展开
   */
  isDefaultExpand?: boolean | ((item: ThinkingItemBase)=> boolean)
  /**
   * 是否隐藏节点标题内容
   */
  hideTitle?: boolean | ((item: ThinkingItemBase)=> boolean)
  /**
   *  是否使用markdown语法
   */
  isMarkdown?: boolean
  /**
   * 是否开启打字效果
   */
  typing?: TypingConfig
}

export type ThinkingItemUseProps<T = ThinkingItemBase> = Pick<ThinkingItemBase, 'hideTitle' | 'isMarkdown' | 'typing' | 'isDefaultExpand' | 'isCanExpand' | 'placement'> & T;

/**
 * 思考节点的类型
 */
export type ThinkingItem =
  | ThinkingItemBase & { isCanExpand?: false }
  | ThinkingItemBase & { isCanExpand: true, thinkContent: string }

/**
 * 思考组件的属性
 */
export interface ThinkingProps<T = ThinkingItemBase> {
  /**
   * 显示的节点列表
   */
  thinkingItems: ThinkingItemUseProps<T>[]
  rowKey?: string
  titleKey?: string
  thinkTitleKey?: string
  thinkContentKey?: string
  statusKey?: string
  statusEnum?: ThinkStatusEnum
  /**
   * 节点图标大小
   */
  dotSize?: 'large' | 'default' | 'small'
  /**
   * 思维链最大宽度
   */
  maxWidth?: string
  /**
   * 是否启用节点之间链接线的渐变颜色 false默认颜色
   */
  lineGradient?: boolean
}

export interface ThinkingInstance {
  /**
   * 展开的节点的id
   * @param id 节点的id
   */
  expandKeys: string[]
}
