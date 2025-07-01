import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved
} from 'shiki';
import type { Ref } from 'vue';
import type { InitShikiOptions } from '../../shared';
import type { MarkdownContext } from './types';
import deepmerge from 'deepmerge';
import { createHighlighter } from 'shiki';
import { computed, defineComponent, h, inject, provide } from 'vue';
import { useDarkModeWatcher, usePlugins } from '../../hooks';
import {
  MARKDOWN_PROVIDER_KEY,
  MarkdownProps,
  shikiThemeDefault
} from '../../shared';

const MarkdownProvider = defineComponent({
  name: 'MarkdownProvider',
  props: MarkdownProps,
  setup(props, { slots, attrs }) {
    const { rehypePlugins, remarkPlugins } = usePlugins(props);
    /* ------------------ 根据用户传递的shiki主题获取对应的shiki主题的颜色 全局注册给子级 ----------------- */
    const highlighterTheme = computed(() => props.themes);
    const { isDark } = useDarkModeWatcher();
    const oldHighlighterTheme = ref<InitShikiOptions['themes']>();
    const shikiThemeColor = ref<ThemeRegistrationResolved>();
    const highlighter =
      ref<HighlighterGeneric<BundledLanguage, BundledTheme>>();

    const themeArr = computed(() => {
      if (highlighterTheme.value) {
        return Object.keys(highlighterTheme.value).map(
          key => highlighterTheme.value[key]
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
    /* ------------------ 根据用户传递的shiki主题获取对应的shiki主题的颜色 全局注册给子级 ----------------- */
    const contextProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins),
          isDarkMode: toValue(isDark.value),
          themeColors: toValue(shikiThemeColor.value)
        },
        props
      );
    });
    provide(MARKDOWN_PROVIDER_KEY, contextProps);
    return () =>
      h(
        'div',
        { class: 'markdownProvider', ...attrs },
        slots.default && slots.default()
      );
  }
});

function useMarkdownContext(): Ref<MarkdownContext> {
  const context = inject<Ref<MarkdownContext>>(MARKDOWN_PROVIDER_KEY);
  if (!context) {
    return computed(() => ({})) as unknown as Ref<MarkdownContext>;
  }
  return context;
}
export { MarkdownProvider, useMarkdownContext };
