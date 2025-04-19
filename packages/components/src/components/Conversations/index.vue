<script setup lang="ts">
import type { ElScrollbar } from 'element-plus'
import type { Conversation, ConversationItem, GroupableOptions, TimeRange } from './types'
import { Search, Top } from '@element-plus/icons-vue'
import { isVNode } from 'vue'
import Item from './components/item.vue'

const props = withDefaults(defineProps<Conversation>(), {
  items: () => [],
  style: () => ({}),
  showTooltip: () => false,
  groupable: () => false,
  labelMaxWidth: undefined,
  menu: () => [],
  ungroupedTitle: '未分组',
})

// 定义搜索值模型
const searchModel = defineModel<string>('search', { required: false })

// 当未绑定search属性但提供了searchMethod时，使用内部状态
const internalSearchValue = ref('')

// 实际用于搜索的值
const actualSearchValue = computed(() => {
  // 如果明确绑定了search属性，使用searchModel
  if (props.search !== undefined) {
    return searchModel.value || ''
  }
  // 否则使用内部状态
  return internalSearchValue.value
})

// 判断是否显示搜索框 - 当存在 search 或 searchMethod 时显示
const shouldShowSearch = computed(() => {
  // 检查props中是否明确传入了search或searchMethod
  return props.search !== undefined || props.searchMethod !== undefined
})

// 将传入的样式与默认样式合并
const mergedStyle = computed(() => {
  const defaultStyle = {
    padding: '10px 0 10px 10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '280px',
    height: '100%',
  }
  return { ...defaultStyle, ...props.style }
})

const activeKey = defineModel<string>('active', { required: false })

// 获取第一个非disabled的item的key，作为备选值
const firstAvailableKey = computed(() => {
  return props.items.find(item => !item.disabled)?.key || ''
})

// 如果没有绑定activeKey或绑定的是disabled项，则使用initialKey
watchEffect(() => {
  if (!activeKey.value || props.items.find(item => item.key === activeKey.value)?.disabled) {
    activeKey.value = firstAvailableKey.value
  }
})

function handleClick(key: string) {
  // 如果是disabled状态，则不允许选中
  if (props.items.find(item => item.key === key)?.disabled) {
    return
  }
  activeKey.value = key
}

// 判断是否需要使用分组
const shouldUseGrouping = computed(() => {
  // 有shortcuts时自动启用分组，或者groupable为true/对象/空字符串时启用分组
  return !!props.shortcuts || props.groupable === '' || !!props.groupable
})

// 基于时间快捷方式判断时间戳属于哪个组
function getShortcutGroup(timestamp: number): string | null {
  if (!props.shortcuts || !timestamp)
    return null

  for (const [name, value] of Object.entries(props.shortcuts)) {
    // 处理TimeRange类型
    if (typeof value === 'object' && 'start' in value && 'end' in value) {
      const range = value as TimeRange
      if (timestamp >= range.start && timestamp <= range.end) {
        return name
      }
    }
    // 处理具体时间戳值
    else if (typeof value === 'number') {
      // 当timestamp与时间戳值在同一天时，将其归为一组
      const itemDate = new Date(timestamp)
      const shortcutDate = new Date(value)
      if (
        itemDate.getFullYear() === shortcutDate.getFullYear()
        && itemDate.getMonth() === shortcutDate.getMonth()
        && itemDate.getDate() === shortcutDate.getDate()
      ) {
        return name
      }
    }
    // 处理时间戳函数
    else if (typeof value === 'function') {
      const dynamicValue = value()
      // 同样检查是否在同一天
      const itemDate = new Date(timestamp)
      const shortcutDate = new Date(dynamicValue)
      if (
        itemDate.getFullYear() === shortcutDate.getFullYear()
        && itemDate.getMonth() === shortcutDate.getMonth()
        && itemDate.getDate() === shortcutDate.getDate()
      ) {
        return name
      }
    }
  }

  return null
}

