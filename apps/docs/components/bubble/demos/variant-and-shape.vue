<docs>
---
title: 内置样式格式和形状
---

通过 `variant` 属性设置气泡的填内置样式格式。通过 `shape` 属性设置气泡的形状。当然你也可以两两结合，搭配使用

::: info
默认情况下，`variant` 为 `filled`，`shape` 为 `round`。

`shape` 为 `corner` 时，`placement="end"` 会自动将气泡翻转，使得右上角的 `弧度针` 指向用户。
:::
</docs>

<script setup lang="ts">
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <Bubble content="filled" variant="filled" />
      <Bubble content="filled + round" variant="filled" shape="round" />
      <Bubble content="filled + corner" variant="filled" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center;">
      <Bubble content="borderless" variant="borderless" />
      <Bubble content="borderless + round" variant="borderless" shape="round" />
      <Bubble content="borderless + corner" variant="borderless" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center;">
      <Bubble content="outlined" variant="outlined" />
      <Bubble content="outlined + round" variant="outlined" shape="round" />
      <Bubble content="outlined + corner" variant="outlined" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center;">
      <Bubble content="shadow" variant="shadow" />
      <Bubble content="shadow + round" variant="shadow" shape="round" />
      <Bubble content="shadow + corner" variant="shadow" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center;">
      <Bubble content="round" shape="round" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center;">
      <Bubble content="corner" shape="corner" />
      <Bubble content="placement end" shape="corner" placement="end" />
    </div>
  </div>
</template>
