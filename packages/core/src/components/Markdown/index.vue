<script lang="ts" setup>
import type { InitShikiOptions } from '@components/MarkdownProvider/shiki';
import type { MarkdownProps } from '@components/MarkdownProvider/types';
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved
} from 'shiki';
import { MarkdownRenderer } from '@components/MarkdownCore';
import { useDarkModeWatcher, usePlugins } from '@components/MarkdownCore/hooks';
import {
  DEFAULT_PROPS,
  useMarkdownContext
} from '@components/MarkdownProvider/hooks';
import { shikiThemeDefault } from '@components/MarkdownProvider/shiki';
import deepmerge from 'deepmerge';
import { createHighlighter } from 'shiki';
import '../../assets/style/katex.min.css';

const props = withDefaults(defineProps<MarkdownProps>(), DEFAULT_PROPS);

const slots = useSlots();
const customComponents = useMarkdownContext();

const { rehypePlugins, remarkPlugins } = usePlugins(props);
const { isDark } = useDarkModeWatcher();

const shikiThemeColor = ref<ThemeRegistrationResolved>();
const highlighter = ref<HighlighterGeneric<BundledLanguage, BundledTheme>>();
const highlighterTheme = computed(() => props.themes);
const oldHighlighterTheme = ref<InitShikiOptions['themes']>();

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

const contextProps = computed(() => {
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
</script>

<template>
  <div class="elx-markdown-container">
    <MarkdownRenderer v-bind="contextProps">
      <template
        v-for="(slot, name) in customComponents"
        :key="name"
        #[name]="slotProps"
      >
        <component :is="slot" v-bind="slotProps" />
      </template>
      <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </MarkdownRenderer>
  </div>
</template>
