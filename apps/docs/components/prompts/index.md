# Prompts 提示集组件 🎁

## 介绍

`Prompts` 用于显示一组与当前上下文相关的预定义的问题或建议。

## 代码演示

### 基本使用

<demo src="./demos/base.vue"></demo>

### 禁用状态

<demo src="./demos/disabled.vue"></demo>

### 垂直排列

<demo src="./demos/vertical.vue"></demo>

### 可换行

<demo src="./demos/wrap.vue"></demo>

### 响应式宽度

<demo src="./demos/responsive.vue"></demo>

### 定制化样式

<demo src="./demos/customized.vue"></demo>

### 嵌套组合

<demo src="./demos/nested.vue"></demo>

## 属性

| 属性名       | 类型    | 是否必填 | 默认值  | 描述                                           |
| ------------ | ------- |-------| ------- | ---------------------------------------------- |
| variant      | string  | 否    | filled  | 组件样式变体（filled/borderless）             |
| direction    | string  | 否    | ltr     | 文本方向（ltr/rtl）                           |
| icon         | string  | 否    | -       | 图标URL地址                                    |
| title        | string  | 否    | -       | 主标题文本内容                                |
| extra        | string  | 否    | -       | 副标题文本内容                                |
| description  | string  | 否    | -       | 描述文本内容                                  |
| className    | string  | 否    | -       | 容器外层自定义类名                            |
| rootClassName| string  | 否    | -       | 根节点自定义类名                              |
| classNames   | object  | 否    | -       | 各部分自定义类名（{ icon, title, extra, description }） |
| style        | object  | 否    | -       | 容器外层自定义样式                            |
| styles       | object  | 否    | -       | 各部分自定义样式（{ icon, title, extra, description }） |
| prefixCls    | string  | 否    | welcome | 组件类名前缀                                  |

## 插槽

| 插槽名       | 参数  | 类型       | 描述                                         |
| ------------ | ------------ |--- | -------------------------------------------- |
| `#image` | - | Slot | 自定义欢迎图片内容 |
| `#extra` | - | Slot | 自定义副标题内容 |

## 功能特性

- 通过 `variant` 属性目前暂时支持 `filled`（填充）和 `borderless`（无边框）两种视觉风格

- 支持 `direction` 属性控制文本方向

- 可通过 `classNames` 和 `styles` 细粒度控制样式

- 支持 `image` 、 `extra` 插槽扩展自定义内容
