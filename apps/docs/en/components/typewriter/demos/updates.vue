<docs>
---
title: 🐵 Support Dynamic Content Updates
---

🐒 When using the `typing` attribute, updating `content` will continue output if it's a subset of the previous content, otherwise it will restart output.
</docs>

<script setup lang="ts">
const content = ref('🥰 Thank you for using Element-Plus-X! Your support is our strongest motivation for open source ~ ');
const num = ref(1);
function setContents() {
  num.value++;
  content.value = content.value.repeat(num.value);
  if (num.value > 3) {
    num.value = 1;
    content.value = '🥰 Thank you for using Element-Plus-X! Your support is our strongest motivation for open source ~ ';
  }
}
</script>

<template>
  <ClientOnly>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <el-button style="width: fit-content;" @click="setContents">
        Set Content
      </el-button>
      <Typewriter typing :content="content" />
    </div>
  </ClientOnly>
</template>
