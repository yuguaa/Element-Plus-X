<script setup lang="ts">
import type { ChatOperateNode } from 'chatarea';
import type {
  ChatState,
  EditorProps,
  MixTag,
  SelectDialogOption,
  SubmitResult
} from './types';
import ChatArea from 'chatarea';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import ClearButton from './components/ClearButton/index.vue';
import LoadingButton from './components/LoadingButton/index.vue';
import SendButton from './components/SendButton/index.vue';
import 'chatarea/lib/ChatArea.css';

/** 支持的配置属性 */
const props = withDefaults(defineProps<EditorProps>(), {
  placeholder: '请输入内容', // 输入框提示占位语
  autoFocus: false, // 是否在聊天框生成后自动聚焦
  variant: 'default', // 输入框的变体类型
  selectList: () => [], // 配置标签下拉选择的选项
  userList: () => [], // @研讨群成员列表
  customTrigger: () => [], // 扩展自定义弹窗列表
  maxLength: undefined, // 限制输入框最大字数 *注 该配置项性能开销较大 非必要情况请别设置（像豆包和文心一言都不对这块做限制，不应因小失大）
  submitType: 'enter', // 控制换行与提交模式
  customStyle: () => ({}), // 修改输入样式
  loading: false, // 发送按钮加载状态
  disabled: false, // 是否禁用输入框
  headerAnimationTimer: 300, // 展开动画
  asyncMatchFun: undefined, // 异步加载群成员方法
  customDialog: false // 是否需要自定义弹窗 开启后内部弹窗将不会再创建了
});
/** 暴露的事件 */
const emits = defineEmits<{
  (e: 'submit', payload: SubmitResult): void;
  (e: 'change'): void;
  (e: 'cancel'): void;
}>();
const slots = defineSlots();
/** header相关操作 */
const visibleHeader = ref(false);
// 展开头部
function openHeader() {
  if (!slots.header) {
    return false;
  }
  visibleHeader.value = true;
}
// 关闭头部
function closeHeader() {
  if (!slots.header) {
    return false;
  }
  visibleHeader.value = false;
}

