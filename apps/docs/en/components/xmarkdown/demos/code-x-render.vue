<docs>
---
title: codeXRender Custom Code Block Rendering
---

Use the `codeXRender` property to customize code block rendering. This property accepts an object where the key is the code block language and the value is a function. The function parameter is the code block properties, and the return value is a VNode. This means you can use Vue's template syntax to render code blocks.

:::warning
This feature will intercept the code blocks you set. You can discuss the code block language with the backend, then return a corresponding VNode based on the language.

We will build a component library marketplace based on this component in the future. If you're interested in this, welcome to join 🥰[Community Group](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81), or add the author's contact information to build this marketplace project together. 🥳Stay tuned
:::
</docs>

<script setup lang="ts">
import { h } from 'vue';
import Echarts from './echarts.vue';

const markdown = `
\`\`\`javascript
const a = 1;
\`\`\`

\`\`\`echarts
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
\`\`\`
`;

const selfCodeXRender = {
  // Render custom code block identifier javascript, return a component
  javascript: (props: { raw: any }) => {
    return h(
      'pre',
      { class: 'language-javascript' },
      h('code', { class: 'language-javascript' }, props.raw.content)
    );
  },

  // Render custom code block identifier echarts, Echarts is a self-encapsulated Vue component
  echarts: (props: { raw: any }) => h(Echarts, { code: props.raw.content })
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :code-x-render="selfCodeXRender" />
  </div>
</template>

<style scoped lang="less"></style>
