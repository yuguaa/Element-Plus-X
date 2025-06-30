import type WelcomeSource from '@components/Welcome/index.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import CustomSolt from './CustomSolt.vue';
import Welcome from './index.vue';

const meta: Meta<typeof WelcomeSource> = {
  title: 'Example/Welcome 欢迎 🌹',
  component: Welcome,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      defaultValue: 'filled',
      options: ['filled', 'borderless'],
      description: '组件样式变体（filled/borderless）'
    },
    direction: {
      control: { type: 'radio' },
      defaultValue: 'ltr',
      options: ['ltr', 'rtl'],
      description: '组件语言方向（ltr/rtl）'
    },
    icon: {
      control: { type: 'text' },
      defaultValue: '',
      description: '图标URL地址'
    },
    title: {
      control: { type: 'text' },
      defaultValue: '标题',
      description: '标题'
    },
    extra: {
      control: { type: 'text' },
      defaultValue: '额外信息',
      description: '额外信息'
    },
    description: {
      control: { type: 'text' },
      defaultValue: '描述',
      description: '描述文本内容'
    },
    className: {
      control: { type: 'text' },
      defaultValue: '',
      description: '容器外层自定义类名'
    },
    rootClassName: {
      control: { type: 'text' },
      defaultValue: '',
      description: '根节点自定义类名'
    },
    classNames: {
      control: { type: 'object' },
      defaultValue: {
        icon: '',
        title: '',
        extra: '',
        description: ''
      },
      description: '各部分自定义类名({ icon, title, extra, description })'
    },
    style: {
      control: { type: 'object' },
      description: '容器外层自定义样式'
    },
    styles: {
      control: { type: 'object' },
      description: '各部分自定义样式({ icon, title, extra, description })'
    },
    prefixCls: {
      control: { type: 'text' },
      default: 'welcome',
      description: '组件类名前缀'
    }
  }
} satisfies Meta<typeof WelcomeSource>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WelcomeDemo: Story = {
  args: {
    title: '欢迎使用Element-Plus-X AI 助手',
    description: '一起玩耍吧',
    icon: 'https://camo.githubusercontent.com/4ea7fdaabf101c16965c0bd3ead816c9d7726a59b06f0800eb7c9a30212d5a6a/68747470733a2f2f63646e2e656c656d656e742d706c75732d782e636f6d2f656c656d656e742d706c75732d782e706e67',
    direction: 'ltr',
    variant: 'filled'
  }
};

export const SlotDemo: Story = {
  args: {
    title: '欢迎使用Element-Plus-X AI 助手',
    description: '一起玩耍吧',
    direction: 'ltr',
    variant: 'filled',
    showExtraSlot: true,
    showImageSlot: true
  } as any,
  render: (args: any) => ({
    components: {
      CustomSolt
    },
    setup() {
      return { attrs: args };
    },
    template: `<CustomSolt v-bind="attrs" />`
  })
};
