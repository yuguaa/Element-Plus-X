<docs>
---
title: solts 各种插槽
---

::: info
- 支持 `#trigger-label` 自定义 标签内容，每条数据的展示
- 支持 `#trigger-loading` 自定义 加载中状态，当 `triggerLoading` 为 true 时，会显示加载中状态
- 支持 `#trigger-header` 自定义 下拉列表顶部的内容
- 支持 `#trigger-footer` 自定义 下拉列表底部的内容
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
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';
import { Loading } from '@element-plus/icons-vue';
import { MentionSender } from 'vue-element-plus-x';

const senderValue1 = ref('');
const options = ref<MentionOption[]>();
const triggerLoading = ref(false);
const senderRef = ref<InstanceType<typeof MentionSender>>();

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

function handleSearch() {
  triggerLoading.value = true;
  setTimeout(() => {
    options.value = [
      {
        value: 'HeJiaYue520',
        avatar: 'https://avatars.githubusercontent.com/u/76239030'
      },
      {
        value: 'JsonLee12138',
        avatar: 'https://avatars.githubusercontent.com/u/160690954'
      },
      {
        value: 'ageerle',
        avatar: 'https://avatars.githubusercontent.com/u/32251822'
      }
    ];
    triggerLoading.value = false;
  }, 1500);
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
    <MentionSender
      ref="senderRef"
      v-model="senderValue1"
      placeholder="输入 @ 触发指令弹框"
      :options="options"
      :trigger-strings="['@']"
      :whole="true"
      :trigger-loading="triggerLoading"
      @search="handleSearch"
    >
      <template #trigger-label="{ item }">
        <div style="display: flex; align-items: center">
          <el-avatar :size="24" :src="item.avatar" />
          <span style="margin-left: 6px">{{ item.value }}</span>
        </div>
      </template>

      <template #trigger-loading>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 24px;
            gap: 12px;
          "
        >
          这是自定义加载中状态
          <el-icon
            class="is-loading"
            style="color: cornflowerblue; font-size: 20px"
          >
            <Loading />
          </el-icon>
        </div>
      </template>

      <template #trigger-header>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 8px;
          "
        >
          这是我自定义下拉列表头部的内容，你还可以对弹框做一些按键控制的自定义操作。请尝试控制方向
          w/a/s/d 这几个按键。
        </div>
      </template>

      <template #trigger-footer>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 8px;
          "
        >
          这是自定义下拉列表底部的内容
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss"></style>
