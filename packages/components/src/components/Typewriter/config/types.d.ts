export interface ConfigOption {
  /**
   * 编辑器内部依赖库
   */
  editorExtensions: {
    highlight?: {
      instance?: any
      js?: string
      css?: CodeCss
    }
    prettier?: {
      prettierInstance?: any
      parserMarkdownInstance?: any

      standaloneJs?: string
      parserMarkdownJs?: string
    }
    cropper?: {
      instance?: any
      js?: string
      css?: string
    }
    screenfull?: {
      instance?: any
      js?: string
    }
    mermaid?: {
      instance?: any
      js?: string
      /**
       * 是否启用缩放功能
       *
       * @default true
       */
      enableZoom?: boolean
    }
    katex?: {
      instance?: any
      js?: string
      css?: string
    }
  }

  /**
   * 对应editorExtensions中的cdn链接标签属性
   *
   * 不要尝试在editorExtensionsAttrs定义script的src\onload\id，link的rel\href\id
   * 它们会被默认值覆盖
   */
  editorExtensionsAttrs: {
    highlight?: {
      js?: Partial<HTMLElementTagNameMap['script']>
      css?: CodeCssAttrs
    }
    prettier?: {
      standaloneJs?: Partial<HTMLElementTagNameMap['script']>
      parserMarkdownJs?: Partial<HTMLElementTagNameMap['script']>
    }
    cropper?: {
      js?: Partial<HTMLElementTagNameMap['script']>
      css?: Partial<HTMLElementTagNameMap['link']>
    }
    screenfull?: {
      js?: Partial<HTMLElementTagNameMap['script']>
    }
    mermaid?: {
      js?: Partial<HTMLElementTagNameMap['script']>
    }
    katex?: {
      js?: Partial<HTMLElementTagNameMap['script']>
      css?: Partial<HTMLElementTagNameMap['link']>
    }
  }
  editorConfig: {
    /**
     * 自定义提示语言
     */
    languageUserDefined?: { [key: string]: StaticTextDefaultValue }
    /**
     * 自定义内部mermaid模块
     */
    mermaidTemplate?: MermaidTemplate
    /**
     * 输入渲染延迟（ms）
     */
    renderDelay?: number
    /**
     * 内部的弹窗、下拉框等内联zIndex
     * @default 20000
     */
    zIndex?: number
  }
  /**
   * 根据主题和内部默认的codeMirror扩展自定义新的扩展
   *
   * @params theme 当前主题
   * @params innerExtensions 当前主题下的扩展列表
   * [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
   * [快捷键, 最低配置, markdown识别, 横向自动换行, 更新事件, dom监听事件, oneDark主题(暗夜模式下), oneLight(默认模式下)]
   *
   * @params keyBindings elx-md-v3内置的快捷键
   */
  codeMirrorExtensions: (
    theme: Themes,
    extensions: Array<Extension>,
    keyBindings: Array<KeyBinding>,
    options: {
      editorId: string
    }
  ) => Array<Extension>
  /**
   * 自定义markdown-it核心库扩展、属性等
   */
  markdownItConfig: (
    md: markdownit,
    options: {
      editorId: string
    }
  ) => void
  /**
   * 挑选编辑器已预设的markdownIt的扩展
   *
   * @param plugins markdownIt的扩展，带编辑器已设定的属性
   * @returns plugins
   */
  markdownItPlugins: (
    plugins: Array<MarkdownItConfigPlugin>,
    options: {
      editorId: string
    }
  ) => Array<MarkdownItConfigPlugin>
  /**
   * mermaid配置项
   *
   * @param base
   * @returns
   */
  mermaidConfig: (base: any) => any
  /**
   * katex配置
   *
   * @param baseConfig
   * @returns
   */
  katexConfig: (baseConfig: any) => any
}

export interface CodeCss {
  [key: string]: {
    light: string
    dark: string
  }
}

export interface CustomStrIcon {
  'copy'?: string
  'collapse-tips'?: string
  'pin'?: string
  'pin-off'?: string
}

/**
 * 自定义图标的数据类型
 */
export type CustomIcon = {
  [key in IconName]?: {
    component: Component | VNode | string
    props?: {
      [key: string | number | symbol]: any
    }
  };
} & CustomStrIcon

export interface StaticTextDefaultValue {
  toolbarTips?: ToolbarTips
  titleItem?: {
    h1?: string
    h2?: string
    h3?: string
    h4?: string
    h5?: string
    h6?: string
  }
  imgTitleItem?: {
    link: string
    upload: string
    clip2upload: string
  }
  linkModalTips?: {
    linkTitle?: string
    imageTitle?: string
    descLabel?: string
    descLabelPlaceHolder?: string
    urlLabel?: string
    urlLabelPlaceHolder?: string
    buttonOK?: string
  }
  clipModalTips?: {
    title?: string
    buttonUpload?: string
  }
  copyCode?: {
    text?: string
    successTips?: string
    failTips?: string
  }
  mermaid?: {
    // 流程图
    flow?: string
    // 时序图
    sequence?: string
    // 甘特图
    gantt?: string
    // 类图
    class?: string
    // 状态图
    state?: string
    // 饼图
    pie?: string
    // 关系图
    relationship?: string
    // 旅程图
    journey?: string
  }
  katex?: {
    inline: string
    block: string
  }
  footer?: {
    markdownTotal: string
    scrollAuto: string
  }
}
