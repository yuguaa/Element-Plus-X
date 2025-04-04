<script lang='ts' setup generic="T = ThinkingItemBase">
import type { ElTimeline } from 'element-plus'
import type { ThinkingInstance, ThinkingItemBase, ThinkingProps, ThinkType } from './types'
import { Loading, Check, Close } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { Typewriter } from '../../components'
import { get } from 'radash';

const props = withDefaults(defineProps<ThinkingProps<T>>(), {
  thinkingItems: () => [],
  dotSize: 'default',
  maxWidth: '600px',
  lineGradient: false,
  rowKey: 'id',
  statusKey: 'status',
  statusEnum: () => ({
    loading: {
      value: 'loading',
      type: 'warning',
    },
    error: {
      value: 'error',
      type: 'danger',
    },
    success: {
      value: 'success',
      type: 'success',
    },
  }),
  titleKey: 'title',
  thinkTitleKey: 'thinkTitle',
  thinkContentKey: 'thinkContent'
})

const emits = defineEmits<{
  handleExpand: [value: ThinkingInstance['expandKeys']]
}>()

const dotMargin = computed(() => {
  switch (props.dotSize) {
    case 'small':
      return '-4px 0 0 -7px'
    case 'large':
      return '-11px 0 0 -15px'
    default:
      return '-8px 0 0 -11px'
  }
})

const colorArr: Record<ThinkType, string> = {
  info: 'var(--el-color-primary)',
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  primary: 'var(--el-color-primary)',
}

const timelineRef = ref<InstanceType<typeof ElTimeline>>()

const getLineColor = computed(() => {
  if (props.thinkingItems.length && props.thinkingItems.length) {
    const arr = props.thinkingItems.map((item) => {
      const _type_ = getType(item)
      if (_type_) {
        return colorArr[_type_]
      }
      return ''
    })

    return arr
  }
  return []
})

// 计算默认展开项
const activeNamesComputed = computed(() =>
  props.thinkingItems
    .filter(item => item.isCanExpand && item.isDefaultExpand)
    .map(item => String(getId(item))),
)

const defaultActiveNodes = ref<string[]>([...activeNamesComputed.value])

function handleExpand(activeNames: string[]) {
  emits('handleExpand', activeNames)
}

function setRadialGradient(colors: typeof getLineColor.value, ele: HTMLElement[]) {
  const length = ele.length
  Array.from(ele).forEach((item, index) => {
    const line = item.children[0]
    if (line) {
      line.setAttribute('style', `
      border: none;
      width:2px;
      background: linear-gradient(to bottom, ${colors[index]} 0% , ${colors[index < length ? index + 1 : index]} 100%);
    `)
    }
  })
}

function getEle() {
  if (getLineColor.value && timelineRef.value && props.lineGradient) {
    const ele = timelineRef.value.$el.children[0].children
    setRadialGradient(getLineColor.value, ele)
  }
}

function isLoading(item: T): boolean {
  const status = getStatus(item)
  return status === props.statusEnum.loading.value
}

function isError(item: T): boolean {
  const status = getStatus(item)
  return status === props.statusEnum.error.value
}

function getId(item: T) {
  return get(item, props.rowKey)
}

function getType(item: T): ThinkType {
  const status = getStatus(item)
  return props.statusEnum[status as keyof typeof props.statusEnum]?.type ?? 'success'
}

function getTitle(item: T) {
  return get(item, props.titleKey) as string ?? ''
}

function getThinkTitle(item: T) {
  return get(item, props.thinkTitleKey) as string ?? ''
}
function getThinkContent(item: T) {
  return get(item, props.thinkContentKey) as string ?? ''
}

function getStatus(item: T) {
  return get(item, props.statusKey)
}


watch(() => activeNamesComputed.value, (v) => {
  defaultActiveNodes.value = [...v]
})

watch(() => getLineColor.value, () => {
  getEle()
})

onMounted(() => {
  getEle()
})
</script>

<template>
  <div class="el-thinking">
    <el-timeline ref="timelineRef" :style="{
      maxWidth: `${maxWidth}`,
    }">
      <TransitionGroup name="thinking" tag="el-timeline-item">
        <el-timeline-item v-for="item in props.thinkingItems" :key="getId(item)" :type="getType(item)"
          :timestamp="getTitle(item)" :hide-timestamp="item.hideTitle" :placement="item.placement ?? 'top'">
          <div v-if="!item.isCanExpand">
            <Typewriter :content="getThinkTitle(item)" :is-markdown="item.isMarkdown" :typing="item.typing" />
          </div>
          <el-collapse v-else-if="!item.isDefaultExpand" @change="handleExpand">
            <el-collapse-item :title="getThinkTitle(item)">
              <Typewriter :content="getThinkContent(item)" :is-markdown="item.isMarkdown" :typing="item.typing" />
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-else-if="item.isDefaultExpand" v-model="defaultActiveNodes" @change="handleExpand">
            <el-collapse-item :title="getThinkTitle(item)" :name="String(getId(item))">
              <Typewriter :content="getThinkContent(item)" :is-markdown="item.isMarkdown" :typing="item.typing" />
            </el-collapse-item>
          </el-collapse>

          <template #dot>
            <div class="el-thinking-item-dot">
              <!-- <el-button
                v-if="!$slots.customDot"
                :size="props.dotSize" :type="item.type" :icon="item.dotIcon" :loading="item.isLoading"
                :loading-icon="item.loadingIcon" circle
              />
              <slot v-else name="customDot" :item="{ ...item }" :parent-props="{ ...props }" /> -->
              <slot name="icon">
                <el-button circle :type="getType(item)" :loading="isLoading(item)">
                  <template #loading>
                    <el-icon class="thinking-loading">
                      <slot name="loading-icon">
                        <Loading />
                      </slot>
                    </el-icon>
                  </template>
                  <template #icon>
                    <el-icon v-if="!isLoading(item)">
                      <slot name="error-icon" v-if="isError(item)">
                        <Close />
                      </slot>
                      <slot name="error-icon" v-else>
                        <Check />
                      </slot>
                    </el-icon>
                  </template>
                </el-button>
              </slot>
            </div>
          </template>
        </el-timeline-item>
      </TransitionGroup>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.el-thinking {
  width: 100%;
  margin: 0 0 0 7px;

  &-item-dot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: v-bind(dotMargin)
  }

  :deep(.el-collapse) {
    border: none;

    .el-collapse-item__header {
      height: 20px;
      font-weight: normal;
    }

    .el-collapse-item__arrow {
      margin: 0 0 0 8px;
    }

    .el-collapse-item__header {
      margin-bottom: 5px;
    }

    .el-collapse-item__header,
    .el-collapse-item__wrap {
      border: none;
    }

    .el-collapse-item__content {
      color: var(--el-text-color-secondary);
      padding: 0;
    }
  }

  :deep(.el-timeline) {
    padding: 10px 0 0 5px;
  }

  :deep(.el-timeline-item__timestamp) {
    color: var(--el-text-color-primary);
  }

  :deep(.el-timeline-item__content) {
    color: var(--el-text-color-secondary);
  }
}

.thinking-move,
.thinking-enter-active,
.thinking-leave-active {
  transition: all 0.5s ease;
}

.thinking-enter-from,
.thinking-leave-to {
  opacity: 0;
  transform: translateY(10px) scaleY(0.9);
}

.thinking-leave-active {
  position: absolute;
}

.thinking-loading{
  animation: rotating 1.5s linear infinite;
  transform-origin: center center;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
