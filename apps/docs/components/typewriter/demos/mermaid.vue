<docs>
---
title: 内置 Mermaid.js 渲染简单的图表
---

详细 Mermaid 格式 参见：[Mermaid.js](https://mermaid.js.org/syntax/pie.html)
</docs>

<script setup lang="ts">
import { ref } from 'vue'

// 这里可以引入 Prism 的核心样式，也可以自己引入其他第三方主题样式
import 'vue-element-plus-x/styles/prism.min.css'

const markdownText = ref(`#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n \`\`\`mermaid
 pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
 \n
\`\`\`

\`\`\`mermaid
 xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

 \n
\`\`\`
`)
</script>

<template>
  <ClientOnly>
    <div>
      <Typewriter :content="markdownText" :is-markdown="true" />
    </div>
  </ClientOnly>
</template>
