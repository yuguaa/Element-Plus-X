<docs>
---
title: 自定义弹框内容
---

:::tip
  自定义弹框内容，如果你是用简单的弹框，不需要触发回车事件的弹框，可以使用这个方法。
:::
</docs>

<script setup lang="ts">
import type { TriggerEvent } from 'vue-element-plus-x/types/Sender';
import { ElMessage } from 'element-plus';

const senderValue = ref('');
const triggerVisible = ref(false);
function onTrigger(event: TriggerEvent) {
  ElMessage.success('指令被触发了');
  console.log('onTrigger', event);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <Sender
      v-model="senderValue"
      v-model:trigger-popover-visible="triggerVisible"
      placeholder="输入 / 和 @ 触发指令弹框"
      clearable
      :trigger-strings="['/', '@']"
      trigger-popover-width="400px"
      trigger-popover-left="0px"
      :trigger-popover-offset="10"
      trigger-popover-placement="top-start"
      @trigger="onTrigger"
    >
      <template #trigger-popover> 这里存放自定义的内容 </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss"></style>
