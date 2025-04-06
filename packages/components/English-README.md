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

 **English** | [简体中文](./README.md)

</div>&emsp;

# 🚀 Element-Plus-X
**An out-of-the-box enterprise-level AI component library (based on Vue 3 + Element-Plus)**

## 📢 Quick Links
| Resource Type         | <div style="width: 300px;">Link</div>    |
|-----------------------|-----------------------------------------------|
| **Documentation**     | [📖 Development Documentation](https://element-plus-x.com)  |
| **Online Demo**       | [👁️ Online Preview](https://v.element-plus-x.com)                         |
| **Code Repository**   | [🐙 GitHub](https://github.com/HeJiaYue520/Element-Plus-X)           |
| **NPM Package**       | [📦 npm](https://www.npmjs.com/package/vue-element-plus-x)           |
| **Issue Feedback**    | [🐛 Submit a Bug](https://github.com/HeJiaYue520/Element-Plus-X/issues)  |

## 🛠️ Core Features
- ✨ **Enterprise-level AI Components**: Pre-built scenario-based components such as chatbots and voice interaction.
- 🚀 **Zero-configuration Integration**: Based on the Element-Plus design system, ready to use right out of the box.
- 📦 **On-demand Loading**: Provides Tree Shaking optimization.

## 🔎 Installation
```bash
# NPM
npm install vue-element-plus-x

# PNPM (Recommended)
pnpm install vue-element-plus-x

# Yarn
yarn install vue-element-plus-x

```

## 📚 Usage Examples

1. **On-demand Import**

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

2. **Global Import**

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlusX from 'vue-element-plus-x'
import App from './App.vue'

const app = createApp(App)
// Globally import using app.use()
app.use(ElementPlusX)
app.mount('#app')
```

## 🌟 Implemented Components

| Component Name | Description | Documentation Link |
|----------------|-------------|--------------------|
| `Typewriter` | Typewriter animation component | [📄 Documentation](https://element-plus-x.com/components/typewriter/) |
| `Bubble` | Bubble message component | [📄 Documentation](https://element-plus-x.com/components/bubble/) |
| `BubbleList` | Bubble message list | [📄 Documentation](https://element-plus-x.com/components/bubbleList/) |
| `Sender` | Intelligent input box (with voice interaction) | [📄 Documentation](https://element-plus-x.com/components/sender/) |

## 🤝 Contribute

1. **Fork the repository** → 2. **Create a Feature branch** → 3. **Submit a Pull Request**

We welcome:

- 🐛 Bug fixes
- 💡 Proposals for new features
- 📝 Documentation improvements
- 🎨 Style optimizations

## 👥 Community Support
<div align="center">
<img src="https://cdn.element-plus-x.com/vx-2025-3-30.png" alt="WeChat communication group" width="180" style="margin: 20px;" />
<p>Join the WeChat communication group to get the latest news and technical support</p>
</div>
