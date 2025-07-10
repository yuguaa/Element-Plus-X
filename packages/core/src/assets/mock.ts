import type { BubbleProps } from '@components/Bubble/types';
import type { BubbleListProps } from '@components/BubbleList/types';
import type { FilesType } from '@components/FilesCard/types';

import type { ThinkingStatus } from '@components/Thinking/types';

// 头像1
export const avatar1: string =
  'https://avatars.githubusercontent.com/u/76239030?v=4';

// 头像2
export const avatar2: string =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

// md 普通内容
export const mdContent = `
### 行内公式
1. 欧拉公式：$e^{i\\pi} + 1 = 0$
2. 二次方程求根公式：$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
3. 向量点积：$\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y + a_z b_z$

### 块级公式
1. 傅里叶变换：
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

2. 矩阵乘法：
$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
\\begin{bmatrix}
x \\\\
y
\\end{bmatrix}
=
\\begin{bmatrix}
ax + by \\\\
cx + dy
\\end{bmatrix}
$$

3. 泰勒级数展开：
$$
f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n
$$

4. 拉普拉斯方程：
$$
\\nabla^2 u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} + \\frac{\\partial^2 u}{\\partial z^2} = 0
$$

5. 概率密度函数（正态分布）：
$$
f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$

# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*

- [x] Add some task
- [ ] Do some task
`.trim();

