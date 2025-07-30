import type { MarkdownProps } from './types';
import {
  useDarkModeWatcher,
  usePlugins
} from '@components/XMarkdownCore/hooks';
// 使用优化后的 XMarkdown 内置 hook
import { useShiki } from '@components/XMarkdownCore/hooks/useShiki';
import deepmerge from 'deepmerge';
import { computed, inject, toValue } from 'vue';
import { MARKDOWN_PROVIDER_KEY, shikiThemeDefault } from './constants';

export function useMarkdownContext() {
  return inject<MarkdownProps>(MARKDOWN_PROVIDER_KEY, {
    markdown: ''
  });
}

export const DEFAULT_PROPS = {
  markdown: '',
  allowHtml: true,
  enableLatex: true,
  enableBreaks: true,
  codeXRender: () => ({}),
  codeXSlot: () => ({}),
  codeHighlightTheme: null,
  customAttrs: () => ({}),
  remarkPlugins: () => [],
  remarkPluginsAhead: () => [],
  rehypePlugins: () => [],
  rehypePluginsAhead: () => [],
  rehypeOptions: () => ({}),
  sanitize: false,
  sanitizeOptions: () => ({}),
  mermaidConfig: () => ({}),
  langs: () => [],
  themes: () => ({ ...shikiThemeDefault })
};

export function useMarkdownProps(props: MarkdownProps) {
  const { rehypePlugins, remarkPlugins } = usePlugins(props);
  const { isDark } = useDarkModeWatcher();

  // 使用优化后的 XMarkdown 内置 hook
  const { shikiThemeColor } = useShiki({
    themes: props.themes
  });

  const res = computed(() => {
    return deepmerge(
      {
        rehypePlugins: toValue(rehypePlugins),
        remarkPlugins: toValue(remarkPlugins),
        isDark: toValue(isDark),
        themeColors: toValue(shikiThemeColor)
      },
      props
    );
  });

  return res;
}
