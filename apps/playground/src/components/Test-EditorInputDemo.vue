<!-- 富文本输入框 测试中... -->
<script setup lang='ts'>
import { EditorInput } from 'vue-element-plus-x'

const value = ref('')
const inputRef = ref()

function focus(type: 'start' | 'end' | 'all') {
  if (type === 'start') {
    inputRef.value.moveToStart()
  }
  else if (type === 'end') {
    inputRef.value.moveToEnd()
  }
  else {
    inputRef.value.selectAll()
  }
}

function blur() {
  inputRef.value.blur()
}

function insertElement() {
  // 就是插入一段带 特殊解析符号的 字符串
  inputRef.value.insertElement({
    type: 'self_node',
    data: {
      id: 'self_node_1',
      name: '自定义节点1',
    },
    content: '「自定义内容」',
    click: (val: any) => {
      console.log('click', val)
    },
  })
}
</script>

<template>
  <div class="component-container">
    <div class="top-wrap">
      <div class="btn-list">
        <el-button dark type="success" plain @click="focus('start')">
          文本最前方
        </el-button>
        <el-button dark type="success" plain @click="focus('end')">
          文本最后方
        </el-button>
        <el-button dark type="success" plain @click="focus('all')">
          整个文本
        </el-button>
        <el-button dark type="success" plain @click="blur">
          取消焦点
        </el-button>

        <el-button dark type="success" plain @click="insertElement">
          插入自定义节点
        </el-button>
      </div>
    </div>

    <div class="self_node">
      自定义节点
    </div>

    <EditorInput
      ref="inputRef" v-model="value" placeholder="请输入内容 啊啊啊啊" :input-style="{ width: '100%', color: 'red' }"
      :autosize="{ minRows: 2, maxRows: 4 }"
    />
  </div>
</template>

<style scoped lang='scss'>
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 220px);
  overflow: auto;
  // overflow: auto;

  .top-wrap {
    margin: 12px 0;

    .btn-list {
      display: flex;
      flex-wrap: wrap;

      :deep() {
        .el-button+.el-button {
          margin-left: 8px;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
