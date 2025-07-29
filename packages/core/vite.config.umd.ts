import path, { resolve } from 'node:path';
import process from 'node:process';
import { visualizer } from 'rollup-plugin-visualizer'; // 打包分析插件
import { defineConfig } from 'vite';
import plugins from './.build/plugins';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ...plugins, // 基础插件配置
    // 打包分析插件，生成可视化的打包分析报告
    visualizer({
      filename: 'dist/stats.html', // 分析报告输出文件名
      open: true, // 构建完成后自动打开分析报告
      gzipSize: true, // 显示 gzip 压缩后的大小
      brotliSize: true, // 显示 brotli 压缩后的大小
      template: 'treemap' // 使用树状图模板，可选：treemap、sunburst、network
    })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks')
    }
  },
  build: {
    lib: {
      name: 'ElementPlusX',
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['umd'],
      fileName: format => {
        return `${format}/index.js`;
      },
      cssFileName: 'styles.css'
    },
    rollupOptions: {
      // 外部依赖配置，这些依赖不会被打包，需要用户自行提供
      external: [
        'vue', // Vue 3 核心库
        'vue/jsx-runtime', // Vue JSX 运行时
        '@element-plus/icons-vue', // Element Plus 图标库
        '@shikijs/transformers', // Shiki 代码转换器
        'shiki', // Shiki 代码高亮库
        'mermaid', // 流程图库
        'chatarea', // 聊天区域组件
        'dompurify', // DOM 净化库
        'element-plus', // Element Plus 组件库
        'highlight.js', // 代码高亮库
        'markdown-it-async', // 异步 Markdown 解析器
        'prismjs', // 代码高亮库
        'property-information', // HTML 属性信息库
        'radash', // 工具函数库
        'rehype-katex', // KaTeX 数学公式插件
        'rehype-raw', // Rehype 原始 HTML 插件
        'rehype-sanitize', // Rehype 清理插件
        'remark-breaks', // Remark 换行插件
        'remark-gfm', // GitHub Flavored Markdown 插件
        'remark-math', // 数学公式插件
        'remark-parse', // Markdown 解析器
        'remark-rehype', // Remark 到 Rehype 转换器
        'swrv', // Vue 数据获取库
        'ts-md5', // MD5 哈希库
        'typescript-api-pro', // TypeScript API 工具
        'unified' // 文本处理统一接口
      ],
      output: {
        // 全局变量映射，用于 UMD 格式
        globals: {
          vue: 'Vue', // Vue 3 全局变量
          'element-plus': 'ElementPlus', // Element Plus 全局变量
          '@element-plus/icons-vue': 'ElementPlusIconsVue', // Element Plus 图标全局变量
          'highlight.js': 'hljs', // highlight.js 全局变量
          prismjs: 'Prism', // Prism.js 全局变量
          mermaid: 'mermaid', // Mermaid 全局变量
          dompurify: 'DOMPurify' // DOMPurify 全局变量
        }
      }
    },
    emptyOutDir: false,
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: false
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
});
