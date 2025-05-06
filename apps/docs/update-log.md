

## [v1.2.0] - 2025-05-05

### 💥 破坏性变更

- `types`  **TS类型引入 写法变更** 

  以前的写法：太长了

  ```vue
  import { BubbleProps } from 'vue-element-plus-x/types/components/Bubble/types.d.ts'
  ```

  v1.2.0 以后写法：简洁一些

  ```vue
  import { BubbleProps } from 'vue-element-plus-x/types/Bubble'
  ```

### 🐛 修复

- 修复 **`Typewriter`**  打字组件，md 代码高亮输出时候，超出最大宽度的样式问题

### 🚀 新增功能

- **`Typewriter`** 打字器组件，新增 **雾化效果**。**`Bubble`** 气泡组件、**`BubbleList`** 气泡列表组件，在不自定义内容插槽的时候，自动继承，支持雾化效果属性。
- **`BubbleList`** 组件新增 **回到底部按钮**，同时新增 悬停内容区域出现滚动条。增强交互体验
- **`Sender`** 组件新增 **变体**、**底部**、**指令触发功能**。
- 上新 **`MentionSender`** 组件，这是 **`Sender`** 组件另一种**指令**的方式

### 🛠 改进

- 改进 **`Typewriter`**  打字器组件内置的 **markdown-it** 渲染机制。

  1. 组件库内部提供 prismjs 代码高亮 css 样式文件，可以自己替换对应文件。在你需要渲染 md 的地方引入。

     引入的时候会有代码提示，如果没有提示，在这里展示所有的样式文件引入代码，复制到需要渲染md 的地方也可以。

     ```ts
     // 导入 Prism 语法高亮的不同主题样式（基于 vue-element-plus-x 插件提供的样式文件）
     // 每个文件对应一种独立的代码高亮主题风格，可根据项目需求选择启用
     
     // 1. Coy 主题（简约浅色风格，适合日常阅读）
     import 'vue-element-plus-x/styles/prism-coy.min.css'
     
     // 2. Dark 主题（深色背景主题，适合夜间模式或低光环境）
     import 'vue-element-plus-x/styles/prism-dark.min.css'
     
     // 3. Funky 主题（鲜艳色彩风格，代码语法高亮对比强烈）
     import 'vue-element-plus-x/styles/prism-funky.min.css'
     
     // 4. Okaidia 主题（深色高对比度主题，注重代码结构区分）
     import 'vue-element-plus-x/styles/prism-okaidia.min.css'
     
     // 5. Solarized Light 主题（柔和浅色主题，基于 Solarized 配色方案）
     import 'vue-element-plus-x/styles/prism-solarizedlight.min.css'
     
     // 6. Tomorrow 主题（现代简约风格，适合宽屏和大字体显示）
     import 'vue-element-plus-x/styles/prism-tomorrow.min.css'
     
     // 7. Twilight 主题（黄昏色调主题，介于明暗之间的平衡风格）
     import 'vue-element-plus-x/styles/prism-twilight.min.css'
     
     // 8. Prism 核心基础样式（必须导入，包含语法高亮的基础样式和结构）
     import 'vue-element-plus-x/styles/prism.min.css'
     
     /* 使用说明：
     1. prism.min.css 是 Prism 的核心样式，包含基本的代码块布局和通用样式，必须保留
     2. 其他以 prism-开头的文件是不同的主题样式，可根据项目视觉设计选择 1 个或多个导入
     3. 若同时导入多个主题，后导入的样式会覆盖先导入的（可通过切换类名动态切换主题）
     4. 主题名称对应 Prism 官方预设主题（如 Coy、Okaidia 等），样式细节可参考 Prism 主题文档
     */
     ```

     

  2. 组件支持使用者自己定义 高亮 MarkdownIt 代码块函数，新增 highlight?: (code: string, language: string) => string 透传 markdown-it 高亮方法。

  3. 组件支持使用者自定义 MarkdownIt 插件，新增 mdPlugins?: MarkdownItPlugin[] 透传用户自定义的 markdown-it 插件


###  📚文档更新

