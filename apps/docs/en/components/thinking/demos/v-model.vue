<docs>
---
title: v-model Attribute Controlled Component
---

Through the v-model attribute, we can set the default state.
</docs>

<script setup lang="ts">
const senderValue = ref(true);
</script>

<template>
  <div>
    <Thinking v-model="senderValue" content="Welcome to Element-Plus-X" />
  </div>
</template>

<style scoped lang="less"></style>
