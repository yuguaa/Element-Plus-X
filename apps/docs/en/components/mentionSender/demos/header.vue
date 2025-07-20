<docs>
---
title: Header Slot
---

Use the `#header` slot to customize the header content of the input box.

::: info
Control the header container expand/collapse through component instance

- `senderRef.value.openHeader()` Open header container
- `senderRef.value.closeHeader()` Close header container
:::
</docs>

<script setup lang="ts">
import { CircleClose } from '@element-plus/icons-vue';

const senderRef = ref();
const senderValue = ref('');
const showHeaderFlog = ref(false);

onMounted(() => {
  showHeaderFlog.value = true;
  senderRef.value.openHeader();
});

function openCloseHeader() {
  if (!showHeaderFlog.value) {
    senderRef.value.openHeader();
  } else {
    senderRef.value.closeHeader();
  }
  showHeaderFlog.value = !showHeaderFlog.value;
}

function closeHeader() {
  showHeaderFlog.value = false;
  senderRef.value.closeHeader();
}
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 300px;
      justify-content: space-between;
    "
  >
    <el-button style="width: fit-content" @click="openCloseHeader">
      {{ showHeaderFlog ? 'Close Header' : 'Open Header' }}
    </el-button>
    <MentionSender ref="senderRef" v-model="senderValue">
      <template #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 Welcome to use Element Plus X</div>
            <div class="header-right">
              <el-button @click.stop="closeHeader">
                <el-icon><CircleClose /></el-icon>
                <span>Close Header</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">🦜 Custom header content</div>
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style module lang="less">
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
</style>
