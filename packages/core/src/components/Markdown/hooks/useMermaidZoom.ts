import type {
  MermaidZoomControls,
  UseMermaidZoomOptions
} from '../components/Mermaid/types';
import { onUnmounted, watch } from 'vue';

export function useMermaidZoom(
  options: UseMermaidZoomOptions
): MermaidZoomControls {
  const { container } = options;

  let removeEvents: (() => void) | null = null;

  const addZoomEvents = (containerElement: HTMLElement) => {
    // 查找 .mermaid-content 元素
    const mermaidContent = containerElement.querySelector(
      '.mermaid-content'
    ) as HTMLElement;
    if (!mermaidContent) {
      console.warn('未找到.mermaid-content 元素');
      return () => {};
    }

    // 等待 SVG 渲染完成
    const svg = mermaidContent.querySelector('svg');
    if (!svg) {
      console.warn('未找到 SVG 元素');
      return () => {};
    }

    // 使用 .mermaid-content 作为容器，SVG 作为内容
    const content = svg as unknown as HTMLElement;

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX: number, startY: number;
    let initialDistance: number;
    let initialScale = 1;

    const updateTransform = () => {
      content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    };

    // 处理拖拽和单指移动
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true;
        startX = event.touches[0].clientX - posX;
        startY = event.touches[0].clientY - posY;
      } else if (event.touches.length === 2) {
        initialDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale = scale;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (isDragging && event.touches.length === 1) {
        posX = event.touches[0].clientX - startX;
        posY = event.touches[0].clientY - startY;
        updateTransform();
      } else if (event.touches.length === 2) {
        const newDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        const scaleChange = newDistance / initialDistance;
        const previousScale = scale;
        scale = initialScale * (1 + (scaleChange - 1)); // 调整缩放速度

        // 计算双指中心点
        const centerX =
          (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const centerY =
          (event.touches[0].clientY + event.touches[1].clientY) / 2;

        // 获取内容区域的边界
        const rect = content.getBoundingClientRect();
        // 计算相对位置
        const relativeX = (centerX - rect.left) / previousScale;
        const relativeY = (centerY - rect.top) / previousScale;

        // 调整 posX 和 posY 使得缩放发生在双指中心
        posX -= relativeX * (scale - previousScale);
        posY -= relativeY * (scale - previousScale);

        updateTransform();
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    // PC 端缩放功能
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scaleAmount = 0.02; // 缩放速度
      const previousScale = scale;

      if (event.deltaY < 0) {
        scale += scaleAmount;
      } else {
        scale = Math.max(0.1, scale - scaleAmount);
      }

      // 计算鼠标相对于内容的位置
      const rect = content.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // 调整 posX 和 posY，以使缩放中心为鼠标位置
      posX -= (mouseX / previousScale) * (scale - previousScale);
      posY -= (mouseY / previousScale) * (scale - previousScale);

      updateTransform();
    };

    // PC 端拖拽功能
    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isDragging = true;
      startX = event.clientX - posX;
      startY = event.clientY - posY;

      // 添加拖拽样式
      containerElement.classList.add('dragging');
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        posX = event.clientX - startX;
        posY = event.clientY - startY;
        updateTransform();
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      containerElement.classList.remove('dragging');
      document.body.style.userSelect = '';
    };

    const onMouseLeave = () => {
      isDragging = false;
      containerElement.classList.remove('dragging');
      document.body.style.userSelect = '';
    };

    // 将事件绑定到 mermaidContent（包含 SVG 的容器）
    mermaidContent.addEventListener('touchstart', onTouchStart, {
      passive: false
    });
    mermaidContent.addEventListener('touchmove', onTouchMove, {
      passive: false
    });
    mermaidContent.addEventListener('touchend', onTouchEnd);
    mermaidContent.addEventListener('wheel', onWheel, { passive: false });
    mermaidContent.addEventListener('mousedown', onMouseDown);
    mermaidContent.addEventListener('mousemove', onMouseMove);
    mermaidContent.addEventListener('mouseup', onMouseUp);
    mermaidContent.addEventListener('mouseleave', onMouseLeave);

    // 返回清理函数
    return () => {
      mermaidContent.removeEventListener('touchstart', onTouchStart);
      mermaidContent.removeEventListener('touchmove', onTouchMove);
      mermaidContent.removeEventListener('touchend', onTouchEnd);
      mermaidContent.removeEventListener('wheel', onWheel);
      mermaidContent.removeEventListener('mousedown', onMouseDown);
      mermaidContent.removeEventListener('mousemove', onMouseMove);
      mermaidContent.removeEventListener('mouseup', onMouseUp);
      mermaidContent.removeEventListener('mouseleave', onMouseLeave);

      // 确保清理时恢复文字选择
      document.body.style.userSelect = '';
      containerElement.classList.remove('dragging');
    };
  };

  const initializeZoom = () => {
    if (!container.value) return;

    // 添加缩放功能
    removeEvents = addZoomEvents(container.value);
  };

  // 工具栏按钮的缩放功能
  const zoomIn = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector('.mermaid-content');
      if (mermaidContent) {
        // 手动触发放大
        const event = new WheelEvent('wheel', {
          deltaY: -1,
          clientX:
            mermaidContent.getBoundingClientRect().left +
            mermaidContent.clientWidth / 2,
          clientY:
            mermaidContent.getBoundingClientRect().top +
            mermaidContent.clientHeight / 2
        });
        mermaidContent.dispatchEvent(event);
      }
    }
  };

  const zoomOut = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector('.mermaid-content');
      if (mermaidContent) {
        // 手动触发缩小
        const event = new WheelEvent('wheel', {
          deltaY: 1,
          clientX:
            mermaidContent.getBoundingClientRect().left +
            mermaidContent.clientWidth / 2,
          clientY:
            mermaidContent.getBoundingClientRect().top +
            mermaidContent.clientHeight / 2
        });
        mermaidContent.dispatchEvent(event);
      }
    }
  };

  const reset = () => {
    if (container.value) {
      const svg = container.value.querySelector(
        '.mermaid-content svg'
      ) as HTMLElement;
      if (svg) {
        svg.style.transform = 'translate(0px, 0px) scale(1)';
      }
    }
  };

  const fullscreen = () => {
    if (!container.value) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.value.requestFullscreen?.() ||
        (container.value as any).webkitRequestFullscreen?.() ||
        (container.value as any).mozRequestFullScreen?.() ||
        (container.value as any).msRequestFullscreen?.();
    }
  };

  const destroy = () => {
    if (removeEvents) {
      removeEvents();
      removeEvents = null;
    }
  };

  // 手动初始化方法（带重试机制）
  const initialize = () => {
    if (!container.value) {
      return;
    }

    // 智能重试机制
    const tryInitialize = (retryCount = 0, maxRetries = 5) => {
      const mermaidContent = container.value?.querySelector('.mermaid-content');
      const svg = mermaidContent?.querySelector('svg');

      if (mermaidContent && svg) {
        // DOM 元素存在，立即初始化
        initializeZoom();
      } else if (retryCount < maxRetries) {
        //  requestAnimationFrame 重试
        requestAnimationFrame(() => {
          tryInitialize(retryCount + 1, maxRetries);
        });
      }
    };

    tryInitialize();
  };

  // 监听容器变化（但不立即初始化）
  watch(
    () => container.value,
    () => {
      if (removeEvents) {
        removeEvents();
        removeEvents = null;
      }
    }
  );

  // 组件卸载时清理
  onUnmounted(() => {
    destroy();
  });

  return {
    zoomIn,
    zoomOut,
    reset,
    fullscreen,
    destroy,
    initialize
  };
}
