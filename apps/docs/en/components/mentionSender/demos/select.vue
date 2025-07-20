<docs>
---
title: select Select Event
---

Triggered when user selects an option
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

const filterOptions = ref();

function handleSearch(searchValue: string, prefix: string) {
  console.log('Search value', searchValue);
  console.log('Popup trigger character prefix', prefix); // Here you can judge multiple command situations
  // After the popup is called, every time you input, this method will be called.
  filterOptions.value = options.value.filter(option => {
    // Here option.value is the content after '@'
    // So here we need to judge whether it contains the input content
    if (searchValue) {
      return option.value.includes(searchValue);
    } else {
      // If there is no input content, show all options
      return option;
    }
  });
}

function handleSelect(option: MentionOption) {
  console.log('Selected value', option);
  ElMessage.success(`Selected value: ${option.value}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ to trigger popup, HeJiaYue520 has been filtered here"
      :options="filterOptions"
      :trigger-strings="['@']"
      trigger-split=","
      :whole="true"
      @search="handleSearch"
      @select="handleSelect"
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
