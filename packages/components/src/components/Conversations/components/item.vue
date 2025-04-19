<script setup lang="ts">
import type { VNode as ComponentVNode } from 'vue'
import type { ConversationItem, ConversationMenu } from '../types'
// import { MoreFilled } from '@element-plus/icons-vue'

const { item, activeKey, prefixIcon, suffixIcon, showTooltip, labelMaxWidth, menu } = defineProps<{
  item: ConversationItem<boolean>
  activeKey: string
  prefixIcon?: ComponentVNode | null
  suffixIcon?: ComponentVNode | null
  showTooltip?: boolean
  labelMaxWidth?: number
  menu?: ConversationMenu[]
}>()

const emit = defineEmits<{
  (e: 'click', key: string): void
}>()

// 添加hover状态跟踪
const isHovered = ref(false)

function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}

function handleClick(key: string) {
  emit('click', key)
}

const isTextOverflow = computed(() => {
  return (label: string) => {
    // 如果没有设置labelMaxWidth，直接返回false
    if (!labelMaxWidth)
      return false

    // 创建一个临时的span元素来测量文本宽度
    const span = document.createElement('span')
    span.style.visibility = 'hidden'
    span.style.position = 'absolute'
    span.style.whiteSpace = 'nowrap'
    span.style.fontSize = '14px' // 与CSS中定义的字体大小一致
    span.textContent = label

    document.body.appendChild(span)
    const textWidth = span.offsetWidth
    document.body.removeChild(span)

    // 如果文本宽度大于最大宽度，则返回true表示溢出
    return textWidth > labelMaxWidth
  }
})

// 计算标签样式
const labelStyle = computed(() => {
  // 如果有labelMaxWidth，设置最大宽度并使用截断样式
  if (labelMaxWidth) {
    return {
      maxWidth: `${labelMaxWidth}px`,
      overflow: 'hidden',
      // 不再使用 textOverflow: 'ellipsis' 和 whiteSpace: 'nowrap'
      // 在CSS中使用渐变遮罩实现文本渐变消失效果
    }
  }
  // 否则返回空对象
  return {}
})

// 判断是否显示菜单
const shouldShowMenu = computed(() => {
  return isHovered.value || item.key === activeKey
})

// 格式化时间显示
const formattedTime = computed(() => {
  // 如果timestamp是数字，格式化它
  if (typeof item.timestamp === 'number') {
    const date = new Date(item.timestamp)
    const now = new Date()

    // 今天的日期，显示时间
    if (date.getDate() === now.getDate()
      && date.getMonth() === now.getMonth()
      && date.getFullYear() === now.getFullYear()) {
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    }

    // 昨天
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (date.getDate() === yesterday.getDate()
      && date.getMonth() === yesterday.getMonth()
      && date.getFullYear() === yesterday.getFullYear()) {
      return '昨天'
    }

    // 一周内
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(now.getDate() - 7)
    if (date > oneWeekAgo) {
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return days[date.getDay()]
    }

    // 其他日期显示年月日
    return date.toLocaleDateString()
  }

  // 字符串timestamp直接显示
  return item.timestamp
})
</script>

<template>
  <li
    :key="item.key"
    class="conversation-item"
    :class="{
      disabled: item.disabled,
      active: item.key === activeKey,
      hovered: isHovered,
    }"
    @click="handleClick(item.key)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="conversation-content">
      <!-- 标签区域 - 通过插槽自定义 -->
      <div class="conversation-content-main">
        <slot name="label">
          <!-- 前缀图标 -->
          <span v-if="prefixIcon" class="conversation-prefix-icon">
            <ElIcon>
              <component :is="prefixIcon" />
            </ElIcon>
          </span>

          <!-- 标签和时间戳 -->
          <div class="conversation-label-container">
            <ElTooltip
              v-if="showTooltip && isTextOverflow(item.label)"
              :content="item.label"
              placement="top"
              effect="dark"
            >
              <span
                class="conversation-label"
                :class="{ 'text-gradient': isTextOverflow(item.label) }"
                :style="labelStyle"
              >{{ item.label }}</span>
            </ElTooltip>
            <span
              v-else
              class="conversation-label"
              :class="{ 'text-gradient': isTextOverflow(item.label) }"
              :style="labelStyle"
            >{{ item.label }}</span>
            <span v-if="formattedTime" class="conversation-timestamp">{{ formattedTime }}</span>
          </div>
        </slot>
      </div>

      <!-- 后缀图标 -->
      <span v-if="suffixIcon" class="conversation-suffix-icon">
        <ElIcon>
          <component :is="suffixIcon" />
        </ElIcon>
      </span>

      <!-- 菜单区域 - 只在hover或active状态下显示 -->
      <slot v-if="shouldShowMenu" name="menu">
        <span v-if="menu?.length" class="conversation-menu">
          <!-- <ElDropdown>
            <span>
              打开
            </span>
          </ElDropdown> -->
        </span>
      </slot>
    </div>
  </li>
</template>

<style scoped lang="scss">
.conversation-item {
  padding: 14px 4px 14px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  & + & {
    margin-top: 4px;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #c0c4cc;
  }

  &.active {
    background-color: #f0f0f0;
  }

  &.hovered, &:hover {
    background-color: #f0f0f0;
  }
}

.conversation-content {
  display: flex;
  align-items: center;

  .conversation-prefix-icon {
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .conversation-content-main {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .conversation-label-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }

  .conversation-label {
    font-size: 14px;
    color: #303133;
    position: relative;
    white-space: nowrap;

    &.text-gradient {
      mask-image: linear-gradient(to right, black 60%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, black 60%, transparent 100%);
    }
  }

  .conversation-timestamp {
    font-size: 14px;
    color: #909399;
    margin-left: 8px;
  }

  .conversation-suffix-icon {
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .conversation-menu {
    margin-left: 8px;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease;

    .hovered &, .active & {
      opacity: 1;
    }
  }
}
</style>
