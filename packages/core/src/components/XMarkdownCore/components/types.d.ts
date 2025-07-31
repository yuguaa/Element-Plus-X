// import type { CustomAttrs } from './core'

// export type * from './core/types'
import type { Component } from 'vue';

export interface MdComponent {
  raw: any;
}
export type codeXRenderer =
  | ((params: { language?: string; content: string }) => VNodeChild)
  | Component;
export type codeXSlot = ((params: any) => VNodeChild) | Component;
export interface HighlightProps {
  theme?: any | null;
  isDark?: boolean;
  language?: string;
  content?: string;
}
// 定义颜色替换的类型
export interface ColorReplacements {
  [theme: string]: Record<string, string>;
}
