import type {
  MermaidZoomControls,
  UseMermaidZoomOptions
} from '../components/Mermaid/types';
import { onUnmounted, ref, watch } from 'vue';

export function useMermaidZoom(
  options: UseMermaidZoomOptions
): MermaidZoomControls {
  const { container } = options;

  const scale = ref(1);
  const posX = ref(0);
  const posY = ref(0);
  const isDragging = ref(false);
  const startX = ref(0);
  const startY = ref(0);
  const initialDistance = ref(0);
  const initialScale = ref(1);

  let removeEvents: (() => void) | null = null;

  // 更新函数
  const updateTransform = (content: HTMLElement) => {
    content.style.transformOrigin = `center center`;
    content.style.transform = `translate(${posX.value}px, ${posY.value}px) scale(${scale.value})`;
  };

  // 重置所有状态的函数
  const resetState = () => {
    scale.value = 1;
    posX.value = 0;
    posY.value = 0;
    isDragging.value = false;
    startX.value = 0;
    startY.value = 0;
    initialDistance.value = 0;
    initialScale.value = 1;
  };

  const addZoomEvents = (containerElement: HTMLElement) => {
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

    // 使用 SVG 作为变换目标
    const content = svg as unknown as HTMLElement;

    // 处理拖拽和单指移动
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging.value = true;
        startX.value = event.touches[0].clientX - posX.value;
        startY.value = event.touches[0].clientY - posY.value;
      } else if (event.touches.length === 2) {
        initialDistance.value = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale.value = scale.value;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (isDragging.value && event.touches.length === 1) {
        posX.value = event.touches[0].clientX - startX.value;
        posY.value = event.touches[0].clientY - startY.value;
        updateTransform(content);
      } else if (event.touches.length === 2) {
        const newDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        const scaleChange = newDistance / initialDistance.value;
        const previousScale = scale.value;

        // 计算双指中心点相对于容器的位置
        const containerRect = mermaidContent.getBoundingClientRect();
        const centerX =
          (event.touches[0].clientX + event.touches[1].clientX) / 2 -
          containerRect.left;
        const centerY =
          (event.touches[0].clientY + event.touches[1].clientY) / 2 -
          containerRect.top;

        // 计算双指中心点在当前变换下对应的内容坐标
        const contentX = (centerX - posX.value) / previousScale;
        const contentY = (centerY - posY.value) / previousScale;

        // 更新缩放
        scale.value = initialScale.value * scaleChange;

        // 重新计算translate，使得相同的内容坐标仍然在双指中心
        posX.value = centerX - contentX * scale.value;
        posY.value = centerY - contentY * scale.value;

        updateTransform(content);
      }
    };

    const onTouchEnd = () => {
      isDragging.value = false;
    };

    // 滚轮事件处理 - 禁用鼠标滚轮缩放，允许页面正常滚动
    const onWheel = (_event: WheelEvent) => {
      // 不做任何处理，允许页面正常滚动
      // 工具栏按钮现在使用直接的缩放逻辑
    };

    // PC 端拖拽功能
    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isDragging.value = true;
      startX.value = event.clientX - posX.value;
      startY.value = event.clientY - posY.value;

      // 添加拖拽样式
      containerElement.classList.add('dragging');
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging.value) {
        posX.value = event.clientX - startX.value;
        posY.value = event.clientY - startY.value;
        updateTransform(content);
      }
    };

    const onMouseUp = () => {
      isDragging.value = false;
      containerElement.classList.remove('dragging');
      document.body.style.userSelect = '';
    };

    const onMouseLeave = () => {
      isDragging.value = false;
      containerElement.classList.remove('dragging');
      document.body.style.userSelect = '';
    };

    // 初始化变换原点和变换
    updateTransform(content);

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

  // 全屏状态变化时重新初始化
  const handleFullscreenChange = () => {
    setTimeout(() => {
      if (removeEvents) {
        removeEvents();
        removeEvents = null;
      }
      if (container.value) {
        const mermaidContent = container.value.querySelector(
          '.mermaid-content'
        ) as HTMLElement;
        const svg = container.value.querySelector(
          '.mermaid-content svg'
        ) as HTMLElement;
        if (svg && mermaidContent) {
          // 重置DOM和状态
          resetState();
          updateTransform(svg);
        }
        initializeZoom();
      }
    }, 200);
  };

  const zoomIn = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector(
        '.mermaid-content'
      ) as HTMLElement;
      const svg = container.value.querySelector(
        '.mermaid-content svg'
      ) as HTMLElement;
      if (svg && mermaidContent) {
        const zoomStep = 0.2;
        const maxScale = 10;
        const newScale = Math.min(scale.value + zoomStep, maxScale);

        if (Math.abs(newScale - scale.value) > 0.001) {
          // 简单更新缩放，不修改位置
          // transform-origin 已经设置为容器中心，CSS会自动处理居中缩放
          scale.value = newScale;
          updateTransform(svg);
        }
      }
    }
  };

  const zoomOut = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector(
        '.mermaid-content'
      ) as HTMLElement;
      const svg = container.value.querySelector(
        '.mermaid-content svg'
      ) as HTMLElement;
      if (svg && mermaidContent) {
        const zoomStep = 0.2;
        const minScale = 0.1;
        const newScale = Math.max(scale.value - zoomStep, minScale);

        if (Math.abs(newScale - scale.value) > 0.001) {
          // 简单更新缩放，不修改位置
          // transform-origin 已经设置为容器中心，CSS会自动处理居中缩放
          scale.value = newScale;
          updateTransform(svg);
        }
      }
    }
  };

  const reset = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector(
        '.mermaid-content'
      ) as HTMLElement;
      const svg = container.value.querySelector(
        '.mermaid-content svg'
      ) as HTMLElement;
      if (svg && mermaidContent) {
        // 同时重置状态和DOM
        resetState();
        updateTransform(svg);
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
    // 重置状态
    resetState();
    // 移除全屏事件监听
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener(
      'webkitfullscreenchange',
      handleFullscreenChange
    );
    document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
  };

  const initialize = () => {
    if (!container.value) return;
    // 初始化时重置状态
    resetState();
    // 如果图表没有加载完成, 则需要等待图表加载完成后再初始化
    const tryInitialize = (retryCount = 0, maxRetries = 5) => {
      const mermaidContent = container.value?.querySelector('.mermaid-content');
      const svg = mermaidContent?.querySelector('svg');

      if (mermaidContent && svg) {
        initializeZoom();
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener(
          'webkitfullscreenchange',
          handleFullscreenChange
        );
        document.addEventListener(
          'mozfullscreenchange',
          handleFullscreenChange
        );
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
      } else if (retryCount < maxRetries) {
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
      // 重置状态
      resetState();
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
