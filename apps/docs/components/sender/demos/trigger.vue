<docs>
---
title: 指令
---

输入框，内置指令弹框，方便调用指令操作

::: info
- 通过 `triggerStrings` 属性，设置 指令触发字符，类型一个 字符数组 ['/', '@']
- 通过 v-model 绑定 `triggerPopoverVisible` 属性，控制指令弹框是否可见

`v-model:trigger-popover-visible="triggerVisible"`
- 通过 `triggerPopoverWidth` 属性，设置指令弹框宽度 默认 `'fit-content'`
- 通过 `triggerPopoverLeft` 属性，设置指令弹框距离左侧距离 默认 `'0px'`
- 通过 `triggerPopoverOffset` 属性，设置指令弹框和输入框的距离 默认 `8`
- 通过 `triggerPopoverPlacement` 属性，设置指令弹框弹出位置 同 el-popover 的 placement 属性一致，默认 `'top-start'`

取值 `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'` | `'right'` | `'right-start'` | `'right-end'`

- `@trigger` 设置指令弹框显示隐藏发生改变的回调方法
:::

::: tip
- `@trigger` 当你要在指令被触发的时候做某些事，但是不想要内置的弹框样式时，可以不用 v-model:trigger-popover-visible="triggerVisible"，这样 **内置弹框** 就不会出现
:::
</docs>

<script setup lang="ts">
import type { TriggerEvent } from '../types'

const senderValue = ref('')
const senderValue1 = ref('')
const triggerVisible = ref(false)
const dialogVisible = ref(false)
function onTrigger(event: TriggerEvent) {
  console.log('onTrigger', event)
}

function onTrigger1(event: TriggerEvent) {
  console.log('onTrigger1', event)
  dialogVisible.value = event.isOpen
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
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
    />

    <Sender
      v-model="senderValue1"
      placeholder="输入 XXX 和 QQ 触发指令弹框 在这里不使用 v-model:trigger-popover-visible 绑定，也可以触发 @trigger 事件 请在控制台查看触发事件"
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
      title="💖 欢迎使用 Element-Plus-X"
      width="500"
    >
      <span>触发事件已经执行，可以是打开弹框、打开抽屉、任何你需要的事件 ~</span>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
</style>
