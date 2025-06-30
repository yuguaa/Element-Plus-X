import type { BuiltinTheme } from 'shiki';
import type { PluggableList } from 'unified';
import type { MermaidToolbarConfig } from '../components/Mermaid/types';
import type { CustomAttrs, SanitizeOptions } from '../core';
import type { InitShikiOptions } from './shikiHighlighter';
import { shikiThemeDefault } from './shikiHighlighter';

const MarkdownProps = {
  markdown: {
    type: String,
    default: ''
  },
  allowHtml: {
    type: Boolean,
    default: true
  },
  enableLatex: {
    type: Boolean,
    default: true
  },
  enableBreaks: {
    type: Boolean,
    default: true
  },
  codeXRender: {
    type: Object,
    default: () => ({})
  },
  codeXSlot: {
    type: Object,
    default: () => ({})
  },
  codeHighlightTheme: {
    type: Object as PropType<BuiltinTheme | null>,
    default: () => null
  },
  customAttrs: {
    type: Object as PropType<CustomAttrs>,
    default: () => ({})
  },
  remarkPlugins: {
    type: Array as PropType<PluggableList>,
    default: () => []
  },
  rehypePlugins: {
    type: Array as PropType<PluggableList>,
    default: () => []
  },
  rehypeOptions: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  sanitize: {
    type: Boolean,
    default: false
  },
  sanitizeOptions: {
    type: Object as PropType<SanitizeOptions>,
    default: () => ({})
  },
  mermaidConfig: {
    type: Object as PropType<Partial<MermaidToolbarConfig>>,
    default: () => ({})
  },
  langs: {
    type: Array as PropType<InitShikiOptions['langs']>,
    default: () => []
  },
  themes: {
    type: Object as PropType<InitShikiOptions['themes']>,
    default: () =>
      ({
        ...shikiThemeDefault
      }) satisfies InitShikiOptions['themes']
  }
};
export { MarkdownProps };
