import type { Meta, StoryObj } from '@storybook/vue3';
import {
  highlightMdContent,
  mathMdContent,
  mdContent,
  mermaidMdContent
} from '@assets/mock';
import HighlightCodeDemo from './highlight-code.vue';
import Markdown from './index.vue';

const meta = {
  title: 'Example/Markdown 组件 ',
  component: Markdown,
  tags: ['autodocs'],
  argTypes: {
    markdown: { control: 'text' },
    themes: {
      control: 'object',
      defaultValue: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    },
    mermaidConfig: { control: 'object' }
  },
  args: {
    markdown: mdContent,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    mermaidConfig: {
      showToolbar: true,
      showFullscreen: true,
      showZoomIn: true,
      showZoomOut: true,
      showReset: true,
      showDownload: true,
      toolbarStyle: {},
      toolbarClass: 'mermaid-config-toolbar'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const MarkdownDemo: Story = {
  args: {
    markdown: mdContent
  } as Story['args']
};

export const highlightMdContentDemo: Story = {
  args: {
    markdown: highlightMdContent
  },
  render: args => ({
    components: {
      HighlightCodeDemo
    },
    setup() {
      return { attrs: args };
    },
    template: `<HighlightCodeDemo v-bind="attrs"  />`
  })
};

export const PieRenderDemo: Story = {
  args: {
    markdown: mermaidMdContent
  } as Story['args']
};

export const MathRenderDemo: Story = {
  args: {
    markdown: mathMdContent
  } as Story['args']
};

// Mermaid 工具栏配置演示
export const MermaidToolbarDemo: Story = {
  args: {
    markdown: mermaidMdContent,
    mermaidConfig: {
      showToolbar: true,
      showFullscreen: true,
      showZoomIn: true,
      showZoomOut: true,
      showReset: true,
      toolbarStyle: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      },
      toolbarClass: 'mermaid-config-toolbar',
      iconColor: '#FFFFFF',
      tabTextColor: '#FFFFFF'
    }
  } as Story['args']
};

// Mermaid 渲染复杂图表案例
export const MermaidComplexDemo: Story = {
  args: {
    markdown: `
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
\`\`\`
`
  } as Story['args']
};
