<docs>
---
title: variant 属性
---

快速切换多种样式，目前只有两种，`filled` 和 `borderless`。默认为 `filled`。
</docs>

<script setup lang="ts">
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Welcome
      variant="borderless"
      title="欢迎来到 Element Plus X 🦋"
    />

    <Welcome
      variant="borderless"
      title="欢迎使用 Element Plus X 💖"
      description="这是描述信息 ~"
    />

    <Welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      variant="borderless"
      title="欢迎使用 Element Plus X 💖"
      description="这是描述信息 ~"
    />

    <Welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      variant="borderless"
      title="欢迎使用 Element Plus X 💖"
      extra="副标题"
      description="这是描述信息 ~"
    />
  </div>
</template>

<style scoped lang="less">
</style>
