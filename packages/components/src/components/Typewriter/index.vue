<script setup lang="ts">
import type mdit from 'markdown-it'
import type { ComputedRef } from 'vue'
import type { TypewriterInstance, TypewriterProps, TypingConfig } from './types.d.ts'
import DOMPurify from 'dompurify' // 新增安全过滤
import MarkdownIt from 'markdown-it'
// import Prism from 'prismjs'
import { usePrism } from '../../hooks/usePrism'

import { generateCodeRowNumber } from '../../utils/index.ts'
import { useAppConfig } from '../AppConfig/hooks.ts'
// 引入高亮配置文件
import { codeCss, highlightUrl, prefix } from './config/index.ts'
import svgMap from './iconStr/index.ts'
import codetabs from './markdownIt/code/index.ts'
import { CDN_IDS } from './static/index.ts'
import { appendHandler } from './utils/dom.ts'
// import '@vavt/markdown-theme/css/all.css'
import './styles/themes/all/index.scss'

const props = withDefaults(defineProps<TypewriterProps>(), {
  content: '',
  isMarkdown: false,
  typing: false,
  isFog: false,
})

const emits = defineEmits<{
  /** 开始打字时触发 */
  start: [instance: TypewriterInstance]
  /** 打字过程中触发（携带进度百分比） */
  writing: [instance: TypewriterInstance]
  /** 打字结束时触发 */
  finish: [instance: TypewriterInstance]
}>()

const appConfig = useAppConfig()

const _highlight = computed(() => {
  if (!props.highlight) {
    return appConfig.highlight ?? usePrism()
  }
  return props.highlight
})

const markdownContentRef = ref<HTMLElement | null>(null)
const typeWriterRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // 初始化雾化背景色
  updateFogColor()

  // nextTick(() => {
  //   Prism.highlightAll()
  // })
})

function initLineNumber(md: mdit) {
  console.log('什么时候执行的 initLineNumber', md)

  md.core.ruler.push('init-line-number', (state) => {
    state.tokens.forEach((token) => {
      if (token.map) {
        if (!token.attrs) {
          token.attrs = []
        }
        token.attrs.push(['data-line', token.map[0].toString()])
      }
    })
    return true
  })
}

const hljsRef = ref<any>(null)

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})

initLineNumber(md)

md.set({
  highlight: (code, lang) => {
    // 在这里想头部引入样式文件
    appendHandler('link', {
      href: codeCss.github.dark,
      rel: 'stylesheet',
      id: CDN_IDS.hlcss,
    })

    // 引入hljs
    appendHandler(
      'script',
      {
        src: highlightUrl,
        id: CDN_IDS.hljs,
        onload() {
          hljsRef.value = (window as any).hljs
        },
      },
      'hljs',
    )

    // hljsRef.value = hljs

    let codeHtml

    // 在这里调用高亮样式函数
    // 获取高亮语言
    if (hljsRef.value && lang) {
      console.log(hljsRef.value)

      const hljsLang = hljsRef.value.getLanguage(lang)

      if (hljsLang && hljsRef.value.highlight) {
        codeHtml = hljsRef.value.highlight(code, {
          language: lang,
          ignoreIllegals: true,
        }).value
      }
      else {
        codeHtml = hljsRef.value.highlightAuto(code).value
      }
    }
    else {
      codeHtml = md.utils.escapeHtml(code)
    }

    const codeSpan = generateCodeRowNumber(
      codeHtml.replace(/^\n+|\n+$/g, ''),
      code.replace(/^\n+|\n+$/g, ''),
    )

    console.log('codeSpan', codeSpan)

    return `<pre><code class="language-${lang}" language=${lang}>${codeSpan}</code></pre>`

    // return highlight.value?.(code, lang)
  },
})

