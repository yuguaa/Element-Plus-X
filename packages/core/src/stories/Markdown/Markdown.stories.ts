import type { Meta, StoryObj } from '@storybook/vue3';
// import type MarkdownSource from '../../components/Markdown';
import {
  highlightMdContent,
  mathMdContent,
  mdContent,
  mermaidMdContent
} from '@assets/mock';
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
    }
  },
  args: {
    markdown: mdContent,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
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
  } as Story['args']
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
