<docs>
---
title: 设备类型
---

使用 `device` 属性，设置设备类型，默认是 `pc`

::: warning
传入 `h5` 时，弹出选择功能的交互，需要注意参考自定义弹出选择功能实现交互
:::
</docs>

<script setup lang="ts">
import type { UserInfo } from 'vue-element-plus-x/types/EditorSender';
import { EditorSender } from 'vue-element-plus-x';

const senderRef = ref<InstanceType<typeof EditorSender>>();

const userList = ref([
  {
    id: '5',
    name: '张三丰'
  },
  {
    id: '1',
    name: '张三'
  },
  {
    id: '2',
    name: '李四'
  },
  {
    id: '3',
    name: '王五'
  },
  {
    id: '4',
    name: '马六'
  }
]);
const dialogUserVisible = ref(false);
function showAtDialog() {
  dialogUserVisible.value = true;
}
function checkUser(user: UserInfo) {
  senderRef.value?.customSetUser(user);
  dialogUserVisible.value = false;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <EditorSender
      ref="senderRef"
      placeholder="这里是自定义弹窗，你可以 在 h5 环境中，试着输入@触发人员选择弹窗"
      :custom-style="{ maxHeight: '240px' }"
      :custom-dialog="true"
      :user-list="userList"
      @show-at-dialog="showAtDialog"
    />

    <el-dialog
      v-model="dialogUserVisible"
      title="自定义人员选择弹窗"
      width="500"
    >
      <p v-for="user of userList" :key="user.id" @click="checkUser(user)">
        {{ user.name }}
      </p>
    </el-dialog>
  </div>
</template>
