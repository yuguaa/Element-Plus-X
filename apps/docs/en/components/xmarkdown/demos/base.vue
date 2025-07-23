<docs>
---
title: Basic Usage
---

Quickly render a basic Markdown text. Built-in basic styles such as inline code, code blocks, mathematical formula functions (inline/block), mermaid charts, etc.

:::warning
Supports incremental updates, you can view node update changes in the console. The following code example demonstrates the incremental update effect, simulating the logic of streaming character reception.
:::
</docs>

<script setup lang="ts">
const markdown = ref(`
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
#### Level 4 Heading
##### Level 5 Heading
###### Level 6 Heading

**This is bold text**  
__This is also bold text__

*This is italic text*  
_This is also italic text_

***This is bold italic text***

~~This is strikethrough text~~

- Unordered list item 1
- Unordered list item 2
  - Sub list item 2.1
  - Sub list item 2.2

1. Ordered list item 1
2. Ordered list item 2
  1. Sub list item 2.1
  2. Sub list item 2.2

[Element-Plus-X](https://element-plus-x.com "Element-Plus-X")

![Example Image](https://element-plus-x.com/logo.png "An example image")

>This is a quoted text
>
>> This is nested quoted text

---

| Name | Age | Profession |
| ---- | --- | ---------- |
| Zhang San | 25 | Engineer |
| Li Si | 30 | Designer |

### Inline Code

Use \`ElmentPlusX\` to represent inline block code with \`\` statements

### Code Block

\`\`\`javascript
const code = "Element-Plus-X";
\`\`\`

### Inline Formula
$e^{i\\pi} + 1 = 0$

### Block Formula
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

### Mermaid Pie Chart

\`\`\`mermaid
pie
    "Media and Culture Related" : 35
    "Advertising and Marketing" : 8
    "Game Development" : 15
    "Film Animation and Effects" : 12
    "Internet Product Design" : 10
    "VR/AR Development" : 5
    "Others" : 15
\`\`\`

`);

const timer = ref();
const index = ref(markdown.value.length); // Default display all content

const content = computed(() => {
  return markdown.value.slice(0, index.value);
});

function start() {
  timer.value = setInterval(() => {
    index.value += 5;
    if (index.value > markdown.value.length) {
      clearInterval(timer.value);
      index.value = markdown.value.length;
    }
  }, 100);
}
function pause() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

function redo() {
  index.value = 0;
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  start();
}
onMounted(() => {
  start();
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span style="font-size: 20px; font-weight: 700">View incremental rendering in console</span>
    <div style="display: flex; gap: 8px">
      <el-button @click="start"> Start </el-button>
      <el-button @click="pause"> Pause </el-button>
      <el-button @click="redo"> Restart </el-button>
    </div>
    <XMarkdown :markdown="content" class="vp-raw" />
  </div>
</template>

<style scoped lang="less"></style>
