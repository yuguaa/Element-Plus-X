import { gsap } from 'gsap';

/**
 * 计算卡片旋转角度
 * @param rect 卡片DOM矩形信息
 * @param x 鼠标X坐标
 * @param y 鼠标Y坐标
 * @returns 旋转角度
 */
export function calculateCardRotation(rect: DOMRect, x: number, y: number) {
  return {
    xRotation: ((y - rect.height / 2) / rect.height) * 10,
    yRotation: ((rect.width / 2 - x) / rect.width) * 10
  };
}

/**
 * 创建卡片旋转动画
 * @param element 目标元素
 * @param xRotation X轴旋转角度
 * @param yRotation Y轴旋转角度
 * @param duration 动画时长
 * @returns GSAP动画实例
 */
export function createRotationTween(
  element: HTMLElement,
  xRotation: number,
  yRotation: number,
  duration: number = 0.3
): gsap.core.Tween {
  // 修复类型
  return gsap.to(element, {
    rotationX: xRotation,
    rotationY: yRotation,
    transformPerspective: 1000,
    duration,
    ease: 'power1.out'
  });
}

/**
 * 重置卡片旋转状态
 * @param element 目标元素
 * @param duration 动画时长
 * @returns GSAP动画实例
 */
export function resetRotationTween(
  element: HTMLElement,
  duration: number = 0.5
): gsap.core.Tween {
  // 修复类型
  return gsap.to(element, {
    rotationX: 0,
    rotationY: 0,
    duration,
    ease: 'power1.out'
  });
}
