/**
 * XMarkdown 代码高亮 Hook
 *
 * 统一的代码高亮解决方案，集成主题管理和动态加载
 */

import type { BundledLanguage, ThemeRegistrationResolved } from 'shiki';
import type { InitShikiOptions } from '../shared';
import { computed, ref, shallowRef, watch } from 'vue';
import { shikiThemeDefault } from '../shared';
import { useDarkModeWatcher } from './useThemeMode';

interface UseShikiOptions {
  themes?: InitShikiOptions['themes'];
}

// 懒加载 Shiki
function loadShiki(): Promise<typeof import('shiki').codeToHtml | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  return import('shiki').then(mod => mod.codeToHtml).catch(() => null);
}

const shikiPromise = loadShiki();

// 全局状态
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

  /**
   * 代码高亮函数
   */
  const highlight = async (
    code: string,
    language?: string,
    theme?: string
  ): Promise<string> => {
    if (!code.trim()) return '';

    try {
      const codeToHtml = await shikiPromise;

      if (!codeToHtml) {
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }

      const html = await codeToHtml(code, {
        lang: (language as BundledLanguage) || 'text',
        theme: theme || (currentTheme.value as string)
      });

      return html;
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

  // 兼容性：返回模拟的highlighter对象
  const highlighter = shallowRef({
    codeToHtml: highlight
  });

  return {
    highlighter,
    shikiThemeColor,
    isDark,
    init,
    destroy,
    // 新的API
    highlight,
    currentTheme
  };
}

/**
 * HTML 转义工具函数
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
