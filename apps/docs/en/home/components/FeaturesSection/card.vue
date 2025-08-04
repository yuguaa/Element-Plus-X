<!-- 卡片 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface CardProps {
  style?: CSSProperties;
}

const props = defineProps<CardProps>();

const cardWrap = ref<HTMLDivElement | null>(null);
// 旋转范围
const xRange = [-20, 20];
const yRange = [-20, 20];

// 卡片移入样式
function handleMouseMove(e: MouseEvent) {
  if (!cardWrap.value) return;
  // 获取鼠标的xy坐标
  const { offsetX, offsetY, clientX, clientY } = e;
  // 获取卡片尺寸
  const { offsetWidth, offsetHeight } = cardWrap.value;

  const { left, top } = cardWrap.value.getBoundingClientRect();

  const x = clientX - left;
  const y = clientY - top;

  const ry = -getRotate(yRange, offsetX, offsetWidth);
  const rx = getRotate(xRange, offsetY, offsetHeight);
  cardWrap.value.style.setProperty('--card-rotate-x', `${rx}deg`);
  cardWrap.value.style.setProperty('--card-rotate-y', `${ry}deg`);
  cardWrap.value.style.setProperty('--border-x', `${x}px`);
  cardWrap.value.style.setProperty('--border-y', `${y}px`);
}

// 恢复样式
function handleMouseLeave() {
  if (!cardWrap.value) return;
  cardWrap.value.style.setProperty('--card-rotate-x', '0deg');
  cardWrap.value.style.setProperty('--card-rotate-y', '0deg');
  cardWrap.value.style.setProperty('--border-x', `-1000px`);
  cardWrap.value.style.setProperty('--border-y', `-1000px`);
}

// 获取旋转角度
function getRotate(range: number[], value: number, max: number) {
  return (value / max) * (range[1] - range[0]) + range[0];
}
</script>

<template>
  <div
    ref="cardWrap"
    class="card-wrap"
    :style="props.style"
    @mousemove.stop="handleMouseMove"
    @mouseleave.stop="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<style scoped lang="less">
.card-wrap {
  transition: 0.25s cubic-bezier(0.25, 0.25, 0.5, 1.5);
  transform: perspective(1000px) rotateX(var(--card-rotate-x, 0deg))
    rotateY(var(--card-rotate-y, 0deg));
}
</style>
