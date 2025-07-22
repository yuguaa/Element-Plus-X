<docs>
---
title: Various Slots
---

::: info
- Supports `#trigger-label` for customizing the label content, i.e., how each data item is displayed
- Supports `#trigger-loading` for customizing the loading state, which is shown when `triggerLoading` is true
- Supports `#trigger-header` for customizing the content at the top of the dropdown list
- Supports `#trigger-footer` for customizing the content at the bottom of the dropdown list
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
    <MentionSender
      ref="senderRef"
      v-model="senderValue1"
      placeholder="Type @ to trigger the command popover"
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
          This is a custom loading state
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
          This is my custom dropdown header content. You can also add custom key controls for the popover. Try controlling the directions with the w/a/s/d keys.
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
          This is custom dropdown footer content
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss"></style>
