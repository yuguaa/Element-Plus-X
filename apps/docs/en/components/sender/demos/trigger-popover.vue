<docs>
---
title: Custom Popover Content
---

:::tip
  Custom popover content, if you're using a simple popover that doesn't need to trigger Enter events, you can use this method.
:::
</docs>

<script setup lang="ts">
import type { TriggerEvent } from 'vue-element-plus-x/types/Sender';
import { ElMessage } from 'element-plus';

const senderValue = ref('');
const triggerVisible = ref(false);
function onTrigger(event: TriggerEvent) {
  ElMessage.success('Directive triggered');
  console.log('onTrigger', event);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <Sender
      v-model="senderValue"
      v-model:trigger-popover-visible="triggerVisible"
      placeholder="Input / and @ to trigger directive popover"
      clearable
      :trigger-strings="['/', '@']"
      trigger-popover-width="400px"
      trigger-popover-left="0px"
      :trigger-popover-offset="10"
      trigger-popover-placement="top-start"
      @trigger="onTrigger"
    >
      <template #trigger-popover> Custom content goes here </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss"></style>