const usedLanguageTextRef = ref({
  toolbarTips: {
    bold: '加粗',
    underline: '下划线',
    italic: '斜体',
    strikeThrough: '删除线',
    title: '标题',
    sub: '下标',
    sup: '上标',
    quote: '引用',
    unorderedList: '无序列表',
    orderedList: '有序列表',
    task: '任务列表',
    codeRow: '行内代码',
    code: '块级代码',
    link: '链接',
    image: '图片',
    table: '表格',
    mermaid: 'mermaid图',
    katex: 'katex公式',
    revoke: '后退',
    next: '前进',
    save: '保存',
    prettier: '美化',
    pageFullscreen: '浏览器全屏',
    fullscreen: '屏幕全屏',
    preview: '预览',
    previewOnly: '仅预览',
    htmlPreview: 'html代码预览',
    catalog: '目录',
    github: '源码地址',
  },
  titleItem: {
    h1: '一级标题',
    h2: '二级标题',
    h3: '三级标题',
    h4: '四级标题',
    h5: '五级标题',
    h6: '六级标题',
  },
  imgTitleItem: {
    link: '添加链接',
    upload: '上传图片',
    clip2upload: '裁剪上传',
  },
  linkModalTips: {
    linkTitle: '添加链接',
    imageTitle: '添加图片',
    descLabel: '链接描述：',
    descLabelPlaceHolder: '请输入描述...',
    urlLabel: '链接地址：',
    urlLabelPlaceHolder: '请输入链接...',
    buttonOK: '确定',
  },
  clipModalTips: {
    title: '裁剪图片上传',
    buttonUpload: '上传',
  },
  copyCode: {
    text: '复制代码',
    successTips: '已复制！',
    failTips: '复制失败！',
  },
  mermaid: {
    flow: '流程图',
    sequence: '时序图',
    gantt: '甘特图',
    class: '类图',
    state: '状态图',
    pie: '饼图',
    relationship: '关系图',
    journey: '旅程图',
  },
  katex: {
    inline: '行内公式',
    block: '块级公式',
  },
  footer: {
    markdownTotal: '字数',
    scrollAuto: '同步滚动',
  },
})
const customIconRef = ref({
  ...svgMap,
})

md.use(codetabs, { editorId: prefix, usedLanguageTextRef, codeFoldable: true, autoFoldThreshold: 1000, customIconRef })

// function initMarkdownPlugins() {
//   if (appConfig.mdPlugins?.length) {
//     appConfig.mdPlugins.forEach((plugin) => {
//       md.use(plugin)
//     })
//   }
//   if (props.mdPlugins?.length) {
//     props.mdPlugins.forEach((plugin) => {
//       md.use(plugin)
//     })
//   }
// }

// initMarkdownPlugins()

const typingIndex = ref(0)
const isTyping = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
const contentCache = ref('') // 添加缓存变量

// 配置合并逻辑修改
const mergedConfig: ComputedRef<TypingConfig> = computed(() => {
  const defaultConfig: TypingConfig = {
    step: typeof props.typing === 'object' ? props.typing.step ?? 2 : 2,
    interval: typeof props.typing === 'object' ? props.typing.interval ?? 50 : 50,
    // 根据条件动态设置后缀
    suffix: props.isMarkdown ? '' : typeof props.typing === 'object' ? props.typing.suffix ?? '|' : '|',
  }

  // 处理打字配置
  if (props.typing === true) {
    return {
      ...defaultConfig,
    }
  }

  if (typeof props.typing === 'object') {
    return {
      ...defaultConfig,
      ...props.typing,
      // 强制覆盖后缀设置
      suffix: props.isMarkdown ? '' : props.typing.suffix ?? '|',
    }
  }

  return defaultConfig
})

// 修改内容处理逻辑
const processedContent = computed(() => {
  if (!props.content)
    return ''

  // 非打字模式直接渲染完整内容
  if (!props.typing) {
    return props.content
  }

  // 打字模式处理截断内容
  const displayed = contentCache.value.slice(0, typingIndex.value)
  return displayed
})

// 计算属性
const typingProgress = computed(() => {
  return contentCache.value
    ? Math.min((typingIndex.value / contentCache.value.length) * 100, 100)
    : 0
})

// 修改渲染内容计算属性
const renderedContent = computed(() => {
  // 非Markdown模式直接返回
  if (!props.isMarkdown) {
    return processedContent.value
  }
  // Markdown模式添加安全过滤和样式类
  return DOMPurify.sanitize(
    md.render(processedContent.value),
  )
})

const instance: TypewriterInstance = {
  interrupt,
  continue: continueTyping,
  restart,
  destroy,
  renderedContent: computed(() => renderedContent.value),
  isTyping: toRef(isTyping),
  progress: computed(() => typingProgress.value),
}

