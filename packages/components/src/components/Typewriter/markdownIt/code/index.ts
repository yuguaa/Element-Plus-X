/**
 * 折叠代码源码来自：https://github.com/cncws/markdown-it-codetabs
 *
 * 该扩展添加了编辑器适配和折叠代码功能
 *
 * 源码如果在页面中存在多个编辑器，但是内容又是相同的时候，第二个开始的内容有点混乱
 * 需要与编辑器的editorId绑定
 */
import type { Options } from 'markdown-it'
import type markdownit from 'markdown-it'
import type { ComputedRef, Ref } from 'vue'
import type { CustomIcon, StaticTextDefaultValue } from '../../config/types'
import { prefix } from '../../config'
import StrIcon from '../../iconStr'
import { mergeAttrs } from '../../utils/md-it'

export interface CodeTabsPluginOps extends Options {
  editorId: string
  usedLanguageTextRef: Ref<StaticTextDefaultValue>
  codeFoldable: boolean
  autoFoldThreshold: number
  customIconRef: ComputedRef<CustomIcon>
  extraTools?: string
}

function codetabs(md: markdownit, _opts: CodeTabsPluginOps) {
  const defaultRender = md.renderer.rules.fence
  const unescapeAll = md.utils.unescapeAll
  const re = /\[(\w*)(?::([\w ]*))?\]/
  const mandatoryRe = /::(open|close)/

  const getInfo = (token: any) => {
    return token.info ? unescapeAll(token.info).trim() : ''
  }

  const getGroupAndTab = (token: any) => {
    const info = getInfo(token)
    const [group = null, tab = ''] = (re.exec(info) || []).slice(1)

    return [group, tab]
  }

  const getLangName = (token: any) => {
    const info = getInfo(token)
    return info ? info.split(/(\s+)/g)[0] : ''
  }

  const getTagType = (token: any) => {
    const mandatory = token.info.match(mandatoryRe) || []
    const open
      = mandatory[1] === 'open'
        || (mandatory[1] !== 'close'
          && _opts.codeFoldable
          && token.content.trim().split('\n').length < _opts.autoFoldThreshold)

    const tagContainer = mandatory[1] || _opts.codeFoldable ? 'details' : 'div'
    const tagHeader = mandatory[1] || _opts.codeFoldable ? 'summary' : 'div'

    return { open, tagContainer, tagHeader }
  }

  const fenceGroup = (
    tokens: any[],
    idx: number,
    options: Options,
    env: any,
    slf: any,
  ) => {
    if (tokens[idx].hidden) {
      return ''
    }

    const codeCodeText = _opts.usedLanguageTextRef.value?.copyCode!.text
    const copyBtnHtml = _opts.customIconRef.value.copy || codeCodeText
    const isIcon = !!_opts.customIconRef.value.copy

    const collapseTips = `<span class="${prefix}-collapse-tips">${StrIcon.copy}</span>`

    const [GROUP] = getGroupAndTab(tokens[idx])
    if (GROUP === null) {
      const { open, tagContainer, tagHeader } = getTagType(tokens[idx])
      const addAttrs: [[string, string]] = [['class', `${prefix}-code`]]

      if (open)
        addAttrs.push(['open', ''])

      const tmpToken = {
        attrs: mergeAttrs(tokens[idx], addAttrs),
      }

      tokens[idx].info = tokens[idx].info.replace(mandatoryRe, '')

      const codeRendered = defaultRender!(tokens, idx, options, env, slf)
      return `
        <${tagContainer} ${slf.renderAttrs(tmpToken as any)}>
          <${tagHeader} class="${prefix}-code-head">
            <div class="${prefix}-code-flag"><span></span><span></span><span></span></div>
            <div class="${prefix}-code-action">
              <span class="${prefix}-code-lang">${tokens[idx].info.trim()}</span>
              <span class="${prefix}-copy-button" data-tips="${codeCodeText}"${isIcon ? ' data-is-icon=true' : ''}>${copyBtnHtml}</span>
              ${_opts.extraTools || ''}
              ${tagContainer === 'details' ? collapseTips : ''}
            </div>
          </${tagHeader}>
          ${codeRendered}
        </${tagContainer}>
      `
    }

    let token
    let group
    let tab
    let checked
    let labels = ''
    let pres = ''
    let langs = ''

    const { open, tagContainer, tagHeader } = getTagType(tokens[idx])
    const addAttrs: [[string, string]] = [['class', `${prefix}-code`]]

    if (open)
      addAttrs.push(['open', ''])

    const tmpToken = {
      attrs: mergeAttrs(tokens[idx], addAttrs),
    }

    for (let i = idx; i < tokens.length; i++) {
      token = tokens[i];
      [group, tab] = getGroupAndTab(token)
      if (group !== GROUP) {
        break
      }

      token.info = token.info.replace(re, '').replace(mandatoryRe, '')
      token.hidden = true

      const className = `${prefix}-codetab-${_opts.editorId}-${idx}-${i - idx}`

      checked = i - idx > 0 ? '' : 'checked'

      labels += `
        <li>
          <input
            type="radio"
            id="label-${prefix}-codetab-label-1-${_opts.editorId}-${idx}-${i - idx}"
            name="${prefix}-codetab-label-${_opts.editorId}-${idx}"
            class="${className}"
            ${checked}
          >
          <label
            for="label-${prefix}-codetab-label-1-${_opts.editorId}-${idx}-${i - idx}"
            onclick="this.getRootNode().querySelectorAll('.${className}').forEach(e => e.click())"
          >
            ${tab || getLangName(token)}
          </label>
        </li>`

      pres += `
        <div role="tabpanel">
          <input
            type="radio"
            name="${prefix}-codetab-pre-${_opts.editorId}-${idx}"
            class="${className}"
            ${checked}
            role="presentation">
          ${defaultRender!(tokens, i, options, env, slf)}
        </div>`

      langs += `
        <input
          type="radio"
          name="${prefix}-codetab-lang-${_opts.editorId}-${idx}"
          class="${className}"
          ${checked}
          role="presentation">
        <span class=${prefix}-code-lang role="note">${getLangName(token)}</span>`
    }

    return `
      <${tagContainer} ${slf.renderAttrs(tmpToken as any)}>
        <${tagHeader} class="${prefix}-code-head">
          <div class="${prefix}-code-flag">
            <ul class="${prefix}-codetab-label" role="tablist">${labels}</ul>
          </div>
          <div class="${prefix}-code-action">
            <span class="${prefix}-codetab-lang">${langs}</span>
            <span class="${prefix}-copy-button" data-tips="${codeCodeText}"${isIcon ? ' data-is-icon=true' : ''}>${copyBtnHtml}</span>
            ${_opts.extraTools || ''}
            ${tagContainer === 'details' ? collapseTips : ''}
          </div>
        </${tagHeader}>
        ${pres}
      </${tagContainer}>
    `
  }

  md.renderer.rules.fence = fenceGroup
  md.renderer.rules.code_block = fenceGroup
}

export default codetabs
