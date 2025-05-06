<script setup lang="ts">
import type { PromptsItemsProps, PromptsProps } from './types'

const props = withDefaults(defineProps<PromptsProps>(), {
  items: () => [],
  title: '',
  wrap: false,
  vertical: false,
  style: () => ({}),
})

const emits = defineEmits(['itemClick'])

const hoveredKeys = ref(new Set())
const activeKeys = ref(new Set())

function handleItemClick(item: PromptsItemsProps) {
  if (item.disabled)
    return
  if (item.children && item.children.length > 0)
    return
  emits('itemClick', item)
}

function handleMouseEnter(key: string | number) {
  hoveredKeys.value.add(key)
}

function handleMouseLeave(key: string | number) {
  hoveredKeys.value.delete(key)
}

function handleMouseDown(key: string | number) {
  activeKeys.value.add(key)
}

function handleMouseUp(key: string | number) {
  activeKeys.value.delete(key)
}

function isHovered(key: string | number) {
  return hoveredKeys.value.has(key)
}

function isActive(key: string | number) {
  return activeKeys.value.has(key)
}
</script>

<template>
  <div class="el-prompts" :style="props.style">
    <slot v-if="$slots.title || props.title" name="title">
      <div class="el-prompts-title">
        {{ title }}
      </div>
    </slot>

    <div
      class="el-prompts-items"
      :class="{
        'el-prompts-items-wrap': props.wrap,
        'el-prompts-items-vertical': props.vertical,
      }"
    >
      <div
        v-for="item in items"
        :key="item.key"
        class="el-prompts-item"
        :class="{
          'el-prompts-item-disabled': item.disabled,
          'el-prompts-item-gap': item.icon || $slots.icon,
          'hovered': isHovered(item.key),
          'actived': isActive(item.key),
        }"
        :style="{
          ...item.itemStyle,
          ...(isHovered(item.key) ? item.itemHoverStyle ? item.itemHoverStyle : {} : {}),
          ...(isActive(item.key) ? item.itemActiveStyle ? item.itemActiveStyle : {} : {}),
        }"
        @click.stop="handleItemClick(item)"
        @mouseenter.stop="handleMouseEnter(item.key)"
        @mouseleave.stop="handleMouseLeave(item.key)"
        @mousedown.stop="handleMouseDown(item.key)"
        @mouseup.stop="handleMouseUp(item.key)"
      >
        <div class="item-content-container">
          <slot v-if="$slots.icon || item.icon" name="icon" :item="item">
            <el-icon class="el-prompts-item-icon">
              <component :is="item.icon" />
            </el-icon>
          </slot>
          <div class="el-prompts-item-content">
            <slot v-if="$slots.label || item.label" name="label" :item="item">
              <h6 class="el-prompts-item-label">
                {{ item.label }}
              </h6>
            </slot>
            <slot v-if="$slots.description || item.description" name="description" :item="item">
              <p class="el-prompts-item-description">
                {{ item.description }}
              </p>
            </slot>
          </div>
          <!-- 递归渲染子项 -->
          <div v-if="item.children && item.children.length > 0" class="el-prompts-children">
            <!-- 递归调用自身，传递子项数据和必要的 props -->
            <index
              :items="item.children"
              vertical
              :style="props.style"
              @item-click="handleItemClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-prompts {
  display: flex;
  flex-direction: column;
  .el-prompts-title {
    margin-block-start: 0;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 0.5em;
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    word-break: break-word;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .el-prompts-items {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scrollbar-width: none;
    list-style: none;
    padding-inline-start: 0;
    margin-block: 0;
    align-items: stretch;
    box-sizing: border-box;
  }

  .el-prompts-items-wrap {
    flex-wrap: wrap;
  }

  .el-prompts-items-vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  .el-prompts-item {
    flex: none;
    display: flex;
    height: 100%;
    padding-block: 12px;
    padding-inline: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    background: #ffffff;
    border-radius: 8px;
    transition: border 0.3s, background 0.3s;
    border: 1px solid #f0f0f0;
  }

  .el-prompts-item-disabled {
    pointer-events: none;
    background: rgba(0, 0, 0, 0.04);
  }

  .el-prompts-item-gap {
    gap: 8px;
  }

  .hovered {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.08);
  }

  .actived {
    background: rgba(0, 0, 0, 0.15);
  }

  .item-content-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .el-prompts-item-content {
    flex: auto;
    min-width: 0;
    display: flex;
    gap: 4px;
    flex-direction: column;
    align-items: flex-start;
    .el-prompts-item-icon {
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 1.5;
      text-align: start;
      white-space: normal;
    }

    .el-prompts-item-label {
      color: rgba(0, 0, 0, 0.88);
      font-weight: 500;
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 1.5;
      text-align: start;
      white-space: normal;
    }
    .el-prompts-item-description {
      color: rgba(0, 0, 0, 0.45);
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 1.5;
      text-align: start;
      white-space: normal;
    }
  }

  // 限制子项的宽度
  .el-prompts-children {
    .el-prompts-items-vertical {
      align-items: initial;
    }
  }
}
</style>
