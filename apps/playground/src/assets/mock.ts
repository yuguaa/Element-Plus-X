import type { BubbleProps } from 'vue-element-plus-x/types/Bubble'
import type { BubbleListProps } from 'vue-element-plus-x/types/BubbleList'
import type { FilesType } from 'vue-element-plus-x/types/FilesCard'
import type { ThinkingStatus } from 'vue-element-plus-x/types/Thinking'

const avatar
  = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

export type MessageItem = BubbleProps & {
  key: number
  role: 'ai' | 'user' | 'system'
  avatar: string
  thinkingStatus?: ThinkingStatus
  expanded?: boolean
}

export const messageArr: BubbleListProps<MessageItem>['list'] = [
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content:
      '这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息',
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar,
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
    avatar,
  },
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content:
      '这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息',
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar,
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
    avatar,
  },
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content:
      '这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息',
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar,
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
    avatar,
  },
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content:
      '这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息这是机器人的消息',
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar,
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
    avatar,
  },
]

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
  unknown: '#6E9DA4',
}

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
  unknown: '#888888',
}

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
  unknown: '#D8D8D8',
}