// md 代码块高亮
export const highlightMdContent = `
\`\`\`html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>炫酷HTML示例</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#6366F1',
            secondary: '#EC4899',
            dark: '#1E293B',
            light: '#F8FAFC'
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      }
    }
  </script>
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
      .text-shadow {
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .text-shadow-lg {
        text-shadow: 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-pulse-slow {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      .gradient-text {
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
  </style>
</head>
<body class="bg-gradient-to-br from-dark to-slate-800 text-light min-h-screen font-inter">
  <!-- 导航栏 -->
  <nav class="fixed w-full top-0 z-50 transition-all duration-300" id="navbar">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <a href="#" class="text-2xl font-bold gradient-text bg-gradient-to-r from-primary to-secondary">
        <i class="fa fa-bolt mr-2"></i>CodeFusion
      </a>
      <div class="hidden md:flex space-x-8">
        <a href="#home" class="hover:text-primary transition-colors duration-300">首页</a>
        <a href="#features" class="hover:text-primary transition-colors duration-300">特性</a>
        <a href="#gallery" class="hover:text-primary transition-colors duration-300">画廊</a>
        <a href="#contact" class="hover:text-primary transition-colors duration-300">联系</a>
      </div>
      <button class="md:hidden text-2xl">
        <i class="fa fa-bars"></i>
      </button>
    </div>
  </nav>

  <!-- 英雄区 -->
  <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://picsum.photos/id/1/1920/1080')] bg-cover bg-center opacity-20"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>

    <!-- 粒子背景 -->
    <div id="particles-js" class="absolute inset-0"></div>

    <div class="container mx-auto px-4 z-10 text-center">
      <h1 class="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-6 text-shadow-lg">
        <span class="block gradient-text bg-gradient-to-r from-primary to-secondary">探索数字世界</span>
        <span class="block mt-2">的无限可能</span>
      </h1>
      <p class="text-[clamp(1rem,3vw,1.5rem)] max-w-2xl mx-auto mb-10 text-gray-300">
        结合创意与技术，打造令人惊叹的数字体验
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button class="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30">
          开始探索
        </button>
        <button class="px-8 py-3 bg-transparent border-2 border-white hover:border-primary hover:text-primary rounded-full transition-all duration-300 transform hover:scale-105">
          了解更多
        </button>
      </div>

      <!-- 向下滚动指示器 -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i class="fa fa-angle-down text-3xl"></i>
      </div>
    </div>
  </section>

  <!-- 特性区 -->
  <section id="features" class="py-24 bg-slate-900 relative">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-4 gradient-text bg-gradient-to-r from-primary to-secondary">
          令人惊叹的特性
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          我们提供一系列创新功能，帮助你打造出色的数字产品
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 特性卡片 1 -->
        <div class="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group">
          <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors duration-300">
            <i class="fa fa-code text-2xl text-primary"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">现代前端技术</h3>
          <p class="text-gray-400">
            利用最新的前端框架和库，创建高性能、响应式的用户界面，提供卓越的用户体验。
          </p>
        </div>

        <!-- 特性卡片 2 -->
        <div class="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group">
          <div class="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors duration-300">
            <i class="fa fa-paint-brush text-2xl text-secondary"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">精美视觉设计</h3>
          <p class="text-gray-400">
            精心设计的视觉元素和动效，打造具有深度和层次感的界面，让用户沉浸其中。
          </p>
        </div>

        <!-- 特性卡片 3 -->
        <div class="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group">
          <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors duration-300">
            <i class="fa fa-cubes text-2xl text-primary"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">模块化结构</h3>
          <p class="text-gray-400">
            采用模块化设计理念，使代码更易于维护和扩展，提高开发效率和代码质量。
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 画廊区 -->
  <section id="gallery" class="py-24 relative">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-4 gradient-text bg-gradient-to-r from-primary to-secondary">
          创意作品集
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          浏览我们的精选作品，感受设计与技术的完美结合
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 作品 1 -->
        <div class="group relative overflow-hidden rounded-2xl">
          <img src="https://picsum.photos/id/237/600/400" alt="创意设计作品" class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div>
              <h3 class="text-xl font-bold mb-2">交互设计展示</h3>
              <p class="text-gray-300">探索现代UI设计的无限可能</p>
            </div>
          </div>
        </div>

        <!-- 作品 2 -->
        <div class="group relative overflow-hidden rounded-2xl">
          <img src="https://picsum.photos/id/119/600/400" alt="网页设计作品" class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div>
              <h3 class="text-xl font-bold mb-2">响应式网站</h3>
              <p class="text-gray-300">在任何设备上都能完美展示</p>
            </div>
          </div>
        </div>

        <!-- 作品 3 -->
        <div class="group relative overflow-hidden rounded-2xl">
          <img src="https://picsum.photos/id/26/600/400" alt="移动应用设计" class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div>
              <h3 class="text-xl font-bold mb-2">移动应用界面</h3>
              <p class="text-gray-300">直观易用的移动应用体验</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 数据可视化区 -->
  <section class="py-24 bg-slate-900 relative">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-4 gradient-text bg-gradient-to-r from-primary to-secondary">
          数据可视化
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          通过交互式图表直观展示数据趋势
        </p>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-xl">
        <canvas id="dataChart" height="300"></canvas>
      </div>
    </div>
  </section>

  <!-- 联系区 -->
  <section id="contact" class="py-24 relative">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6 gradient-text bg-gradient-to-r from-primary to-secondary">
            与我们联系
          </h2>
          <p class="text-gray-400 mb-8">
            无论你有什么问题或需求，我们都很乐意听取你的意见。填写表单，我们会尽快回复你。
          </p>

          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fa fa-map-marker text-primary"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-1">地址</h3>
                <p class="text-gray-400">北京市海淀区中关村大街1号</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fa fa-envelope text-primary"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-1">邮箱</h3>
                <p class="text-gray-400">contact@example.com</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fa fa-phone text-primary"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-1">电话</h3>
                <p class="text-gray-400">+86 10 1234 5678</p>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-lg font-bold mb-4">关注我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="fa fa-facebook"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="fa fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-xl">
          <form>
            <div class="mb-6">
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">姓名</label>
              <input type="text" id="name" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300" placeholder="请输入你的姓名">
            </div>

            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
              <input type="email" id="email" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300" placeholder="请输入你的邮箱">
            </div>

            <div class="mb-6">
              <label for="message" class="block text-sm font-medium text-gray-300 mb-2">留言</label>
              <textarea id="message" rows="5" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300" placeholder="请输入你的留言"></textarea>
            </div>

            <button type="submit" class="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-primary/30">
              发送留言
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="bg-slate-900 py-12 border-t border-slate-800">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 gradient-text bg-gradient-to-r from-primary to-secondary">
            CodeFusion
          </h3>
          <p class="text-gray-400 mb-6">
            创意与技术的完美结合，打造令人惊叹的数字体验。
          </p>
          <p class="text-gray-500 text-sm">
            &copy; 2025 CodeFusion. 保留所有权利。
          </p>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-4">快速链接</h4>
          <ul class="space-y-2">
            <li><a href="#home" class="text-gray-400 hover:text-primary transition-colors duration-300">首页</a></li>
            <li><a href="#features" class="text-gray-400 hover:text-primary transition-colors duration-300">特性</a></li>
            <li><a href="#gallery" class="text-gray-400 hover:text-primary transition-colors duration-300">画廊</a></li>
            <li><a href="#contact" class="text-gray-400 hover:text-primary transition-colors duration-300">联系</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-4">服务</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-primary transition-colors duration-300">网页设计</a></li>
            <li><a href="#" class="text-gray-400 hover:text-primary transition-colors duration-300">应用开发</a></li>
            <li><a href="#" class="text-gray-400 hover:text-primary transition-colors duration-300">UI/UX设计</a></li>
            <li><a href="#" class="text-gray-400 hover:text-primary transition-colors duration-300">品牌设计</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-4">订阅更新</h4>
          <p class="text-gray-400 mb-4">
            订阅我们的通讯，获取最新的产品更新和优惠信息。
          </p>
          <form class="flex">
            <input type="email" placeholder="你的邮箱地址" class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary/50 w-full">
            <button type="submit" class="bg-primary hover:bg-primary/90 text-white px-4 rounded-r-lg transition-colors duration-300">
              <i class="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </footer>

  <!-- 回到顶部按钮 -->
  <button id="backToTop" class="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 translate-y-20 opacity-0">
    <i class="fa fa-arrow-up"></i>
  </button>

  <!-- 粒子效果JS -->
  <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
  <script>
    // 粒子背景初始化
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#6366F1" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6366F1",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-dark/80', 'backdrop-blur-md', 'shadow-lg');
      } else {
        navbar.classList.remove('bg-dark/80', 'backdrop-blur-md', 'shadow-lg');
      }
    });

    // 回到顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        backToTopBtn.classList.add('translate-y-0', 'opacity-100');
      } else {
        backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // 数据图表
    const ctx = document.getElementById('dataChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        datasets: [{
          label: '用户增长',
          data: [12, 19, 15, 28, 22, 35, 42],
          borderColor: '#6366F1',
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#6366F1',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            titleColor: '#fff',
            bodyColor: '#e2e8f0',
            borderColor: '#6366F1',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return \`用户数: context.raw\`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8'
            }
          },
          y: {
            grid: {
              color: 'rgba(148, 163, 184, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              callback: function(value) {
                return value + 'k';
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>



\`\`\`
\`\`\`html
<div class="product-card">
  <div class="badge">新品</div>
  <img src="https://picsum.photos/300/200?product" alt="产品图片">

  <div class="content">
    <h3>无线蓝牙耳机 Pro</h3>
    <p class="description">主动降噪技术，30小时续航，IPX5防水等级</p>

    <div class="rating">
      <span>★★★★☆</span>
      <span class="reviews">(124条评价)</span>
    </div>

    <div class="price-container">
      <span class="price">¥499</span>
      <span class="original-price">¥699</span>
      <span class="discount">7折</span>
    </div>

    <div class="actions">
      <button class="cart-btn">加入购物车</button>
      <button class="fav-btn">❤️</button>
    </div>

    <div class="meta">
      <span>✓ 次日达</span>
      <span>✓ 7天无理由</span>
    </div>
  </div>
</div>

<style>
  .product-card {
    width: 280px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    position: relative;
    background: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: #ff6b6b;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    z-index: 2;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .content {
    padding: 16px;
  }

  h3 {
    margin: 8px 0;
    font-size: 18px;
    color: #333;
  }

  .description {
    color: #666;
    font-size: 14px;
    margin: 8px 0 12px;
    line-height: 1.4;
  }

  .rating {
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: #ffb300;
  }

  .reviews {
    font-size: 13px;
    color: #888;
    margin-left: 8px;
  }

  .price-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 12px 0;
  }

  .price {
    font-size: 22px;
    font-weight: bold;
    color: #ff4757;
  }

  .original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }

  .discount {
    background: #fff200;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }

  .actions {
    display: flex;
    gap: 8px;
    margin: 16px 0 12px;
  }

  .cart-btn {
    flex: 1;
    background: #5352ed;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }

  .cart-btn:hover {
    background: #3742fa;
  }

  .fav-btn {
    width: 42px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .fav-btn:hover {
    border-color: #ff6b6b;
    color: #ff6b6b;
  }

  .meta {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: #2ed573;
    margin-top: 8px;
  }
</style>
\`\`\`
###### 非\`commonMark\`语法，dom多个
<pre>
<code class="language-java">
public class HelloWorld {
  public static void main(String[] args) {
      System.out.println("Hello, world!");
  }
}
</code>
</pre>
\`\`\`echarts
use codeXRender for echarts render
\`\`\`
### javascript
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`
\`\`\`typescript
import {
  ArrowDownBold,
  CopyDocument,
  Moon,
  Sunny
} from '@element-plus/icons-vue';
import { ElButton, ElSpace } from 'element-plus';
import { h } from 'vue';

/* ----------------------------------- 按钮组 ---------------------------------- */

/**
 * @description 描述 language标签
 * @date 2025-06-25 17:48:15
 * @author tingfeng
 *
 * @export
 * @param language
 */
export function languageEle(language: string) {
  return h(
    ElSpace,
    {},
    {}
  );
}
\`\`\`
`.trim();

