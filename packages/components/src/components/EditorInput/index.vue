<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { EditorInputProps } from './types.d.ts'
import { useContentEditable } from '../../utils/useContentEditable.ts'

const props = withDefaults(defineProps<EditorInputProps>(), {
  modelValue: '',
  rows: 1,
  autosize: () => {
    return {
      minRows: 1,
      maxRows: 5,
    }
  },
  disabled: false,
  readOnly: false,
  placeholder: '',
  submitType: 'enter',
})

const emits = defineEmits([
  'update:modelValue',
  'change',
  'compositionstart',
  'compositionend',
  'keydown',
  'handleBlur',
  'handleFocus',
])

const editableElement = ref<HTMLElement | null>(null)
const isComposing = ref(false)
const lineHeight = ref(20)
const paddingTop = ref(0)
const paddingBottom = ref(0)
const paddingLeft = ref(0)
const paddingRight = ref(0)
const borderWidth = ref(0) // 上下边框宽度和

const {
  selectAll,
  deselectAll,
  moveToStart,
  moveToEnd,
  focusElement,
  blurElement,
} = useContentEditable(editableElement)

// 合并为单个计算属性
const showPlaceholder = computed(() => {
  return !isComposing.value
    && !props.modelValue
    && !!props.placeholder
})

// 新增DOM变化监听
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log('监听内容变化 mutation', mutation)

    // mutation.removedNodes.forEach((node) => {
    //   if (node.parentElement?.children.length === 0) {
    //     node.parentElement.remove()
    //   }
    // })
  })
})

onMounted(() => {
  if (editableElement.value) {
    const style = window.getComputedStyle(editableElement.value)
    lineHeight.value = Number.parseFloat(style.lineHeight) || 20
    paddingTop.value = Number.parseFloat(style.paddingTop) || 0
    paddingBottom.value = Number.parseFloat(style.paddingBottom) || 0
    paddingLeft.value = Number.parseFloat(style.paddingLeft) || 0
    paddingRight.value = Number.parseFloat(style.paddingRight) || 0
    borderWidth.value
      = Number.parseFloat(style.borderTopWidth)
        + Number.parseFloat(style.borderBottomWidth) || 0

    editableElement.value.textContent = props.modelValue
    adjustHeight()

    observer.observe(editableElement.value, {
      childList: true,
      subtree: true,
    })
  }
})

const mergedStyle = computed<CSSProperties>(() => {
  const minRows = typeof props.autosize === 'object'
    ? props.autosize.minRows ?? props.rows
    : props.rows

  return {
    minHeight: `${minRows * lineHeight.value + paddingTop.value + paddingBottom.value + borderWidth.value}px !important`,
    resize: 'none',
    ...(typeof props.inputStyle === 'object' ? props.inputStyle : {}) as CSSProperties,
  }
})

const mergedPlaceholderStyle = computed<CSSProperties>(() => {
  return {
    padding: `${paddingTop.value}px ${paddingRight.value}px ${paddingBottom.value}px ${paddingLeft.value}px`,
  }
})

function adjustHeight() {
  if (!editableElement.value || !props.autosize)
    return

  nextTick(() => {
    const el = editableElement.value!
    el.style.height = 'auto'
    const scrollHeight = el.scrollHeight

    if (typeof props.autosize === 'object') {
      const maxRows = props.autosize.maxRows ?? Number.MAX_SAFE_INTEGER
      const maxHeight = maxRows * lineHeight.value + paddingTop.value + paddingBottom.value
      el.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
    else {
      el.style.height = `${scrollHeight}px`
    }
  })
}

function handleInput() {
  const element = editableElement.value
  if (!element)
    return

  console.log('editableElement', editableElement.value)
  adjustHeight()
}

function handleCompositionStart(e: CompositionEvent) {
  isComposing.value = true
  emits('compositionstart', e)
}

function handleCompositionEnd(e: CompositionEvent) {
  isComposing.value = false
  handleInput()
  emits('compositionend', e)
}

// 保持其他事件处理简单
function handleKeyDown(e: KeyboardEvent) {
  emits('keydown', e)
  const element = editableElement.value
  if (!element)
    return

  const sel = window.getSelection()

  console.log('sel', sel)

  if (!sel || sel.rangeCount === 0)
    return
  const range = sel.getRangeAt(0)

  console.log('range', range)

  const targetNode = range.startContainer

  console.log('targetNode', targetNode)
}

// 观察模型值变化时同步结构化DOM
watch(() => props.modelValue, (newVal) => {
  if (!editableElement.value)
    return

  console.log('newVal', newVal)

  // // 文本转结构化DOM
  // editableElement.value.innerHTML = newVal.split('\n')
  //   .map(line => `<div class="editor-line" data-line="true">${line}</div>`)
  //   .join('')
  //   .replace(/<div[^>]+><\/div>/g, '<div class="editor-line" data-line="true"><br></div>')
})

// 新增方法
function focus(e: Event) {
  emits('handleFocus', e)
  focusElement()
}

function blur(e: Event) {
  emits('handleBlur', e)
  blurElement()
}

function select() {
  if (editableElement.value) {
    selectAll()
  }
}

function clear() {
  if (editableElement.value) {
    deselectAll()
  }
}

defineExpose({
  focus,
  blur,
  select,
  clear,
  selectAll,
  moveToStart,
  moveToEnd,
  editableElement,
})
</script>

<template>
  <div class="el-editor-input-wrapper">
    <div
      ref="editableElement"
      :contenteditable="!disabled && !readOnly"
      class="el-editor-input el-textarea__inner"
      :class="{ 'is-disabled': disabled, 'is-readonly': readOnly }"
      :style="mergedStyle"
      @input="handleInput"
      @blur="blur"
      @focus="focus"
      @keydown.stop="handleKeyDown"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
    <div
      v-if="placeholder"
      v-show="showPlaceholder"
      class="el-editor-input-placeholder"
      :style="mergedPlaceholderStyle"
    >
      {{ placeholder }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-editor-input-wrapper {
  position: relative;
  width: 100%;
}

.el-editor-input-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  color: #c0c4cc;
}

.el-editor-input {
  width: 100%;
  line-height: 1.5;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s, height 0.2s;
  overflow-y: auto;
  box-sizing: border-box;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;

  &.is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    cursor: not-allowed;
    color: #c0c4cc;
  }

  &.is-readonly {
    background-color: #f5f7fa;
    cursor: default;
  }
}
</style>
