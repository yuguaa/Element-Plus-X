import type { BubbleProps } from 'vue-element-plus-x/types/components/Bubble/types'
import type { BubbleListProps } from 'vue-element-plus-x/types/components/BubbleList/types'
import type { ThinkingStatus } from 'vue-element-plus-x/types/components/Thought/types'

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
