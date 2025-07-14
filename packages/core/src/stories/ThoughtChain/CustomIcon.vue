<script setup lang="ts">
import { CircleCloseFilled, Loading, SuccessFilled } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
</script>

<template>
  <ThoughtChain v-bind="$attrs">
    <!-- 自定义 icon 插槽 -->
    <template #icon="{ item }">
      <span v-if="item.status === 'success'" class="slot-success">
        <ElIcon>
          <SuccessFilled />
        </ElIcon>
      </span>
      <span v-if="item.status === 'error'" class="slot-error">
        <ElIcon>
          <CircleCloseFilled />
        </ElIcon>
      </span>
      <span v-if="item.status === 'loading'" class="slot-loading">
        <ElIcon class="is-loading">
          <Loading />
        </ElIcon>
      </span>
    </template>
  </ThoughtChain>
</template>

<style lang="scss" scoped></style>
