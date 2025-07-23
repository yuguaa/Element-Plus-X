<docs>
---
title: 自定义弹框内容
---
:::tip
  自定义弹框内容，如果你只是简单匹配开头某个字符，可以这个组件。
:::

:::warning
  💌 温馨提示：V1.3.1 开始，组件 ref 可以获取弹框打开状态属性 `popoverVisible`，和弹框内置输入框的实例 `inputInstance`。

  意味着：
  1. 可以通过弹框的是否打开装填进行一些判断处理。
  2. 弹框将可以支持更丰富的自定义事件。

  该温馨提示时间 2025-07-21
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
  ElMessage.success('指令被触发了');
  console.log('onTrigger', event);
}

function handleWindowKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'w':
      ElMessage.success(`w 被按下，输入框不受影响`);
      console.log('w 被按下');
      break;
    case 'a':
      ElMessage.success(`a 被按下，输入框不受影响`);
      console.log('a 被按下');
      break;
    case 's':
      ElMessage.success(`s 被按下，输入框不受影响`);
      console.log('s 被按下');
      break;
    case 'd':
      ElMessage.success(`d 被按下，输入框不受影响`);
      console.log('d 被按下');
      break;
  }
}

// 当弹框显示时，阻止输入框的部分按键事件，避免和提及弹框的全局自定义键盘事件冲突
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
      placeholder="输入 / 和 @ 触发指令弹框"
      clearable
      :trigger-strings="['/', '@']"
      trigger-popover-width="400px"
      trigger-popover-left="0px"
      :trigger-popover-offset="10"
      trigger-popover-placement="top-start"
      @trigger="onTrigger"
    >
      <!-- 自定义 提及弹框 -->
      <template #trigger-popover="{ triggerString }">
        当前触发的字符为：{{ `${triggerString}` }}
        这是我自定义的弹框，在这里你可以自定义弹框内容。包括对弹框做一些按键控制的自定义操作。请尝试控制方向
        w/a/s/d 这几个按键。
      </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss"></style>
