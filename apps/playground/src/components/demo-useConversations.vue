<script setup lang="ts">
import type { ConversationMenu, GroupableOptions, TimeRange } from 'vue-element-plus-x/src/components/Conversations/types'
import { ArrowDown, Calendar, ChatDotRound, ChatLineRound, Delete, Document, DocumentChecked, DocumentCopy, Download, Edit, InfoFilled, Lock, Message, MoreFilled, Search, Setting, Share, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Conversations from 'vue-element-plus-x/src/components/Conversations/index.vue'

// 测试数据 - 有时间戳的会话
const timeBasedItems = ref([
  {
    key: '1',
    label: '今天的会话111111111111111111111111111',
    timestamp: Date.now(),
  },
  {
    key: '2',
    label: '今天的会话2',
    timestamp: Date.now() - 1000 * 60 * 30, // 30分钟前
  },
  {
    key: '3',
    label: '昨天的会话1',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: '4',
    label: '昨天的会话2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
  },
  {
    key: '5',
    label: '一周前的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 一周前
  },
  {
    key: '6',
    label: '一个月前的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30, // 一个月前
  },
  {
    key: '7',
    label: '很久以前的会话',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 90, // 三个月前
  },
])

// 测试数据 - 有group字段的会话
const groupBasedItems = ref([
  {
    key: 'g1',
    label: '工作文档1',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'g2',
    label: '工作文档11111111111111111111111111111111111111111',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'g3',
    label: '工作文档3',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'g4',
    label: '工作文档4',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'g5',
    label: '工作文档5',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'g6',
    label: '工作文档6',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    key: 'g7',
    label: '学习笔记1',
    group: '学习',
    timestamp: Date.now() - 1000 * 60 * 10,
  },
  {
    key: 'g8',
    label: '学习笔记2',
    group: '学习',
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    key: 'g9',
    label: '个人文档1',
    group: '个人',
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    key: 'g10',
    label: '未分组项目',
    timestamp: Date.now(),
  },
])

// 测试数据 - 用于shortcuts测试的会话
const shortcutItems = ref([
  {
    key: 's1',
    label: '今日会议记录',
    timestamp: Date.now(),
  },
  {
    key: 's2',
    label: '昨日总结',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    key: 's3',
    label: '周末计划',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 前天
  },
  {
    key: 's4',
    label: '上周工作总结',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6天前
  },
  {
    key: 's5',
    label: '重要材料备份',
    timestamp: 1672531200000, // 2023-01-01 的时间戳
  },
  {
    key: 's6',
    label: '元旦活动策划',
    timestamp: 1672531200000, // 2023-01-01 的时间戳，与 s5 同一天
  },
  {
    key: 's7',
    label: '生日聚会照片',
    timestamp: 1677628800000, // 2023-03-01 的时间戳
  },
])

// 测试数据 - 用于菜单测试的会话
const menuTestItems = ref([
  {
    key: 'm1',
    label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试',
    timestamp: Date.now(),
  },
  {
    key: 'm2',
    label: '菜单测试项目 2',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'm3',
    label: '菜单测试项目 3',
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    key: 'm4',
    label: '菜单测试项目 4',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    key: 'm5',
    label: '菜单测试项目 5',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
  },
])

// 测试数据 - 用于搜索功能和图标功能测试的会话
const searchTestItems = ref([
  {
    key: 'i1',
    label: '重要文档Alpha',
    prefixIcon: h(Star),
    timestamp: Date.now(),
  },
  {
    key: 'i2',
    label: '重要会议Beta',
    prefixIcon: h(StarFilled),
    timestamp: Date.now() - 1000 * 60 * 10,
  },
  {
    key: 'i3',
    label: '普通文档Alpha',
    prefixIcon: h(Document),
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    key: 'i4',
    label: '私密文档Secret',
    prefixIcon: h(Lock),
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'i5',
    label: '日程Alpha',
    prefixIcon: h(Calendar),
    timestamp: Date.now() - 1000 * 60 * 40,
  },
  {
    key: 'i6',
    label: '备份文档Beta',
    prefixIcon: h(DocumentCopy),
    timestamp: Date.now() - 1000 * 60 * 50,
  },
  {
    key: 'i7',
    label: '系统设置',
    prefixIcon: h(Setting),
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    key: 'i8',
    label: '已完成任务',
    prefixIcon: h(DocumentChecked),
    timestamp: Date.now() - 1000 * 60 * 70,
  },
])

// 测试数据 - 懒加载测试
const lazyItems = ref([
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: h(ChatLineRound),
    timestamp: Date.now(),
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: h(ChatDotRound),
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: h(ChatLineRound),
    timestamp: Date.now() - 1000 * 60 * 40,
  },
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: h(ChatLineRound),
    timestamp: Date.now(),
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: h(ChatDotRound),
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: h(ChatLineRound),
    timestamp: Date.now() - 1000 * 60 * 40,
  },
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: h(ChatLineRound),
    timestamp: Date.now(),
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: h(ChatDotRound),
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: h(ChatLineRound),
    timestamp: Date.now() - 1000 * 60 * 40,
  },
])

