<docs>
---
title: solts Various Slots
---

::: info
- Support `#trigger-label` to customize label content, display of each data item
- Support `#trigger-loading` to customize loading state, when `triggerLoading` is true, the loading state will be displayed
- Support `#trigger-header` to customize the content at the top of the dropdown list
- Support `#trigger-footer` to customize the content at the bottom of the dropdown list
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
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ to trigger popup"
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
          This is custom loading state
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
          This is custom dropdown list top content
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
          This is custom dropdown list bottom content
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss"></style>
