import type { InitShikiOptions } from '@components/Markdown/shared';
import type { ThemeRegistrationResolved } from 'shiki';

export interface MarkdownContext {
  // markdown 字符串内容
  markdown?: string;
  // 是否允许 HTML
  allowHtml?: boolean;
  // 是否启用 LaTeX 支持
  enableLatex?: boolean;
  // 是否启用换行符转 <br>
  enableBreaks?: boolean;
  // 自定义代码块渲染函数
  codeXRender?: Record<string, any>;
  // 自定义代码块插槽
  codeXSlot?: Record<string, any>;
  // 自定义代码高亮主题
  codeHighlightTheme?: builtinTheme;
  // 自定义属性对象
  customAttrs?: CustomAttrs;
  // remark 插件列表
  remarkPlugins?: PluggableList;
  remarkPluginsAhead?: PluggableList;
  // rehype 插件列表
  rehypePlugins?: PluggableList;
  rehypePluginsAhead?: PluggableList;
  // rehype 配置项
  rehypeOptions?: Record<string, any>;
  // 是否启用内容清洗
  sanitize?: boolean;
  // 清洗选项
  sanitizeOptions?: SanitizeOptions;
  // Mermaid 配置对象
  mermaidConfig?: Record<string, any>;
  // 主题配置
  themes?: InitShikiOptions['themes'];
  // 是否是暗黑模式(代码高亮块)
  isDarkMode?: boolean;
  // 代码高亮主题颜色的配置
  themeColors?: ThemeRegistrationResolved;
}
