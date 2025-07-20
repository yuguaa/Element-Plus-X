<docs>
---
title: Override Styles
---

If you find that the component's built-in styles become strange when integrating this component, it may be because your project's built-in global styles conflict with some basic styles of this component. You can solve this problem by overriding styles.

:::info
Create a style file, for example: `self-markdown.css`, and add some custom style content:

```css
.h1 {
  font-size: 24px;
  color: red;
  margin-bottom: 16px;
}
```

Import this file into your project, for example:

```ts
import 'self-markdown.css'
```

If it's not overridden, it's likely because your style hierarchy is not sufficient, you can try style penetration
:::
</docs>

<script setup lang="ts">
const markdown = `
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" class="self-markdown-body" />
  </div>
</template>

<style scoped lang="less">
.self-markdown-body {
  :deep(h1) {
    font-size: 24px;
    color: red;
    margin-bottom: 16px;
  }
  :deep(h2) {
    margin: 0;
    font-size: 20px;
    color: blue;
    margin-bottom: 16px;
  }
}
</style>
