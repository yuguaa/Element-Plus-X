<docs>
---
title: Slots
---

You can intercept some tags, or custom tags, and then customize the rendering of these tags. If you want to customize the rendering of images or videos, it might be very convenient.
</docs>

<script setup lang="ts">
const markdown = `
<img src="https://avatars.githubusercontent.com/u/76239030?v=4" alt="">

<self-btn>Custom Tag</self-btn>
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown">
      <template #img="{ ...props }">
        <img :key="props.key" :src="props.src" style="border-radius: 30px" />
      </template>

      <template #self-btn="{ ...props }">
        <el-button :key="props.key">
          Check props in console{{ console.log(props) }}
        </el-button>
      </template>
    </XMarkdown>
  </div>
</template>

<style module lang="less"></style>