// md 美人鱼图表
export const mermaidMdContent = `

### mermaid 饼状图
\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

`;

// md 数学公式
export const mathMdContent = `
### mermaid 流程图
\`\`\`mermaid
graph LR
    1 --> 2
    2 --> 3
    3 --> 4
    2 --> 1
    2-3 --> 1-3
\`\`\`
\`\`\`mermaid
flowchart TD
    Start[开始] --> Check[是否通过？]
    Check -- 是 --> Pass[流程继续]
    Check -- 否 --> Reject[流程结束]
\`\`\`
\`\`\`mermaid
flowchart TD
    %% 前端专项四层结构
    A["战略层
    【提升用户体验】"]
    --> B["架构层
    【微前端方案选型】"]
    --> C["框架层
    【React+TS技术栈】"]
    --> D["实现层
    【组件库开发】"]
    style A fill:#FFD700,stroke:#FFA500
    style B fill:#87CEFA,stroke:#1E90FF
    style C fill:#9370DB,stroke:#663399
    style D fill:#FF6347,stroke:#CD5C5C

\`\`\`
### mermaid 数学公式
\`\`\`mermaid
sequenceDiagram
    autonumber
    participant 1 as $$alpha$$
    participant 2 as $$beta$$
    1->>2: Solve: $$\sqrt{2+2}$$
    2-->>1: Answer: $$2$$
\`\`\`

`;
export const customAttrContent = `
<a href="https://element-plus-x.com/">element-plus-x</a>
<h1>标题1</h1>
<h2>标题2</h2>
`;
export type MessageItem = BubbleProps & {
  key: number;
  role: 'ai' | 'user' | 'system';
  avatar: string;
  thinkingStatus?: ThinkingStatus;
  expanded?: boolean;
};

