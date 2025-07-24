<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';

// 定义组件属性，接收父组件传入的宽度，默认500px
const props = defineProps({
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 500
  }
});

console.log(props);

// 卡片状态
const isHovered = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const cardWidth = ref(0);
const cardHeight = ref(0);
const angleOffset = ref(0);

// 处理鼠标进入
function handleMouseEnter(e: MouseEvent) {
  isHovered.value = true;
  // 获取卡片尺寸
  const target = e.currentTarget as HTMLElement;
  cardWidth.value = target.offsetWidth;
  cardHeight.value = target.offsetHeight;

  // 启动渐变动画
  const animateAngle = () => {
    if (isHovered.value) {
      angleOffset.value = (angleOffset.value + 1) % 360;
      requestAnimationFrame(animateAngle);
    }
  };
  requestAnimationFrame(animateAngle);
}

// 处理鼠标离开
function handleMouseLeave() {
  isHovered.value = false;
}

// 处理鼠标移动
function handleMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  // 计算鼠标在卡片内的相对位置 (0-1范围)
  mouseX.value = (e.clientX - rect.left) / rect.width;
  mouseY.value = (e.clientY - rect.top) / rect.height;
}

// 计算卡片变换样式
const cardStyles = computed(() => {
  if (!isHovered.value) {
    return {
      transform: 'perspective(1000px) rotateX(0) rotateY(0)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    };
  }

  // 计算旋转角度 (-8到8度之间)
  const rotateX = (mouseY.value - 0.5) * 16;
  const rotateY = (0.5 - mouseX.value) * 16;

  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    boxShadow: `
      ${(0.5 - mouseX.value) * 20}px 
      ${(0.5 - mouseY.value) * 20}px 
      30px -10px rgba(0, 0, 0, 0.15)
    `
  };
});

// 计算边框渐变样式
const borderGradientStyle = computed(() => {
  // 计算鼠标位置对应的角度
  const mouseAngle =
    Math.atan2(mouseY.value - 0.5, mouseX.value - 0.5) * (180 / Math.PI) + 90;

  // 结合流动动画的角度偏移
  const totalAngle = (mouseAngle + angleOffset.value) % 360;

  return {
    background: `conic-gradient(
      from ${totalAngle}deg,
      #4facfe 0%,
      #00f2fe 20%,
      #4facfe 40%,
      #00f2fe 60%,
      #4facfe 80%,
      #00f2fe 100%
    )`,
    opacity: 1
  };
});
</script>

<template>
  <div
    class="card-container relative cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white p-6 transition-all duration-300 ease-out"
    :style="[cardStyles, { width: `${width}px`, height: `${height}px` }]"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 卡片内容插槽 -->
    <slot />

    <!-- 渐变边框效果层 -->
    <div
      v-if="isHovered"
      class="absolute -inset-[1px] rounded-lg opacity-0 blur-sm transition-opacity duration-300"
      :style="borderGradientStyle"
    />
    <!-- 边框遮罩层 -->
    <div
      class="absolute -inset-[1px] rounded-lg bg-white [mask-clip:padding-box] [mask-composite:exclude]"
    />
  </div>
</template>

<style scoped>
.card-container {
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* 用于增强3D效果的伪元素 */
.card-container::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateZ(-1px);
}
</style>