// 打字逻辑
watch(
  () => props.content,
  (newVal, oldVal) => {
    if (!props.typing) {
      typingIndex.value = newVal?.length || 0
      isTyping.value = false
      contentCache.value = newVal || ''
      return
    }

    const shouldReset = !oldVal || !newVal?.startsWith(oldVal)

    if (shouldReset) {
      typingIndex.value = 0
      contentCache.value = newVal || ''
    }
    else {
      contentCache.value = newVal || ''
    }

    if (!isTyping.value) {
      startTyping()
    }
  },
  { immediate: true },
)

function startTyping() {
  clearTimeout(timer!)
  if (!props.typing || !contentCache.value)
    return

  isTyping.value = true
  emits('start', instance)

  const typeNext = () => {
    typingIndex.value += mergedConfig.value.step!
    emits('writing', instance)

    if (typingIndex.value >= contentCache.value.length) {
      finishTyping()
      return
    }

    timer = setTimeout(typeNext, mergedConfig.value.interval)
  }

  timer = setTimeout(typeNext, mergedConfig.value.interval)
}

function finishTyping() {
  isTyping.value = false
  typingIndex.value = contentCache.value.length
  emits('finish', instance)
}

// 公共方法
function interrupt() {
  clearTimeout(timer!)
  isTyping.value = false
}

function continueTyping() {
  if (typingIndex.value < contentCache.value.length) {
    startTyping()
  }
}

function restart() {
  typingIndex.value = 0
  startTyping()
}

function destroy() {
  clearTimeout(timer!)
  timer = null
  typingIndex.value = 0
  isTyping.value = false
}

// 辅助函数：获取元素背景色并检查是否透明
function getBackgroundColor(element: HTMLElement | null) {
  if (!element)
    return null
  const color = getComputedStyle(element).backgroundColor
  const isTransparent = color === 'rgba(0, 0, 0, 0)' || color === 'transparent' || color === 'initial'
  return isTransparent ? null : color
}

// 雾化颜色跟随背景色
function updateFogColor() {
  if (markdownContentRef.value) {
    let bgColor = getBackgroundColor(markdownContentRef.value)
    if (!bgColor) {
      bgColor = getBackgroundColor(typeWriterRef.value)
      if (!bgColor) {
        const bubbleContent = document.querySelector('.el-bubble-content') as HTMLElement | null
        bgColor = getBackgroundColor(bubbleContent)
        if (!bgColor) {
          const bubble = document.querySelector('.el-bubble') as HTMLElement | null
          bgColor = getBackgroundColor(bubble)
        }
      }
    }
    if (bgColor) {
      markdownContentRef.value.style.setProperty('--el-fill-color', bgColor)
    }
  }
}

const value = ref()

function handleChange(val: boolean) {
  console.log('val', val)

  // 更换系统主题
  // if (val) {
  //   document.documentElement.setAttribute('data-theme', 'dark')
  // }
  // else {
  //   document.documentElement.setAttribute('data-theme', 'light')
  // }
}

// 生命周期
onUnmounted(destroy)

// 暴露方法
defineExpose(instance)
</script>

<template>
  <div class="btn-list">
    <span>白天/暗黑：<el-switch v-model="value" @change="handleChange" /></span>
  </div>

  <div
    :class="[
      `${prefix}`,
    ]"
  >
    <div
      :id="`${prefix}-preview`" ref="typeWriterRef" class="typer-container default-theme"
      :class="[
        `${prefix}-preview`,
        `${prefix}`,
        `${prefix}-scrn`,
      ]"
    >
      <div
        ref="markdownContentRef" class="typer-content" :class="[
          {
            'markdown-content': isMarkdown,
            'typing-cursor': typing && mergedConfig.suffix && isTyping,
            'typing-cursor-foggy': props.isFog && typing && mergedConfig.suffix && isTyping,
            'typing-markdown-cursor-foggy': isMarkdown && props.isFog && typing && isTyping,
          },
          isMarkdown ? 'markdown-body' : '',
        ]" :style="{
          '--cursor-char': `'${mergedConfig.suffix}'`,
          '--cursor-fog-bg-color': props.isFog ? (typeof props.isFog === 'object' ? props.isFog.bgColor ?? 'var(--el-fill-color)' : 'var(--el-fill-color)') : '',
          '--cursor-fog-width': props.isFog ? (typeof props.isFog === 'object' ? props.isFog.width ?? '80px' : '80px') : '',
        }" v-html="renderedContent"
      />
    </div>
  </div>
</template>

<!-- 样式转移-暂定方案-为后续主题做准备 -->
<style scoped lang="scss" src="./style.scss">
.btn-list {
  display: flex;
}
</style>
