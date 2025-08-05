interface Sponsor {
  company: string;
  logo: string;
  companyUrl: string;
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  company: string;
  content: string;
  role: string;
  userInfoUrl: string;
  date: string; // ISO 日期格式字符串
  likes: number;
}

export const sponsors: Sponsor[] = [
  {
    company: '意心Ai',
    logo: '/zz/yi.png',
    companyUrl: 'https://yxai.chat'
  },
  {
    company: '欢迎赞助',
    logo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    companyUrl: ''
  },
  {
    company: '欢迎赞助',
    logo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    companyUrl: ''
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    name: 'HeJiaYue520',
    avatar: 'https://avatars.githubusercontent.com/u/76239030?s=64&v=4',
    company: '开源爱好者',
    content: '很开心能为开源项目做贡献，希望能给开发者和用户带来帮助',
    role: '前端项目负责人',
    userInfoUrl: 'https://github.com/HeJiaYue520',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 1,
    name: 'willS',
    avatar: 'https://avatars.githubusercontent.com/u/141292859?v=4',
    company: '小鹅通',
    content:
      'Element Plus X - 集打字机、气泡对话、思维链等 AI 组件于一体，让开发应用拥有流畅的智能交互体验',
    role: '前端工程师',
    userInfoUrl: 'https://github.com/mcdonaldsFriedChicken',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 2,
    name: 'Jannik',
    avatar: 'https://avatars.githubusercontent.com/u/74483049?v=4',
    company: '达观数据',
    content: 'Element Plus X - 让我快速构建AI项目',
    role: '前端工程师',
    userInfoUrl: 'https://github.com/lenran659',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 3,
    name: 'Orzi!',
    avatar: 'https://avatars.githubusercontent.com/u/36832622',
    company: '苏州泊网科技有限公司',
    content:
      'Element Plus X - 可以快速的构建AI前端项目，并且功能相对来说也比较完善，设计也较为美观',
    role: '全栈工程师/技术架构师',
    userInfoUrl: 'https://orzi.me',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 4,
    name: '胡林',
    avatar:
      'https://p26-passport.byteacctimg.com/img/mosaic-legacy/3791/5070639578~40x40.awebp',
    company: '个人开发者',
    content: '作为开发者，保留部分自己日常开发遇到的效果以及部分组件封装',
    role: '前端工程师',
    userInfoUrl: 'https://mygithubhulin.github.io/huyuchen/',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 5,
    name: '汪洋',
    role: '前端工程师',
    company: '智行国际',
    avatar:
      'https://avatars.githubusercontent.com/u/23325269?s=400&u=54bfaa9154f93b6620836bef565e1f1fe07eca35&v=4',
    content: 'Element Plus X - 首个基于 Element-plus 开源的优秀AI组件库',
    userInfoUrl: 'https://github.com/869123771/element-pro',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 6,
    name: '柒杉',
    role: '后端工程师',
    company: '个人开发者',
    avatar: 'https://github.com/firLucky.png',
    content: '我很喜欢Element Plus X的对话组件效果，它是我首选的AI组件库',
    userInfoUrl: 'https://github.com/firLucky',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 7,
    name: 'lisentowind',
    avatar: 'https://avatars.githubusercontent.com/u/88653280?s=64&v=4',
    company: '开源爱好者',
    content: '团队最近做 AI 产品，试了好几个组件库，最后定了 Element-Plus-X。',
    role: '前端技术负责人',
    userInfoUrl: 'https://github.com/lisentowind',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 8,
    name: 'JsonLee12138',
    avatar: 'https://avatars.githubusercontent.com/u/160690954?s=64&v=4',
    company: '开源爱好者',
    content:
      '主要是它跟我们现有 Vue + Element-Plus 项目兼容性太好了，不用改太多代码。',
    role: '前端架构师',
    userInfoUrl: 'https://github.com/JsonLee12138',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 9,
    name: 'WengJianFei',
    avatar: 'https://avatars.githubusercontent.com/u/77929383?v=4',
    company: '个人开发者',
    content:
      '刚入门 AI 开发时用的就是 Element-Plus-X，文档里的教程一步一步很清楚，连我这种后端转过来的都能很快上手。',
    role: '全栈工程师',
    userInfoUrl: 'https://github.com/WengJianFei',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 10,
    name: 'yuguaa',
    avatar: 'https://avatars.githubusercontent.com/u/58333667?s=64&v=4',
    company: '开源爱好者',
    content:
      '模版项目，注释特别详细，轻松就实现了我的需求，这点确实做得比同类库好。',
    role: '前端工程师',
    userInfoUrl: 'https://github.com/yuguaa',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 11,
    name: 'zljr',
    avatar: 'https://avatars.githubusercontent.com/u/106023970?s=64&v=4',
    company: '个人开发者',
    content:
      '我们项目需要自定义 AI 对话的消息类型，Element-Plus-X 的插槽设计很灵活，这扩展性确实到位。',
    role: '技术架构师',
    userInfoUrl: 'https://github.com/zljr',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 12,
    name: 'lidongyun120398',
    avatar: 'https://avatars.githubusercontent.com/u/74052104?s=64&v=4',
    company: '开源爱好者',
    content:
      '用了 Element-Plus-X 后省心多了，组件的设计规范很统一，从按钮到对话框的风格都能呼应，效率高了不少。',
    role: '全栈工程师',
    userInfoUrl: 'https://github.com/lidongyun120398',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 13,
    name: 'worryzyy',
    avatar: 'https://avatars.githubusercontent.com/u/70956075?s=64&v=4',
    company: '开源爱好者',
    content: '社区响应速度特别快，用着特别踏实，以后做 AI 项目还选它。',
    role: '前端组长',
    userInfoUrl: 'https://github.com/worryzyy',
    date: '2025-08-05',
    likes: 42
  },
  {
    id: 14,
    name: 'tydumpling',
    avatar: 'https://avatars.githubusercontent.com/u/113790204?s=64&v=4',
    company: '中科星图',
    content: 'Element-Plus-X是帮助个人和团队开发AI相关项目组件库的首选组件库,模板项目也很有参考性',
    role: '前端工程师',
    userInfoUrl: 'https://github.com/tydumpling',
    date: '2025-08-05',
    likes: 42
  }
];

// 随机生成评论数组的方法
export function shuffleReviews(reviews: Review[]): Review[] {
  // 复制原始数组以避免修改源数据
  const reviewsCopy = [...reviews];

  // 使用Fisher-Yates洗牌算法打乱顺序
  for (let i = reviewsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 交换元素
    [reviewsCopy[i], reviewsCopy[j]] = [reviewsCopy[j], reviewsCopy[i]];
  }
  return reviewsCopy;
}
