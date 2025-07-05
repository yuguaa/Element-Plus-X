<docs>
---
title: 基础用法
---

快速渲染一个 Markdown 基础的文本，如果是块级代码块的渲染
</docs>

<script setup lang="ts">
const markdown = `
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**这是粗体文本**  
__这也是粗体文本__

*这是斜体文本*  
_这也是斜体文本_

***这是粗斜体文本***

~~这是带删除线的文本~~

- 无序列表项1
- 无序列表项2
  - 子列表项2.1
  - 子列表项2.2

1. 有序列表项1
2. 有序列表项2
  1. 子列表项2.1
  2. 子列表项2.2

[Element-Plus-X](https://element-plus-x.com "Element-Plus-X")

![示例图片](https://element-plus-x.com/logo.png "一张示例图")

>这是一段引用文本
>
>> 这是嵌套的引用文本

---

| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |

行内代码用 \`ElmentPlusX\` 表示 行内块代码用 \`\` 语句

\`\`\`javascript
const code = "Element-Plus-X";
\`\`\`;

`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" />
  </div>
</template>

<style scoped lang="less"></style>
