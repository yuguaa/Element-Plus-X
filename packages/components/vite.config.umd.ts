import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import plugins from './.build/plugins'

// https://vite.dev/config/
export default defineConfig({
  plugins,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  build: {
    lib: {
      name: 'ElementPlusX',
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['umd'],
      fileName: (format) => {
        return `${format}/index.js`
      },
      cssFileName: 'styles.css',
    },
    rollupOptions: {
      external: ['vue', 'vue/jsx-runtime'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: false,
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: false,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
