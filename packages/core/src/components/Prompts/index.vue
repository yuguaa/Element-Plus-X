<script setup lang="ts">
import type {
  PromptsEmits,
  PromptsItemsProps,
  PromptsProps
} from './types.d.ts';

const props = withDefaults(defineProps<PromptsProps>(), {
  items: () => [],
  title: '',
  wrap: false,
  vertical: false,
  style: () => ({})
});

const emits = defineEmits<PromptsEmits>();

const hoveredKeys = ref(new Set());
const activeKeys = ref(new Set());

function handleItemClick(item: PromptsItemsProps) {
  if (item.disabled) return;
  if (item.children && item.children.length > 0) return;
  emits('itemClick', item);
}

function handleMouseEnter(key: string | number) {
  hoveredKeys.value.add(key);
}

function handleMouseLeave(key: string | number) {
  hoveredKeys.value.delete(key);
}

function handleMouseDown(key: string | number) {
  activeKeys.value.add(key);
}

function handleMouseUp(key: string | number) {
  activeKeys.value.delete(key);
}

function isHovered(key: string | number) {
  return hoveredKeys.value.has(key);
}

function isActive(key: string | number) {
  return activeKeys.value.has(key);
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
        'el-prompts-items-vertical': props.vertical
      }"
    >
      <div
        v-for="item in items"
        :key="item.key"
        class="el-prompts-item"
        :class="{
          'el-prompts-item-disabled': item.disabled,
          'el-prompts-item-gap': item.icon || $slots.icon,
          hovered: isHovered(item.key),
          actived: isActive(item.key)
        }"
        :style="{
          ...item.itemStyle,
          ...(isHovered(item.key)
            ? item.itemHoverStyle
              ? item.itemHoverStyle
              : {}
            : {}),
          ...(isActive(item.key)
            ? item.itemActiveStyle
              ? item.itemActiveStyle
              : {}
            : {})
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
            <slot
              v-if="$slots.description || item.description"
              name="description"
              :item="item"
            >
              <p class="el-prompts-item-description">
                {{ item.description }}
              </p>
            </slot>
          </div>
          <!-- 递归渲染子项 -->
          <div
            v-if="item.children && item.children.length > 0"
            class="el-prompts-children"
          >
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

<style scoped lang="scss" src="./style.scss"></style>
