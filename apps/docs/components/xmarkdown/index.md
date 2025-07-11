# XMarkdown 渲染组件 📜

## 介绍

`XMarkdown` 这个组件内置了**行内代码**、**代码块**、**数学公式函数（行/块）**、**mermaid 图表**等基础样式。

:::warning

⚠️ 在这个开发文档中，有一些样式的演示可能不是很好，但是应该不会影响集成的使用。如果有集成或一些使用问题，可以进 👉[交流群](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81) 获取最新的技术支持。

该组件支持**增量更新**，**支持自定义**。更多的样式内置和组件的自定义🥰
目前该组件正在最新的 `1.2.29-beta` 版本，请使用以下命令安装

```npm
pnpm add vue-element-plus-x@1.2.29-beta
```

:::

## 代码演示

### 基本使用

<demo src="./demos/base.vue"></demo>

### 设置默认 高亮/暗黑

<demo src="./demos/default-theme-mode.vue"></demo>

### 内置 shiki 主题

代码块高亮内置了多套主题供选择。

<demo src="./demos/shiki-style.vue"></demo>

### 单独定义代码块高亮样式

<demo src="./demos/color-replacements.vue"></demo>

### 统一覆盖样式

<demo src="./demos/base-style.vue"></demo>

下面使用 `github` 样式文件统一覆盖样式做一个示例

### github 样式

<demo src="./demos/github-style.vue"></demo>

如果你想单独控制代码块高亮的样式，可以这样：

### allowHtml

<demo src="./demos/allow-html.vue"></demo>

### enableLatex

<demo src="./demos/enable-latex.vue"></demo>

### enableBreaks

<demo src="./demos/enable-breaks.vue"></demo>

### 预览 html 代码块

<demo src="./demos/view-html.vue"></demo>

### 自定义代码块渲染

<demo src="./demos/code-x-render.vue"></demo>

### 自定义代码块顶部渲染

如果你仅仅想修改我们内置的代码块顶部的内容，你可以使用 `codeXSlot`。并且我们暴露出来了内置的 `折叠`、`主题切换` 、`复制` 方法。你可以在仅改变样式的同时，保留默认功能。

<demo src="./demos/code-x-slot.vue"></demo>

### 自定义属性

<demo src="./demos/custom-attrs.vue"></demo>

### mermaid 操作栏配置

<demo src="./demos/mermaid-config.vue"></demo>

### 插槽 标签拦截

<demo src="./demos/slot.vue"></demo>

### 内置的代码块语言

<demo src="./demos/lang.vue"></demo>

## 属性

| 属性名          | 类型   | 是否必填 | 默认值   | 描述                     |
| --------------- | ------ | -------- | -------- | ------------------------ |
| `markdown`      | string | 是       | ''       | markdown 内容            |
| `allowHtml`     | bool   | 否       | `true`   | 是否渲染 html            |
| `enableLatex`   | bool   | 否       | `true`   | 是否渲染 latex           |
| `enableBreaks`  | bool   | 否       | `true`   | 是否渲染 breaks          |
| `codeXRender`   | Object | 否       | `()=>{}` | 自定义代码块渲染         |
| `codeXSlot`     | Object | 否       | `()=>{}` | 自定义代码块顶部插槽渲染 |
| `customAttrs`   | Object | 否       | `()=>{}` | 自定义属性               |
| `mermaidConfig` | Object | 否       | `()=>{}` | mermaid 配置             |

## 功能特性

- 支持增量渲染，极致的性能
- 支持自定义插槽，可以是 h 函数的组件，也可以是 template 模版组件。上手更简单
- 内置丰富的基础样式数学公式，mermaid图表，减少开发者负担
- 支持多种拦截，和自定义渲染，上限拉满
