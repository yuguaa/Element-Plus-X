<div align="center">
  <a href="https://element-plus-x.com">
    <img src="https://cdn.element-plus-x.com/element-plus-x.png" alt="Element-Plus-X" width="180" class="logo" />
  </a>
</div>

<div align="center">

  [![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/HeJiaYue520/Element-Plus-X/blob/main/LICENSE)&emsp;[![GitHub stars](https://img.shields.io/github/stars/HeJiaYue520/Element-Plus-X)](https://github.com/HeJiaYue520/Element-Plus-X)&emsp;[![npm version](https://img.shields.io/npm/v/vue-element-plus-x)](https://www.npmjs.com/package/vue-element-plus-x)&emsp;[![npm](https://img.shields.io/npm/dm/vue-element-plus-x.svg)](https://www.npmjs.com/package/vue-element-plus-x)

</div>

<div align="center">
<img src="https://cdn.element-plus-x.com/demo.webp" calss="element-plus-x-bubble" />&emsp;
</div>

<div align="center">

[English](./English-README.md) | **简体中文**

</div>&emsp;

# 🚀 Element-Plus-X
**开箱即用的企业级 AI 组件库（基于 Vue 3 + Element-Plus）**

## 📢 快速链接
| 资源类型         | <div style="width: 300px;" >链接</div>   |
|------------------|-----------------------------------------------|
| **文档**         | [📖 开发文档](https://element-plus-x.com)       |
| **在线演示**     | [👁️ 在线预览](https://v.element-plus-x.com)                         |
| **代码仓库**     | [🐙 GitHub](https://github.com/HeJiaYue520/Element-Plus-X)           |
| **NPM 包**       | [📦 npm](https://www.npmjs.com/package/vue-element-plus-x)           |
| **问题反馈**     | [🐛 提交 Bug](https://github.com/HeJiaYue520/Element-Plus-X/issues)  |

## 🛠️ 核心特性
- ✨ **企业级 AI 组件**：内置聊天机器人、语音交互等场景化组件
- 🚀 **零配置集成**：基于 Element-Plus 设计体系，开箱即用
- 📦 **按需加载**：提供 Tree Shaking 优化

## 🔎  安装
```bash
# NPM
npm install vue-element-plus-x

# PNPM（推荐）
pnpm install vue-element-plus-x

# Yarn
yarn install vue-element-plus-x

```

## 📚 使用案例

1. **按需引入**

```vue
<script>
import { BubbleList, Sender } from 'vue-element-plus-x'
const list = [
  {
    content: 'Hello, Element Plus X',
    role: 'user',
  },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 230px; justify-content: space-between;">
    <BubbleList :list="list" />
    <Sender />
  </div>
</template>
```

2. **全局引入**

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlusX from 'vue-element-plus-x'
import App from './App.vue'

const app = createApp(App)
// 使用 app.use() 全局引入
app.use(ElementPlusX)
app.mount('#app')
```

## 🌟 已实现组件

| 组件名       | 描述                     | 文档链接               |
| ------------ | ------------------------ | ---------------------- |
| `Typewriter` | 打字动画组件             | [📄 文档](https://element-plus-x.com/components/typewriter/) |
| `Bubble`     | 气泡消息组件             | [📄 文档](https://element-plus-x.com/components/bubble/) |
| `BubbleList` | 气泡消息列表             | [📄 文档](https://element-plus-x.com/components/bubbleList/) |
| `Sender`     | 智能输入框（含语音交互） | [📄 文档](https://element-plus-x.com/components/sender/) |

## 🤝 参与贡献

1. **Fork 仓库** → 2. **创建 Feature 分支** → 3. **提交 Pull Request**

我们欢迎：

- 🐛 Bug 修复
- 💡 新功能提案
- 📝 文档完善
- 🎨 样式优化

## 👥 社区支持
<div align="center">
<img src="https://cdn.element-plus-x.com/vx-2025-3-30.png" alt="微信交流群" width="180" style="margin: 20px;" />
<p>加入微信交流群，获取最新动态和技术支持</p>
</div>
