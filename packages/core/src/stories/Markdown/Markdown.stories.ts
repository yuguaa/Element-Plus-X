import type { Meta, StoryObj } from '@storybook/vue3';
import {
  highlightMdContent,
  mathMdContent,
  mdContent,
  mermaidMdContent
} from '@assets/mock';
import HighlightCodeDemo from './highlight-code.vue';
import Markdown from './index.vue';
import MermaidSlot from './mermaid-slot.vue';

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

// Mermaid 插槽功能演示
export const MermaidSlotDemo: Story = {
  args: {
    markdown: mermaidMdContent,
    mermaidConfig: {
      showToolbar: true,
      showFullscreen: true,
      showZoomIn: true,
      showZoomOut: true,
      showReset: true,
      showDownload: true,
      toolbarStyle: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
        borderRadius: '8px'
      },
      iconColor: '#FFFFFF',
      tabTextColor: '#FFFFFF'
    }
  } as Story['args'],

  render: args => ({
    components: {
      MermaidSlot
    },
    setup() {
      return { attrs: args };
    },
    template: `<MermaidSlot v-bind="attrs"  />`
  })
  // render: () => MermaidSlot
};
