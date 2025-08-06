<docs>
---
title: 异步加载 @成员示例
---

通过 `asyncMatchFun` 属性配置异步匹配函数。 `@` 触发用户标签弹窗。
</docs>

<script setup lang="ts">
import type { TagInfo, UserInfo } from 'vue-element-plus-x/types/EditorSender';
import { ref } from 'vue';
import { EditorSender } from 'vue-element-plus-x';

const editorRef = ref<InstanceType<typeof EditorSender>>();
// 自定义@弹窗相关逻辑
const userList = ref([
  {
    id: '5',
    name: '张三丰'
  },
  {
    id: '1',
    name: '张三'
  },
  {
    id: '2',
    name: '李四'
  },
  {
    id: '3',
    name: '王五'
  },
  {
    id: '4',
    name: '马六'
  }
]);
const dialogUserVisible = ref(false);
function showAtDialog() {
  dialogUserVisible.value = true;
}
function checkUser(user: UserInfo) {
  editorRef.value?.customSetUser(user);
  dialogUserVisible.value = false;
}

// 自定义触发符相关逻辑
const customTrigger = ref([
  {
    dialogTitle: '群话题',
    prefix: '#',
    tagList: [
      { id: 'ht1', name: '话题一' },
      { id: 'ht2', name: '话题二' }
    ]
  },
  {
    dialogTitle: '群工具',
    prefix: '!',
    tagList: [
      { id: 'gj1', name: '工具一' },
      { id: 'gj2', name: '工具二' }
    ]
  }
]);
const dialogCustomVisible = ref(false);
const viewPrefix = ref('');
function showTagDialog(prefix: string) {
  viewPrefix.value = prefix;
  dialogCustomVisible.value = true;
}
function checkTag(tag: TagInfo) {
  editorRef.value?.customSetTag(viewPrefix.value, tag);
  dialogCustomVisible.value = false;
}

// 自定义选择标签相关逻辑
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
const viewKey = ref('');
const dialogSelectVisible = ref(false);
const currentSelectElm = ref<HTMLElement>();
function showSelectDialog(key: string, elm?: HTMLElement) {
  viewKey.value = key;
  // 有elm值说明内部聊天框唤起
  currentSelectElm.value = elm;
  dialogSelectVisible.value = true;
}
function checkSelect(tag: TagInfo) {
  // 没有 currentSelectElm 说明是外部调用走插入逻辑
  if (!currentSelectElm.value) {
    editorRef.value?.setSelectTag(viewKey.value, tag.id);
  } else {
    // 有值走标签更新方法
    editorRef.value?.updateSelectTag(currentSelectElm.value, tag);
  }
  dialogSelectVisible.value = false;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <EditorSender
      ref="editorRef"
      placeholder="这里是自定义弹窗，你可以试着输入@，!，#这些触发符号"
      :custom-style="{ maxHeight: '240px' }"
      :custom-dialog="true"
      :select-list="selectList"
      :user-list="userList"
      :custom-trigger="customTrigger"
      @show-at-dialog="showAtDialog"
      @show-tag-dialog="showTagDialog"
      @show-select-dialog="showSelectDialog"
    />

    <el-dialog
      v-model="dialogUserVisible"
      title="自定义人员选择弹窗"
      width="500"
    >
      <p v-for="user of userList" :key="user.id" @click="checkUser(user)">
        {{ user.name }}
      </p>
    </el-dialog>

    <el-dialog
      v-model="dialogCustomVisible"
      title="自定义触发符号选择弹窗"
      width="500"
    >
      <template v-for="option of customTrigger" :key="option.prefix">
        <div v-if="option.prefix === viewPrefix">
          <p v-for="tag of option.tagList" :key="tag.id" @click="checkTag(tag)">
            {{ tag.name }}
          </p>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogSelectVisible"
      title="自定义选择标签弹窗"
      width="500"
    >
      <template v-for="option of selectList" :key="option.key">
        <div v-if="option.key === viewKey">
          <p
            v-for="tag of option.options"
            :key="tag.id"
            @click="checkSelect(tag)"
          >
            {{ tag.name }}
          </p>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
:deep(.at-select) {
  cursor: pointer;
  svg {
    display: inline-block;
  }
}
</style>