// 根据搜索值过滤项目
const filteredItems = computed(() => {
  if (!actualSearchValue.value)
    return props.items

  // 当searchMethod存在时，调用它并传递搜索值
  if (props.searchMethod !== undefined) {
    // 调用searchMethod，只传递搜索值
    props.searchMethod(actualSearchValue.value)
    // 返回原始items，由外部逻辑更新items
    return props.items
  }

  // 默认的搜索方法
  return props.items.filter(item =>
    item.label.toLowerCase().includes(actualSearchValue.value.toLowerCase()),
  )
})

// 根据分组方式进行分组
const groups = computed(() => {
  // 如果不需要分组，则返回空数组
  if (!shouldUseGrouping.value)
    return []

  // 检查filteredItems是否有值
  if (!filteredItems.value || filteredItems.value.length === 0) {
    return []
  }

  // 用于存储每个组的项目
  const groupMap: Record<string, {
    title: string
    key: string
    children: ConversationItem[]
    timestamp?: number // 用于基于时间戳排序
    isUngrouped?: boolean // 标记是否为未分组
  }> = {}

  // 使用过滤后的项目进行分组
  filteredItems.value.forEach((item) => {
    let groupName: string | null = null

    // 优先使用item中的group字段
    if (item.group) {
      groupName = item.group
    }
    // 其次，如果有时间戳和快捷方式，则使用快捷方式分组
    else if (item.timestamp && props.shortcuts) {
      groupName = getShortcutGroup(item.timestamp)
    }

    // 如果没有找到分组，使用未分组
    const finalGroupName = groupName || props.ungroupedTitle

    // 若该组尚未创建，则创建一个新组
    if (!groupMap[finalGroupName]) {
      groupMap[finalGroupName] = {
        title: finalGroupName,
        key: finalGroupName,
        children: [],
        isUngrouped: !groupName, // 如果没有找到组名，则标记为未分组
      }
    }

    // 记录组的代表性时间戳
    if (!groupMap[finalGroupName].isUngrouped) {
      // 处理具体的shortcuts时间戳
      if (props.shortcuts && props.shortcuts[finalGroupName]) {
        const shortcut = props.shortcuts[finalGroupName]
        if (typeof shortcut === 'number') {
          groupMap[finalGroupName].timestamp = shortcut
        }
        else if (typeof shortcut === 'function') {
          groupMap[finalGroupName].timestamp = shortcut()
        }
        else if (typeof shortcut === 'object' && 'end' in shortcut) {
          // 使用范围的结束时间作为代表时间戳
          groupMap[finalGroupName].timestamp = shortcut.end
        }
      }
      // 如果没有直接的timestamp，则放入未分组
      else if (item.timestamp) {
        if (!groupMap[finalGroupName].timestamp) {
          groupMap[finalGroupName].timestamp = item.timestamp
        }
        else {
          groupMap[finalGroupName].timestamp = Math.max(
            groupMap[finalGroupName].timestamp!,
            item.timestamp,
          )
        }
      }
    }

    // 将项目添加到相应的组中
    groupMap[finalGroupName].children.push(item)
  })

  // 对每个组内的项目进行排序
  Object.values(groupMap).forEach((group) => {
    // 按时间戳降序排序（如果有的话）
    group.children.sort((a, b) => {
      const timestampA = a.timestamp || 0
      const timestampB = b.timestamp || 0
      return timestampB - timestampA
    })
  })

  // 将分组转换为数组
  const groupArray = Object.values(groupMap)

  // 如果有自定义排序函数，使用它排序
  if (typeof props.groupable === 'object' && props.groupable.sort) {
    return groupArray.sort((a, b) => {
      // 确保未分组总是在最后
      if (a.isUngrouped)
        return 1
      if (b.isUngrouped)
        return -1

      const sortFn = (props.groupable as GroupableOptions).sort
      return sortFn ? sortFn(a.key, b.key) : 0
    })
  }

  // 否则按时间戳降序排序，未分组总是在最后
  return groupArray.sort((a, b) => {
    // 确保未分组总是在最后
    if (a.isUngrouped)
      return 1
    if (b.isUngrouped)
      return -1

    // 按时间戳降序排序
    return (b.timestamp || 0) - (a.timestamp || 0)
  })
})

