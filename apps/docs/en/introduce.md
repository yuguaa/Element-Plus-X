<div align="center">
  <a href="https://element-plus-x.com">
    <img src="https://cdn.element-plus-x.com/element-plus-x.png" alt="Element-Plus-X" width="180" class="logo" />
  </a>
</div>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/HeJiaYue520/Element-Plus-X/blob/main/LICENSE)&emsp;[![GitHub stars](https://img.shields.io/github/stars/HeJiaYue520/Element-Plus-X)](https://github.com/HeJiaYue520/Element-Plus-X)&emsp;[![npm version](https://img.shields.io/npm/v/vue-element-plus-x)](https://www.npmjs.com/package/vue-element-plus-x)&emsp;[![npm](https://img.shields.io/npm/dm/vue-element-plus-x.svg)](https://www.npmjs.com/package/vue-element-plus-x)

</div>

<div align="center">
<h2>💖 Project Template Now Available 💖</h2>
<img src="https://cdn.element-plus-x.com/chat/1.webp" />&emsp;
<img src="https://cdn.element-plus-x.com/demo.webp" calss="element-plus-x-bubble" />&emsp;
<img src="https://cdn.element-plus-x.com/demo1.webp" calss="element-plus-x-bubble" />&emsp;
<img src="https://cdn.element-plus-x.com/demo3.webp" calss="element-plus-x-bubble" />&emsp;
<img src="https://cdn.element-plus-x.com/demo4.webp" calss="element-plus-x-bubble" />&emsp;
</div>

# 🚀 Element-Plus-X

**Enterprise-grade AI Component Library Ready to Use (Based on Vue 3 + Element-Plus)**

## 📢 Quick Links

| Resource Type        | <div style="width: 300px;" >Links</div>                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Documentation**    | [📖 Development Docs](https://element-plus-x.com)                                                                          |
| **Online Demo**      | [👁️ Live Preview](https://v.element-plus-x.com)                                                                            |
| **Repository**       | [🐙 GitHub](https://github.com/element-plus-x/Element-Plus-X) <br> [🚠 Gitee](https://gitee.com/he-jiayue/element-plus-x)  |
| **NPM Package**      | [📦 npm](https://www.npmjs.com/package/vue-element-plus-x)                                                                 |
| **Bug Reports**      | [🐛 Submit Bug](https://github.com/element-plus-x/Element-Plus-X/issues)                                                   |
| **Discussion**       | [🐒 Community](https://github.com/element-plus-x/Element-Plus-X?tab=readme-ov-file#-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81)  |
| **Template Preview** | [👀 Live Preview](https://chat.element-plus-x.com/)                                                                        |
| **Template Source**  | [🐙 GitHub](https://github.com/HeJiaYue520/ruoyi-element-ai) <br> [🚠 Gitee](https://gitee.com/he-jiayue/ruoyi-element-ai) |

## 🛠️ Core Features

- ✨ **Enterprise AI Components**: Built-in chatbot, voice interaction, and scenario-based components
- 🚀 **Zero-config Integration**: Based on Element-Plus design system, ready to use out of the box
- 📦 **On-demand Loading**: Provides Tree Shaking optimization

## 📦 Installation

::: code-group

```sh [npm]
npm install vue-element-plus-x --save
```

```sh [pnpm]
pnpm add vue-element-plus-x --save
```

```sh [yarn]
yarn add vue-element-plus-x --save
```

:::

## 📚 Usage Examples

1. **On-demand Import**

```vue
<script>
import { BubbleList, Sender } from 'vue-element-plus-x';

const list = [
  {
    content: 'Hello, Element Plus X',
    role: 'user'
  }
];
</script>

<template>
  <div
    style="display: flex; flex-direction: column; height: 230px; justify-content: space-between;"
  >
    <BubbleList :list="list" />
    <Sender />
  </div>
</template>
```

2. **Global Import**

```ts
// main.ts
import { createApp } from 'vue';
import ElementPlusX from 'vue-element-plus-x';
import App from './App.vue';

const app = createApp(App);
// Use app.use() for global import
app.use(ElementPlusX);
app.mount('#app');
```

3. **CDN Import**

```html
<!-- This method needs testing -->
<!-- CDN Import -->
<script src="https://unpkg.com/vue-element-plus-x@1.0.81/dist/umd/index.js"></script>
```

## 🌟 Implemented Components and Hooks

| Component Name       | Description                                                           | Documentation Link                                              |
| -------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Typewriter`         | Typing animation component                                            | [📄 Docs](https://element-plus-x.com/components/typewriter/)    |
| `Bubble`             | Bubble message component (Extended)                                   | [📄 Docs](https://element-plus-x.com/components/bubble/)        |
| `BubbleList`         | Bubble message list (Extended)                                        | [📄 Docs](https://element-plus-x.com/components/bubbleList/)    |
| `Conversations`      | Conversation management component (Extended)                          | [📄 Docs](https://element-plus-x.com/components/conversations/) |
| `Welcome`            | Welcome component                                                     | [📄 Docs](https://element-plus-x.com/components/welcome/)       |
| `Prompts`            | Prompt collection component                                           | [📄 Docs](https://element-plus-x.com/components/prompts/)       |
| `FilesCard`          | File card component                                                   | [📄 Docs](https://element-plus-x.com/components/filesCard/)     |
| `Attachments`        | File upload component                                                 | [📄 Docs](https://element-plus-x.com/components/attachments/)   |
| `Sender`             | Smart input box (with voice interaction, built-in command operations) | [📄 Docs](https://element-plus-x.com/components/sender/)        |
| `MentionSender`      | Command input box (mention list)                                      | [📄 Docs](https://element-plus-x.com/components/mentionSender/) |
| `Thinking`           | Thinking component (Extended)                                         | [📄 Docs](https://element-plus-x.com/components/thinking/)      |
| `ThoughtChain`       | Thought chain component                                               | [📄 Docs](https://element-plus-x.com/components/thoughtChain/)  |
| `useRecord`          | Browser built-in speech recognition API Hooks                         | [📄 Docs](https://element-plus-x.com/components/useRecord/)     |
| `useXStream`         | Streaming mode interface Hooks                                        | [📄 Docs](https://element-plus-x.com/components/useXStream/)    |
| `useSend & XRequest` | Streaming mode hooks split (Extended)                                 | [📄 Docs](https://element-plus-x.com/components/useSend/)       |

## 🎯 Development Roadmap (Weekly Updates)

🎀 We collect issues and requirements from various sources including GitHub issues and community discussions to develop short-term and long-term development plans. For details, please visit 👉 **[Development Roadmap](https://element-plus-x.com/roadmap.html)**

## 🤝 Contributing

1. **Fork Repository** → 2. **Create Feature Branch** → 3. **Submit Pull Request**

For details, please visit 👉 **[Development Guide](https://element-plus-x.com/guide/develop.html)**

We welcome:

- 🐛 Bug fixes
- 💡 New feature proposals
- 📝 Documentation improvements
- 🎨 Style optimizations

## 👥 Community Support

<div align="center">
<img src="https://cdn.element-plus-x.com/vx-2025-07-14.png" alt="WeChat Community" width="180" style="margin: 20px;" />
<p>Join our WeChat community for the latest updates and technical support</p>

<p>If the community QR code expires or becomes invalid, you can add the author's WeChat</p>
<img src="https://cdn.element-plus-x.com/element-plus-x-author-vx.png" alt="Author WeChat" width="180" style="margin: 20px;" />
</div>
