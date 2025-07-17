<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { nextTick, onMounted, ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const features = ref([
  {
    title: '🎨 现代设计',
    desc: '基于最新设计规范，提供美观且一致的用户界面组件',
    icon: '🎨'
  },
  {
    title: '⚡ 高性能',
    desc: '优化的组件架构，确保应用快速响应和流畅体验',
    icon: '⚡'
  },
  {
    title: '🔧 易于使用',
    desc: '简洁的API设计，让开发者能够快速上手和集成',
    icon: '🔧'
  },
  {
    title: '📱 响应式',
    desc: '完美适配各种屏幕尺寸，提供一致的跨设备体验',
    icon: '📱'
  },
  {
    title: '🌙 主题定制',
    desc: '灵活的主题系统，支持深色模式和自定义样式',
    icon: '🌙'
  },
  {
    title: '🔒 类型安全',
    desc: '完整的TypeScript支持，提供更好的开发体验',
    icon: '🔒'
  }
]);

const sponsors = ref([
  {
    name: '金牌赞助商',
    logo: '🏆',
    company: 'TechCorp',
    level: 'gold'
  },
  {
    name: '银牌赞助商',
    logo: '🥈',
    company: 'DevStudio',
    level: 'silver'
  },
  {
    name: '铜牌赞助商',
    logo: '🥉',
    company: 'CodeLab',
    level: 'bronze'
  }
]);

const reviews = ref([
  {
    id: 1,
    name: '张开发',
    avatar: '👨‍💻',
    role: '前端工程师',
    company: '阿里巴巴',
    rating: 5,
    content:
      'Element Plus X 真的太好用了！组件设计精美，API 设计合理，大大提升了我们团队的开发效率。特别是暗黑模式的支持，非常贴心。',
    date: '2024-01-15',
    likes: 128
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: '👩‍🎨',
    role: 'UI/UX 设计师',
    company: '腾讯',
    rating: 5,
    content:
      '作为设计师，我对这个组件库的视觉效果非常满意。每个组件都经过精心设计，符合现代审美标准。',
    date: '2024-01-12',
    likes: 95
  },
  {
    id: 3,
    name: '李全栈',
    avatar: '🧑‍💼',
    role: '技术总监',
    company: '字节跳动',
    rating: 5,
    content:
      'TypeScript 支持非常完善，代码提示很准确。我们整个团队都在使用，项目质量有了明显提升。强烈推荐！',
    date: '2024-01-10',
    likes: 156
  },
  {
    id: 4,
    name: 'Mike Johnson',
    avatar: '👨‍🔬',
    role: '高级开发者',
    company: 'Microsoft',
    rating: 4,
    content:
      '组件库功能丰富，文档详细。唯一的建议是希望能增加更多的自定义主题选项。',
    date: '2024-01-08',
    likes: 73
  },
  {
    id: 5,
    name: '王产品',
    avatar: '👩‍💻',
    role: '产品经理',
    company: '美团',
    rating: 5,
    content:
      '从产品角度来看，这个组件库的用户体验设计得很好，各种交互细节都考虑得很周到。',
    date: '2024-01-05',
    likes: 89
  },
  {
    id: 6,
    name: 'Anna Smith',
    avatar: '👩‍🚀',
    role: '前端架构师',
    company: 'Google',
    rating: 5,
    content:
      '性能优化做得很好，打包体积控制得不错。按需导入功能很实用，减少了不少冗余代码。',
    date: '2024-01-03',
    likes: 142
  },
  {
    id: 7,
    name: '刘创业',
    avatar: '🧑‍💼',
    role: '创始人',
    company: '初创公司',
    rating: 5,
    content:
      '对于我们这种小团队来说，Element Plus X 简直是神器！快速搭建原型，节省了大量开发时间。',
    date: '2024-01-01',
    likes: 67
  },
  {
    id: 8,
    name: 'David Wilson',
    avatar: '👨‍🎓',
    role: '学生开发者',
    company: '清华大学',
    rating: 4,
    content:
      '学习 Vue 3 的时候发现了这个库，文档写得很清楚，示例代码也很详细，对新手很友好。',
    date: '2023-12-28',
    likes: 45
  }
]);

const installCommand = ref('npm install element-plus-x');

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand.value);
    // 可以添加复制成功的提示
  } catch (err) {
    console.error('复制失败:', err);
  }
}

function getTierName(tier: string) {
  const tierNames = {
    gold: '🏆 金牌赞助商',
    silver: '🥈 银牌赞助商',
    bronze: '🥉 铜牌赞助商'
  };
  return tierNames[tier as keyof typeof tierNames] || tier;
}

