import type { InitShikiOptions } from '@components/XMarkdownCore/shared';
import type {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  Highlighter
} from 'shiki';
import { GLOBAL_SHIKI_KEY } from '@components/XMarkdownCore/shared';
import { createHighlighter } from 'shiki';

interface ShikiConfig {
  langs: InitShikiOptions['langs'];
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
  private highlighter: Highlighter | null = null;
  private initPromise: Promise<Highlighter> | null = null;
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
   * @param [config]
   * @returns  Promise<Highlighter>
   */
  async getHighlighter(config?: ShikiConfig): Promise<Highlighter> {
    if (this.highlighter) {
      return this.highlighter;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initializeHighlighter(config);
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
   * @param [config]
   * @returns  Promise<Highlighter>
   */
  private async initializeHighlighter(
    config?: ShikiConfig
  ): Promise<Highlighter> {
    console.log(
      '🚀 ~ ShikiManager ~ initializeHighlighter ~ initializeHighlighter:'
    );
    const highlighter = await createHighlighter({
      langs: [...(config?.langs ?? [])],
      themes: config?.themes ?? []
    });

    // 存储已经加载的语言和主题
    if (config?.langs) {
      config.langs.forEach(lang => {
        if (typeof lang === 'string') {
          this.loadedLanguages.add(lang);
        }
      });
    }

    if (config?.themes) {
      config.themes.forEach(theme => {
        if (typeof theme === 'string') {
          this.loadedThemes.add(theme);
        }
      });
    }

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
    return await this.highlighter?.loadLanguage(lang);
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
    return await this.highlighter?.loadTheme(theme);
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

  destroy(): void {
    this.highlighter?.dispose();
    this.highlighter = null;
    this.initPromise = null;
    this.loadedLanguages.clear();
    this.loadedThemes.clear();
  }
}

export interface GlobalShiki {
  getHighlighter: () => Promise<Highlighter>;
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
export function useShiki(config: ShikiConfig): GlobalShiki {
  const manager = ShikiManager.getInstance();

  const getHighlighter = () => manager.getHighlighter(config);

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

    // 跳过已加载语言
    if (!manager.getLoadedLanguages().includes(lang)) {
      await manager.loadLanguage(lang);
      manager.addLanguage(lang);
    }

    // 跳过已加载主题
    if (themes && typeof themes === 'object') {
      for (const theme of Object.values(themes)) {
        if (
          typeof theme === 'string' &&
          !manager.getLoadedThemes().includes(theme)
        ) {
          await manager.loadTheme(theme as BundledTheme);
          manager.addTheme(theme);
        }
      }
    }

    return highlighter.codeToHtml(code, { ...options, lang, themes });
  };

  provide(GLOBAL_SHIKI_KEY, {
    getHighlighter,
    highlight,
    getLoadedLanguages: () => manager.getLoadedLanguages(),
    getLoadedThemes: () => manager.getLoadedThemes()
  });

  return {
    getHighlighter,
    highlight,
    getLoadedLanguages: () => manager.getLoadedLanguages(),
    getLoadedThemes: () => manager.getLoadedThemes()
  };
}
