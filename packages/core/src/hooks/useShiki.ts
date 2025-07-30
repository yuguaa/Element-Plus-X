import type { InitShikiOptions } from '@components/XMarkdownCore/shared';
import type {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  HighlighterCore
} from 'shiki';
import { GLOBAL_SHIKI_KEY } from '@components/XMarkdownCore/shared';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { provide } from 'vue';

export interface ShikiConfig {
  langs: BundledLanguage[];
  themes: BundledTheme[];
}

/**
 * @description 描述 shiki 管理类
 * @date 2025-07-30 11:45:51
 * @author tingfeng
 *
 * @class
 */
class ShikiManager {
  private static instance: ShikiManager | null = null;
  private highlighter: HighlighterCore | null = null;
  private initPromise: Promise<HighlighterCore> | null = null;
  private loadedLanguages = new Set<string>();
  private loadedThemes = new Set<string>();

  private constructor() {}

  /**
   * @description 描述 获取shiki单例实例
   * @date 2025-07-30 11:45:59
   * @author tingfeng
   *
   * @static
   * @returns ShikiManager.instance
   */
  static getInstance(): ShikiManager {
    if (!ShikiManager.instance) {
      ShikiManager.instance = new ShikiManager();
    }
    return ShikiManager.instance;
  }

  /**
   * @description 描述 获取高亮管理器实例
   * @date 2025-07-30 11:46:44
   * @author tingfeng
   *
   * @async
   * @returns  Promise<HighlighterCore>
   */
  async getHighlighter(): Promise<HighlighterCore> {
    if (this.highlighter) {
      return this.highlighter;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initializeHighlighter();
    this.highlighter = await this.initPromise;
    return this.highlighter;
  }

  /**
   * @description 描述 初始化高亮器
   * @date 2025-07-30 11:46:57
   * @author tingfeng
   *
   * @private
   * @async
   * @returns  Promise<HighlighterCore>
   */
  private async initializeHighlighter(): Promise<HighlighterCore> {
    console.log(
      '🚀 ~ ShikiManager ~ initializeHighlighter ~ initializeHighlighter:'
    );
    // 只创建基础 highlighter，不预加载任何语言和主题
    const highlighter = await createHighlighterCore({
      langs: [],
      themes: [],
      engine: createJavaScriptRegexEngine()
    });

    return highlighter;
  }

  /**
   * @description 描述 获取已经加载的语言
   * @date 2025-07-30 11:47:15
   * @author tingfeng
   *
   * @returns string[]
   */
  getLoadedLanguages(): string[] {
    return Array.from(this.loadedLanguages);
  }

  /**
   * @description 描述 获取已经加载的主题
   * @date 2025-07-30 11:47:41
   * @author tingfeng
   *
   * @returns  string[]
   */
  getLoadedThemes(): string[] {
    return Array.from(this.loadedThemes);
  }

  /**
   * @description 描述 加载语言
   * @date 2025-07-30 11:47:59
   * @author tingfeng
   *
   * @async
   * @param lang
   */
  async loadLanguage(lang: BundledLanguage): Promise<void> {
    return await this.highlighter?.loadLanguage(lang as any);
  }

  /**
   * @description 懒加载指定语言模块
   * @param language 语言名称
   * @param languageModule 语言模块的导入函数
   */
  async loadLanguageLazily(
    language: string,
    languageModule: () => Promise<any>
  ): Promise<void> {
    if (!this.highlighter) return;

    if (!this.getLoadedLanguages().includes(language)) {
      const langDef = await languageModule();
      await this.highlighter.loadLanguage(langDef);
      this.loadedLanguages.add(language);
    }
  }

  /**
   * @description 使用 bundledLanguages 懒加载语言
   * @param language 语言名称
   */
  async loadLanguageFromBundle(language: string): Promise<void> {
    if (!this.highlighter) return;

    if (!this.getLoadedLanguages().includes(language)) {
      try {
        const { bundledLanguages } = await import('shiki/langs');
        const importFn = (bundledLanguages as any)[language];

        if (!importFn) {
          console.warn(`Language "${language}" not found in bundled languages`);
          return;
        }

        const langDef = await importFn();
        await this.highlighter.loadLanguage(langDef);
        this.loadedLanguages.add(language);
      } catch (error) {
        console.error(`Failed to load language "${language}":`, error);
      }
    }
  }

  /**
   * @description 使用 bundledThemes 懒加载主题
   * @param themeName 主题名称
   */
  async loadThemeFromBundle(themeName: string): Promise<void> {
    if (!this.highlighter) return;

    if (!this.getLoadedThemes().includes(themeName)) {
      try {
        const { bundledThemes } = await import('shiki/themes');
        const importFn = (bundledThemes as any)[themeName];

        if (!importFn) {
          console.warn(`Theme "${themeName}" not found in bundled themes`);
          return;
        }

        const themeDef = await importFn();
        await this.highlighter.loadTheme(themeDef);
        this.loadedThemes.add(themeName);
      } catch (error) {
        console.error(`Failed to load theme "${themeName}":`, error);
      }
    }
  }

  /**
   * @description 懒加载指定主题模块
   * @param themeName 主题名称
   * @param themeModule 主题模块的导入函数
   */
  async loadThemeLazily(
    themeName: string,
    themeModule: () => Promise<any>
  ): Promise<void> {
    if (!this.highlighter) return;

    if (!this.getLoadedThemes().includes(themeName)) {
      const themeDef = await themeModule();
      await this.highlighter.loadTheme(themeDef);
      this.loadedThemes.add(themeName);
    }
  }

  /**
   * @description 描述 加载主题
   * @date 2025-07-30 11:48:12
   * @author tingfeng
   *
   * @async
   * @param theme
   */
  async loadTheme(theme: BundledTheme): Promise<void> {
    return await this.highlighter?.loadTheme(theme as any);
  }

  /**
   * @description 描述 存储已经加载的语言
   * @date 2025-07-30 11:48:31
   * @author tingfeng
   *
   * @param lang
   */
  addLanguage(lang: string): void {
    this.loadedLanguages.add(lang);
  }

  /**
   * @description 描述 存储已经加载的主题
   * @date 2025-07-30 11:48:47
   * @author tingfeng
   *
   * @param theme
   */
  addTheme(theme: string): void {
    if (typeof theme === 'string') {
      this.loadedThemes.add(theme);
    }
  }

  async preload(config?: ShikiConfig) {
    if (config?.langs) {
      for (const lang of config.langs) {
        await this.loadLanguageFromBundle(lang);
      }
    }
    if (config?.themes) {
      for (const theme of config.themes) {
        await this.loadThemeFromBundle(theme);
      }
    }
  }

  destroy(): void {
    this.highlighter?.dispose();
    this.highlighter = null;
    this.initPromise = null;
    this.loadedLanguages.clear();
    this.loadedThemes.clear();
  }
}

export interface GlobalShiki {
  getHighlighter: () => Promise<HighlighterCore>;
  highlight: (
    code: string,
    lang: BundledLanguage,
    theme: InitShikiOptions['themes'],
    options?: Omit<
      CodeToHastOptions<BundledLanguage, BundledTheme>,
      'lang' | 'theme'
    >
  ) => Promise<string>;
  getLoadedLanguages: () => string[];
  getLoadedThemes: () => string[];
  loadLanguageLazily: (
    language: string,
    languageModule: () => Promise<any>
  ) => Promise<void>;
  loadThemeLazily: (
    themeName: string,
    themeModule: () => Promise<any>
  ) => Promise<void>;
  loadLanguageFromBundle: (language: string) => Promise<void>;
  loadThemeFromBundle: (themeName: string) => Promise<void>;
}

/**
 * @description 描述 使用shiki 全局
 * @date 2025-07-30 11:49:03
 * @author tingfeng
 *
 * @export
 * @param config
 * @returns  GlobalShiki
 */
export function useShiki(config?: ShikiConfig): GlobalShiki {
  const manager = ShikiManager.getInstance();

  const getHighlighter = () => manager.getHighlighter();

  //   这里预加载传进来的config
  manager.preload(config);

  const highlight = async (
    code: string,
    lang: BundledLanguage,
    themes: InitShikiOptions['themes'],
    options?: Omit<
      CodeToHastOptions<BundledLanguage, BundledTheme>,
      'lang' | 'theme'
    >
  ) => {
    const highlighter = await getHighlighter();

    // 懒加载语言：优先使用 bundledLanguages
    if (!manager.getLoadedLanguages().includes(lang)) {
      await manager.loadLanguageFromBundle(lang);
    }

    // 懒加载主题：支持多种主题格式
    if (themes && typeof themes === 'object') {
      for (const theme of Object.values(themes)) {
        if (
          typeof theme === 'string' &&
          !manager.getLoadedThemes().includes(theme)
        ) {
          await manager.loadThemeFromBundle(theme);
        }
      }
    }

    return highlighter.codeToHtml(code, { ...options, lang, themes });
  };

  const loadLanguageLazily = async (
    language: string,
    languageModule: () => Promise<any>
  ) => {
    return await manager.loadLanguageLazily(language, languageModule);
  };

  const loadThemeLazily = async (
    themeName: string,
    themeModule: () => Promise<any>
  ) => {
    return await manager.loadThemeLazily(themeName, themeModule);
  };

  const loadLanguageFromBundle = async (language: string) => {
    return await manager.loadLanguageFromBundle(language);
  };

  const loadThemeFromBundle = async (themeName: string) => {
    return await manager.loadThemeFromBundle(themeName);
  };

  const shikiInstance = {
    getHighlighter,
    highlight,
    getLoadedLanguages: () => manager.getLoadedLanguages(),
    getLoadedThemes: () => manager.getLoadedThemes(),
    loadLanguageLazily,
    loadThemeLazily,
    loadLanguageFromBundle,
    loadThemeFromBundle
  };

  provide(GLOBAL_SHIKI_KEY, shikiInstance);

  return shikiInstance;
}
