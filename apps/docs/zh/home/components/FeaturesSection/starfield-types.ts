// 星星类型定义
export interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  blinkSpeed: number;
  blinkRange: number;
  phase: number;
  opacity: number;
}

// 流星类型定义
export interface Meteor {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  length: number;
  widthVal: number;
  colorIndex: number;
  totalX: number;
  totalY: number;
  duration: number;
  elapsed: number;
}

// 流星动画配置
export interface MeteorAnimationConfig {
  fixedAngle: number;
  minSpeed: number;
  maxSpeed: number;
  minInterval: number;
  maxInterval: number;
  minDistance: number;
  maxDistance: number;
}

// 星星动画配置
export interface StarAnimationConfig {
  minBlinkSpeed: number;
  maxBlinkSpeed: number;
  minBlinkRange: number;
  maxBlinkRange: number;
}
