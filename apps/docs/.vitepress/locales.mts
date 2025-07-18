import type { DefaultTheme, LocaleConfig } from 'vitepress';

const config = {
  root: {
    label: 'English',
    lang: 'en',
    themeConfig: {
      // 英文导航
      nav: [
        { text: '💌 Invitation', link: '/introduce' },
        { text: '🎀 Roadmap', link: '/roadmap' },
        { text: '📆 Changelog', link: '/update-log' },
        { text: '🌱 Ecosystem', items: [
          { text: 'ruoyi-element-ai (Template)', link: 'https://chat-docs.element-plus-x.com/' },
          { text: 'element-ui-x (Vue2)', link: 'https://element-ui-x.com/' },
          { text: 'hook-fetch (Request Lib)', link: 'https://jsonlee12138.github.io/hook-fetch/' }
        ] },
        { text: '🧭 Guide', link: '/guide/install/' },
        { text: '🎨 Components', link: '/components/xmarkdown/' },
      ],
      // 英文侧边栏
      sidebar: {
        '/components/': [
          {
            text: 'New',
            items: [
              { text: 'XMarkdown Render 📜', link: '/components/xmarkdown/' },
            ],
          },
          {
            text: 'General',
            items: [
              { text: 'Typewriter ✍', link: '/components/typewriter/' },
              { text: 'Bubble 🔥', link: '/components/bubble/' },
              { text: 'BubbleList 🍅', link: '/components/bubbleList/' },
              { text: 'Conversations 📱', link: '/components/conversations/' },
            ],
          },
          {
            text: 'Awakening',
            items: [
              { text: 'Welcome 🌹', link: '/components/welcome/' },
              { text: 'Prompts 🎁', link: '/components/prompts/' },
            ],
          },
          {
            text: 'Expression',
            items: [
              { text: 'FilesCard 📇', link: '/components/filesCard/' },
              { text: 'Attachments 📪️', link: '/components/attachments/' },
              { text: 'Sender 💭', link: '/components/sender/' },
              { text: 'MentionSender 🦥', link: '/components/mentionSender/' },
            ],
          },
          {
            text: 'Confirmation',
            items: [
              { text: 'Thinking 🍓', link: '/components/thinking/' },
              { text: 'ThoughtChain 🔗', link: '/components/thoughtChain/' },
            ],
          },
          {
            text: 'Tools',
            items: [
              { text: 'useRecord 🌴', link: '/components/useRecord/' },
              { text: 'useXStream 🌱', link: '/components/useXStream/' },
              { text: 'useSend & XRequest 🌳', link: '/components/useSend/' },
            ],
          },
        ],
        '/guide/': [
          {
            text: 'Basic',
            items: [
              { text: '📦 Installation', link: '/guide/install' },
              { text: '🗝 Development', link: '/guide/develop' },
            ],
          },
        ],
      },
      // 英文搜索配置
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: 'Search',
              buttonAriaLabel: 'Search',
            },
            modal: {
              noResultsText: 'No results found',
              resetButtonTitle: 'Clear query',
              footer: {
                selectText: 'Select',
                navigateText: 'Navigate',
                closeText: 'Close',
              },
            },
          },
        },
      },
      // 英文页脚
      docFooter: {
        prev: 'Previous',
        next: 'Next',
      },
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Back to top',
      lastUpdatedText: 'Last updated',
      darkModeSwitchLabel: 'Dark mode',
      outline: {
        label: '📖 Table of Contents',
        level: [2, 6],
      },
    },
  },
  zh: {
    label: '简体中文',
    lang: 'zh-CN',
    link: '/zh/',
    themeConfig: {
      // 中文导航
      nav: [
        { text: '💌 交流邀请', link: '/zh/introduce' },
        { text: '🎀 开发计划', link: '/zh/roadmap' },
        { text: '📆 更新日志', link: '/zh/update-log' },
        { text: '🌱 生态', items: [
          { text: 'ruoyi-element-ai (模板项目)', link: 'https://chat-docs.element-plus-x.com/' },
          { text: 'element-ui-x (vue2版本)', link: 'https://element-ui-x.com/' },
          { text: 'hook-fetch (请求库)', link: 'https://jsonlee12138.github.io/hook-fetch/' }
        ] },
        { text: '🧭 指南', link: '/zh/guide/install/' },
        { text: '🎨 组件', link: '/zh/components/xmarkdown/' },
      ],
      // 中文侧边栏
      sidebar: {
        '/zh/components/': [
          {
            text: '上新',
            items: [
              { text: 'XMarkdown 渲染组件 📜', link: '/zh/components/xmarkdown/' },
            ],
          },
          {
            text: '通用',
            items: [
              { text: 'Typewriter 打字器 ✍', link: '/zh/components/typewriter/' },
              { text: 'Bubble 对话气泡 🔥', link: '/zh/components/bubble/' },
              { text: 'BubbleList 气泡列表 🍅', link: '/zh/components/bubbleList/' },
              { text: 'Conversations 会话管理 📱', link: '/zh/components/conversations/' },
            ],
          },
          {
            text: '唤醒',
            items: [
              { text: 'Welcome 欢迎 🌹', link: '/zh/components/welcome/' },
              { text: 'Prompts 提示集 🎁', link: '/zh/components/prompts/' },
            ],
          },
          {
            text: '表达',
            items: [
              { text: 'FilesCard 文件卡片 📇', link: '/zh/components/filesCard/' },
              { text: 'Attachments 输入附件 📪️', link: '/zh/components/attachments/' },
              { text: 'Sender 输入框 💭', link: '/zh/components/sender/' },
              { text: 'MentionSender 提及输入框 🦥', link: '/zh/components/mentionSender/' },
            ],
          },
          {
            text: '确认',
            items: [
              { text: 'Thinking 思考中 🍓', link: '/zh/components/thinking/' },
              { text: 'ThoughtChain 思维链 🔗', link: '/zh/components/thoughtChain/' },
            ],
          },
          {
            text: '工具',
            items: [
              { text: 'useRecord 🌴', link: '/zh/components/useRecord/' },
              { text: 'useXStream 🌱', link: '/zh/components/useXStream/' },
              { text: 'useSend & XRequest 🌳', link: '/zh/components/useSend/' },
            ],
          },
        ],
        '/zh/guide/': [
          {
            text: '基础',
            items: [
              { text: '📦 安装指南', link: '/zh/guide/install' },
              { text: '🗝 开发指南', link: '/zh/guide/develop' },
            ],
          },
        ],
      },
      // 中文搜索配置
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
              },
            },
          },
        },
      },
      // 中文页脚
      docFooter: {
        prev: '上一篇',
        next: '下一篇',
      },
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '返回顶部',
      lastUpdatedText: '最后更新于',
      darkModeSwitchLabel: '深色模式',
      outline: {
        label: '📖 目录',
        level: [2, 6],
      },
    },
  },
} satisfies LocaleConfig<DefaultTheme.Config>;

export default config;
