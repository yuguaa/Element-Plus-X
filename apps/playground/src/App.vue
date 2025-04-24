<script setup lang="ts">
import UseBubble from './components/BubbleDemo.vue'
import UseBubbleList from './components/BubbleListDemo.vue'
import UseMentionSender from './components/MentionSenderDemo.vue'
import UseSender from './components/SenderDemo.vue'
import UseThinking from './components/ThinkingDemo.vue'
import UseThoughtChain from './components/ThoughtChainDemo.vue'
import UseRecord from './components/useRecordDemo.vue'
import UseSend from './components/useSendDemo.vue'
import useXStreamSIP from './components/useXStreamSIPDemo.vue'
import useXStreamSSE from './components/useXStreamSSEDemo.vue'
import UseWelcome from './components/WelcomeDemo.vue'
</script>

<template>
  <div id="app">
    <el-alert
      title="💖 欢迎使用 Element-Plus-X"
      type="success"
      closable
    >
      <p class="self-description">
        详情可移步使用文档：👉 <a href="https://element-plus-x.com">element-plus-x.com</a>
      </p>
    </el-alert>

    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="Bubble">
        <UseBubble />
      </el-tab-pane>

      <el-tab-pane label="BubbleList">
        <UseBubbleList />
      </el-tab-pane>

      <el-tab-pane label="Sender">
        <UseSender />
      </el-tab-pane>

      <el-tab-pane label="MentionSender">
        <UseMentionSender />
      </el-tab-pane>

      <el-tab-pane label="Welcome">
        <UseWelcome />
      </el-tab-pane>

      <el-tab-pane label="Thinking">
        <UseThinking />
      </el-tab-pane>

      <el-tab-pane label="ThoughtChain">
        <UseThoughtChain />
      </el-tab-pane>

      <el-tab-pane label="UseRecord">
        <UseRecord />
      </el-tab-pane>

      <el-tab-pane label="UseSend">
        <UseSend />
      </el-tab-pane>

      <el-tab-pane label="useXStream-SSE">
        <useXStreamSSE />
      </el-tab-pane>

      <el-tab-pane label="useXStream-SIP">
        <useXStreamSIP />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-tabs {
  min-height: calc(100vh - 64px - 64px);
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
