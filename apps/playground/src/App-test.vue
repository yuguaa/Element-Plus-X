<script setup lang="ts">
import SenderDemo from './components/SenderDemo.vue'
import EditorInputDemo from './components/Test-EditorInputDemo.vue'
import EditorSenderDemo from './components/Test-EditorSenderDemo.vue'
</script>

<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="EditorInputDemo">
      <EditorInputDemo />
    </el-tab-pane>
    <el-tab-pane label="SenderDemo">
      <SenderDemo />
    </el-tab-pane>
    <el-tab-pane label="EditorSenderDemo">
      <EditorSenderDemo />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-tabs {
  min-height: calc(100vh - 64px);
  background-color: beige;
}

.self-description {
  font-size: 14px;

  a {
    text-emphasis: none;
    color: coral;
    font-weight: 700;
  }
}
</style>
