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
###### 非commonMark语法，dom多个
<pre>
<code class="language-java">
public class HelloWorld {
  public static void main(String[] args) {
      System.out.println("Hello, world!");
  }
}
</code>
<code class="language-javascript">console.log('Hello, world!');</code>
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
