<script lang="ts" setup>
import type { MentionOption } from '@components/MentionSender/types';
import { ElMessage } from 'element-plus';
import { MentionSender } from '../../components';

function handleSubmit(value: string) {
  ElMessage.success(`点击了Submit ${value}`);
}
function handleCancel() {
  ElMessage.success(`点击了Cancel`);
}

function handleSearch(pattern: string, prefix: string) {
  ElMessage.success(`handleSearch ${pattern}, ${prefix}`);
}

function handleSelect(option: MentionOption, prefix: string) {
  ElMessage.success(`handleSelect  ${JSON.stringify(option)}, ${prefix}`);
}
function handleRecordingChange() {
  ElMessage.success(`RecordingChange`);
}
</script>

<template>
  <div class="sender-wrapper">
    <MentionSender
      v-bind="$attrs"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @search="handleSearch"
      @select="handleSelect"
      @recording-change="handleRecordingChange"
    />
  </div>
</template>

<style scoped>
.sender-wrapper {
  width: 100%;
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
