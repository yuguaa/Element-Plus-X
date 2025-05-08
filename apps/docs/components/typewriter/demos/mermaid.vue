<docs>
---
title: 内置 markdown-it-mermaid 插件 渲染简单的图表
---

你也可以自定在 `markdown-it` 社区中寻找自定义插件，以实现更多自定义功能。
通过 `md-plugins` 属性，传入 `markdown-it` 插件数组，即可在 `markdown-it` 中使用自定义插件。
通过 `highlight` 函数，传入 Prism 的高亮函数，或者其他高亮库，作用在 `markdown-it` 中使用 Prism 的高亮功能。

详细 Mermaid 格式 参见：[Mermaid.js](https://mermaid.js.org/syntax/pie.html)

::: warning
md 渲染这一块暂时这样处理，后续有计划做成 豆包那种，目前没有内置样式。请耐心等待。。。🐒预计5月底至6月初上
:::
</docs>

<script setup lang="ts">
import markdownItMermaid from '@jsonlee_12138/markdown-it-mermaid'
import { ref } from 'vue'

// 这里是组件库内置的一个 代码高亮库 Prismjs，自定义的 hooks 例子。(仅供集成参考)代码地址：https://github.com/HeJiaYue520/Element-Plus-X/blob/main/packages/components/src/hooks/usePrism.ts
import { usePrism } from 'vue-element-plus-x'
// 这里可以引入 Prism 的核心样式，也可以自己引入其他第三方主题样式
import 'vue-element-plus-x/styles/prism.min.css'

const mdPlugins = [markdownItMermaid({ delay: 100, forceLegacyMathML: true })]
const highlight = usePrism()

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
      <Typewriter :content="markdownText" :is-markdown="true" :md-plugins="mdPlugins" :highlight="highlight" />
    </div>
  </ClientOnly>
</template>
