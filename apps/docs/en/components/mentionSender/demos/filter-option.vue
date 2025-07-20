<docs>
---
title: filter-option Filter and Search
---

Customize the filter option logic through `filter-option`, using a method that returns `true` or `false` to control the filtering result of options. You can also understand it as the search filtering logic.

Type is `(pattern: string, option: MentionOption) => boolean`
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

function filterFunc(_: string, option: MentionOption): any {
  // Here it prints option, each time the command is triggered, it will traverse options and trigger filterFunc.
  if (option.value === 'ageerle' || option.value === 'JsonLee12138') {
    return true;
  } else if (option.value === 'HeJiaYue520') {
    return false;
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ to trigger popup, HeJiaYue520 has been filtered here"
      :options="options"
      :trigger-strings="['@']"
      trigger-split=","
      :whole="true"
      :filter-option="filterFunc"
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