// md 复杂图表
export const mermaidComplexMdContent = `
### Mermaid 渲染复杂图表案例
\`\`\`mermaid
graph LR
    A[用户] -->|请求交互| B[前端应用]
    B -->|API调用| C[API网关]
    C -->|认证请求| D[认证服务]
    C -->|业务请求| E[业务服务]
    E -->|数据读写| F[数据库]
    E -->|缓存操作| G[缓存服务]
    E -->|消息发布| H[消息队列]
    H -->|触发任务| I[后台任务]

    subgraph "微服务集群"
        D[认证服务]
        E[业务服务]
        I[后台任务]
    end

    subgraph "数据持久层"
        F[数据库]
        G[缓存服务]
    end

`;

export const messageArr: BubbleListProps<MessageItem>['list'] = [
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 2,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 3,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 4,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 5,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 6,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 7,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗', isRequestEnd: true },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 8,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  }
];

// 模拟自定义文件卡片数据
// 内置样式
export const colorMap: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#00C851',
  ppt: '#FF5722',
  pdf: '#E53935',
  txt: '#424242',
  mark: '#6C6C6C',
  image: '#FF80AB',
  audio: '#FF7878',
  video: '#8B72F7',
  three: '#29B6F6',
  code: '#00008B',
  database: '#FF9800',
  link: '#2962FF',
  zip: '#673AB7',
  file: '#FFC757',
  unknown: '#6E9DA4'
};

// 自己定义文件颜色
export const colorMap1: Record<FilesType, string> = {
  word: '#5E74A8',
  excel: '#4A6B4A',
  ppt: '#C27C40',
  pdf: '#5A6976',
  txt: '#D4C58C',
  mark: '#FFA500',
  image: '#8E7CC3',
  audio: '#A67B5B',
  video: '#4A5568',
  three: '#5F9E86',
  code: '#4B636E',
  database: '#4A5A6B',
  link: '#5D7CBA',
  zip: '#8B5E3C',
  file: '#AAB2BF',
  unknown: '#888888'
};

// 自己定义文件颜色1
export const colorMap2: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#4CB050',
  ppt: '#FF9933',
  pdf: '#E81123',
  txt: '#666666',
  mark: '#FFA500',
  image: '#B490F3',
  audio: '#00B2EE',
  video: '#2EC4B6',
  three: '#00C8FF',
  code: '#00589F',
  database: '#F5A623',
  link: '#007BFF',
  zip: '#888888',
  file: '#F0D9B5',
  unknown: '#D8D8D8'
};
