<docs>
---
title: 异步加载 @成员示例
---

通过 `asyncMatchFun` 属性配置异步匹配函数。 `@` 触发用户标签弹窗。
</docs>

<script setup lang="ts">
import { ref } from 'vue';

const senderRef = ref();

// 异步匹配@人员
async function asyncMatchUser(searchVal: string) {
  console.log(searchVal, '在@之后输入的内容');
  // 模拟调用接口，返回 用户列表
  return [
    { id: '1', name: '张三' },
    { id: '2', name: '李四' }
  ];
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <EditorSender
        ref="senderRef"
        placeholder="@ 符号触发用户选择"
        clearable
        :async-match-fun="asyncMatchUser"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.at-select) {
  cursor: pointer;
  svg {
    display: inline-block;
  }
}
</style>
