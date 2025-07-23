<docs>
---
title: Basic Usage
---

Quickly create a welcome card
</docs>

<script setup lang="ts"></script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Welcome title="Welcome to Element Plus X 🦋" />

    <Welcome
      title="Welcome to Element Plus X 💖"
      description="This is description information ~"
    />

    <Welcome
      icon="https://camo.githubusercontent.com/4ea7fdaabf101c16965c0bd3ead816c9d7726a59b06f0800eb7c9a30212d5a6a/68747470733a2f2f63646e2e656c656d656e742d706c75732d782e636f6d2f656c656d656e742d706c75732d782e706e67"
      title="Welcome to Element Plus X 💖"
      description="This is description information ~"
    />

    <Welcome
      icon="https://camo.githubusercontent.com/4ea7fdaabf101c16965c0bd3ead816c9d7726a59b06f0800eb7c9a30212d5a6a/68747470733a2f2f63646e2e656c656d656e742d706c75732d782e636f6d2f656c656d656e742d706c75732d782e706e67"
      title="Welcome to Element Plus X 💖"
      extra="Subtitle"
      description="This is description information ~"
    />
  </div>
</template>

<style scoped lang="less"></style>
