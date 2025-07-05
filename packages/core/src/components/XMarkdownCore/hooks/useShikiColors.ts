import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved
} from 'shiki';
import type { InitShikiOptions } from '../shared';
import { createHighlighter } from 'shiki';
import { shikiThemeDefault } from '../shared';
import { useDarkModeWatcher } from './useThemeMode';

interface UseShikiOptions {
  themes?: InitShikiOptions['themes'];
}

const highlighter =
  shallowRef<HighlighterGeneric<BundledLanguage, BundledTheme>>();
const shikiThemeColor = ref<ThemeRegistrationResolved>();
const hasCreated = ref(false);
const oldThemes = ref<InitShikiOptions['themes']>();

export function useGlobalShikiHighlighter(options?: UseShikiOptions) {
  const { isDark } = useDarkModeWatcher();

  const themeArr = computed(() => {
    if (options?.themes) {
      return Object.keys(options.themes).map(key => options.themes![key]);
    }
    return [shikiThemeDefault.light, shikiThemeDefault.dark];
  });

  const updateThemeColor = () => {
    if (!highlighter.value || !hasCreated.value) return;

    const themeName = isDark.value ? themeArr.value[1] : themeArr.value[0];

    shikiThemeColor.value = highlighter.value.getTheme(themeName as any);
  };

  const init = async () => {
    if (
      hasCreated.value &&
      JSON.stringify(oldThemes.value) === JSON.stringify(options?.themes)
    ) {
      updateThemeColor();
      return;
    }

    const themes = [...themeArr.value];
    if (!themes.length) return;

    const newHighlighter = await createHighlighter({
      themes: themes as any[],
      langs: []
    });

    highlighter.value?.dispose?.();
    highlighter.value = newHighlighter;
    oldThemes.value = options?.themes;
    hasCreated.value = true;

    updateThemeColor();
  };

  watch(isDark, updateThemeColor, { immediate: true });

  const destroy = () => {
    hasCreated.value = false;
    highlighter.value?.dispose?.();
  };

  return {
    highlighter,
    shikiThemeColor,
    isDark,
    init,
    destroy
  };
}
