import type { HighlighterCore, ThemeRegistrationResolved } from 'shiki/core';
import type { InitShikiOptions } from '../shared';
import { computed, ref, shallowRef, watch } from 'vue';
import { shikiThemeDefault } from '../shared';
import { useDarkModeWatcher } from './useThemeMode';

interface UseShikiOptions {
  themes?: InitShikiOptions['themes'];
}

async function createShikiHighlighter(): Promise<HighlighterCore | null> {
  if (typeof window === 'undefined') return null;

  try {
    const [{ createHighlighterCore }, { createOnigurumaEngine }] =
      await Promise.all([
        import('shiki/core'),
        import('shiki/engine/oniguruma')
      ]);

    const highlighter = await createHighlighterCore({
      themes: [],
      langs: [],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    });

    return highlighter;
  } catch (error) {
    console.warn('Failed to create Shiki highlighter:', error);
    return null;
  }
}

let shikiHighlighterPromise: Promise<HighlighterCore | null> | null = null;

const shikiThemeColor = ref<ThemeRegistrationResolved>();
const hasCreated = ref(false);

export function useShiki(options?: UseShikiOptions) {
  const { isDark } = useDarkModeWatcher();

  const themeArr = computed(() => {
    if (options?.themes) {
      return Object.keys(options.themes).map(key => options.themes![key]);
    }
    return [shikiThemeDefault.light, shikiThemeDefault.dark];
  });

  const currentTheme = computed(() => {
    const themes = themeArr.value;
    if (!themes || themes.length === 0) {
      return isDark.value ? 'dark-plus' : 'light-plus';
    }
    return isDark.value ? themes[1] || themes[0] : themes[0] || themes[1];
  });
  const loadLanguageIfNeeded = async (
    highlighter: HighlighterCore,
    lang: string
  ) => {
    if (lang === 'text' || highlighter.getLoadedLanguages().includes(lang)) {
      return;
    }

    try {
      const { bundledLanguages } = await import('shiki/langs');
      const langLoader = (bundledLanguages as any)[lang];
      if (langLoader) {
        await highlighter.loadLanguage(await langLoader());
      }
    } catch (error) {
      console.warn(`Failed to load language ${lang}:`, error);
    }
  };

  const loadThemeIfNeeded = async (
    highlighter: HighlighterCore,
    themeName: string
  ) => {
    if (highlighter.getLoadedThemes().includes(themeName)) {
      return;
    }

    try {
      const { bundledThemes } = await import('shiki/themes');
      const themeLoader = (bundledThemes as any)[themeName];
      if (themeLoader) {
        await highlighter.loadTheme(await themeLoader());
      } else {
        const themeModule = await import(`@shikijs/themes/${themeName}`);
        await highlighter.loadTheme(themeModule);
      }
    } catch (error) {
      console.warn(`Failed to load theme ${themeName}:`, error);
    }
  };

  const highlight = async (
    code: string,
    language?: string,
    theme?: string
  ): Promise<string> => {
    if (!code.trim()) return '';

    try {
      if (!shikiHighlighterPromise) {
        shikiHighlighterPromise = createShikiHighlighter();
      }

      const highlighter = await shikiHighlighterPromise;
      if (!highlighter) {
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }

      const lang = language || 'text';
      const themeName = theme || (currentTheme.value as string);

      // 动态加载语言和主题
      await Promise.all([
        loadLanguageIfNeeded(highlighter, lang),
        loadThemeIfNeeded(highlighter, themeName)
      ]);

      // 检查是否成功加载，如果失败使用fallback
      const finalLang = highlighter.getLoadedLanguages().includes(lang)
        ? lang
        : 'plaintext';
      const loadedThemes = highlighter.getLoadedThemes();
      const finalTheme = loadedThemes.includes(themeName)
        ? themeName
        : loadedThemes[0] || 'vitesse-light';

      return highlighter.codeToHtml(code, {
        lang: finalLang,
        theme: finalTheme
      });
    } catch (error) {
      console.warn('代码高亮失败:', error);
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    }
  };

  const updateThemeColor = () => {
    const themeName = currentTheme.value;
    shikiThemeColor.value = {
      name: themeName,
      type: isDark.value ? 'dark' : 'light'
    } as ThemeRegistrationResolved;
  };

  const init = async () => {
    if (hasCreated.value) {
      updateThemeColor();
      return;
    }

    hasCreated.value = true;
    updateThemeColor();
  };

  watch(isDark, updateThemeColor, { immediate: true });

  const destroy = () => {
    hasCreated.value = false;
  };
  const highlighter = shallowRef({
    codeToHtml: highlight
  });

  return {
    highlighter,
    shikiThemeColor,
    isDark,
    init,
    destroy,
    highlight,
    currentTheme
  };
}
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
