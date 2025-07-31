import type { BuildEnvironmentOptions } from 'vite';
import { extname, join, relative, resolve } from 'node:path';
import fg from 'fast-glob';

const root = resolve(__dirname, '../');

const entries = fg.globSync('src/components/*/*.(tsx|ts|vue)', {
  ignore: ['src/components/**/*.d.ts', 'src/components/**/*.types.ts']
});

const hooksEntries = fg.globSync('src/hooks/*.(ts|tsx)', {
  ignore: ['src/hooks/**/*.d.ts', 'src/hooks/**/*.types.ts']
});

const entriesObj = Object.fromEntries(
  entries.map(f => {
    return [
      relative('src/components', f.slice(0, f.length - extname(f).length)),
      join(root, f)
    ];
  })
);

const hooksEntriesObj = Object.fromEntries(
  hooksEntries.map(f => {
    return [
      `hooks/${relative('src/hooks', f.slice(0, f.length - extname(f).length))}`,
      join(root, f)
    ];
  })
);

const buildConfig: BuildEnvironmentOptions = {
  lib: {
    name: 'ElementPlusX',
    entry: {
      index: resolve(__dirname, '../src/index.ts'),
      components: resolve(__dirname, '../src/components.ts'),
      ...entriesObj,
      ...hooksEntriesObj
    },
    fileName: (format, entryName) => {
      return `${format}/${entryName}.js`;
    },
    formats: ['es']
  },
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    external: [
      'vue', // Vue 3 核心库
      'vue/jsx-runtime', // Vue JSX 运行时
      '@element-plus/icons-vue', // Element Plus 图标库
      '@shikijs/transformers', // Shiki 代码转换器
      'shiki', // Shiki 代码高亮库
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
      'unified', // 文本处理统一接口
      '@vueuse/core', // VueUse 工具库
      'deepmerge', // 深度合并工具
      'github-markdown-css' // GitHub Markdown CSS
    ],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue'
      },
      exports: 'named', // 确保有命名导出
      assetFileNames: ((info: any) => {
        const srcName = info.originalFileNames[0];
        if (srcName) {
          if (srcName.includes('src/components/')) {
            const fileName = srcName
              .replace('src/components/', '')
              .replace('index.vue', 'index.css');
            return `es/${fileName}`;
          }
        }
        return info.name;
      }) as unknown as string
    }
  },
  sourcemap: true,
  // 减少文件大小
  minify: 'terser',
  // CSS 处理
  cssCodeSplit: true,
  // 确保只生成一个CSS文件
  emptyOutDir: false
};

export default buildConfig;
