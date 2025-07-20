<docs>
---
title: solts Various Slots
---

::: info
- Supports `#trigger-label` custom label content, display for each data item
- Supports `#trigger-loading` custom loading state, when `triggerLoading` is true, the loading state will be displayed
- Supports `#trigger-header` custom dropdown list top content
- Supports `#trigger-footer` custom dropdown list bottom content
:::
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';
import { Loading } from '@element-plus/icons-vue';

const senderValue1 = ref('');
const options = ref<MentionOption[]>();
const triggerLoading = ref(false);

function handleSearch() {
  triggerLoading.value = true;
  setTimeout(() => {
    options.value = [
      {
        value: 'HeJiaYue520',
        avatar: 'https://avatars.githubusercontent.com/u/76239030',
      },
      {
        value: 'JsonLee12138',
        avatar: 'https://avatars.githubusercontent.com/u/160690954',
      },
      {
        value: 'ageerle',
        avatar: 'https://avatars.githubusercontent.com/u/32251822',
      },
    ];
    triggerLoading.value = false;
  }, 1500);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ to trigger directive popover"
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
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 24px; gap: 12px;">
          This is custom loading state
          <el-icon class="is-loading" style="color: cornflowerblue; font-size: 20px;">
            <Loading />
          </el-icon>
        </div>
      </template>

      <template #trigger-header>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 8px;">
          This is custom dropdown list top content
        </div>
      </template>

      <template #trigger-footer>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 8px;">
          This is custom dropdown list bottom content
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss">
</style>
