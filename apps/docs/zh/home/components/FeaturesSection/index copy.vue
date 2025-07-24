<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import {
  calculateCardRotation,
  createRotationTween,
  resetRotationTween
} from './animation-utils';
import Card from './card.vue';
import {
  METEOR_CONFIG,
  RAINBOW_COLORS,
  StarfieldManager
} from './starfield-manager';
import { TechCircleManager } from './tech-circle-manager'; // 引入新工具类

// DOM引用
const cardWrapRef = ref<HTMLElement | null>(null);
const canvases = ref<(HTMLCanvasElement | null)[]>([]);
// 背景色圈管理器
const circleManager = ref<TechCircleManager | null>(null);
const backgroundContainerRef = ref<HTMLElement | null>(null);

// 状态管理
const items = ref([
  { title: '组件化', desc: '组件化的设计，让你可以方便地在项目中使用。' },
  { title: '可定制', desc: '可定制的设计，让你可以根据项目需求进行定制。' },
  { title: '可扩展', desc: '可扩展的设计，让你可以根据项目需求进行扩展。' },
  { title: '组件化', desc: '组件化的设计，让你可以方便地在项目中使用。' },
  { title: '可定制', desc: '可定制的设计，让你可以根据项目需求进行定制。' },
  { title: '可扩展', desc: '可扩展的设计，让你可以根据项目需求进行扩展。' }
]);

// 动画实例管理
const starfieldManagers = ref<StarfieldManager[]>([]);
const cardTweens = ref<(gsap.core.Tween | null)[]>([]);

/** 处理鼠标移动事件 */
function handleMouseMove(e: MouseEvent, index: number) {
  const card = (e.currentTarget as HTMLElement).closest('.component-card');
  if (!(card instanceof HTMLElement)) return; // 类型检查确保是 HTMLElement

  const rect = card.getBoundingClientRect();
  const { xRotation, yRotation } = calculateCardRotation(
    rect,
    e.clientX - rect.left,
    e.clientY - rect.top
  );

  // 终止现有动画并创建新动画
  cardTweens.value[index]?.kill();
  cardTweens.value[index] = createRotationTween(card, xRotation, yRotation);
}

/** 处理鼠标离开事件 */
function handleMouseLeave(index: number) {
  const targetElement = cardWrapRef.value?.children[index] as HTMLElement;
  if (!targetElement) return;

  cardTweens.value[index]?.kill();
  cardTweens.value[index] = resetRotationTween(targetElement);
}

/** 初始化星空动画 */
async function initStarfields() {
  await nextTick(); // 等待DOM渲染完成
  canvases.value.forEach((canvas, index) => {
    if (!canvas) return;

    // 创建星空管理器并注册更新回调
    const manager = new StarfieldManager(canvas, (stars, meteors) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 清空画布
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // 绘制星星
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 绘制流星
      meteors.forEach(meteor => {
        ctx.save();
        ctx.translate(
          meteor.startX + meteor.currentX,
          meteor.startY + meteor.currentY
        );
        ctx.rotate(((METEOR_CONFIG.fixedAngle + 270) * Math.PI) / 180);

        const gradient = ctx.createLinearGradient(0, 0, 0, meteor.length);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, `${RAINBOW_COLORS[meteor.colorIndex]}0.9)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(
          0,
          meteor.length / 2,
          meteor.widthVal / 2,
          meteor.length / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });
    });

    manager.init();
    starfieldManagers.value[index] = manager;
  });
}

// 初始化背景色圈
function initBackgroundCircles() {
  nextTick(() => {
    if (backgroundContainerRef.value) {
      circleManager.value = new TechCircleManager('tech-background');
      circleManager.value.createCircles(8); // 创建8个色圈
    }
  });
}

// 生命周期
onMounted(() => {
  initBackgroundCircles(); // 初始化背景色圈
  setTimeout(initStarfields, 100); // 初始化星空
});

onUnmounted(() => {
  // 清理背景色圈
  circleManager.value?.clear();

  // 清理星空动画
  starfieldManagers.value.forEach(manager => manager.destroy());
  cardTweens.value.forEach(tween => tween?.kill());
});
</script>

<template>
  <!-- 新增：背景色圈容器 -->
  <div
    id="tech-background"
    ref="backgroundContainerRef"
    class="tech-background-container"
  />
  <div ref="cardWrapRef" class="component-card-wrap">
    <Card v-for="(item, index) in items" :key="index" class="component-card">
      <div
        class="inner-wrap"
        @mousemove="handleMouseMove($event, index)"
        @mouseleave="handleMouseLeave(index)"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <canvas
          :ref="el => el && (canvases[index] = el as HTMLCanvasElement)"
          class="starfield-canvas"
        />
      </div>
    </Card>
  </div>
</template>

<style scoped lang="less">
/* 保持原有样式不变 */
.component-card-wrap {
  max-width: 1380px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  z-index: 10;

  .component-card {
    aspect-ratio: 4/3;
    // 边框
    // background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
    // box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2),
    //         6px 6px 0 rgba(0, 255, 213, 0.1);
    box-shadow:
      0 4px 8px rgba(0, 255, 255, 0.3),
      0 0 20px rgba(0, 255, 255, 0.15);

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: radial-gradient(
        circle,
        rgba(255, 94, 94, 0.8) 0%,
        rgba(255, 179, 71, 0.7) 15%,
        rgba(255, 240, 106, 0.7) 30%,
        rgba(129, 255, 112, 0.6) 45%,
        rgba(112, 193, 255, 0.6) 60%,
        rgba(162, 112, 255, 0.5) 75%,
        transparent 100%
      );
      border-radius: inherit;
      left: var(--border-x, -1000px);
      top: var(--border-y, -1000px);
      transform: translate(-50%, -50%);
    }

    .inner-wrap {
      position: relative;
      height: calc(100% - 2px);
      width: calc(100% - 2px);
      border-radius: inherit;
      color: white;
      inset: 1px;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1rem;
      background: linear-gradient(135deg, #031025, #161f33, #1f273a);

      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        z-index: 10;
      }

      p {
        z-index: 10;
        max-width: 80%;
      }

      .starfield-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        pointer-events: none;
        z-index: 5;
      }
    }
  }
}

/* 重点修改：背景容器样式 */
.tech-background-container {
  position: fixed;
  top: 0;
  left: 0;
  /* 用inset替代width/height，避免vw/vh的滚动条计算问题 */
  inset: 0;
  overflow: hidden; /* 关键：限制内部元素不溢出容器 */
  z-index: 0;
  background-color: #050a1a;

  /* 消除可能的边距影响 */
  margin: 0;
  padding: 0;
}

/* 色圈基础样式补充（确保不会超出容器） */
.tech-background-circle {
  /* 限制色圈最大偏移，避免超出容器 */
  transform: translate(-50%, -50%) scale(1);
  /* 确保色圈不会因为模糊导致边缘溢出被捕捉 */
  will-change: width, height;
}

@media (min-width: 768px) {
  .component-card-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .component-card-wrap {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
