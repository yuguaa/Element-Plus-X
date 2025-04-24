import type { PluginOption } from 'vite'
import prismjsPlugin from 'vite-plugin-prismjs'

export default prismjsPlugin({
  languages: 'all', // 语言
  theme: 'default', // 主题
  // css: true,
}) as PluginOption
