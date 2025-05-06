<docs>
---
title: complete 事件 和 trigger-indices 属性
---

🍉该属性使用场景很少，请酌情使用，更细致的控制你的气泡在列表中的 `完成事件`。

你可以通过 `@complete` 事件，触发列表，每一个打字中的 `Bubble` 气泡组件的 `完成打字` 的回调事件。
`@complete` 返回两个参数，`instance` 是 打字器组件实例 和 `index` 是 `BubbleListItem` 的索引。

::: tip
- `@complete` 事件仅会触发 `typing` 属性为 `true` 的 `Bubble 组件` 回调事件。
- 如果你给列表配置了多个气泡的 `typing` 属性，列表默认只处理最后一个 `typing` 为 `true` 的气泡的 `@complete` 事件。
:::

::: info
- 如果你需要处理多个 `typing` 为 `true` 的气泡完成回调事件，你可以通过 `triggerIndices` 属性来指定需要处理的气泡的索引。它是一个 `'only-last' | 'all' | number[]` 类型。
- 默认为 `'only-last'`，只执行 最后一个 `typing` 为 `true` 的气泡的 `@complete` 事件。
- `'all'` 表示执行所有 `typing` 为 `true` 的气泡的 `@complete` 事件。`@complete` 将会被执行多次。
- `number[]` 设置你想要监听的 `BubbleListItem` 的索引。组件会自动过滤 `无效的索引`，并输出 `console.warn`
:::
</docs>

<script setup lang="ts">
import type { BubbleListItemProps, BubbleListProps } from 'vue-element-plus-x/bubbleList/types'
import type { TypewriterInstance } from 'vue-element-plus-x/typewriter/types'

type listType = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

// 示例调用
const list = ref<BubbleListProps<listType>['list']>(generateFakeItems(0))

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = []
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user'
    const placement = role === 'ai' ? 'start' : 'end'
    const key = i + 1
    const content = role === 'ai'
      ? '💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~'
      : `哈哈哈，让我试试`
    const loading = false
    const shape = 'corner'
    const variant = role === 'ai' ? 'filled' : 'outlined'
    const isMarkdown = false
    const typing = role === 'ai'
    const avatar = role === 'ai'
      ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      : 'https://avatars.githubusercontent.com/u/76239030?v=4'

    messages.push({
      key,
      role,
      placement,
      content,
      loading,
      shape,
      variant,
      isMarkdown,
      typing,
      avatar,
      avatarSize: '24px',
    })
  }
  return messages
}

function onComplete(instance: TypewriterInstance, index: number) {
  console.log('@complete', instance, index)
}

const triggerIndices = ref<BubbleListProps['triggerIndices']>('only-last')

function changeTriggerIndices(type: 'only-last' | 'all' | number[]) {
  triggerIndices.value = type
  // 重新生成列表数据
  list.value = []
  nextTick(() => {
    list.value = generateFakeItems(7)
  })
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center;">
      <span style="margin-right: 12px;">trigger-indices: </span>
      <el-button style="width: fit-content;" @click="changeTriggerIndices('only-last')">
        only-last
      </el-button>
      <el-button style="width: fit-content;" type="primary" @click="changeTriggerIndices('all')">
        all
      </el-button>
      <el-button style="width: fit-content;" type="success" @click="changeTriggerIndices([1, 2, 3])">
        [1, 2, 3]
      </el-button>
    </div>

    <BubbleList :list="list" max-height="350px" :trigger-indices="triggerIndices" @complete="onComplete" />
  </div>
</template>
