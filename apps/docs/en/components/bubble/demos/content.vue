<docs>
---
title: Basic Usage
---

The most basic integration method.
</docs>

<script setup lang="ts">
const content = ref('hello world !');
</script>

<template>
  <Bubble :content="content" />
</template>