/** 输入框相关 */
const chat = ref<ChatArea>();
const opNode = ref<ChatOperateNode>();
const container = ref<HTMLElement>();
const chatState = reactive<ChatState>({
  isEmpty: true,
  textLength: 0, // 该属性值只会在配置了maxLength情况下才拥有赋值
  lastFocusNode: null,
  lastOffset: 0,
  wrapCallSelectDialog: false, // 记录是否是外部调用了选择弹窗进行插值行为操作
  selectTagInsetText: ''
});
// 创建输入框
function createChat() {
  chat.value = new ChatArea({
    elm: container.value!,
    ...props,
    userList: JSON.parse(JSON.stringify(props.userList)),
    device: 'pc',
    needDialog: !props.customDialog,
    copyType: ['text'],
    asyncMatch: Boolean(props.asyncMatchFun),
    needDebounce: false,
    needCallSpace: false,
    sendKeyFun:
      props.submitType === 'enter'
        ? event => !event.shiftKey && event.key === 'Enter'
        : event => event.shiftKey && event.key === 'Enter',
    wrapKeyFun:
      props.submitType === 'shiftEnter'
        ? event => !event.shiftKey && event.key === 'Enter'
        : event => event.shiftKey && event.key === 'Enter'
  });
  opNode.value = chat.value.createOperateNode();
  // 订阅发送事件
  chat.value.addEventListener('enterSend', onSubmit);
  // 对输入框进行操作事件
  chat.value.addEventListener('operate', () => {
    chatState.isEmpty = chat.value!.isEmpty(true);
    chatState.textLength = chat.value!.textLength;
    emits('change');
  });
  // 失去焦点记录最后一次光标Node节点
  chat.value.richText.addEventListener(
    'blur',
    () => {
      const sel = getSelection()!;
      chatState.lastFocusNode = sel.focusNode;
      chatState.lastOffset = sel.focusOffset;
    },
    true
  );
  // 订阅标签选择事件
  chat.value.addEventListener('selectCheck', () => {
    if (chatState.wrapCallSelectDialog && chatState.selectTagInsetText) {
      chat.value?.insertText(chatState.selectTagInsetText);
      chatState.wrapCallSelectDialog = false;
      chatState.selectTagInsetText = '';
    }
  });
  // 接管异步匹配
  if (props.asyncMatchFun) {
    chat.value.addEventListener('atMatch', props.asyncMatchFun);
  }
  // 禁用编辑器
  if (props.disabled) {
    chat.value.disabled();
  }
}
// 获取输入框当前内容
function getCurrentValue(): SubmitResult {
  const text = chat.value!.getText();
  const html = chat.value!.getHtml();
  const inputTags = chat.value!.getInputTagList();
  const userTags =
    props.userList.length > 0 ? chat.value!.getCallUserTagList() : undefined;
  const selectTags =
    props.selectList.length > 0 ? chat.value!.getSelectTagList() : undefined;
  const customTags =
    props.customTrigger.length > 0 ? chat.value!.getCustomTagList() : undefined;
  return {
    text,
    html,
    inputTags,
    userTags,
    selectTags,
    customTags
  };
}
// 提交发送方法
function onSubmit() {
  // 内容纯空 拦截发送
  if (chatState.isEmpty) {
    return;
  }
  emits('submit', getCurrentValue());
}
// 取消发送方法
function onCancel() {
  emits('cancel');
}
// 清空输入框方法
function onClear(txt?: string) {
  chat.value!.clear(txt);
  // 将光标移动到末尾
  focusToEnd();
}
// 点击内容区域聚焦输入框
function onContentMouseDown() {
  requestAnimationFrame(() => {
    const focusElm = chatState.lastFocusNode?.parentElement;
    // chatInput不是暴露给用户操作的对象 因此没有写入ts类型
    const chatInput = (chat.value as any).chatInput;
    if (focusElm && focusElm.classList.contains('input-write')) {
      chatInput.setInputTagRange(chatState.lastFocusNode, chatState.lastOffset);
    } else {
      chatInput.restCursorPos(chatInput.vnode, chatInput.cursorIndex);
    }
  });
}
// 聚焦到文本最前方
function focusToStart() {
  if (chat.value && opNode.value) {
    opNode.value.setCursorNode(
      opNode.value.getNodeByRank(
        opNode.value.getRank(0) + opNode.value.getRank(0)
      ),
      0
    );
  }
}
// 聚焦到文本最后方
function focusToEnd() {
  if (chat.value && opNode.value) {
    opNode.value.setCursorNode(
      opNode.value.getNodeByRank(
        opNode.value.getRank(-1) + opNode.value.getRank(-1)
      )
    );
  }
}
// 失去焦点
function blur() {
  if (chat.value) {
    const selection = getSelection()!;
    selection.removeAllRanges();
    chat.value.richText.blur();
  }
}
// 内容全选
function selectAll() {
  if (chat.value && opNode.value) {
    const firstNode = opNode.value.getNodeByRank(
      opNode.value.getRank(0) + opNode.value.getRank(0)
    );
    const lastNode = opNode.value.getNodeByRank(
      opNode.value.getRank(-1) + opNode.value.getRank(-1)
    );
    opNode.value.setSelectNodes(firstNode, lastNode);
  }
}
// 插入一个选择标签
function setSelectTag(key: string, tagId: string) {
  chatState.wrapCallSelectDialog = false;
  const tag = props.selectList
    ?.find(option => option.key === key)
    ?.options.find(tag => tag.id === tagId);
  if (tag) {
    chat.value?.setSelectTag(tag, key);
  }
}
// 插入一个输入标签
function setInputTag(key: string, placeholder: string, defaultValue?: string) {
  chat.value?.setInputTag(key, placeholder, defaultValue);
}
// 插入一个@提及标签
function setUserTag(userId: string) {
  const user = props.userList?.find(user => user.id === userId);
  if (user) {
    chat.value?.setUserTag(user);
  }
}
// 插入一个自定义触发符标签
function setCustomTag(prefix: string, id: string) {
  const custom = props.customTrigger
    ?.find(option => option.prefix === prefix)
    ?.tagList.find(tag => tag.id === id);
  if (custom) {
    chat.value?.setCustomTag(custom, prefix);
  }
}
// 混合式插入
function setMixTags(tags: MixTag[][]) {
  // 整合ChatNode
  const chatNodes = tags.map((row: MixTag[], index) => {
    return {
      type: 'gridBox',
      rank: opNode.value?.getRank(index),
      children: row.map((cRow: MixTag) => {
        return {
          type: cRow.type,
          text: cRow.value,
          html: cRow.value,
          dataset: {
            id: cRow.value,
            name: getNameByTypeId(cRow),
            prefix: cRow.key,
            key: cRow.key,
            placeholder: cRow.placeholder,
            value: cRow.value
          }
        };
      })
    };
  });
  opNode.value?.coverNodes(chatNodes);
}
// 根据id和类型捕获目标name
function getNameByTypeId(mixTag: MixTag): string {
  const { type, value, key } = mixTag;
  switch (type) {
    case 'userTag':
      return props.userList?.find(user => user.id === value)?.name || '';
    case 'selectTag':
      return (
        props.selectList
          ?.find(row => row.key === key)
          ?.options.find(select => select.id === value)?.name || ''
      );
    case 'customTag':
      return (
        props.customTrigger
          ?.find(row => row.prefix === key)
          ?.tagList.find(custom => custom.id === value)?.name || ''
      );
    default:
      return '';
  }
}
// 在当前光标处插入html片段
function setHtml(html: string) {
  // 注* 插入的html标签必须是 行内 或 行内块元素，如果需要块级元素标签 请自行插入行内元素然后修改其css属性为块级元素
  chat.value?.insertHtml(html);
}
// 在当前光标处插入text内容
function setText(txt: string) {
  chat.value?.insertText(txt);
}
// 外部调用唤起标签选择弹窗
function openSelectDialog(option: SelectDialogOption) {
  chatState.selectTagInsetText = option.insertText || '';
  chatState.wrapCallSelectDialog = true;
  chat.value?.showPCSelectDialog(option.key, option.elm);
}

