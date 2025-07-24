import fs from 'fs'
import path from 'path'
// node18+自带fetch，否则请安装 node-fetch 并取消下行注释
// import fetch from 'node-fetch'

const owner = 'element-plus-x' // 例如 'element-plus'
const repo = 'Element-Plus-X'  // 例如 'element-plus'
const githubToken = process.env.GITHUB_TOKEN // 推荐设置token防止被限流

const componentsDir = path.resolve('../../../../packages/core/src/components')
const componentNames = fs.readdirSync(componentsDir).filter(name =>
  fs.statSync(path.join(componentsDir, name)).isDirectory()
)

interface Contributor {
  login: string
  avatar: string
}

const getCommits = async (subPath: string): Promise<Contributor[]> => {
  let page = 1
  let contributors: Contributor[] = []
  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(subPath)}&per_page=100&page=${page}`
    const res = await fetch(url, {
      headers: githubToken ? { Authorization: `Bearer ${githubToken}` } : {}
    })
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) break
    contributors.push(
      ...data
        .map((c: any) => c.author && c.author.login && {
          login: c.author.login, // 贡献者name
          avatar: c.author.avatar_url // 贡献者头像
        })
        .filter(Boolean)
    )
    page++
  }
  return contributors
}

const getComponentContributors = async (component: string): Promise<Contributor[]> => {
  const paths = [
    `packages/core/src/components/${component}`,
    `apps/docs/en/components/${component}`,
    `apps/docs/zh/components/${component}`,
  ]
  let allContributors: Contributor[] = []
  for (const p of paths) {
    const contributors = await getCommits(p)
    allContributors.push(...contributors)
  }
  // 去重（按 login）
  const unique: Record<string, Contributor> = {}
  allContributors.forEach(c => {
    if (c && c.login) unique[c.login] = c
  })
  return Object.values(unique)
}

const main = async () => {
  const result: Record<string, Contributor[]> = {}
  for (const component of componentNames) {
    console.log(`正在获取 ${component} 的贡献者...`)
    result[component] = await getComponentContributors(component)
    console.log(`${component} 贡献者:`, result[component])
  }
  console.log(result, 'result');
  
  // 写入文件
//   fs.writeFileSync(
//     path.resolve(__dirname, '../../../component-contributors.json'),
//     JSON.stringify(result, null, 2)
//   )
  console.log('全部完成！')
}

main()
