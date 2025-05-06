<!-- home 首页-使用 Bubble 组件 -->
<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts'
// import Prompts from 'vue-element-plus-x/src/components/Prompts/index.vue'

onMounted(() => {
  setItems()
})

const items = ref<PromptsItemsProps[]>([])
const items2 = ref<PromptsItemsProps[]>([])
const items3 = ref<PromptsItemsProps[]>([])
const num = ref(3)

function setItems() {
  for (let index = 0; index < num.value; index++) {
    items.value.push({
      key: index,
      label: `🐠 主标题 ${index}`,
      description: `描述 ${index}`,
      // icon: h(InfoFilled, { style: { color: '#409EFF' } }),
      // icon: 'ancient-gate-fill',
      disabled: false,
      itemStyle: {
        width: `calc(100% / ${num.value} - 43px)`,
        backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
      },
      itemHoverStyle: {
        cursor: 'unset',
        // background: '#409EFF',
        // color: '#fff',
      },
      // itemActiveStyle: {
      //   // background: 'red',
      //   // color: '#fff',
      // },
      children: [
        {
          key: `${index}-1`,
          label: `🐛 子标题 ${index}-1`,
          description: `描述 ${index}`,
          disabled: false,
          itemStyle: {
            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
            border: '1px solid #FFF',
          },
          itemHoverStyle: {
            cursor: 'unset',
          },
          children: [
            {
              key: `${index}-1-1`,
              label: `🐛 孙子标题 ${index}-1-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #FFF',
              },
            },
            {
              key: `${index}-1-2`,
              label: `🐛 孙子标题 ${index}-1-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #',
              },
            },
            {
              key: `${index}-1-3`,
              label: `🐛 孙子标题 ${index}-1-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #FFF',
              },
            },
          ],
        },
        {
          key: `${index}-2`,
          label: `🐛 子标题 ${index}-2`,
          description: `描述 ${index}`,
          disabled: false,
          itemStyle: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
        {
          key: `${index}-3`,
          label: `🐛 子标题 ${index}-3`,
          description: `描述 ${index}`,
          disabled: false,
          itemStyle: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
      ],
    })
  }

  // 基础渲染
  items2.value = [
    {
      key: '1',
      label: '🐛 提示集组件标题',
      description: '描述信息'.repeat(3),
    },
    {
      key: '2',
      label: '🐛 提示集组件标题',
    },
  ]

  // 禁用渲染
  items3.value = [
    {
      key: '1',
      label: '🐛 提示集组件禁用',
      description: '描述信息禁用'.repeat(3),
      disabled: true,
    },
    {
      key: '2',
      label: '🐛 提示集组件禁用',
      disabled: true,
    },
  ]
}

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`点击了 ${item.key}`)
  console.log('item', item)
}
</script>

<template>
  <div class="component-container">
    <div class="component-title">
      提示集组件-基础演示
    </div>
    <Prompts
      title="🐵 提示集组件标题"
      :items="items2"
      wrap
      @item-click="handleItemClick"
    />

    <div class="component-title">
      提示集组件-禁用
    </div>
    <Prompts
      title="🐵 提示集组件标题"
      :items="items3"
      wrap
      @item-click="handleItemClick"
    />

    <div class="component-title">
      提示集组件-垂直排列
    </div>
    <Prompts
      title="🐵 提示集组件垂直排列"
      :items="items2"
      vertical
      @item-click="handleItemClick"
    />

    <div class="component-title">
      提示集组件-嵌套演示
    </div>
    <Prompts
      title="🐛 提示集组件标题"
      :items="items"
      wrap
      @item-click="handleItemClick"
    />
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;
    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409EFF;
    }
  }
}
</style>
