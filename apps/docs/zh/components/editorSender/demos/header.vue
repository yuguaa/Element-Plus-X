<docs>
---
title: 头部插槽
---

通过 `#header` 插槽用于自定义输入框的头部内容。还可以通过 `headerAnimationTimer` 属性设置头部动画时间。
</docs>

<script setup lang="ts">
import { CircleClose } from '@element-plus/icons-vue';

const senderRef = ref();
const showHeaderFlog = ref(false);

onMounted(() => {
  showHeaderFlog.value = true;
});

function openCloseHeader() {
  showHeaderFlog.value = !showHeaderFlog.value;
}

function closeHeader() {
  showHeaderFlog.value = false;
}
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 230px;
      justify-content: flex-end;
    "
  >
    <EditorSender ref="senderRef" :header-animation-timer="500">
      <template v-if="showHeaderFlog" #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 欢迎使用 Element Plus X</div>
            <div class="header-right">
              <el-button @click.stop="closeHeader">
                <el-icon><CircleClose /></el-icon>
                <span>关闭头部</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">🦜 自定义头部内容</div>
        </div>
      </template>

      <!-- 自定义前缀 -->
      <template #prefix>
        <div class="prefix-self-wrap">
          <el-button color="#626aef" :dark="true" @click="openCloseHeader">
            打开/关闭头部
          </el-button>
        </div>
      </template>
    </EditorSender>
  </div>
</template>

<style scoped lang="less">
.header-self-wrap {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 200px;
  .header-self-title {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
  }
  .header-self-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #626aef;
    font-weight: 600;
  }
}

.prefix-self-wrap {
  display: flex;
}
</style>
