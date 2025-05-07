<docs>
---
title: filter-option 过滤筛选
---

通过 `filter-option` 定制筛选器选项逻辑，通过一个方法，返回为`true` 或 `false` 来控制选项的过滤结果，你也可以理解为搜索的过滤逻辑。

类型是 `(pattern: string, option: MentionOption) => boolean`
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender'

const senderValue1 = ref('')
const options = ref<MentionOption[]>([
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
])

function filterFunc(_: string, option: MentionOption): any {
  // 这里打印 option 每次触发指令，会遍历 options 触发 filterFunc。
  if (option.value === 'ageerle' || option.value === 'JsonLee12138') {
    return true
  }
  else if (option.value === 'HeJiaYue520') {
    return false
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="输入 @ 触发指令弹框，此处已经过滤了 HeJiaYue520"
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