// 渲染分组标题
function renderGroupTitle(groupName: string) {
  if (typeof props.groupable === 'object' && props.groupable.title) {
    const titleProp = (props.groupable as GroupableOptions).title
    if (isVNode(titleProp)) {
      return titleProp
    }
    else if (typeof titleProp === 'function') {
      return titleProp(groupName)
    }
  }

  return groupName
}

// 添加滚动相关的状态
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const showScrollTop = ref(false)
const groupRefs = ref<Record<string, HTMLDivElement>>({})

// 记录吸顶状态的组
const stickyGroupKeys = ref<Set<string>>(new Set())

// 监听滚动事件
function handleScroll(e: any) {
  // 显示/隐藏回到顶部按钮
  const scrollTop = e.scrollTop
  showScrollTop.value = scrollTop > 200

  // 获取当前滚动容器
  const scrollbar = scrollbarRef.value
  if (!scrollbar)
    return

  // 使用scrollbar的wrapRef获取真实DOM以获取正确的尺寸
  const wrap = scrollbar.wrapRef
  if (!wrap)
    return

  // 检查是否需要加载更多
  // 当滚动到距离底部20px时触发加载
  const bottomOffset = 20
  const scrollHeight = wrap.scrollHeight
  const clientHeight = wrap.clientHeight

  // 计算是否接近底部
  const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset

  if (isNearBottom) {
    loadMoreData()
  }

  // 更新吸顶状态
  updateStickyStatus(e)
}

// 更新标题吸顶状态
function updateStickyStatus(_e: any) {
  if (!shouldUseGrouping.value || groups.value.length === 0)
    return

  // 先清空当前的吸顶组
  stickyGroupKeys.value.clear()

  // 获取滚动容器的顶部位置
  const scrollContainer = scrollbarRef.value?.wrapRef
  if (!scrollContainer)
    return

  const scrollContainerTop = scrollContainer.getBoundingClientRect().top

  // 遍历所有组，检查哪个组处于吸顶状态
  for (const group of groups.value) {
    const groupElement = groupRefs.value[group.key]
    if (groupElement) {
      const groupRect = groupElement.getBoundingClientRect()
      const titleElement = groupElement.querySelector('.conversation-group-title') as HTMLElement

      if (titleElement) {
        const titleHeight = titleElement.offsetHeight
        const relativeTop = groupRect.top - scrollContainerTop

        // 当组的顶部位置接近或小于0，且底部还未完全滚出可视区时，标记为吸顶
        if (relativeTop <= 0 && relativeTop + groupRect.height > titleHeight) {
          stickyGroupKeys.value.add(group.key)
        }
      }
    }
  }
}

// 加载更多数据
function loadMoreData() {
  if (!props.loadMore)
    return
  props.loadMore()
}

// 滚动到顶部
function scrollToTop() {
  scrollbarRef.value?.setScrollTop(0)
}

// 组件挂载后初始化第一个标题为吸顶状态
onMounted(() => {
  // 如果有分组，默认将第一个分组设置为吸顶状态
  if (shouldUseGrouping.value && groups.value.length > 0) {
    // 添加第一个组的key到吸顶状态集合中
    stickyGroupKeys.value.add(groups.value[0].key)
  }
})
</script>