/** 监听响应props的响应式修改 去更新chat示例对象对应的配置 */
watch(
  () => props.disabled,
  () => {
    if (chat.value) {
      props.disabled ? chat.value.disabled() : chat.value.enable();
    }
  }
);
watch(
  () => props.placeholder,
  () => {
    if (chat.value) {
      chat.value.updateConfig({
        placeholder: props.placeholder
      });
    }
  }
);
watch(
  () => props.maxLength,
  () => {
    if (chat.value) {
      chat.value.updateConfig({
        maxLength: props.maxLength
      });
    }
  }
);
watch(
  () => props.submitType,
  () => {
    if (chat.value) {
      chat.value.updateConfig({
        sendKeyFun:
          props.submitType === 'enter'
            ? event => !event.shiftKey && event.key === 'Enter'
            : event => event.shiftKey && event.key === 'Enter',
        wrapKeyFun:
          props.submitType === 'shiftEnter'
            ? event => !event.shiftKey && event.key === 'Enter'
            : event => event.shiftKey && event.key === 'Enter'
      });
    }
  }
);
watch(
  () => props.userList,
  () => {
    if (chat.value) {
      chat.value.updateConfig({
        userList: props.userList
      });
    }
  },
  { deep: true }
);
watch(
  () => props.selectList,
  () => {
    if (chat.value) {
      chat.value.updateConfig({
        selectList: props.selectList
      });
    }
  },
  { deep: true }
);
watch(
  () => props.customTrigger,
  () => {
    if (chat.value) {
      chat.value.updateConfig({
        customTrigger: props.customTrigger
      });
    }
  },
  { deep: true }
);

onMounted(() => {
  createChat();
});

onBeforeUnmount(() => {
  if (chat.value) {
    chat.value.dispose();
    chat.value = undefined;
    opNode.value = undefined;
  }
});

/** 暴露方法 */
defineExpose({
  openHeader,
  closeHeader,
  getCurrentValue,
  focusToStart,
  focusToEnd,
  blur,
  selectAll,
  clear: onClear,
  setSelectTag,
  setInputTag,
  setUserTag,
  setCustomTag,
  setMixTags,
  setHtml,
  setText,
  openSelectDialog,
  chat, // 暴露chat实例对象
  opNode, // 暴露ChatNode操作对象
  chatState
});
</script>

