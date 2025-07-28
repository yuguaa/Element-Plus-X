<docs>
---
title: Prefix Slot
---

Use the `#prefix` slot to customize the input prefix content.
</docs>

<script setup lang="ts">
import { CircleClose, Link } from '@element-plus/icons-vue';

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
  }
  else {
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
      height: 230px;
      justify-content: flex-end;
    "
  >
    <Sender ref="senderRef" v-model="senderValue">
      <template #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">
              💯 Welcome to Element Plus X
            </div>
            <div class="header-right">
              <el-button @click.stop="closeHeader">
                <el-icon><CircleClose /></el-icon>
                <span>Close Header</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">
            🦜 Custom Header Content
          </div>
        </div>
      </template>

      <!-- Custom prefix -->
      <template #prefix>
        <div class="prefix-self-wrap">
          <el-button dark>
            <el-icon><Link /></el-icon>
            <span>Custom Prefix</span>
          </el-button>

          <el-button color="#626aef" :dark="true" @click="openCloseHeader">
            Open/Close Header
          </el-button>
        </div>
      </template>
    </Sender>
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
