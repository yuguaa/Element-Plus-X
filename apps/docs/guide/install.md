#### **一、环境要求**

| 工具         | 版本要求            | 说明          |
| ------------ | ------------------- | ------------- |
| Node.js      | ≥ 18.x（推荐≥20.x） | 主流 LTS 版本 |
| Vue          | ≥ 3.3.X                | Vue 3 正式版  |
| Element-Plus | ≥ 2.8.X                | 安装为依赖    |
| pnpm   |  ≥ 10.X               | pnpm 安装    |

#### **二、安装**

```bash
# NPM 安装（稳定版）
npm install vue-element-plus-x --save

# PNPM 安装（推荐，速度更快）
pnpm add vue-element-plus-x

# Yarn 安装
yarn add vue-element-plus-x
```

**CDN 引入**
```html
<!-- 该方法 有待测试 -->
<!-- CDN 引入 -->
<script src="https://unpkg.com/vue-element-plus-x@1.0.81/dist/umd/index.js"></script>
```

#### **三、验证安装**

1. 检查 `package.json` 文件是否包含：

   ```json
   {
     "dependencies": {
       "vue-element-plus-x": "^1.0.81"
     }
   }
   ```

2. 运行项目验证组件是否可用：

   ```bash
   npm run dev
   ```

#### **四、按需加载说明**

内置 **Tree Shaking** 优化，无需额外配置

1. **按需引入**

```vue
<script>
import { BubbleList, Sender } from 'vue-element-plus-x'
const list = [
  {
    content: 'Hello, Element Plus X',
    role: 'user',
  },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 230px; justify-content: space-between;">
    <BubbleList :list="list" />
    <Sender />
  </div>
</template>
```

2. **全量引入**

```
// main.ts
import { createApp } from 'vue'
import ElementPlusX from 'vue-element-plus-x'
import App from './App.vue'

const app = createApp(App)
// 使用 app.use() 全局引入
app.use(ElementPlusX)
app.mount('#app')
```
