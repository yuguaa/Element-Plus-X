<docs>
---
title: select 选择事件
---

当用户选择选项时触发
</docs>

<script setup lang="ts">
import type { MentionOption } from '../types'

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

const filterOptions = ref()

function handleSearch(searchValue: string, prefix: string) {
  console.log('搜索的值', searchValue)
  console.log('弹框触发的 字符前缀', prefix) // 这里可以判断多 指令的情况
  // 当调用出弹框后，每次输入的时候，都会调用这个方法。
  filterOptions.value = options.value.filter((option) => {
    // 这里的 option.value 是 '@' 后面的内容
    // 所以这里需要判断是否包含输入的内容
    if (searchValue) {
      return option.value.includes(searchValue)
    }
    else {
      // 如果没有输入内容，则显示所有选项
      return option
    }
  })
}

function handleSelect(option: MentionOption) {
  console.log('选中的值', option)
  ElMessage.success(`选中的值：${option.value}`)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="输入 @ 触发指令弹框，此处已经过滤了 HeJiaYue520"
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