// 测试数据 - 禁用项测试
const disabledItems = ref([
  {
    key: 'd1',
    label: '常规项目1',
    timestamp: Date.now(),
  },
  {
    key: 'd2',
    label: '禁用项目1（不可选）',
    disabled: true,
    timestamp: Date.now() - 1000 * 60 * 10,
  },
  {
    key: 'd3',
    label: '常规项目2',
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    key: 'd4',
    label: '禁用项目2（不可选）',
    disabled: true,
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    key: 'd5',
    label: '常规项目3',
    timestamp: Date.now() - 1000 * 60 * 40,
  },
])

// 自定义分组选项
const customGroupOptions: GroupableOptions = {
  // 自定义分组排序，学习 > 工作 > 个人 > 未分组
  sort: (a, b) => {
    const order: Record<string, number> = { 学习: 0, 工作: 1, 个人: 2, 未分组: 3 }
    const orderA = order[a] !== undefined ? order[a] : 999
    const orderB = order[b] !== undefined ? order[b] : 999
    return orderA - orderB
  },
  // 自定义标题渲染
  title: (groupName) => {
    // 为不同组添加不同的前缀
    const prefixes: Record<string, string> = {
      工作: '📊 ',
      学习: '📚 ',
      个人: '🏠 ',
      未分组: '📁 ',
    }
    const prefix = prefixes[groupName] || ''
    return h('div', { class: 'custom-group-title' }, `${prefix}${groupName}`)
  },
}

// 时间快捷方式设置
const timeShortcuts = {
  // 使用日期时间戳（元旦和生日）
  元旦活动: 1672531200000, // 2023-01-01 的时间戳
  三月活动: 1677628800000, // 2023-03-01 的时间戳
  // 使用动态时间函数（今天、昨天、本周）
  今日动态: () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  },
  昨日动态: () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime()
  },
  本周动态: () => {
    const now = new Date()
    // 获取前7天的时间戳
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime()
  },
}

// 菜单项目定义
const conversationMenuItems = [
  {
    key: 'edit',
    label: '编辑',
    icon: h(Edit),
  },
  {
    key: 'delete',
    label: '删除',
    icon: h(Delete),
  },
  {
    key: 'share',
    label: '分享',
    icon: h(Share),
  },
]

// 搜索相关
const searchValue = ref('')
const searchResults = ref([...searchTestItems.value])

// 搜索处理函数
function handleSearch(value: string) {
  if (!value) {
    searchResults.value = [...searchTestItems.value]
    return
  }

  searchResults.value = searchTestItems.value.filter(item =>
    item.label.toLowerCase().includes(value.toLowerCase()),
  )
}

// 加载更多处理
const isLoading = ref(false)

function loadMoreItems() {
  if (isLoading.value)
    return

  isLoading.value = true
  ElMessage.info('加载更多数据...')

  // 模拟异步加载
  setTimeout(() => {
    const newItems = [
      {
        key: `l${lazyItems.value.length + 1}`,
        label: `加载的项目${lazyItems.value.length + 1}`,
        prefixIcon: h(ChatLineRound),
        timestamp: Date.now() - 1000 * 60 * (lazyItems.value.length * 10),
      },
      {
        key: `l${lazyItems.value.length + 2}`,
        label: `加载的项目${lazyItems.value.length + 2}`,
        prefixIcon: h(ChatDotRound),
        timestamp: Date.now() - 1000 * 60 * (lazyItems.value.length * 10 + 10),
      },
    ]

    lazyItems.value = [...lazyItems.value, ...newItems]
    isLoading.value = false
  }, 1000)
}

