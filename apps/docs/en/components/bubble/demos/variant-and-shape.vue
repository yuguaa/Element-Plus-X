<docs>
---
title: Built-in Style Formats and Shapes
---

Set the bubble's built-in style format through the `variant` property. Set the bubble's shape through the `shape` property. You can also combine them together.

::: info
By default, `variant` is `filled` and `shape` is `round`.

When `shape` is `corner` and `placement="end"`, the bubble will automatically flip to make the top-right corner's `radius pointer` point towards the user.
:::
</docs>

<script setup lang="ts"></script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px; align-items: center">
      <Bubble content="filled" variant="filled" />
      <Bubble content="filled + round" variant="filled" shape="round" />
      <Bubble content="filled + corner" variant="filled" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center">
      <Bubble content="borderless" variant="borderless" />
      <Bubble content="borderless + round" variant="borderless" shape="round" />
      <Bubble
        content="borderless + corner"
        variant="borderless"
        shape="corner"
      />
    </div>

    <div style="display: flex; gap: 12px; align-items: center">
      <Bubble content="outlined" variant="outlined" />
      <Bubble content="outlined + round" variant="outlined" shape="round" />
      <Bubble content="outlined + corner" variant="outlined" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center">
      <Bubble content="shadow" variant="shadow" />
      <Bubble content="shadow + round" variant="shadow" shape="round" />
      <Bubble content="shadow + corner" variant="shadow" shape="corner" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center">
      <Bubble content="round" shape="round" />
    </div>

    <div style="display: flex; gap: 12px; align-items: center">
      <Bubble content="corner" shape="corner" />
      <Bubble content="placement end" shape="corner" placement="end" />
    </div>
  </div>
</template>
