import type AttachmentsSource from '@components/Attachments/index.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import CustomSolt from './CustomSolt.vue';
import Attachments from './index.vue';
// import { genDefaultFiles } from './useAttachmentStubs.ts';

const meta: Meta = {
  title: 'Example/Attachments 附件上传组件 📪️',
  tags: ['autodocs'],
  component: Attachments,
  argTypes: {
    items: {
      control: 'object'
    },
    overflow: {
      control: 'radio',
      options: ['scrollX', 'scrollY', 'wrap']
    },
    listStyle: {
      control: 'object'
    },
    limit: {
      control: 'number'
    },
    hideUpload: {
      control: 'boolean'
    },
    uploadIconSize: {
      control: 'text'
    },
    dragTarget: {
      control: 'text'
    }
  },
  args: {
    items: [
      {
        uid: '1'.toString(),
        name: `文件${1}`,
        fileSize: 1024 * 2,
        fileType: 'file',
        url: 'https://avatars.githubusercontent.com/u/76239030?s=70&v=4',
        thumbUrl: 'https://avatars.githubusercontent.com/u/76239030?s=70&v=4',
        imgFile: new File([], `test${1}.txt`),
        showDelIcon: true
      }
    ],
    overflow: 'scrollX',
    listStyle: {
      padding: '0 12px',
      height: '320px'
    },
    limit: 0,
    hideUpload: false,
    uploadIconSize: '64px',
    dragTarget: ''
  }
} satisfies Meta<typeof AttachmentsSource>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AttachmentsDemo: Story = {
  args: {}
};

export const Solt: Story = {
  name: 'CustomSolt',
  args: {
    ...AttachmentsDemo.args
  } as Story['args'],
  render: args => ({
    components: {
      CustomSolt
    },
    setup() {
      return {
        attrs: args
      };
    },
    template: '<CustomSolt v-bind="attrs" />'
  })
};
