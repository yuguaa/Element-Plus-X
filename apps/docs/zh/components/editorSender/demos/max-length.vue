<docs>
---
title: 限制最大输入长度
---

通过 `maxLength` 限制输入框最大字数。

:::danger
该配置项性能开销较大 非必要情况请别设置（像豆包和文心一言都不对这块做限制，不应因小失大）
:::
</docs>

<template>
  <EditorSender :max-length="10" />
</template>
