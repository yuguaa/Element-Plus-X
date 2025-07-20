<docs>
---
title: Basic Usage
---

Simplest integration method.
</docs>

<script setup lang="ts">
const content = ref('hello world !');
</script>

<template>
  <Bubble :content="content" />
</template>
