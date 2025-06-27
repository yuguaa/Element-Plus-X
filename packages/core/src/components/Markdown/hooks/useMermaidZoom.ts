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

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX: number, startY: number;
    let initialDistance: number;
    let initialScale = 1;

    const updateTransform = () => {
      content.style.transformOrigin = '0 0';
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

        // 计算双指中心点相对于容器的位置
        const containerRect = mermaidContent.getBoundingClientRect();
        const centerX =
          (event.touches[0].clientX + event.touches[1].clientX) / 2 -
          containerRect.left;
        const centerY =
          (event.touches[0].clientY + event.touches[1].clientY) / 2 -
          containerRect.top;

        // 计算双指中心点在当前变换下对应的内容坐标
        const contentX = (centerX - posX) / previousScale;
        const contentY = (centerY - posY) / previousScale;

        // 更新缩放
        scale = initialScale * scaleChange;

        // 重新计算translate，使得相同的内容坐标仍然在双指中心
        posX = centerX - contentX * scale;
        posY = centerY - contentY * scale;

        updateTransform();
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    //  PC 端缩放功能 : 需要分情况处理  全屏 和 非全屏 的坐标计算,保持 鼠标在图表上时始终以鼠标中心位置为中心点
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      // 禁用真实的鼠标滚轮缩放，只允许工具栏按钮触发的模拟事件
      if (event.isTrusted) {
        return;
      }

      // 缩放步长调整为更小的值，提供更平滑的缩放体验
      const zoomStep = 0.05;
      const maxScale = 10;
      const minScale = 0.1;

      // 计算新的缩放比例
      let newScale: number;
      if (event.deltaY < 0) {
        newScale = Math.min(scale + zoomStep, maxScale);
      } else {
        newScale = Math.max(scale - zoomStep, minScale);
      }

      // 如果缩放值没有变化，直接返回
      if (Math.abs(newScale - scale) < 0.001) {
        return;
      }
      // 坐标获取
      const getMouseCoordinates = () => {
        const isFullscreen = !!document.fullscreenElement;
        const hasTransform = posX !== 0 || posY !== 0 || scale !== 1;

        let mouseX: number, mouseY: number;
        let method: string;

        if (hasTransform) {
          if (isFullscreen) {
            // 全屏+变换：使用 SVG 边界
            const svg = mermaidContent.querySelector('svg');
            if (svg) {
              const svgRect = svg.getBoundingClientRect();
              mouseX = event.clientX - svgRect.left;
              mouseY = event.clientY - svgRect.top;
              method = 'svg-fullscreen-transformed';
            } else {
              const rect = mermaidContent.getBoundingClientRect();
              mouseX = event.clientX - rect.left;
              mouseY = event.clientY - rect.top;
              method = 'rect-fallback';
            }
          } else {
            // 非全屏+变换：使用容器边界
            const rect = mermaidContent.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
            method = 'rect-transformed';
          }
        } else if (isFullscreen) {
          // 全屏+无变换：使用 offsetX/offsetY
          if (event.offsetX !== undefined && event.offsetY !== undefined) {
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            method = 'offset-fullscreen';
          } else {
            const rect = mermaidContent.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
            method = 'rect-fallback';
          }
        } else {
          // 正常状态：使用 offsetX/offsetY
          if (event.offsetX !== undefined && event.offsetY !== undefined) {
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            method = 'offset-normal';
          } else {
            const rect = mermaidContent.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
            method = 'rect-fallback';
          }
        }

        return { mouseX, mouseY, method, isFullscreen, hasTransform };
      };

      const { mouseX, mouseY, method, isFullscreen, hasTransform } =
        getMouseCoordinates();

      // 计算缩放中心点在内容坐标系中的位置
      let contentCenterX: number, contentCenterY: number;

      if (
        isFullscreen &&
        hasTransform &&
        method === 'svg-fullscreen-transformed'
      ) {
        // 全屏+移动后：直接基于SVG位置计算
        const svg = mermaidContent.querySelector('svg');
        const svgRect = svg!.getBoundingClientRect();
        const mouseRelativeToSvg = {
          x: event.clientX - svgRect.left,
          y: event.clientY - svgRect.top
        };
        contentCenterX = mouseRelativeToSvg.x / scale;
        contentCenterY = mouseRelativeToSvg.y / scale;
      } else {
        contentCenterX = (mouseX - posX) / scale;
        contentCenterY = (mouseY - posY) / scale;
      }

      // 更新缩放
      scale = newScale;

      // 重新计算偏移
      if (
        isFullscreen &&
        hasTransform &&
        method === 'svg-fullscreen-transformed'
      ) {
        const svg = mermaidContent.querySelector('svg');
        const svgRect = svg!.getBoundingClientRect();
        const mouseRelativeToSvg = {
          x: event.clientX - svgRect.left,
          y: event.clientY - svgRect.top
        };
        posX = posX + mouseRelativeToSvg.x - contentCenterX * scale;
        posY = posY + mouseRelativeToSvg.y - contentCenterY * scale;
      } else {
        posX = mouseX - contentCenterX * scale;
        posY = mouseY - contentCenterY * scale;
      }

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

    // 初始化变换原点
    updateTransform();

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
        const svg = container.value.querySelector(
          '.mermaid-content svg'
        ) as HTMLElement;
        if (svg) {
          svg.style.transform = 'translate(0px, 0px) scale(1)';
        }
        initializeZoom();
      }
    }, 200);
  };

  const zoomIn = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector('.mermaid-content');
      if (mermaidContent) {
        const rect = mermaidContent.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const event = new WheelEvent('wheel', {
          deltaY: -100,
          clientX: rect.left + centerX,
          clientY: rect.top + centerY
        });
        mermaidContent.dispatchEvent(event);
      }
    }
  };

  const zoomOut = () => {
    if (container.value) {
      const mermaidContent = container.value.querySelector('.mermaid-content');
      if (mermaidContent) {
        const rect = mermaidContent.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const event = new WheelEvent('wheel', {
          deltaY: 100,
          clientX: rect.left + centerX,
          clientY: rect.top + centerY
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
