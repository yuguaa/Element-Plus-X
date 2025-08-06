<docs>
---
title: 操作列表插槽
---

通过 `#action-list` 插槽用于自定义输入框的操作列表内容。可以和 组件Ref实例的 `getCurrentValue` 方法结合使用，获取当前输入框的值。

::: warning
`1.0.81 版本`前，在自定义插槽的时候，会牺牲内置的操作按钮。我们在 `1.0.81 版本` 推出了流式请求的 hooks，可以让用户更好的控制流式请求，从而更好的自己定义 `#action-list` 插槽。详情请查看我们的项目模版中主推的一个请求库，对标 Axios [hook-fetch](https://www.npmjs.com/package/hook-fetch)。

此温馨提示更新时间：`2025-08-06`
:::

::: info
当你使用 `#action-list` 插槽时，会隐藏内置的输入框的操作按钮。你可以通过和 `组件实例方法` 相结合，实现更丰富的操作。
:::
</docs>

<script setup lang="ts">
import { Loading, Position } from '@element-plus/icons-vue';

const senderRef = ref();
const loading = ref(false);

function handleSubmit() {
  // 获取当前输入框的内容
  const senderValue = senderRef.value.getCurrentValue();
  console.log('senderValue', senderValue);
  if (!senderValue.text) {
    ElMessage.warning('请输入内容');
    return;
  }
  loading.value = true;
}

function handleCancel() {
  console.log('cancel');
  loading.value = false;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <EditorSender ref="senderRef">
      <!-- 自定义操作列表 -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button
            v-if="loading"
            type="primary"
            plain
            circle
            @click="handleCancel"
          >
            <el-icon class="is-loaidng">
              <Loading />
            </el-icon>
          </el-button>

          <el-button v-else plain circle @click="handleSubmit">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>
      </template>
    </EditorSender>
  </div>
</template>

<style scoped lang="less">
.action-list-self-wrap {
  display: flex;
  align-items: center;
  & > span {
    width: 120px;
    font-weight: 600;
    color: var(--el-color-primary);
  }
}

.is-loaidng {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
