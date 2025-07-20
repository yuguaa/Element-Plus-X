<docs>
---
title: Directive
---

Input box with built-in directive popup for convenient directive operations

::: info
- Through the `triggerStrings` property, set the directive trigger characters, type is a character array ['/', '@']
- Through v-model binding `triggerPopoverVisible` property, control whether the directive popup is visible

`v-model:trigger-popover-visible="triggerVisible"`
- Through the `triggerPopoverWidth` property, set the directive popup width, default `'fit-content'`
- Through the `triggerPopoverLeft` property, set the directive popup distance from the left, default `'0px'`
- Through the `triggerPopoverOffset` property, set the distance between the directive popup and input box, default `8`
- Through the `triggerPopoverPlacement` property, set the directive popup position, same as el-popover's placement property, default `'top-start'`

Values `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'` | `'right'` | `'right-start'` | `'right-end'`

- `@trigger` Set the callback method when the directive popup display/hide changes
:::

::: tip
- `@trigger` When you want to do something when the directive is triggered, but don't want the built-in popup style, you can not use v-model:trigger-popover-visible="triggerVisible", so the **built-in popup** won't appear
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
      placeholder="Input / and @ to trigger directive popup"
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
      placeholder="Input XXX and QQ to trigger directive popup, here not using v-model:trigger-popover-visible binding, can also trigger @trigger event, please check the trigger event in console"
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
      title="💖 Welcome to use Element-Plus-X"
      width="500"
    >
      <span
        >The trigger event has been executed, can be opening popup, opening
        drawer, any event you need ~</span
      >
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
