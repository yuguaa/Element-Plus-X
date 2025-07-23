<docs>
---
title: Directive
---

Input box with built-in directive popover for convenient directive operations

::: info
- Set directive trigger characters through the `triggerStrings` property, type is a character array ['/', '@']
- Control whether the directive popover is visible through v-model binding `triggerPopoverVisible` property

`v-model:trigger-popover-visible="triggerVisible"`
- Set directive popover width through `triggerPopoverWidth` property, default `'fit-content'`
- Set directive popover distance from left through `triggerPopoverLeft` property, default `'0px'`
- Set distance between directive popover and input through `triggerPopoverOffset` property, default `8`
- Set directive popover position through `triggerPopoverPlacement` property, same as el-popover's placement property, default `'top-start'`

Values `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'` | `'right'` | `'right-start'` | `'right-end'`

- `@trigger` Set callback method for directive popover show/hide changes
:::

::: tip
- `@trigger` When you want to do something when a directive is triggered but don't want the built-in popover style, you can not use v-model:trigger-popover-visible="triggerVisible", so the **built-in popover** won't appear
:::
</docs>

<script setup lang="ts">
import type { TriggerEvent } from 'vue-element-plus-x/types/Sender';

const senderValue = ref('');
const senderValue1 = ref('');
const triggerVisible = ref(false);
const dialogVisible = ref(false);
function onTrigger(event: TriggerEvent) {
  console.log('onTrigger', event);
}

function onTrigger1(event: TriggerEvent) {
  console.log('onTrigger1', event);
  dialogVisible.value = event.isOpen;
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
    />

    <Sender
      v-model="senderValue1"
      placeholder="Input XXX and QQ to trigger directive popover. Here we don't use v-model:trigger-popover-visible binding, but can still trigger @trigger event. Please check the console for trigger events"
      clearable
      :trigger-strings="['XXX', 'QQ']"
      trigger-popover-width="400px"
      trigger-popover-left="0px"
      :trigger-popover-offset="30"
      trigger-popover-placement="top-start"
      @trigger="onTrigger1"
    />

    <el-dialog
      v-model="dialogVisible"
      title="💖 Welcome to Element-Plus-X"
      width="500"
    >
      <span
        >Trigger event has been executed, can be opening popover, opening
        drawer, any event you need ~</span
      >
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
