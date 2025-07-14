import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved
} from 'shiki';
import type { InitShikiOptions } from './shiki';
import type { MarkdownProps } from './types';
import {
  useDarkModeWatcher,
  usePlugins
} from '@components/XMarkdownCore/hooks';
import deepmerge from 'deepmerge';
import { createHighlighter } from 'shiki';
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

  const shikiThemeColor = ref<ThemeRegistrationResolved>();
  const highlighter = ref<HighlighterGeneric<BundledLanguage, BundledTheme>>();
  const highlighterTheme = computed(() => props.themes);
  const oldHighlighterTheme = ref<InitShikiOptions['themes']>();
  const themeArr = computed(() => {
    if (highlighterTheme.value) {
      return Object.keys(highlighterTheme.value).map(
        key => highlighterTheme.value![key]
      );
    }
    return [shikiThemeDefault.light, shikiThemeDefault.dark];
  });
  watch(
    () => [highlighterTheme.value, isDark.value],
    ([highlighterTheme, isDark]) => {
      if (highlighterTheme !== oldHighlighterTheme.value) {
        oldHighlighterTheme.value =
          highlighterTheme as InitShikiOptions['themes'];
        createHighlighter({
          themes: [...themeArr.value] as any[],
          langs: ['javascript']
        }).then(res => {
          if (highlighter.value) {
            highlighter.value.dispose();
          }
          highlighter.value = res;
          shikiThemeColor.value = res.getTheme(
            isDark ? (themeArr.value[1] as any) : (themeArr.value[0] as any)
          );
        });
      }

      if (highlighter.value) {
        shikiThemeColor.value = highlighter.value.getTheme(
          isDark ? (themeArr.value[1] as any) : (themeArr.value[0] as any)
        );
      }
    },
    {
      immediate: true,
      deep: 1
    }
  );

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
