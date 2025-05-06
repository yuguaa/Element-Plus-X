<docs>
---
title: 内置 prism 样式文件
---

```ts

// 导入 Prism 语法高亮的不同主题样式（基于 vue-element-plus-x 插件提供的样式文件）
// 每个文件对应一种独立的代码高亮主题风格，可根据项目需求选择启用

// 1. Coy 主题（简约浅色风格，适合日常阅读）
import 'vue-element-plus-x/styles/prism-coy.min.css'

// 2. Dark 主题（深色背景主题，适合夜间模式或低光环境）
import 'vue-element-plus-x/styles/prism-dark.min.css'

// 3. Funky 主题（鲜艳色彩风格，代码语法高亮对比强烈）
import 'vue-element-plus-x/styles/prism-funky.min.css'

// 4. Okaidia 主题（深色高对比度主题，注重代码结构区分）
import 'vue-element-plus-x/styles/prism-okaidia.min.css'

// 5. Solarized Light 主题（柔和浅色主题，基于 Solarized 配色方案）
import 'vue-element-plus-x/styles/prism-solarizedlight.min.css'

// 6. Tomorrow 主题（现代简约风格，适合宽屏和大字体显示）
import 'vue-element-plus-x/styles/prism-tomorrow.min.css'

// 7. Twilight 主题（黄昏色调主题，介于明暗之间的平衡风格）
import 'vue-element-plus-x/styles/prism-twilight.min.css'

// 8. Prism 核心基础样式（必须导入，包含语法高亮的基础样式和结构）
import 'vue-element-plus-x/styles/prism.min.css'

/* 使用说明：
1. prism.min.css 是 Prism 的核心样式，包含基本的代码块布局和通用样式，必须保留
2. 其他以 prism-开头的文件是不同的主题样式，可根据项目视觉设计选择 1 个或多个导入
3. 若同时导入多个主题，后导入的样式会覆盖先导入的（可通过切换类名动态切换主题）
4. 主题名称对应 Prism 官方预设主题（如 Coy、Okaidia 等），样式细节可参考 Prism 主题文档
*/

```
</docs>

<script setup lang="ts">
import { ref } from 'vue'

// 这里可以引入 Prism 的核心样式，也可以自己引入其他第三方主题样式
import 'vue-element-plus-x/styles/prism.min.css'

const markdownText = ref(`#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``)
</script>

<template>
  <ClientOnly>
    <div>
      <Typewriter :content="markdownText" :is-markdown="true" />
    </div>
  </ClientOnly>
</template>