// 激活的键
const activeKey1 = ref('1')
const activeKey2 = ref('g1')
const activeKey3 = ref('s1')
const activeKey4 = ref('m1')
const activeKey5 = ref('i1')
const activeKey6 = ref('l1')
const activeKey7 = ref('d1')

// 处理菜单点击
function handleMenuClick(menuKey: string, item: any) {
  switch (menuKey) {
    case 'edit':
      ElMessage.info(`编辑: ${item.label}`)
      break
    case 'delete':
      ElMessage.warning(`删除: ${item.label}`)
      break
    case 'share':
      ElMessage.success(`分享: ${item.label}`)
      break
  }
}
</script>

<template>
  <div class="demo-container">
    <h2>场景一：基础时间分组 (groupable)</h2>
    <p class="description">
      使用无值属性语法设置 groupable，基于时间戳自动分组为：今天、昨天、近七天、近一个月、更久以前
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey1"
        :items="timeBasedItems"
        groupable
        :label-max-width="200"
        :show-tooltip="true"
      />
    </div>

    <h2>场景二：自定义分组 (groupable为对象)</h2>
    <p class="description">
      传入groupable对象，包含自定义排序和自定义标题渲染
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey2"
        :items="groupBasedItems"
        :groupable="customGroupOptions"
        :label-max-width="200"
        :show-tooltip="true"
      />
    </div>

    <h2>场景三：时间快捷方式分组 (shortcuts)</h2>
    <p class="description">
      传入shortcuts时自动启用分组，将相同日期的项目分到同一组，支持固定时间戳和动态时间函数
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey3"
        :items="shortcutItems"
        :shortcuts="timeShortcuts"
        :label-max-width="200"
        :show-tooltip="true"
      />
    </div>

    <h2>场景四：菜单功能测试</h2>
    <p class="description">
      演示悬停和选中状态下显示菜单，其他状态下隐藏菜单的效果
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey4"
        :items="menuTestItems"
        :label-max-width="200"
        :show-tooltip="true"
      >
        <template #menu="{ item }">
          <div class="menu-buttons">
            <el-button
              v-for="menuItem in conversationMenuItems"
              :key="menuItem.key"
              type="text"
              size="small"
              @click.stop="handleMenuClick(menuItem.key, item)"
            >
              <el-icon v-if="menuItem.icon">
                <component :is="menuItem.icon" />
              </el-icon>
              <span v-if="menuItem.label">{{ menuItem.label }}</span>
            </el-button>
          </div>
        </template>
      </Conversations>
    </div>

    <h2>场景五：搜索和图标功能</h2>
    <p class="description">
      演示搜索功能和自定义前缀图标
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey5"
        v-model:search="searchValue"
        :items="searchResults"
        :search-method="handleSearch"
        :label-max-width="200"
        :show-tooltip="true"
      />
    </div>

    <h2>场景六：加载更多功能</h2>
    <p class="description">
      演示滚动到底部时加载更多数据
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey6"
        :items="lazyItems"
        :label-max-width="200"
        :show-tooltip="true"
        :load-more="loadMoreItems"
      />
    </div>

    <h2>场景七：禁用项测试</h2>
    <p class="description">
      演示禁用项不可点击选中
    </p>
    <div class="demo-card">
      <Conversations
        v-model:active="activeKey7"
        :items="disabledItems"
        :label-max-width="200"
        :show-tooltip="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 20px;

  h2 {
    margin-top: 30px;
    margin-bottom: 8px;
    font-size: 18px;
  }

  .description {
    color: #909399;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .demo-card {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: hidden;
    height: 400px;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #409EFF;
}

.menu-buttons {
  display: flex;
  gap: 8px;
  align-items: center;

  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 2px;
    }
  }
}
</style>
