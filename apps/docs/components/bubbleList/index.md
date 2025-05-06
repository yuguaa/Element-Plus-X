# BubbleList 气泡列表 🍅

::: warning
`1.1.6 版本` 继承打字器 **雾化** 效果。新增 **滚动底部按钮，仿 `豆包`🔥**。新增 **鼠标悬停展示滚动条**，增强交互体验。请及时更新尝试

🐵 此温馨提示更新时间：`2025-04-13`
:::

::: danger
`1.0.81 版本` ，以及更早版本。`BubbleList` 组件的自动滚动逻辑，会和内置的打字器组件结合使用，可能会导致在自定义 `content` 插槽时， `自动滚动` 失效`。且存在一定的性能问题。

上述问题在新版本中已修复，请及时升级至最新版本，以获得更好的体验。

此警告更新时间：`2025-04-06`
:::

::: tip
另: 新版本的自动滚动，在 `list` 长度变化时，自动滚动。但是 向上滚动滚动条后，需要手动调用
`scrollToBottom` 方法，以再次实现自动滚动。或者 滚动条滚动到底部后，会重新触发自动滚动。

和原来逻辑一样, 升级无需任何心理负担。
:::

## 介绍

`BubbleList` 依赖于 `Bubble` 组件，用于展示一组对话气泡列表。该组件支持设置 `列表最大高度`，具备 `自动滚动` 功能。同时，它还提供了多种 `控制滚动` 的方法，`使用者` 可以轻松调用，性能强大，无需任何开发心理负担。

## 代码使用

<demo src="./demos/list.vue"></demo>

<demo src="./demos/customized.vue"></demo>

<demo src="./demos/scroll-to.vue"></demo>

<demo src="./demos/back-button.vue"></demo>

<demo src="./demos/on-complete.vue"></demo>

## 属性

| 属性名      | 类型   | <div style="width: 70px">是否必填</div> | 默认值  | 说明                                                                                                                                                                  |
| ----------- | ------ | -------- | ------- |  ---------- |
| `list`      | Array  | 是       | 无      | 包含气泡信息的数组，每个元素为一个对象，包含 `content`、`placement`、`loading`、`shape`、`variant`、`isMarkdown`、`typing` 等 `Bubble` 属性，用于配置每个气泡的显示内容和样式。 |
| `maxHeight` | String | 否       | '500px' | 气泡列表容器的最大高度，超过该高度会出现垂直滚动条。   |
| `alwaysShowScrollbar` | Boolean | 否       | false      | 是否一直显示滚动条，默认为 `false`。 |
| `backButtonThreshold` | Number | 否       | 80      | 滚动条显示阈值，当滚动条距离底部小于该值时，会显示滚动条。 |
| `showBackButton` | Boolean | 否       | true      | 是否显示返回顶部按钮，默认为 `true`。 |
| `backButtonPosition` | `{ bottom: '20px', left: 'calc(50% - 19px)' }`  |  否 | `{ bottom: '20px', left: 'calc(50% - 19px)' }`  | 返回顶部按钮的位置, 默认底部居中展示。 |
| `btnLoading` | Boolean | 否       | true      | 是否开启返回顶部按钮 loading 状态，默认为 `true`。 |
| `btnColor` | String | 否       | '#409EFF'      | 返回顶部按钮的颜色，默认为 `'#409EFF'`。 |
| `btnIconSize` | Number | 否       | 24      | 返回顶部按钮的图标大小，默认为 24px。 |
| `triggerIndices` | 'only-last' \| 'all' \| number[]  |  否 | 'only-last'      | 触发滚动完成事件的气泡 `索引数组`，默认为 `'only-last'`。 |

## 事件

| 事件名       | 参数  | 类型       | 描述                                         |
| ------------ | ------------ |--- | -------------------------------------------- |
| `@complete` | (instance, index) | Function | 当某个气泡的打字效果完成时触发的事件。 |

## Ref 实例方法

| 属性名       | 类型         | 描述                                         |
| ----------- | ------------ | -------------------------------------------- |
| `scrollToTop` | Function | 滚动到顶部。                                     |
| `scrollToBottom` | Function | 滚动到底部。                                     |
| `scrollToBubble` | Function | 滚动到指定气泡索引位置。                     |

## 插槽

| 插槽名       | 参数  | 类型       | 描述                                         |
| ------------ | ------------ |--- | -------------------------------------------- |
| `#avatar` | - | Slot | 自定义头像展示内容 |
| `#header` | - | Slot | 自定义气泡顶部展示内容 |
| `#content` | - | Slot | 自定义气泡展示内容 |
| `#loading` | - | Slot | 自定义气泡加载状态展示内容 |
| `#footer` | - | Slot | 自定义气泡加载状态展示内容 |

## 功能特性

1. **智能滚动** - 自动跟踪最新消息位置
2. **深度定制** - 完整的气泡组件插槽透传
3. **多种滚动方式** - 滚动到顶部、底部、指定位置
4. **打字效果** - 支持打字效果
5. **多种样式** - 支持多种样式，如圆形、方形等
