import type { Ref } from 'vue';
import type { MarkdownContext } from './types';

import deepmerge from 'deepmerge';
import { computed, defineComponent, h, inject, provide } from 'vue';
import { usePlugins } from '../../hooks';
import { useGlobalShikiHighlighter } from '../../hooks/useShikiColors';

import { MARKDOWN_PROVIDER_KEY } from '../../shared';
import { MARKDOWN_CORE_PROPS } from '../../shared/constants';
import '../../../../assets/style/katex.min.css';

const MarkdownProvider = defineComponent({
  name: 'MarkdownProvider',
  props: MARKDOWN_CORE_PROPS,
  setup(props, { slots, attrs }) {
    const { rehypePlugins, remarkPlugins } = usePlugins(props);

    const { shikiThemeColor, init, destroy, isDark } =
      useGlobalShikiHighlighter({
        themes: props.themes
      });

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      destroy();
    });

    const contextProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins),
          isDarkMode: toValue(isDark),
          themeColors: toValue(shikiThemeColor)
        },
        props
      );
    });
    provide(MARKDOWN_PROVIDER_KEY, contextProps);
    return () =>
      h(
        'div',
        { class: 'elx-xmarkdown-container', ...attrs },
        slots.default && slots.default()
      );
  }
});

function useMarkdownContext(): Ref<MarkdownContext> {
  const context = inject<Ref<MarkdownContext>>(
    MARKDOWN_PROVIDER_KEY,
    computed(() => ({}))
  );
  if (!context) {
    return computed(() => ({})) as unknown as Ref<MarkdownContext>;
  }
  return context;
}
export { MarkdownProvider, useMarkdownContext };