onMounted(async () => {
  // 流动渐变背景动画
  gsap.to('.music-gradient', {
    backgroundPosition: '200% 50%',
    duration: 12,
    repeat: -1,
    ease: 'none'
  });

  // 音乐粒子流动效果
  gsap.utils.toArray('.music-particle').forEach((particle: any, i: number) => {
    gsap.to(particle, {
      x: 'random(-120, 120)',
      y: 'random(-60, 60)',
      opacity: 'random(0.4, 0.9)',
      duration: 'random(4, 8)',
      repeat: -1,
      yoyo: true,
      delay: i * 0.3,
      ease: 'sine.inOut'
    });
  });

  // 新首屏动画效果
  // 超大标题入场动画
  gsap.fromTo(
    '.mega-text',
    {
      scale: 0.5,
      opacity: 0,
      rotationX: -90
    },
    {
      scale: 1,
      opacity: 1,
      rotationX: 0,
      duration: 1.5,
      ease: 'back.out(1.7)',
      delay: 0.5
    }
  );

  // 徽章和标语动画
  gsap.fromTo(
    '.badge-text',
    {
      y: -50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2
    }
  );

  gsap.fromTo(
    '.tagline-text',
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 1.8
    }
  );

  // 特性卡片动画
  gsap.utils.toArray('.feature-glitch-card').forEach((card: any, i: number) => {
    gsap.fromTo(
      card,
      {
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 2.2 + i * 0.2
      }
    );
  });

  // 按钮动画
  gsap.utils.toArray('.glitch-btn').forEach((btn: any, i: number) => {
    gsap.fromTo(
      btn,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 3.0 + i * 0.1
      }
    );
  });

  // 数据统计动画
  gsap.utils.toArray('.metric-item').forEach((item: any, i: number) => {
    gsap.fromTo(
      item,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 3.5 + i * 0.1
      }
    );
  });

  // 装饰元素动画
  gsap.fromTo(
    '.tech-stack',
    {
      x: -100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 2.5
    }
  );

  gsap.fromTo(
    '.version-info',
    {
      x: 100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 2.7
    }
  );

  // 浮动元素动画
  gsap.utils.toArray('.float-item').forEach((item: any, i: number) => {
    gsap.to(item, {
      y: 'random(-20, 20)',
      x: 'random(-15, 15)',
      rotation: 'random(-5, 5)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      delay: i * 0.5,
      ease: 'sine.inOut'
    });
  });

  // 横幅广告动画时间线
  const bannerTl = gsap.timeline();

  // 横幅整体滑入
  bannerTl
    .fromTo(
      '.hero-banner',
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }
    )
    // 图标旋转进入
    .fromTo(
      '.banner-icon',
      {
        scale: 0,
        rotation: -360,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      },
      '-=0.4'
    )
    // 文字从左侧滑入
    .fromTo(
      '.banner-text',
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      },
      '-=0.6'
    )
    // CTA按钮弹跳进入
    .fromTo(
      '.banner-cta',
      {
        scale: 0,
        opacity: 0,
        rotation: 10
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      },
      '-=0.4'
    );

  // 横幅CTA按钮交互动画
  const bannerCta = document.querySelector('.banner-cta');
  if (bannerCta) {
    // 悬停动画
    bannerCta.addEventListener('mouseenter', () => {
      gsap.to('.cta-arrow', {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to('.banner-cta', {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
      // 添加发光效果
      gsap.to('.banner-cta', {
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    bannerCta.addEventListener('mouseleave', () => {
      gsap.to('.cta-arrow', {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to('.banner-cta', {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to('.banner-cta', {
        boxShadow: '0 0 0px rgba(0, 212, 255, 0)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // 点击波纹效果
    bannerCta.addEventListener('click', e => {
      e.preventDefault();

      // 创建波纹元素
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.pointerEvents = 'none';
      ripple.style.width = '20px';
      ripple.style.height = '20px';

      const rect = bannerCta.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      bannerCta.appendChild(ripple);

      // 波纹动画
      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          ripple.remove();
          // 延迟跳转
          window.open('https://chat.element-plus-x.com/chat', '_blank');
        }
      });

      // 按钮按下效果
      gsap.to('.banner-cta', {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    });
  }

  // 横幅图标持续动画
  gsap.to('.banner-icon', {
    y: -3,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // 横幅文字打字机效果
  const bannerText = document.querySelector('.banner-main');
  if (bannerText) {
    const originalText = bannerText.textContent;
    bannerText.textContent = '';

    // 延迟开始打字机效果
    gsap.delayedCall(0.8, () => {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex < originalText.length) {
          bannerText.textContent = originalText.slice(0, currentIndex + 1);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    });
  }

  // 横幅整体悬停效果
  const heroBanner = document.querySelector('.hero-banner');
  if (heroBanner) {
    heroBanner.addEventListener('mouseenter', () => {
      gsap.to('.hero-banner', {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    heroBanner.addEventListener('mouseleave', () => {
      gsap.to('.hero-banner', {
        backgroundColor: 'rgba(26, 26, 46, 0.8)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }

  // 统计数字动画
  gsap.utils.toArray('.stat-number').forEach((num: any) => {
    const finalValue = num.textContent;
    const numValue = Number.parseInt(finalValue.replace(/\D/g, ''));

    gsap.fromTo(
      num,
      {
        textContent: 0
      },
      {
        textContent: numValue,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: num,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        onUpdate() {
          const current = Math.round(this.targets()[0].textContent);
          if (finalValue.includes('k')) {
            num.textContent = `${current}k+`;
          } else if (finalValue.includes('%')) {
            num.textContent = `${current}%`;
          } else {
            num.textContent = `${current}+`;
          }
        }
      }
    );
  });

  // 音频波形动画
  gsap.to('.audio-wave', {
    x: '100vw',
    duration: 6,
    repeat: -1,
    ease: 'none',
    stagger: 0.8
  });

  // 特性卡片动画
  await nextTick();
  gsap.utils.toArray('.feature-card').forEach((el: any, i: number) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
        rotationY: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.2
      }
    );
  });

  // 故障X悬浮动画
  gsap.to('.visual-logo', {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // 新首屏故障效果增强
  // 超大X标题故障效果
  setInterval(() => {
    if (Math.random() > 0.85) {
      gsap.to('.mega-text', {
        textShadow: `
          8px 8px 0px #ff0050,
          -8px -8px 0px #00ffff
        `,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('.mega-text', {
            textShadow: `
              5px 5px 0px #ff0050,
              -5px -5px 0px #00ffff
            `
          });
        }
      });
    }
  }, 400);

  // 特性卡片悬停故障效果
  gsap.utils.toArray('.feature-glitch-card').forEach((card: any) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.feature-name'), {
        textShadow: `
          2px 2px 0px #ff0050,
          -2px -2px 0px #00ffff
        `,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.feature-name'), {
        textShadow: `
          1px 1px 0px #ff0050,
          -1px -1px 0px #00ffff
        `,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // 按钮故障效果
  gsap.utils.toArray('.glitch-btn').forEach((btn: any) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn.querySelector('.btn-text'), {
        textShadow: `
          1px 1px 0px #ffffff,
          -1px -1px 0px #000000
        `,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn.querySelector('.btn-text'), {
        textShadow: 'none',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // 数据统计随机故障闪烁
  setInterval(() => {
    if (Math.random() > 0.9) {
      const metrics = gsap.utils.toArray('.metric-value');
      const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
      gsap.to(randomMetric, {
        textShadow: `
          3px 3px 0px #ff0050,
          -3px -3px 0px #00ffff
        `,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  }, 800);

  // 步骤卡片动画
  await nextTick();
  gsap.utils.toArray('.step-card').forEach((card: any, i: number) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.2
      }
    );
  });

  // 赞助商项目动画
  gsap.utils.toArray('.sponsor-item').forEach((item: any, i: number) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        x: -30,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.1
      }
    );
  });

  // 赞助CTA卡片动画
  gsap.fromTo(
    '.sponsor-cta-card',
    {
      opacity: 0,
      y: 40,
      rotationX: 10
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.sponsor-cta-card',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );

  // 社区评价区域动画
  await nextTick();

  // 评价标题动画
  gsap.fromTo(
    '.reviews-title',
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.reviews-title',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );

  // 评价卡片瀑布流动画
  gsap.utils.toArray('.review-card').forEach((card: any, i: number) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: (i % 3) * 0.1 // 每列错开动画时间
      }
    );

    // 评价卡片悬停动画
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // 点赞按钮动画
  gsap.utils.toArray('.like-btn').forEach((btn: any) => {
    btn.addEventListener('click', () => {
      // 点赞数字增加动画
      const countEl = btn.querySelector('.like-count');
      const currentCount = Number.parseInt(countEl.textContent);

      gsap.to(countEl, {
        textContent: currentCount + 1,
        duration: 0.5,
        ease: 'power2.out',
        snap: { textContent: 1 }
      });

      // 按钮点击反馈
      gsap.to(btn, {
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });

      // 点赞图标动画
      const likeIcon = btn.querySelector('.like-icon');
      gsap.to(likeIcon, {
        scale: 1.3,
        duration: 0.2,
        ease: 'back.out(1.7)',
        yoyo: true,
        repeat: 1
      });
    });
  });

  // 3D鼠标跟踪效果
  await nextTick();
  gsap.utils.toArray('.feature-card').forEach((card: any) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.classList.add('tilt-active');
      gsap.to(card, {
        duration: 0.1,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      card.classList.remove('tilt-active');
      gsap.to(card, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
});
</script>

<template>
  <div class="page-container">
    <!-- 顶部横幅广告 -->
    <section class="hero-banner">
      <div class="banner-content">
        <div class="banner-icon">🚀</div>
        <div class="banner-text">
          <span class="banner-main"
            >推出仿豆包/通义，企业级AI-PC端应用模版，助力企业快速搭建-全栈AI项目</span
          >
        </div>
        <a href="https://chat.element-plus-x.com/chat" class="banner-cta">
          <span class="cta-text">X Chat</span>
          <span class="cta-arrow">→</span>
        </a>
      </div>
    </section>

    <!-- 首屏英雄区 - 抖音风格重设计 -->
    <section class="hero-section">
      <!-- 故障艺术背景 -->
      <div class="glitch-background">
        <div class="glitch-lines">
          <div
            v-for="i in 20"
            :key="i"
            class="glitch-line"
            :style="{ top: `${i * 5}%` }"
          />
        </div>
        <div class="digital-rain">
          <div
            v-for="i in 15"
            :key="i"
            class="rain-column"
            :style="{ left: `${i * 6.67}%` }"
          >
            <span v-for="j in 10" :key="j">{{
              Math.random() > 0.5 ? '1' : '0'
            }}</span>
          </div>
        </div>
      </div>

      <div class="hero-container">
        <!-- 中心化布局 -->
        <div class="hero-center">
          <!-- 主标题区域 -->
          <div class="hero-main">
            <div class="glitch-badge">
              <span class="badge-text" data-text="ELEMENT PLUS"
                >ELEMENT PLUS</span
              >
            </div>

            <h1 class="hero-mega-title">
              <span class="mega-text" data-text="X">X</span>
            </h1>

            <div class="hero-tagline">
              <span class="tagline-text" data-text="NEXT GENERATION UI LIBRARY"
                >NEXT GENERATION UI LIBRARY</span
              >
            </div>
          </div>

          <!-- 核心特性 -->
          <div class="hero-features-grid">
            <div class="feature-glitch-card" data-feature="FAST">
              <div class="feature-number">01</div>
              <div class="feature-name">FAST</div>
              <div class="feature-desc">极速开发体验</div>
            </div>
            <div class="feature-glitch-card" data-feature="MODERN">
              <div class="feature-number">02</div>
              <div class="feature-name">MODERN</div>
              <div class="feature-desc">现代化设计</div>
            </div>
            <div class="feature-glitch-card" data-feature="POWERFUL">
              <div class="feature-number">03</div>
              <div class="feature-name">POWERFUL</div>
              <div class="feature-desc">功能强大</div>
            </div>
          </div>

          <!-- 行动按钮 -->
          <div class="hero-cta-section">
            <button class="glitch-btn primary">
              <span class="btn-text" data-text="GET STARTED">GET STARTED</span>
              <div class="btn-glitch-overlay" />
            </button>
            <button class="glitch-btn secondary">
              <span class="btn-text" data-text="VIEW DOCS">VIEW DOCS</span>
              <div class="btn-glitch-overlay" />
            </button>
          </div>

          <!-- 数据统计 -->
          <div class="hero-metrics">
            <div class="metric-item">
              <div class="metric-value glitch-number" data-text="50+">50+</div>
              <div class="metric-label">COMPONENTS</div>
            </div>
            <div class="metric-divider" />
            <div class="metric-item">
              <div class="metric-value glitch-number" data-text="10K+">
                10K+
              </div>
              <div class="metric-label">DOWNLOADS</div>
            </div>
            <div class="metric-divider" />
            <div class="metric-item">
              <div class="metric-value glitch-number" data-text="99%">99%</div>
              <div class="metric-label">SATISFACTION</div>
            </div>
          </div>
        </div>

        <!-- 侧边装饰元素 -->
        <div class="hero-decorations">
          <div class="deco-left">
            <div class="tech-stack">
              <div class="tech-item">VUE 3</div>
              <div class="tech-item">TYPESCRIPT</div>
              <div class="tech-item">VITE</div>
            </div>
          </div>
          <div class="deco-right">
            <div class="version-info">
              <div class="version-label">VERSION</div>
              <div class="version-number">2.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始区域 -->
    <section class="quickstart-section">
      <div class="quickstart-container">
        <div class="quickstart-content">
          <p class="quickstart-description">
            Element Plus X 是基于 Vue 3
            的现代化组件库，提供丰富的组件和优雅的设计，
            帮助您快速构建美观且功能强大的 Web 应用程序。
          </p>

          <div class="quickstart-actions">
            <div class="install-command">
              <span class="command-prefix">$</span>
              <span class="command-text">{{ installCommand }}</span>
              <button class="command-copy" @click="copyInstallCommand">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path
                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 赞助与支持区域 -->
    <section class="support-section">
      <div class="support-container">
        <div class="support-header">
          <h2 class="support-title">感谢支持</h2>
          <p class="support-subtitle">他们的支持让开源项目持续发展</p>
        </div>

        <!-- 赞助商网格 -->
        <div class="sponsors-wrapper">
          <div
            v-for="tier in ['gold', 'silver', 'bronze']"
            :key="tier"
            class="sponsors-tier"
          >
            <h3 class="tier-title">
              {{ getTierName(tier) }}
            </h3>
            <div class="tier-sponsors">
              <div
                v-for="sponsor in sponsors.filter(s => s.level === tier)"
                :key="sponsor.company"
                class="sponsor-item"
                :class="`sponsor-${tier}`"
              >
                <div class="sponsor-avatar">
                  {{ sponsor.logo }}
                </div>
                <div class="sponsor-info">
                  <h4 class="sponsor-name">
                    {{ sponsor.company }}
                  </h4>
                  <p class="sponsor-desc">
                    {{ sponsor.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 成为赞助商CTA -->
        <div class="become-sponsor">
          <div class="sponsor-cta-card">
            <div class="cta-content">
              <div class="cta-icon">🤝</div>
              <h3 class="cta-title">成为赞助商</h3>
              <p class="cta-description">
                支持开源项目发展，获得品牌曝光和社区认可
              </p>
              <div class="cta-benefits">
                <div class="benefit-item">
                  <span class="benefit-icon">✨</span>
                  <span class="benefit-text">品牌曝光</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">🎯</span>
                  <span class="benefit-text">精准受众</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">🚀</span>
                  <span class="benefit-text">项目推广</span>
                </div>
              </div>
              <button class="sponsor-btn">
                <span class="btn-icon">💎</span>
                立即赞助
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性区域 -->
    <main class="features-area">
      <h2 class="features-title">特性</h2>
      <div class="features-grid">
        <div v-for="(feature, i) in features" :key="i" class="feature-card">
          <div class="feature-icon">
            {{ feature.icon }}
          </div>
          <h3 class="feature-title">
            {{ feature.title }}
          </h3>
          <p class="feature-desc">
            {{ feature.desc }}
          </p>
          <div class="feature-glow" />
        </div>
      </div>
    </main>

    <!-- 社区评价区域 -->
    <section class="reviews-section">
      <div class="reviews-container">
        <div class="reviews-header">
          <h2 class="reviews-title">社区评价</h2>
          <p class="reviews-subtitle">来自全球开发者的真实反馈</p>
        </div>

        <!-- 瀑布流布局 -->
        <div id="reviewsMasonry" class="reviews-masonry">
          <div v-for="review in reviews" :key="review.id" class="review-card">
            <div class="review-header">
              <div class="reviewer-info">
                <div class="reviewer-avatar">
                  {{ review.avatar }}
                </div>
                <div class="reviewer-details">
                  <h4 class="reviewer-name">
                    {{ review.name }}
                  </h4>
                  <p class="reviewer-role">
                    {{ review.role }} @ {{ review.company }}
                  </p>
                </div>
              </div>
              <div class="review-rating">
                <div class="stars">
                  <span
                    v-for="i in 5"
                    :key="i"
                    class="star"
                    :class="{ active: i <= review.rating }"
                    >⭐</span
                  >
                </div>
              </div>
            </div>

            <div class="review-content">
              <p class="review-text">
                {{ review.content }}
              </p>
            </div>

            <div class="review-footer">
              <span class="review-date">{{ review.date }}</span>
              <div class="review-actions">
                <button class="like-btn">
                  <span class="like-icon">👍</span>
                  <span class="like-count">{{ review.likes }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  font-family:
    'Inter',
    'SF Pro Display',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  overflow-x: hidden;
  position: relative;
}

.page-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(255, 0, 80, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(0, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 80%,
      rgba(255, 0, 80, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 1;
}

/* 顶部横幅广告 */
.hero-banner {
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid rgba(255, 0, 80, 0.2);
  padding: 0.8rem 0;
  backdrop-filter: blur(10px);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem;
}

.banner-icon {
  font-size: 1.2rem;
}

.banner-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.banner-main {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.banner-cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 0, 80, 0.1);
  border: 1px solid rgba(255, 0, 80, 0.3);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.banner-cta:hover {
  background: rgba(255, 0, 80, 0.2);
  border-color: rgba(255, 0, 80, 0.5);
  box-shadow: 0 0 20px rgba(255, 0, 80, 0.3);
}

.cta-text {
  color: #ffffff;
}

.cta-arrow {
  font-size: 1rem;
}

.music-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.music-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #0a0a1a 0%,
    #1a1a2e 25%,
    #2d1b69 50%,
    #4a148c 75%,
    #6a1b9a 100%
  );
  background-size: 200% 200%;
  opacity: 0.95;
}

.particle-field {
  position: absolute;
  inset: 0;
}

.music-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: linear-gradient(45deg, #00d4ff, #9c27b0, #ff6b35);
  border-radius: 50%;
  box-shadow: 0 0 15px currentColor;
  top: random(100%);
  left: random(100%);
}

.audio-streams {
  position: absolute;
  inset: 0;
}

.audio-wave {
  position: absolute;
  width: 2px;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    transparent,
    #00d4ff,
    #9c27b0,
    #ff6b35,
    transparent
  );
  left: -3px;
  top: 0;
  opacity: 0.7;
  border-radius: 1px;
}

/* 英雄区域 - 抖音风格重设计 */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 2rem;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 10;
}

/* 故障艺术背景 */
.glitch-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.glitch-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.glitch-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff0050, transparent);
  opacity: 0.1;
  animation: glitch-line-move 3s infinite linear;
}

.glitch-line:nth-child(odd) {
  animation-delay: -1s;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
}

@keyframes glitch-line-move {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.digital-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.rain-column {
  position: absolute;
  top: -100%;
  width: 20px;
  height: 100vh;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #00ffff;
  opacity: 0.1;
  animation: rain-fall 8s infinite linear;
}

.rain-column:nth-child(odd) {
  color: #ff0050;
  animation-delay: -2s;
}

.rain-column span {
  display: block;
  line-height: 1.2;
  animation: rain-flicker 0.5s infinite;
}

@keyframes rain-fall {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes rain-flicker {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

/* 中心化布局 */
.hero-center {
  text-align: center;
  position: relative;
  z-index: 10;
}

/* 主标题区域 */
.hero-main {
  margin-bottom: 4rem;
}

.glitch-badge {
  display: inline-block;
  margin-bottom: 2rem;
}

.badge-text {
  position: relative;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  letter-spacing: 2px;
  animation: badge-glitch 4s infinite;
}

.badge-text::before,
.badge-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.badge-text::before {
  color: #ff0050;
  animation: badge-glitch-1 2s infinite;
  z-index: -1;
}

.badge-text::after {
  color: #00ffff;
  animation: badge-glitch-2 2s infinite;
  z-index: -2;
}

@keyframes badge-glitch {
  0%,
  95%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  96% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes badge-glitch-1 {
  0%,
  95%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  96% {
    transform: translate(-1px, 1px);
    opacity: 0.8;
  }
}

@keyframes badge-glitch-2 {
  0%,
  95%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  97% {
    transform: translate(1px, -1px);
    opacity: 0.8;
  }
}

/* 超大标题 */
.hero-mega-title {
  margin: 0 0 2rem 0;
}

.mega-text {
  position: relative;
  display: inline-block;
  font-size: 12rem;
  font-weight: 900;
  font-family: 'Arial Black', Arial, sans-serif;
  color: #ffffff;
  text-shadow:
    5px 5px 0px #ff0050,
    -5px -5px 0px #00ffff;
  animation: mega-glitch 3s infinite;
  line-height: 0.8;
}

.mega-text::before,
.mega-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mega-text::before {
  color: #ff0050;
  animation: mega-glitch-1 2s infinite;
  z-index: -1;
}

.mega-text::after {
  color: #00ffff;
  animation: mega-glitch-2 2s infinite;
  z-index: -2;
}

@keyframes mega-glitch {
  0%,
  100% {
    transform: translate(0);
    text-shadow:
      5px 5px 0px #ff0050,
      -5px -5px 0px #00ffff;
  }
  2% {
    transform: translate(3px, 0);
    text-shadow:
      8px 8px 0px #ff0050,
      -8px -8px 0px #00ffff;
  }
  4% {
    transform: translate(-3px, 0);
    text-shadow:
      -5px 5px 0px #ff0050,
      5px -5px 0px #00ffff;
  }
  6% {
    transform: translate(0);
    text-shadow:
      5px 5px 0px #ff0050,
      -5px -5px 0px #00ffff;
  }
}

@keyframes mega-glitch-1 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  1% {
    transform: translate(-3px, 3px);
    opacity: 1;
  }
  2% {
    transform: translate(-3px, 3px);
    opacity: 0;
  }
}

@keyframes mega-glitch-2 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  2% {
    transform: translate(3px, -3px);
    opacity: 1;
  }
  3% {
    transform: translate(3px, -3px);
    opacity: 0;
  }
}

/* 标语 */
.hero-tagline {
  margin-bottom: 3rem;
}

.tagline-text {
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  letter-spacing: 1px;
  animation: tagline-glitch 5s infinite;
}

.tagline-text::before,
.tagline-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tagline-text::before {
  color: #ff0050;
  animation: tagline-glitch-1 3s infinite;
  z-index: -1;
}

.tagline-text::after {
  color: #00ffff;
  animation: tagline-glitch-2 3s infinite;
  z-index: -2;
}

@keyframes tagline-glitch {
  0%,
  98%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  99% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes tagline-glitch-1 {
  0%,
  98%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99% {
    transform: translate(-1px, 1px);
    opacity: 0.6;
  }
}

@keyframes tagline-glitch-2 {
  0%,
  98%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99.5% {
    transform: translate(1px, -1px);
    opacity: 0.6;
  }
}

/* 特性网格 */
.hero-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.feature-glitch-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 0, 80, 0.2);
  border-radius: 8px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-glitch-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff0050, #00ffff);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-glitch-card:hover {
  border-color: rgba(255, 0, 80, 0.5);
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-5px);
}

.feature-glitch-card:hover::before {
  opacity: 1;
}

.feature-number {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ff0050;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.feature-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  letter-spacing: 1px;
}

.feature-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

/* CTA按钮区域 */
.hero-cta-section {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
}

.glitch-btn {
  position: relative;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 2px solid;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  text-transform: uppercase;
}

.glitch-btn.primary {
  border-color: #ff0050;
  color: #ff0050;
}

.glitch-btn.secondary {
  border-color: #00ffff;
  color: #00ffff;
}

.glitch-btn .btn-text {
  position: relative;
  z-index: 2;
}

.btn-glitch-overlay {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.glitch-btn:hover .btn-glitch-overlay {
  left: 100%;
}

.glitch-btn.primary:hover {
  background: rgba(255, 0, 80, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 80, 0.3);
}

.glitch-btn.secondary:hover {
  background: rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

/* 数据统计 */
.hero-metrics {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
}

.metric-item {
  text-align: center;
}

.metric-value {
  position: relative;
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    2px 2px 0px #ff0050,
    -2px -2px 0px #00ffff;
  margin-bottom: 0.5rem;
  animation: metric-glitch 6s infinite;
}

.metric-value::before,
.metric-value::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.metric-value::before {
  color: #ff0050;
  animation: metric-glitch-1 4s infinite;
  z-index: -1;
}

.metric-value::after {
  color: #00ffff;
  animation: metric-glitch-2 4s infinite;
  z-index: -2;
}

@keyframes metric-glitch {
  0%,
  97%,
  100% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
  98% {
    text-shadow:
      3px 3px 0px #ff0050,
      -3px -3px 0px #00ffff;
  }
}

@keyframes metric-glitch-1 {
  0%,
  97%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  98% {
    transform: translate(-1px, 1px);
    opacity: 0.7;
  }
}

@keyframes metric-glitch-2 {
  0%,
  97%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  98.5% {
    transform: translate(1px, -1px);
    opacity: 0.7;
  }
}

.metric-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.metric-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    transparent,
    #ff0050,
    #00ffff,
    transparent
  );
  opacity: 0.5;
}

/* 装饰元素 */
.hero-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
}

.deco-left {
  position: absolute;
  top: 20%;
  left: 5%;
}

.deco-right {
  position: absolute;
  top: 20%;
  right: 5%;
}

.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 0, 80, 0.2);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: tech-float 4s infinite ease-in-out;
}

.tech-item:nth-child(2) {
  animation-delay: -1s;
}

.tech-item:nth-child(3) {
  animation-delay: -2s;
}

@keyframes tech-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.version-info {
  text-align: right;
}

.version-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.version-number {
  font-size: 1.5rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  animation: version-pulse 3s infinite;
}

@keyframes version-pulse {
  0%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  50% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

/* 右侧可视化 */
.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-visual {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-logo {
  filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.5));
}

/* 抖音风格故障艺术效果 */
.tiktok-x {
  position: relative;
  display: inline-block;
  font-size: 8rem;
  font-weight: 900;
  font-family: 'Arial Black', Arial, sans-serif;
  color: #ffffff;
  text-shadow:
    3px 3px 0px #ff0050,
    -3px -3px 0px #00ffff;
  animation: tiktok-glitch 3s infinite;
}

.tiktok-x::before,
.tiktok-x::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tiktok-x::before {
  color: #ff0050;
  animation: tiktok-glitch-1 2s infinite;
  z-index: -1;
}

.tiktok-x::after {
  color: #00ffff;
  animation: tiktok-glitch-2 2s infinite;
  z-index: -2;
}

@keyframes tiktok-glitch {
  0%,
  100% {
    transform: translate(0);
    text-shadow:
      3px 3px 0px #ff0050,
      -3px -3px 0px #00ffff;
  }
  2% {
    transform: translate(2px, 0);
    text-shadow:
      5px 5px 0px #ff0050,
      -5px -5px 0px #00ffff;
  }
  4% {
    transform: translate(-2px, 0);
    text-shadow:
      -3px 3px 0px #ff0050,
      3px -3px 0px #00ffff;
  }
  6% {
    transform: translate(0);
    text-shadow:
      3px 3px 0px #ff0050,
      -3px -3px 0px #00ffff;
  }
  8% {
    transform: translate(0, -2px);
    text-shadow:
      3px 1px 0px #ff0050,
      -3px -5px 0px #00ffff;
  }
  10% {
    transform: translate(0);
    text-shadow:
      3px 3px 0px #ff0050,
      -3px -3px 0px #00ffff;
  }
}

@keyframes tiktok-glitch-1 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  1% {
    transform: translate(-2px, 2px);
    opacity: 1;
  }
  2% {
    transform: translate(-2px, 2px);
    opacity: 0;
  }
  3% {
    transform: translate(2px, -2px);
    opacity: 1;
  }
  4% {
    transform: translate(2px, -2px);
    opacity: 0;
  }
  5% {
    transform: translate(-1px, 1px);
    opacity: 1;
  }
  6% {
    transform: translate(-1px, 1px);
    opacity: 0;
  }
}

@keyframes tiktok-glitch-2 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  2% {
    transform: translate(2px, -2px);
    opacity: 1;
  }
  3% {
    transform: translate(2px, -2px);
    opacity: 0;
  }
  4% {
    transform: translate(-2px, 2px);
    opacity: 1;
  }
  5% {
    transform: translate(-2px, 2px);
    opacity: 0;
  }
  6% {
    transform: translate(1px, -1px);
    opacity: 1;
  }
  7% {
    transform: translate(1px, -1px);
    opacity: 0;
  }
}

.floating-elements {
  position: absolute;
  inset: 0;
}

.float-item {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #00d4ff;
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.float-1 {
  top: 10%;
  left: 10%;
}
.float-2 {
  top: 20%;
  right: 15%;
}
.float-3 {
  bottom: 25%;
  left: 5%;
}
.float-4 {
  bottom: 15%;
  right: 10%;
}

/* 快速开始区域 */
.quickstart-section {
  position: relative;
  z-index: 2;
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.quickstart-container {
  max-width: 800px;
  margin: 0 auto;
}

.quickstart-content {
  text-align: center;
}

.quickstart-description {
  font-size: 1.2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 3rem 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.quickstart-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.get-started-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.get-started-btn:hover {
  background: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.btn-text {
  font-weight: 500;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.get-started-btn:hover .btn-arrow {
  transform: translateX(2px);
}

.install-command {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 300px;
}

.install-command:hover {
  border-color: rgba(0, 212, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.command-prefix {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
  font-weight: 500;
}

.command-text {
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
}

.command-copy {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.command-copy:hover {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}

.code-block {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background: rgba(0, 212, 255, 0.1);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
}

.code-lang {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  color: #00d4ff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: rgba(0, 212, 255, 0.3);
  transform: translateY(-1px);
}

.copy-icon {
  font-size: 0.9rem;
}

.code-content {
  padding: 1.2rem;
  margin: 0;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #e8e8e8;
  background: transparent;
  overflow-x: auto;
  white-space: pre;
}

/* 按钮样式 */
.btn-primary,
.btn-secondary,
.btn-outline {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #ff0050, #00ffff);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 0, 80, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 0, 80, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #00ffff;
  border: 2px solid #00ffff;
  position: relative;
}

.btn-secondary:hover {
  background: rgba(0, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

.btn-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  min-width: 120px;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 1rem;
}

/* 支持区域 */
.support-section {
  position: relative;
  z-index: 2;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.support-container {
  max-width: 1200px;
  margin: 0 auto;
}

.support-header {
  text-align: center;
  margin-bottom: 4rem;
}

.support-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.support-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.sponsors-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

.sponsors-tier {
  text-align: center;
}

.tier-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 2rem;
}

.tier-sponsors {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.sponsor-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 200px;
}

.sponsor-item:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 10px 25px rgba(0, 212, 255, 0.1);
}

.sponsor-gold {
  border-color: rgba(255, 215, 0, 0.4);
  background: rgba(255, 215, 0, 0.05);
}

.sponsor-gold:hover {
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.1);
}

.sponsor-silver {
  border-color: rgba(192, 192, 192, 0.4);
  background: rgba(192, 192, 192, 0.05);
}

.sponsor-silver:hover {
  border-color: rgba(192, 192, 192, 0.6);
  box-shadow: 0 10px 25px rgba(192, 192, 192, 0.1);
}

.sponsor-bronze {
  border-color: rgba(205, 127, 50, 0.4);
  background: rgba(205, 127, 50, 0.05);
}

.sponsor-bronze:hover {
  border-color: rgba(205, 127, 50, 0.6);
  box-shadow: 0 10px 25px rgba(205, 127, 50, 0.1);
}

.sponsor-avatar {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.sponsor-info {
  text-align: left;
}

.sponsor-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
}

.sponsor-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* 成为赞助商区域 */
.become-sponsor {
  display: flex;
  justify-content: center;
}

.sponsor-cta-card {
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.1),
    rgba(156, 39, 176, 0.1)
  );
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  cursor: pointer;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.sponsor-cta-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 25px 50px rgba(0, 212, 255, 0.15);
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
  animation: cta-float 3s ease-in-out infinite;
}

@keyframes cta-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: #00d4ff;
  margin: 0;
}

.cta-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
}

.cta-benefits {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  backdrop-filter: blur(10px);
}

.benefit-icon {
  font-size: 1.2rem;
}

.benefit-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.sponsor-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00d4ff, #9c27b0);
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.sponsor-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 212, 255, 0.4);
}

/* 特性区域 */
.features-area {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.features-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #ffffff;
  text-shadow:
    3px 3px 0px #ff0050,
    -3px -3px 0px #00ffff;
  animation: tiktok-title-glitch 4s infinite;
}

@keyframes tiktok-title-glitch {
  0%,
  95%,
  100% {
    text-shadow:
      3px 3px 0px #ff0050,
      -3px -3px 0px #00ffff;
  }
  96% {
    text-shadow:
      5px 5px 0px #ff0050,
      -5px -5px 0px #00ffff;
  }
  97% {
    text-shadow:
      -3px 3px 0px #ff0050,
      3px -3px 0px #00ffff;
  }
  98% {
    text-shadow:
      3px -3px 0px #ff0050,
      -3px 3px 0px #00ffff;
  }
}

.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 0, 80, 0.1);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff0050, #00ffff, #ff0050);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(255, 0, 80, 0.4);
  box-shadow:
    0 20px 40px rgba(255, 0, 80, 0.2),
    0 10px 20px rgba(0, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.1),
    rgba(156, 39, 176, 0.05)
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 24px;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 15px #ff0050);
  transition: all 0.4s ease;
  transform: translateZ(20px);
  display: inline-block;
}

.feature-card:hover .feature-icon {
  transform: translateZ(30px) scale(1.1);
  filter: drop-shadow(0 0 25px #ff0050) drop-shadow(0 0 15px #00ffff);
  animation: tiktok-icon-glitch 0.5s ease-in-out;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.4s ease;
  transform: translateZ(15px);
  text-shadow:
    2px 2px 0px #ff0050,
    -2px -2px 0px #00ffff;
}

.feature-card:hover .feature-title {
  transform: translateZ(25px);
  text-shadow:
    3px 3px 0px #ff0050,
    -3px -3px 0px #00ffff;
}

@keyframes tiktok-icon-glitch {
  0%,
  100% {
    transform: translateZ(30px) scale(1.1);
  }
  25% {
    transform: translateZ(30px) scale(1.1) translate(2px, 0);
  }
  50% {
    transform: translateZ(30px) scale(1.1) translate(-2px, 0);
  }
  75% {
    transform: translateZ(30px) scale(1.1) translate(0, 2px);
  }
}

.feature-desc {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  transition: all 0.4s ease;
  transform: translateZ(10px);
}

.feature-card:hover .feature-desc {
  transform: translateZ(20px) translateX(3px);
  color: rgba(255, 255, 255, 0.9);
}

.feature-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    #00d4ff,
    #9c27b0,
    transparent
  );
  opacity: 0.8;
  transition: all 0.4s ease;
}

.feature-card:hover .feature-glow {
  height: 3px;
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
}

/* 添加额外的3D光效 */
.feature-card::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(0, 212, 255, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
  pointer-events: none;
}

.feature-card:hover::after {
  width: 200px;
  height: 200px;
}

/* 为整个特性网格添加透视效果 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  perspective: 1200px;
  perspective-origin: center center;
}

/* 添加鼠标跟踪3D效果的JavaScript支持样式 */
.feature-card.tilt-active {
  transition: transform 0.1s ease-out;
}

/* 社区评价区域 */
.reviews-section {
  position: relative;
  z-index: 2;
  padding: 6rem 2rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.reviews-container {
  max-width: 1200px;
  margin: 0 auto;
}

.reviews-header {
  text-align: center;
  margin-bottom: 4rem;
}

.reviews-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.reviews-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* 瀑布流布局 */
.reviews-masonry {
  column-count: 3;
  column-gap: 2rem;
  column-fill: balance;
}

.review-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 212, 255, 0.15);
  backdrop-filter: blur(20px);
  break-inside: avoid;
  transition: all 0.4s ease;
  cursor: pointer;
}

.review-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 15px 30px rgba(0, 212, 255, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
}

.reviewer-role {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.review-rating {
  flex-shrink: 0;
}

.stars {
  display: flex;
  gap: 0.1rem;
}

.star {
  font-size: 0.8rem;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.star.active {
  opacity: 1;
}

.review-content {
  margin: 1rem 0;
}

.review-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.review-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.review-actions {
  display: flex;
  gap: 0.5rem;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.like-btn:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

.like-icon {
  font-size: 0.9rem;
}

.like-count {
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .banner-content {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }

  .banner-main {
    font-size: 0.9rem;
  }

  .banner-cta {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }

  /* 新首屏响应式 */
  .mega-text {
    font-size: 8rem;
  }

  .hero-features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 400px;
  }

  .hero-cta-section {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .glitch-btn {
    width: 200px;
  }

  .hero-metrics {
    gap: 2rem;
  }

  .metric-value {
    font-size: 2rem;
  }

  .hero-decorations {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 0.6rem 0;
  }

  .banner-content {
    padding: 0 1rem;
    gap: 0.6rem;
  }

  .banner-main {
    font-size: 0.85rem;
  }

  .banner-cta {
    font-size: 0.8rem;
    padding: 0.35rem 0.7rem;
  }

  /* 新首屏移动端适配 */
  .mega-text {
    font-size: 6rem;
  }

  .badge-text {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .tagline-text {
    font-size: 1rem;
  }

  .hero-features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .feature-glitch-card {
    padding: 1.5rem 1rem;
  }

  .feature-name {
    font-size: 1rem;
  }

  .feature-desc {
    font-size: 0.8rem;
  }

  .glitch-btn {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
    width: 180px;
  }

  .hero-metrics {
    flex-direction: column;
    gap: 1.5rem;
  }

  .metric-value {
    font-size: 1.8rem;
  }

  .metric-label {
    font-size: 0.7rem;
  }

  .digital-rain {
    display: none;
  }

  .glitch-lines .glitch-line:nth-child(n + 11) {
    display: none;
  }

  .quickstart-section {
    padding: 3rem 1rem;
  }

  .quickstart-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .quickstart-actions {
    flex-direction: column;
    gap: 1.5rem;
  }

  .get-started-btn {
    width: 200px;
    justify-content: center;
  }

  .install-command {
    min-width: auto;
    width: 100%;
    max-width: 350px;
  }

  .code-content {
    font-size: 0.85rem;
    padding: 1rem;
  }

  .support-section {
    padding: 4rem 1rem;
  }

  .support-title {
    font-size: 2rem;
  }

  .tier-sponsors {
    flex-direction: column;
    align-items: center;
  }

  .sponsor-item {
    min-width: 280px;
  }

  .sponsor-cta-card {
    padding: 2rem;
  }

  .cta-benefits {
    gap: 1rem;
  }

  .features-area {
    padding: 4rem 1rem;
  }

  .features-title {
    font-size: 2.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  .reviews-section {
    padding: 4rem 1rem;
  }

  .reviews-title {
    font-size: 2.5rem;
  }

  .reviews-masonry {
    column-count: 2;
    column-gap: 1.5rem;
  }

  .review-card {
    padding: 1.2rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    padding: 0.5rem 0;
  }

  .banner-content {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  .banner-icon {
    font-size: 1rem;
  }

  .banner-main {
    font-size: 0.8rem;
    text-align: center;
  }

  .banner-cta {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 200px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
    padding-top: 1.5rem;
  }

  .hero-visual {
    width: 200px;
    height: 200px;
  }

  .glitch-x {
    font-size: 4rem;
  }

  .float-item {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }

  .quickstart-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .quickstart-actions {
    gap: 1rem;
  }

  .get-started-btn {
    width: 180px;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .install-command {
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
    max-width: 300px;
  }

  .command-copy {
    margin-left: 0.5rem;
  }

  .code-header {
    padding: 0.6rem 1rem;
  }

  .copy-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .support-title {
    font-size: 1.8rem;
  }

  .tier-title {
    font-size: 1.3rem;
  }

  .sponsor-item {
    min-width: 250px;
    padding: 1rem;
  }

  .sponsor-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }

  .cta-benefits {
    flex-direction: column;
    align-items: center;
  }

  .features-title {
    font-size: 1.8rem;
  }

  .reviews-title {
    font-size: 2rem;
  }

  .reviews-masonry {
    column-count: 1;
    column-gap: 0;
  }

  .review-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .reviewer-info {
    gap: 0.8rem;
  }

  .reviewer-avatar {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .reviewer-name {
    font-size: 0.9rem;
  }

  .reviewer-role {
    font-size: 0.8rem;
  }

  .review-text {
    font-size: 0.9rem;
  }

  .like-btn {
    padding: 0.25rem 0.6rem;
    font-size: 0.75rem;
  }
}
</style>
