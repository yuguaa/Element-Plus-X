// build/scripts/generate-auto-entry.ts
import path from 'node:path'
import { cwd, exit } from 'node:process'
import fs from 'fs-extra'

interface ComponentInfo {
  name: string
  path: string
}

async function generateAutoEntry() {
  const componentsDir = path.resolve(cwd(), 'src/components')
  const components: ComponentInfo[] = []

  // 扫描组件目录
  if (await fs.exists(componentsDir)) {
    const dirs = await fs.readdir(componentsDir)

    for (const dir of dirs) {
      const compPath = path.join(componentsDir, dir, 'index.vue')
      if (await fs.exists(compPath)) {
        const compName = dir
          .replace(/(^\w|-\w)/g, (m: string) =>
            m.replace('-', '').toUpperCase())

        components.push({
          name: compName,
          path: `./components/${dir}/index.vue`,
        })
      }
    }
  }

  // 生成入口文件内容
  const entryContent = [
    '// Auto-Element-Plus-X by auto-export-all-components script',
    ...components.map(c => `export { default as ${c.name} } from '${c.path}'`),
    '',
  ].join('\n')

  // 生成安装文件内容
  const installContent = [
    'import type { App, Plugin } from \'vue\'',
    ...components.map(c => `import ${c.name} from '${c.path}'`),
    '',
    `export * from './components'`,
    `export * from './hooks'`,
    '',
    'const ElementPlusX: Plugin = {',
    '  install(app: App) {',
    ...components.map(c => `    app.component('${c.name}', ${c.name})`),
    '  }',
    '}',
    '',
    'export default ElementPlusX',
  ].join('\n')

  // 写入文件
  const outputDir = path.resolve(cwd(), 'src')

  try {
    await fs.ensureDir(outputDir)
    await fs.writeFile(path.join(outputDir, 'components.ts'), entryContent)
    await fs.writeFile(path.join(outputDir, 'index.ts'), installContent)
    console.log('✅ Auto entry files generated successfully!')
  }
  catch (error) {
    console.error('❌ Error generating auto-entry files:', error)
    exit(1)
  }
}

// 执行生成
void generateAutoEntry()
