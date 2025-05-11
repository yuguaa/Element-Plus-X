interface LineNumbersOptions {
  singleLine?: boolean
  startFrom?: number
  throttle?: number
}

const CSS_CLASS = {
  container: 'hljs-ln',
  line: 'hljs-ln-line',
  code: 'hljs-ln-code',
  numbers: 'hljs-ln-numbers',
  number: 'hljs-ln-n',
}

const DATA_ATTR = 'data-line-number'
const NEWLINE_REGEX = /\r\n|\r|\n/g
let OBSERVER: IntersectionObserver | null = null
let STYLE_ADDED = false

// 新增：补全Edge浏览器复制逻辑
function getEdgeSelectionText(selection: Selection): string {
  if (!selection.rangeCount)
    return ''

  // 获取起始和结束的行号TD元素
  const startTd = getLineNumberTd(selection.anchorNode as Node)
  const endTd = getLineNumberTd(selection.focusNode as Node)

  if (!startTd || !endTd)
    return selection.toString()

  const startLine = Number.parseInt(startTd.getAttribute(DATA_ATTR) || '0')
  const endLine = Number.parseInt(endTd.getAttribute(DATA_ATTR) || '0')

  // 处理反向选择（结束行号小于起始行号）
  if (endLine < startLine) {
    return getEdgeSelectionText({
      ...selection,
      anchorNode: selection.focusNode,
      focusNode: selection.anchorNode,
    } as Selection)
  }

  // 单行选择直接返回
  if (startLine === endLine)
    return selection.toString()

  // 获取代码块表格
  const table = startTd.closest(`.${CSS_CLASS.container}`) as HTMLTableElement
  const lines: string[] = []

  // 收集所有选中行的内容
  for (let i = startLine; i <= endLine; i++) {
    const codeTd = table.querySelector(`.${CSS_CLASS.code}[${DATA_ATTR}="${i}"]`) as HTMLElement
    lines.push(codeTd.textContent || '')
  }

  return lines.join('\n')
}

// 辅助函数：向上查找行号TD元素
function getLineNumberTd(node: Node): HTMLElement | null {
  let current: Node | null = node
  while (current) {
    if (current instanceof HTMLElement && current.hasAttribute(DATA_ATTR)) {
      return current
    }
    current = current.parentNode
  }
  return null
}

function createLineElement(line: string, lineNumber: number): DocumentFragment {
  const fragment = document.createDocumentFragment()
  const tr = document.createElement('tr')

  const tdNumbers = document.createElement('td')
  tdNumbers.className = `${CSS_CLASS.line} ${CSS_CLASS.numbers}`
  tdNumbers.setAttribute(DATA_ATTR, lineNumber.toString())

  const divNumber = document.createElement('div')
  divNumber.className = CSS_CLASS.number
  tdNumbers.appendChild(divNumber)

  const tdCode = document.createElement('td')
  tdCode.className = `${CSS_CLASS.line} ${CSS_CLASS.code}`
  tdCode.setAttribute(DATA_ATTR, lineNumber.toString())
  tdCode.textContent = line || ' '

  tr.append(tdNumbers, tdCode)
  fragment.appendChild(tr)
  return fragment
}

function getCodeElements() {
  return document.querySelectorAll<HTMLElement>('code.hljs:not(.nohljsln), code.nohighlight:not(.nohljsln)')
}

function processCodeBlock(codeElement: HTMLElement, options: LineNumbersOptions = {}) {
  const { singleLine = false, startFrom = 1 } = options
  const lines = codeElement.innerHTML.split(NEWLINE_REGEX)

  if (lines.length === 1 && !singleLine)
    return

  const table = document.createElement('table')
  table.className = CSS_CLASS.container
  const fragment = document.createDocumentFragment()

  lines.forEach((line, index) => {
    const lineNumber = startFrom + index
    fragment.appendChild(createLineElement(line, lineNumber))
  })

  table.appendChild(fragment)
  codeElement.innerHTML = ''
  codeElement.appendChild(table)
}

function initLazyLineNumbers(options: LineNumbersOptions = {}) {
  if (!STYLE_ADDED) {
    const style = document.createElement('style')
    style.textContent = `.${CSS_CLASS.container}{border-collapse:collapse}.${CSS_CLASS.number}:before{content:attr(${DATA_ATTR})}`
    document.head.appendChild(style)
    STYLE_ADDED = true
  }

  OBSERVER = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        processCodeBlock(entry.target as HTMLElement, options)
        OBSERVER?.unobserve(entry.target)
      }
    })
  }, { rootMargin: '100px' })

  getCodeElements().forEach(el => OBSERVER?.observe(el))
}

function optimizedHandleCopy(event: ClipboardEvent) {
  const target = event.target as HTMLElement
  if (!target.closest(`.${CSS_CLASS.code}`))
    return

  const selection = window.getSelection()
  if (!selection)
    return

  let copiedText: string
  if (window.navigator.userAgent.includes('Edge')) {
    copiedText = getEdgeSelectionText(selection) // 使用新增方法
  }
  else {
    copiedText = selection.toString().trim()
  }

  event.clipboardData?.setData('text/plain', copiedText)
  event.preventDefault()
}

function cleanup() {
  OBSERVER?.disconnect()
  document.removeEventListener('copy', optimizedHandleCopy)
}

export const LineNumbers = {
  init: initLazyLineNumbers,
  cleanup,
}

if (typeof window !== 'undefined') {
  let isThrottled = false
  window.addEventListener('scroll', () => {
    if (!isThrottled && OBSERVER) {
      OBSERVER.takeRecords().forEach(entry => OBSERVER?.observe(entry.target))
      isThrottled = true
      setTimeout(() => isThrottled = false, 200)
    }
  })
}