<template>
  <div
    class="el-editor-sender-wrap"
    :style="{
      '--el-editor-sender-header-duration': `${headerAnimationTimer}ms`
    }"
  >
    <!-- 头部容器 -->
    <Transition name="slide">
      <div v-if="visibleHeader" class="el-editor-sender-header">
        <div v-if="$slots.header" class="el-editor-sender-header-container">
          <slot name="header" />
        </div>
      </div>
    </Transition>
    <!-- 内容容器 -->
    <div
      class="el-editor-sender-content"
      :class="{ 'content-variant-updown': props.variant === 'updown' }"
      @mousedown="onContentMouseDown"
    >
      <!-- Prefix 前缀 -->
      <div
        v-if="$slots.prefix && props.variant === 'default'"
        class="el-editor-sender-prefix"
      >
        <slot name="prefix" />
      </div>
      <!-- 输入区域 -->
      <div class="el-editor-sender-chat-room" @mousedown.stop="() => {}">
        <!-- 输入框载体 这里多嵌套一层是为了存放渲染后的弹窗元素 -->
        <div
          ref="container"
          :style="{ ...customStyle }"
          class="el-editor-sender-chat"
        />
      </div>
      <!-- 默认操作列表 -->
      <div
        v-if="props.variant === 'default'"
        class="el-editor-sender-action-list"
      >
        <slot name="action-list">
          <div class="el-editor-sender-action-list-presets">
            <SendButton
              v-if="!props.loading"
              :disabled="chatState.isEmpty || props.disabled"
              @submit="onSubmit"
            />

            <LoadingButton v-if="props.loading" @cancel="onCancel" />

            <ClearButton :disabled="chatState.isEmpty" @clear="onClear" />
          </div>
        </slot>
      </div>
      <!-- 变体操作列表 -->
      <div
        v-else-if="props.variant === 'updown'"
        class="el-editor-sender-updown-action-list"
      >
        <!-- 变体 updown： Prefix 前缀 -->
        <div v-if="$slots.prefix" class="el-editor-sender-prefix">
          <slot name="prefix" />
        </div>

        <!-- 变体 updown：操作列表 -->
        <div class="el-editor-sender-action-list">
          <slot name="action-list">
            <div class="el-editor-sender-action-list-presets">
              <SendButton
                v-if="!props.loading"
                :disabled="chatState.isEmpty || props.disabled"
                @submit="onSubmit"
              />

              <LoadingButton v-if="props.loading" @cancel="onCancel" />

              <ClearButton :disabled="chatState.isEmpty" @clear="onClear" />
            </div>
          </slot>
        </div>
      </div>
    </div>
    <!-- 底部容器 -->
    <Transition name="slide">
      <div v-if="$slots.footer" class="el-editor-sender-footer">
        <slot name="footer" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.el-editor-sender-wrap {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  transition: background var(--el-transition-duration);
  border-radius: calc(var(--el-border-radius-base) * 2);
  border-color: var(--el-border-color);
  box-shadow: var(
    --el-box-shadow-tertiary,
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02)
  );
  border-width: 0;
  border-style: solid;
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: border-color var(--el-transition-duration);
    border-radius: inherit;
    border-style: inherit;
    border-color: inherit;
    border-width: var(--el-border-width);
  }
  &:focus-within {
    box-shadow: var(--el-box-shadow);
    border-color: var(--el-color-primary);
    &::after {
      border-width: 2px;
    }
  }

  .el-editor-sender-header {
    display: flex;
    flex-direction: column;
    gap: var(--el-padding-xs, 8px);
    width: 100%;
    margin: 0;
    padding: 0;
    .el-editor-sender-header-container {
      border-bottom-width: var(--el-border-width);
      border-bottom-style: solid;
      border-bottom-color: var(--el-border-color);
    }
  }

  .el-editor-sender-content {
    display: flex;
    width: 100%;
    gap: var(--el-padding-xs, 8px);
    padding-block: var(--el-padding-sm, 12px);
    padding-inline-start: var(--el-padding, 16px);
    padding-inline-end: var(--el-padding-sm, 12px);
    box-sizing: border-box;
    align-items: flex-end;

    .el-editor-sender-prefix {
      flex: none;
    }

    .el-editor-sender-chat-room {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      align-self: center;
      box-sizing: border-box;
      .el-editor-sender-chat {
        flex-shrink: 0;
        width: 100%;
        font-size: 14px;
        line-height: var(--el-font-line-height-primary);
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        :deep(.chat-rich-text) {
          font-family: inherit;
          padding: 0;
          font-size: inherit;
          .chat-grid-wrap {
            font-size: inherit;
            span {
              font-size: inherit;
            }
          }
        }
        :deep(.chat-placeholder-wrap) {
          font-family: inherit;
          font-style: normal;
          color: var(--el-text-color-placeholder);
          padding: 0;
          font-weight: bold;
          font-size: inherit;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .el-editor-sender-action-list {
      .el-editor-sender-action-list-presets {
        display: flex;
        gap: var(--el-padding-xs, 8px);
        flex-direction: row-reverse;
      }
    }

    &.content-variant-updown {
      display: flex;
      flex-direction: column;
      align-items: initial;

      .el-editor-sender-updown-action-list {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        // 前缀
        .el-editor-sender-prefix {
          flex: initial;
        }

        .el-editor-sender-action-list {
          margin-left: auto;
        }
      }
    }
  }

  .el-editor-sender-footer {
    border-top-width: var(--el-border-width);
    border-top-style: solid;
    border-top-color: var(--el-border-color);
  }

  .slide-enter-active,
  .slide-leave-active {
    height: calc-size(max-content, size);
    opacity: 1;
    transition:
      height var(--el-editor-sender-header-duration),
      opacity var(--el-editor-sender-header-duration),
      border var(--el-editor-sender-header-duration);
    overflow: hidden;
  }
  .slide-enter-from,
  .slide-leave-to {
    height: 0;
    opacity: 0 !important;
  }
}
</style>
