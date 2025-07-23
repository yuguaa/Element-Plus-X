<docs>
---
title: Custom Popover Content
---
:::tip
  Custom popover content. If you only need to match the beginning of a certain character, you can use this component.
:::

:::warning
  💌 Friendly Reminder: Since V1.3.1, the component ref can access the popover open state property `popoverVisible` and the built-in input instance `inputInstance`.

  This means:
  1. You can perform some logic based on whether the popover is open.
  2. The popover can support richer custom events.

  This reminder date: 2025-07-21
:::
</docs>

<script setup lang="ts">
import type { TriggerEvent } from 'vue-element-plus-x/types/Sender';
import { ElMessage } from 'element-plus';
import { Sender } from 'vue-element-plus-x';

const senderValue = ref('');
const triggerVisible = ref(false);
const senderRef = ref<InstanceType<typeof Sender>>();

onMounted(() => {
  window.addEventListener('keydown', handleWindowKeydown);
  senderRef.value?.inputInstance.addEventListener(
    'keydown',
    handleInputKeydown
  );
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleWindowKeydown);
  senderRef.value?.inputInstance.removeEventListener(
    'keydown',
    handleInputKeydown
  );
});
function onTrigger(event: TriggerEvent) {
  ElMessage.success('Command triggered');
  console.log('onTrigger', event);
}

function handleWindowKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'w':
      ElMessage.success(`w pressed, input is not affected`);
      console.log('w pressed');
      break;
    case 'a':
      ElMessage.success(`a pressed, input is not affected`);
      console.log('a pressed');
      break;
    case 's':
      ElMessage.success(`s pressed, input is not affected`);
      console.log('s pressed');
      break;
    case 'd':
      ElMessage.success(`d pressed, input is not affected`);
      console.log('d pressed');
      break;
  }
}

// When the popover is visible, prevent some key events in the input to avoid conflicts with global custom keyboard events for the mention popover
function handleInputKeydown(e: KeyboardEvent) {
  if (['w', 'a', 's', 'd'].includes(e.key)) {
    e.preventDefault();
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <Sender
      ref="senderRef"
      v-model="senderValue"
      v-model:trigger-popover-visible="triggerVisible"
      placeholder="Type / or @ to trigger the command popover"
      clearable
      :trigger-strings="['/', '@']"
      trigger-popover-width="400px"
      trigger-popover-left="0px"
      :trigger-popover-offset="10"
      trigger-popover-placement="top-start"
      @trigger="onTrigger"
    >
      <!-- Custom mention popover -->
      <template #trigger-popover="{ triggerString }">
        The current trigger character is: {{ `${triggerString}` }}
        This is my custom popover. Here you can customize the popover content,
        including custom key controls for the popover. Try controlling the
        directions with the w/a/s/d keys.
      </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss"></style>
