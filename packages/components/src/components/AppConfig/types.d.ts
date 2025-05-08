import type MarkdownIt from 'markdown-it'

export type MarkdownItPlugin = (md: MarkdownIt) => void

export interface AppConfigProps {
  mdPlugins?: MarkdownItPlugin[]
  highlight?: (code: string, language: string) => string
}
