import type markdownit from 'markdown-it'

export interface MdrendererProps {
  classNamePrefix?: string
  // 是否不需要内置高亮
  noHighlight?: boolean
  // 是否不需要内置 mermaid
  noMermaid?: boolean
  // 是否不需要内置 katex
  noKatex?: boolean
  options?: MdrendererOptions

}

// markdown-it
export interface MdrendererOptions {
  // 继承插件
  mdPlugins?: markdownit.PluginSimple[]
  mdPluginWithOptions?: markdownit.PluginWithOptions[]
  mdPluginWithParams?: markdownit.PluginWithParams[]
  options?: markdownit.Options

  // 自定义
  mdhighlight?: (code: string, language: string) => string
  mermaidConfig?: (base: any) => any
  katexConfig?: (baseConfig: any) => any
}
