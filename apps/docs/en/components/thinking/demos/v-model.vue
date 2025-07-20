<docs>
---
title: v-model Property Controlled Component
---

Through the v-model property, we can set the default state.
</docs>

<script setup lang="ts">
const senderValue = ref(true);
</script>

<template>
  <div>
    <Thinking v-model="senderValue" content="Welcome to Element-Plus-X" />
  </div>
</template>

<style module lang="less"></style>
