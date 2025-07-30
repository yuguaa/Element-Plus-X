import { gsap } from 'gsap';

// 色圈配置类型
export interface TechCircleConfig {
  id: number;
  size: number;
  maxSize: number;
  x: number;
  y: number;
  color: string;
  blur: number;
  duration: number;
  delay: number;
}

// 科技感颜色集合
const TECH_COLORS = [
  'rgba(0, 121, 255, 0.2)', // 科技蓝
  'rgba(120, 53, 255, 0.2)', // 科技紫
  'rgba(0, 255, 200, 0.2)', // 科技青
  'rgba(255, 99, 200, 0.15)', // 科技粉
  'rgba(255, 165, 0, 0.2)' // 可爱橙
];

export class TechCircleManager {
  private container: HTMLElement;
  private circles: TechCircleConfig[] = [];
  private circleElements: HTMLElement[] = [];
  private animations: gsap.core.Timeline[] = [];

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`未找到ID为${containerId}的容器元素`);
    }
    this.container = container;
  }

  /** 创建背景色圈 */
  createCircles(count: number = 6) {
    // 清空现有元素
    this.clear();

    // 创建新的色圈配置
    this.circles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 200 + Math.random() * 400, // 初始大小
      maxSize: 300 + Math.random() * 600, // 最大大小（呼吸效果）
      x: Math.random() * 100, // X轴位置（百分比）
      y: Math.random() * 100, // Y轴位置（百分比）
      color: TECH_COLORS[Math.floor(Math.random() * TECH_COLORS.length)],
      blur: 80 + Math.random() * 100, // 模糊程度
      duration: 8 + Math.random() * 12, // 动画周期（秒）
      delay: Math.random() * 5 // 延迟时间（秒）
    }));

    // 渲染色圈并添加动画
    this.circles.forEach(config => {
      this.renderCircle(config);
    });
  }

  /** 渲染单个色圈 */
  private renderCircle(config: TechCircleConfig) {
    const circle = document.createElement('div');
    circle.id = `tech-circle-${config.id}`;
    circle.className = 'tech-background-circle';

    // 设置基础样式
    Object.assign(circle.style, {
      position: 'absolute',
      width: `${config.size}px`,
      height: `${config.size}px`,
      left: `${config.x}%`,
      top: `${config.y}%`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      filter: `blur(${config.blur}px)`,
      background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
      pointerEvents: 'none',
      zIndex: '1'
    });

    this.container.appendChild(circle);
    this.circleElements.push(circle);

    // 创建呼吸动画
    const timeline = gsap.timeline({
      repeat: -1, // 无限重复
      yoyo: true, // 往返动画
      delay: config.delay
    });

    timeline.to(circle, {
      width: `${config.maxSize}px`,
      height: `${config.maxSize}px`,
      duration: config.duration,
      ease: 'sine.inOut' // 缓动效果，使动画更自然
    });

    this.animations.push(timeline);
  }

  /** 清除所有色圈和动画 */
  clear() {
    // 销毁动画
    this.animations.forEach(anim => anim.kill());
    this.animations = [];

    // 移除DOM元素
    this.circleElements.forEach(el => el.remove());
    this.circleElements = [];

    this.circles = [];
  }
}
