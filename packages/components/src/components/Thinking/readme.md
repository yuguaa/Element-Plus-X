# Thinking 组件

## 介绍
Thinking 组件用于展示带有时间轴的思考过程，可以展开/折叠详细内容。
- 可以单个思考链 或者 多个
- 能够更改状态 加载中 和自定义 图标
- 配置标题或者思考内容的位置
- 可以折叠以及可以默认展开

## 安装

```bash
npm i vue-element-plus-x
```

### 引入组件

在你的 Vue 3 项目中引入 `Thinking` 组件：

```vue
<script setup lang="ts">
import type { ThinkingItem } from 'vue-element-plus-x/types/components/Thinking/types'
import { Check, DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue'
import { ref } from 'vue'
import Thinking from 'vue-element-plus-x'

const avatar = ref(
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
)
const loading = ref(true)
const content = ref('')

const thinkingItems = ref<ThinkingItem[]>([
  {
    id: '1',
    content: '收到问题',
    title: '进行搜索文字',
    type: 'success',
    dotIcon: markRaw(Check),
    isCanExpand: true,
    isDefaultExpand: true,
    isLoading: true,
    expandContent: '进行搜索文字',
  },
])

onMounted(() => {
  setTimeout(() => {
    thinkingItems.value[0] = {
      ...thinkingItems.value[0],
      isLoading: false,
      type: 'success',
    }
    thinkingItems.value.push({
      id: '2',
      content: '解决问题',
      title: '进行搜索文字',
      hideTitle: true,
      type: 'primary',
      dotIcon: Check,
      isLoading: false,
      isCanExpand: true,
      isDefaultExpand: true,
      expandContent: '进行搜索文字',
    })

    // 模拟思考结束
    setTimeout(() => {
      content.value = `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`.trim()
      loading.value = false
    }, 500)
  }, 2000)
})
</script>

<template>
  <div class="component-container">
    <div class="component-1">
      <Bubble
        placement="start" :content="content" shape="corner" variant="shadow" :loading="loading" :typing="{
          step: 2,
          suffix: '💗',
        }" :is-markdown="true"
      >
        <template #avatar>
          <el-avatar :size="32" :src="avatar" />
        </template>

        <template #header>
          <div class="header-container">
            <Thinking :thinking-items="thinkingItems" @handle-expand="(id: string[]) => console.log(id)" />
          </div>
        </template>

        <template #footer>
          <div class="footer-container">
            <el-button type="info" :icon="Refresh" size="small" circle />
            <el-button type="success" :icon="Search" size="small" circle />
            <el-button type="warning" :icon="Star" size="small" circle />
            <el-button color="#626aef" :icon="DocumentCopy" size="small" circle />
          </div>
        </template>
      </Bubble>
    </div>
  </div>
</template>
```

## 组件属性Props

| 参数          | 说明         | 类型                             | 默认值      |
| ------------- | ------------ | -------------------------------- | ----------- |
| thinkingItems | 思考节点列表 | `ThinkingItem[]`                 | `[]`        |
| dotSize       | 圆点大小     | `'default' \| 'small' \|'large'` | `'default'` |

## 组件事件

| 事件名称     | 说明           | 回调参数                 |
| ------------ | -------------- | ------------------------ |
| handleExpand | 节点展开时触发 | `expandedKeys: string[]` |

## ThinkingItem
| 参数            | 说明                 | 类型                                                          | 默认值                          | 备注                                 |
| --------------- | -------------------- | ------------------------------------------------------------- | ------------------------------- | ------------------------------------ |
| id              | 唯一标识 必填        | `string \| number`                                            | `''`                            |                                      |
| content         | 思考的内容 必填      | `string`                                                      | `''`                            |                                      |
| dotIcon         | 节点的图标           | `Component`                                                   | `Check`                         |                                      |
| type            | 节点类型             | `'success' \| 'warning' \| 'danger' \| 'primary'` \| `'info'` | `'primary'`                     |                                      |
| placement       | 对齐位置             | `'top' \| 'bottom'`                                           | `'top'`                         | `'top' \| 'bottom'` 标题决定标题位置 |
| isCanExpand     | 是否可展开           | `boolean`                                                     | `false`                         |                                      |
| isDefaultExpand | 是否默认展开         | `boolean`                                                     | `false`                         |                                      |
| expandContent   | 展开思考的详细内容   | `string`                                                      | `''`                            | `isDefaultExpand`为true时必填        |
| title           | 节点标题             | `string`                                                      | `''`                            |                                      |
| hideTitle       | 是否隐藏节点标题内容 | `boolean`                                                     | `false`                         |                                      |
| isLoading       | 节点是否正在加载     | `boolean`                                                     | `false`                         |                                      |
| loadingIcon     | 加载中图标           | `Component`                                                   | element-plus 按钮的默认加载图标 |                                      |

```ts

type ThinkingItemId = string | number

interface ThinkingItemBase {
  id: ThinkingItemId
  content: string
  dotIcon: Component
  type?: 'info' | 'success' | 'warning' | 'danger' | 'primary'
  placement?: 'top' | 'bottom'
  isCanExpand?: boolean
  isDefaultExpand?: boolean
  expandContent?: string
  isLoading?: boolean
  title?: string
  hideTitle?: boolean
  loadingIcon?: Component
}

type ThinkingItem =
  | ThinkingItemBase & { isCanExpand?: false }
  | ThinkingItemBase & { isCanExpand: true, expandContent: string }

```
