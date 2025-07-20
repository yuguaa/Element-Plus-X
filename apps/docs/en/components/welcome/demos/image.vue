<docs>
---
title: image Slot
---

Conveniently replace with custom images
</docs>

<script setup lang="ts">
const bgColor =
  'linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Welcome
      variant="borderless"
      :style="{ background: bgColor }"
      title="Welcome to Element Plus X 💖"
      description="A Vue 3 recreation of ant-design-x. Later will integrate AI workflow orchestration components and md multi-functional rendering components, providing the Vue development community with a useful AI component library"
    >
      <template #image>
        <img src="https://element-plus-x.com/logo.png" style="width: 80px" />
      </template>
    </Welcome>
  </div>
</template>

<style module lang="less"></style>
