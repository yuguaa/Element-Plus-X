import type { Ref } from 'vue'

// 定义一个函数类型，用于操作 contenteditable 元素的方法
type ContentEditableAction = () => void

// 封装的 Hooks 函数
export function useContentEditable(targetRef: Ref<HTMLElement | null>): {
  selectAll: ContentEditableAction
  deselectAll: ContentEditableAction
  moveToStart: ContentEditableAction
  moveToEnd: ContentEditableAction
  focusElement: ContentEditableAction
  blurElement: ContentEditableAction
  insertNewLine: ContentEditableAction
} {
  // 全选方法
  const selectAll: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(element)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }

  // 取消全选方法
  const deselectAll: ContentEditableAction = () => {
    const sel = window.getSelection()
    sel?.removeAllRanges()
  }

  // 定位到最开头方法
  const moveToStart: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      if (element.firstChild) {
        range.setStart(element.firstChild, 0)
        range.setEnd(element.firstChild, 0)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }

  // 定位到最结尾方法
  const moveToEnd: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      const lastChild = element.lastChild
      const length = lastChild ? lastChild.textContent?.length || 0 : 0
      if (lastChild) {
        range.setStart(lastChild, length)
        range.setEnd(lastChild, length)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }

  // 聚焦方法
  const focusElement: ContentEditableAction = () => {
    const element = targetRef.value
    element?.focus()
  }

  // 失焦方法，同时取消选中状态
  const blurElement: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      element.blur()
      const sel = window.getSelection()
      sel?.removeAllRanges()
    }
  }

  // 插入换行符方法
  const insertNewLine: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const sel = window.getSelection()
      if (sel) {
        const range = sel.getRangeAt(0)
        // 插入换行符的文本节点和<br>元素
        const newLineText = document.createTextNode('\n')
        const br = document.createElement('div')
        br.innerHTML = '<br>'
        range.insertNode(br)
        range.insertNode(newLineText)
        // 移动光标到新位置
        range.setStartAfter(newLineText)
        range.setEndAfter(newLineText)
        sel.removeAllRanges()
        sel.addRange(range)
        // 触发input事件以更新高度
        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.scrollTop = element.scrollHeight
        moveToEnd()
      }
    }
  }

  return {
    selectAll,
    deselectAll,
    moveToStart,
    moveToEnd,
    focusElement,
    blurElement,
    insertNewLine,
  }
}