- 更新线上开发计划文档，展示我们陆续的开发计划。有想法提 pr 的伙伴，可以先看看我们的开发计划，有感兴趣的模块，可以进交流群，一起研究推进 **[开发计划](https://element-plus-x.com/roadmap.html)**
- 更新 **`指南文档`**  中的 **[开发文档](https://element-plus-x.com/guide/develop.html)** ，修复文档介绍错误问题



## [v1.1.6] - 2025-04-16

### 🐛 修复

- 修复 **`Thinking`**  思考中组件展开 收起动画卡顿 bug。

### 🚀 新增功能

- **`Typewriter`** 打字器组件，新增 **雾化效果**。**`Bubble`** 气泡组件、**`BubbleList`** 气泡列表组件，在不自定义内容插槽的时候，自动继承，支持雾化效果属性。
- **`BubbleList`** 组件新增 **回到底部按钮**，同时新增 悬停内容区域出现滚动条。增强交互体验
- **`Sender`** 组件新增 **变体**、**底部**、**指令触发功能**。
- 上新 **`MentionSender`** 组件，这是 **`Sender`** 组件另一种**指令**的方式

### 🛠 改进

- **`Sender`** 组件 优化在没有值的情况下的发送按钮的状态为禁用，@submit 方法也会被禁用。

  但是这样就会有一个问题：有这么一个场景，当用户只是上传了一个文件，没有去在输入框中传值，此时的内置发送按钮也是禁用状态，且 @submit 事件也是禁用状态。所以我们决定针对这一情况，新增 `submit-btn-disabled` 属性，提供开发者主动控制。 在特殊场景下，开发者自定义内置发送按钮的禁用启用。(自定义 #action-list 时，此属性对 submit 事件同样生效。)

- **`Sender`** 组件 新增 `input-style` 属性，供开发者自定义内置的输入框样式。

###  📚文档更新

- 更新线上开发计划文档，展示我们陆续的开发计划。有想法提 pr 的伙伴，可以先看看我们的开发计划，有感兴趣的模块，可以进交流群，一起研究推进 **[开发计划](https://element-plus-x.com/roadmap.html)**
- 更新 **`指南文档`**  中的 **[开发文档](https://element-plus-x.com/guide/develop.html)** ，修复文档介绍错误问题

## [v1.1.1] - 2025-04-06

### 💥 破坏性变更

- `Sender`  输入框组件：双向绑定的写法变更。 由之前的 `v-model:value` 变更为 `v-model` 直接绑定

### 🐛 修复

- 修复 `Sender`  输入框组件在 `v-model`  双向绑定失效问题
- 修复 `Typewriter` 打字器组件在 流模式接口输出下，卡顿的问题。
- 修复 `BubbleList` 气泡列表组件，在流式接口输出下，自动滚动失效问题。并将 `BubbleList` 组件，和打字器组件解耦。
- 修复 `BubbleList` 气泡列表组件，`maxWidth` 失效问题。**[issue #46](https://github.com/HeJiaYue520/Element-Plus-X/issues/46)**

### 🚀 新增功能

- 新增 `Thinking` 思考中组件，和 `ThoughtChain` 思维链组件 ，用于在流式接口输出下，展示思考过程。**[issue #32](https://github.com/HeJiaYue520/Element-Plus-X/issues/32)**、**[issue #45](https://github.com/HeJiaYue520/Element-Plus-X/issues/45)**

- 新增 `Welcom` 欢迎组件，方便用户快速集成好看的欢迎介绍卡片

## [v1.0.81] - 2025-03-29

### 🐛 修复

- 修复 `Sender`  输入框组件在 `loading`  状态下，依然可以触发 `@submit`  方法的 bug  **[issue #22](https://github.com/HeJiaYue520/Element-Plus-X/issues/22)**
- 修复 `Sender` 输入框组件在 `read-only`  状态下，依然可以触发值的修改 的 bug

### 🚀 新增功能

- 新增  `useRecord`  钩子函数，解决用户在自定义 `Sender`  输入框的 `#action-list` 插槽时候，又同时想保留组件内置的 浏览器语音识别 API 方法。可以使用这个 hooks。

- 新增 两个 hooks 钩子函数 ，和一个 工具类。针对 sse 协议的流式请求 ， ` 数据 (渲染层)` + `请求 (控制层)`  进行状态的管理。方便 `Vue`  开发者，在使用流式接口时，方便对请求状态进行处理；方便对需要的数据进行渲染。

  | 钩子函数   | 使用                                                         | 特点             |
  | ---------- | ------------------------------------------------------------ | ---------------- |
  | useXStream | 单独使用：可自动获取流式数据；支持开始流式请求、中断流式请求； | 偏封装，便捷使用 |
  | useSend    | 可单独使用：传入开始和结束方法，返回方法 loading 状态。<br />不支持返回数据，如需对数据和请求状态支持，需要和 **XRequest** 组合使用 | 偏底层，灵活控制 |
  | XRequest   | 可单独使用：配置接口基础地址，使用 send 发送请求，实例上有很多这个请求的状态监听。<br />通过监听事件的回调对数据做处理。一般在项目中和 **useSend** 钩子 组合使用 | 偏底层，灵活控制 |

### 🛠 改进

- 优化兼容性， `Sender` 输入框组件，由于使用 `defineModel` 语法，该语法仅在 **`Vue 3.4+`**  版本中可用，导致较多用户，因 Vue 版本问题，在控制台有报错，现已将此写法改用低版本写法。**(无缝替换，不用更改原写法)**

### 📚 文档更新

- 更新线上开发计划文档，会给大家展示我们陆续的开发计划。有想法提 pr 的伙伴，可以先看看我们的开发计划，有感兴趣的模块，可以进交流群，一起研究推进 **[开发计划](https://element-plus-x.com/roadmap.html)**
- 更新 **`指南文档`**  中的 **[开发文档](https://element-plus-x.com/guide/develop.html)** ，着重修改 **开发命令**、**贡献代码**、**本地调试**  全流程介绍。 规范 `开发` 和 `pr` 提交

## [v1.0.6] - 2025-03-23

### 🛠 改进
- 集成 ESLint 9.x 和 Oxlint，规范开发流程
- 新增打包配置：自动根据组件文件名导出全量/按需组件

### 📚 文档更新
- 完善中/英文文档内容
- 新增文档更新日志模块

## [v0.9.x] - 2025-03-20
### 💥 破坏性变更

- `Typography` 组件：
  - 弃用 `speed` 属性，改用 `step` 属性（与 ant-design-x 对齐）
  - 弃用 `typedjs` 实现打字效果，流式输出失效，且每次流式输出会导致组件重新渲染
- `Bubble` 组件：
  - 弃用 `typing.speed` 属性值，改用 `typing.step`（与 ant-design-x 对齐）

### 🐛 修复

- 修复 `Typography` 打字器组件渲染 bug
- 修复 `Sender` 输入框组件 `autosize` 属性失效 bug

### 🚀 新增功能
- **`Typography`/`Bubble` 组件**：
  - 新增中断输出（`pause`）、继续打字（`resume`）和销毁（`destroy`）实例方法
  - 新增操作监听事件
- **`BubbleList` 组件**：
  - 新增 `trigger-indices` 属性，用于监听指定气泡的 `@complete` 完成回调
- **`Sender` 组件**：
  - 新增 `@recording-change` 事件，监听内置录音按钮点击状态
  - 新增开始录音（`startRecording`）和结束录音（`stopRecording`）实例方法

## [v0.9.x] - 2025-03-14
### 💥 破坏性变更

- `Typography` 组件：
  - 弃用 `step` 属性，改用 `speed` 属性控制打字速度
- `Bubble` 组件：
  - 弃用 `typing.step` 属性值，改用 `typing.speed` 控制打字速度

### 🐛 修复

- 修复 `Typography` 打字器组件渲染 bug

### 🚀 新增功能
- **`Bubble` 组件**：
  - 新增 `avatar-size` 和 `avatar-gap` 属性，控制无头像时的气泡样式
