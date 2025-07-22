<docs>
---
title: Built-in Style Formats and Shapes
---

Set bubble's built-in style format through `variant` property. Set bubble's shape through `shape` property. Of course you can also combine them and use them together.

::: info
By default, `variant` is `filled`, `shape` is `round`.

When `shape` is `corner`, `placement="end"` will automatically flip the bubble so that the top-right corner `radius pointer` points to the user.
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
