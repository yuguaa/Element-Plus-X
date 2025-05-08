import type { PluginOption } from 'vite'
import prismjsPlugin from 'vite-plugin-prismjs'

export default prismjsPlugin({
  languages: 'all', // 语言
  theme: 'default', // 主题
  // theme: 'okaidia', // 主题
  // plugins: ['line-numbers', 'show-language', 'copy-to-clipboard', 'inline-color'],
  // css: true,
}) as PluginOption
