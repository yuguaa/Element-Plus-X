<script setup lang="ts">
import type { WelcomeProps } from './types.d.ts';

const props = withDefaults(defineProps<WelcomeProps>(), {
  variant: 'filled' as const,
  direction: 'ltr' as const
});

const solts = defineSlots();
const {
  prefixCls,
  className,
  rootClassName,
  variant,
  direction,
  classNames,
  icon,
  title,
  extra,
  description,
  style,
  styles
} = toRefs(props);
// 提取计算逻辑到独立函数
function getContainerClass() {
  return [
    prefixCls.value || 'welcome',
    className.value,
    rootClassName.value,
    `welcome-${variant.value}`,
    {
      'welcome-rtl': direction.value === 'rtl'
    }
  ];
}

const getIconClass = () => classNames.value?.icon;
const getTitleClass = () => classNames.value?.title;
const getExtraClass = () => classNames.value?.extra;
const getDescriptionClass = () => classNames.value?.description;

const hasIcon = computed(() => !!icon.value);
const hasTitleOrExtra = computed(() => !!title.value || !!extra.value);
const hasExtraOrSlot = computed(() => !!extra.value || !!solts.extra);
const hasDescription = computed(() => !!description.value);

const containerClass = computed(getContainerClass);
const iconClass = computed(getIconClass);
const titleClass = computed(getTitleClass);
const extraClass = computed(getExtraClass);
const descriptionClass = computed(getDescriptionClass);
</script>

<template>
  <div :class="containerClass" :style="style" class="welcome-container">
    <!-- S image -->
    <slot name="image">
      <div
        v-if="hasIcon"
        :class="iconClass"
        :style="styles?.icon"
        class="welcome-icon"
      >
        <el-image :src="icon" class="icon-image" />
      </div>
    </slot>
    <!-- E image -->

    <div class="content-wrapper">
      <!-- S 标题 & Extra -->
      <div v-if="hasTitleOrExtra" class="title-wrapper">
        <div
          v-if="title"
          :class="titleClass"
          :style="styles?.title"
          class="welcome-title"
        >
          {{ title }}
        </div>
        <div
          v-if="hasExtraOrSlot"
          :class="extraClass"
          :style="styles?.extra"
          class="welcome-extra"
        >
          <slot name="extra">
            {{ extra }}
          </slot>
        </div>
      </div>
      <!-- E 标题 & Extra -->

      <!-- S 描述信息 -->
      <div
        v-if="hasDescription"
        :class="descriptionClass"
        :style="styles?.description"
        class="welcome-description"
      >
        {{ description }}
      </div>
      <!-- E 描述信息 -->
    </div>
  </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>
