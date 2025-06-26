<script setup lang="ts">
import { ref } from 'vue';
import { EditorSender } from '../../components';

/** 示例一相关 */
// 异步匹配@人员
async function asyncMatchUser(searchVal: string) {
  console.log(searchVal, '在@之后输入的内容');
  if (!searchVal) {
    return [];
  }
  // 查询github用户
  const res = await fetch(
    `https://api.github.com/search/users?q=${searchVal}`
  ).then(res => res.json());
  return (
    res?.items?.map((item: any) => {
      return {
        id: item.id,
        name: item.login,
        avatar: item.avatar_url
      };
    }) ?? []
  );
}

/** 示例二相关 */
const editorRef = ref<InstanceType<typeof EditorSender>>();
const selectList = ref([
  {
    dialogTitle: '风格选择',
    key: 'style',
    options: [
      {
        id: '1',
        name: '人像摄影',
        preview: 'https://www.jianfv.top/style/style1.webp'
      },
      {
        id: '2',
        name: '电影写真',
        preview: 'https://www.jianfv.top/style/style2.webp'
      },
      {
        id: '3',
        name: '中国风',
        preview: 'https://www.jianfv.top/style/style3.webp'
      }
    ]
  }
]);
const userList = ref([
  {
    id: '5',
    name: '张三丰',
    pinyin: 'zhang san feng'
  },
  {
    id: '1',
    name: '张三',
    pinyin: 'zhang san'
  },
  {
    id: '2',
    name: '李四',
    pinyin: 'li si'
  },
  {
    id: '3',
    name: '王五',
    pinyin: 'wang wu'
  },
  {
    id: '4',
    name: '马六',
    pinyin: 'ma liu'
  }
]);
</script>

<template>
  <div class="other-wrap">
    <p>
      异步加载@成员示例（本示例接口调用的是github的接口，一定时间内对ip有访问次数限制）：
    </p>
    <EditorSender
      placeholder="请在@之后随便输入点什么吧"
      :async-match-fun="asyncMatchUser"
      :custom-style="{ maxHeight: '240px' }"
    />

    <p style="margin-top: 100px">
      自定义弹窗示例，本文示例了自定义@弹窗，自定义选择弹窗，其他同理
    </p>
    <p>
      <el-button @click="editorRef?.setSelectTag('style', '1')">
        插入一个选择标签以展示自定义选择弹窗
      </el-button>
    </p>
    <EditorSender
      ref="editorRef"
      placeholder="这里是自定义弹窗"
      :custom-style="{ maxHeight: '240px' }"
      :custom-dialog="true"
      :select-list="selectList"
      :user-list="userList"
    />
  </div>
</template>

<style scoped lang="scss">
.other-wrap {
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
