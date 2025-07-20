<docs>
---
title: trigger-split Command Separator
---

Character used to split mentions. String length must be and can only be 1, default is `' '`.
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';

const senderValue1 = ref('');
const options = ref<MentionOption[]>([
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
]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ to trigger popup"
      :options="options"
      :trigger-strings="['@']"
      trigger-split="、"
      :whole="true"
    >
      <template #trigger-label="{ item }">
        <div style="display: flex; align-items: center">
          <el-avatar :size="24" :src="item.avatar" />
          <span style="margin-left: 6px">{{ item.value }}</span>
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss"></style>