<template>
  <div class="conversations-container">
    <ul class="conversations-list" :style="mergedStyle">
      <!-- 搜索框 -->
      <li
        v-if="shouldShowSearch"
        class="conversations-search"
        :style="{
          width: `calc(${mergedStyle.width} - 20px)`,
          backgroundColor: mergedStyle.backgroundColor || '#fff',
        }"
      >
        <el-input
          :model-value="actualSearchValue"
          clearable
          placeholder="搜索"
          @update:model-value="props.search !== undefined ? searchModel = $event : internalSearchValue = $event"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </li>

      <!-- 滚动区域容器 -->
      <li class="conversations-scroll-wrapper">
        <el-scrollbar
          ref="scrollbarRef"
          height="100%"
          class="custom-scrollbar"
          always
          @scroll="handleScroll"
        >
          <div class="scroll-content">
            <template v-if="shouldUseGrouping">
              <!-- 分组显示 -->
              <div
                v-for="group in groups"
                :key="group.key"
                :ref="el => { if (el) groupRefs[group.key] = el as HTMLDivElement }"
                class="conversation-group"
              >
                <div
                  class="conversation-group-title sticky-title"
                  :class="{ 'active-sticky': stickyGroupKeys.has(group.key) }"
                  :style="{ backgroundColor: mergedStyle.backgroundColor || '#fff' }"
                >
                  <component :is="renderGroupTitle(group.title)" v-if="isVNode(renderGroupTitle(group.title))" />
                  <template v-else>
                    {{ group.title }}
                  </template>
                </div>
                <Item
                  v-for="item in group.children"
                  :key="item.key"
                  :item="item"
                  :prefix-icon="item.prefixIcon"
                  :show-tooltip="showTooltip"
                  :suffix-icon="item.suffixIcon"
                  :active-key="activeKey || ''"
                  :label-max-width="labelMaxWidth"
                  :menu="menu"
                  @click="handleClick"
                >
                  <!-- 传递插槽 -->
                  <template v-if="$slots.label" #label>
                    <slot name="label" v-bind="{ item }" />
                  </template>

                  <template v-if="$slots.menu" #menu>
                    <slot name="menu" v-bind="{ item }" />
                  </template>
                </Item>
              </div>
            </template>

            <template v-else>
              <Item
                v-for="item in filteredItems"
                :key="item.key"
                :item="item"
                :prefix-icon="item.prefixIcon"
                :show-tooltip="showTooltip"
                :suffix-icon="item.suffixIcon"
                :active-key="activeKey || ''"
                :label-max-width="labelMaxWidth"
                :menu="menu"
                @click="handleClick"
              >
                <!-- 传递插槽 -->
                <template v-if="$slots.label" #label>
                  <slot name="label" v-bind="{ item }" />
                </template>

                <template v-if="$slots.menu" #menu>
                  <slot name="menu" v-bind="{ item }" />
                </template>
              </Item>
            </template>
          </div>
        </el-scrollbar>
      </li>
    </ul>

    <!-- 滚动到顶部按钮 -->
    <el-button
      v-show="showScrollTop"
      class="scroll-to-top-btn"
      circle
      @click="scrollToTop"
    >
      <el-icon><Top /></el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.conversations-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.conversations-list {
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.conversations-search {
  z-index: 10;
  background-color: inherit;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
}

.conversations-scroll-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;

  /* 在右侧添加留白区域 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px; /* 右侧留白宽度 */
    height: 100%;
    background-color: transparent;
    pointer-events: none; /* 确保不影响交互 */
  }
}

.scroll-content {
  min-height: 100%;
  padding-bottom: 20px;
}

.loading-more {
  text-align: center;
  padding: 10px 0;
  color: #909399;
  font-size: 14px;
}

.conversation-group {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .conversation-group-title {
    font-size: 14px;
    color: #909399;
    padding: 8px 10px;
    font-weight: 500;
    margin-bottom: 4px;
    border-radius: 4px;
    width: 100%;
    margin-right: -10px; /* 负边距让元素向右延伸 */
  }

  .sticky-title {
    position: sticky;
    top: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .active-sticky {
    z-index: 10;
  }
}

.scroll-to-top-btn {
  position: absolute;
  right: 24px;
  bottom: 16px;
  z-index: 99;
  opacity: 0.8;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
}

/* 自定义滚动条样式 */
.custom-scrollbar {
  /* 调整滚动条样式 */
  :deep(.el-scrollbar__bar.is-vertical) {
    right: 0px !important; /* 滚动条位置 */
    width: 6px !important; /* 调整滚动条宽度 */
  }

  :deep(.el-scrollbar__thumb) {
    background-color: rgba(144, 147, 153, 0.5) !important; /* 设置滚动条颜色为半透明灰色 */
  }

  /* 移除原始滚动条的轨道 */
  :deep(.el-scrollbar__wrap) {
    margin-right: -10px !important; /* 调整这个值控制滚动条位置 */
    padding-right: 26px !important; /* 为内容添加右侧填充，从20px增加到30px，为title提供更多空间 */
  }
}
</style>
