import type { Root } from 'hast';
import type {
  BundledHighlighterOptions,
  CodeToHastOptions,
  CodeToTokensBaseOptions,
  CodeToTokensOptions,
  CodeToTokensWithThemesOptions,
  GrammarState,
  HighlighterGeneric,
  RequireKeys,
  ThemedToken,
  ThemedTokenWithVariants,
  TokensResult
} from 'shiki';
import { GLOBAL_SHIKI_KEY } from '@components/XMarkdownCore/shared';
import {
  createdBundledHighlighter,
  createJavaScriptRegexEngine,
  createSingletonShorthands
} from 'shiki';
import { provide } from 'vue';
import { languageLoaders, themeLoaders } from './shiki-loader';

export interface GlobalShiki {
  codeToHtml: (
    code: string,
    options: CodeToHastOptions<string, string>
  ) => Promise<string>;
  codeToHast: (
    code: string,
    options: CodeToHastOptions<string, string>
  ) => Promise<Root>;
  codeToTokensBase: (
    code: string,
    options: RequireKeys<
      CodeToTokensBaseOptions<string, string>,
      'theme' | 'lang'
    >
  ) => Promise<ThemedToken[][]>;
  codeToTokens: (
    code: string,
    options: CodeToTokensOptions<string, string>
  ) => Promise<TokensResult>;
  codeToTokensWithThemes: (
    code: string,
    options: RequireKeys<
      CodeToTokensWithThemesOptions<string, string>,
      'lang' | 'themes'
    >
  ) => Promise<ThemedTokenWithVariants[][]>;
  getSingletonHighlighter: (
    options?: Partial<BundledHighlighterOptions<string, string>>
  ) => Promise<HighlighterGeneric<string, string>>;
  getLastGrammarState:
    | ((element: ThemedToken[][] | Root) => GrammarState)
    | ((
        code: string,
        options: CodeToTokensBaseOptions<string, string>
      ) => Promise<GrammarState>);
}

/**
 * @description Shiki 管理器（单例 + 懒初始化）
 */
class ShikiManager {
  private static instance: ShikiManager | null = null;

  private shikiInstance: GlobalShiki | null = null;

  private constructor() {}

  static getInstance(): ShikiManager {
    if (!ShikiManager.instance) {
      ShikiManager.instance = new ShikiManager();
    }
    return ShikiManager.instance;
  }

  public getShiki(): GlobalShiki {
    if (this.shikiInstance) return this.shikiInstance;

    const highlighterFactory = createdBundledHighlighter({
      langs: languageLoaders,
      themes: themeLoaders,
      engine: () => createJavaScriptRegexEngine()
    });

    const {
      codeToHtml,
      codeToHast,
      codeToTokensBase,
      codeToTokens,
      codeToTokensWithThemes,
      getSingletonHighlighter,
      getLastGrammarState
    } = createSingletonShorthands(highlighterFactory);

    this.shikiInstance = {
      codeToHtml,
      codeToHast,
      codeToTokensBase,
      codeToTokens,
      codeToTokensWithThemes,
      getSingletonHighlighter,
      getLastGrammarState
    };
    console.log('shiki run');
    return this.shikiInstance;
  }

  public dispose() {
    console.log('shiki disposed');
    this.shikiInstance = null;
    ShikiManager.instance = null;
  }
}

/**
 * @description 在 Vue 中提供 Shiki 实例
 */
export function useShiki(): GlobalShiki {
  const manager = ShikiManager.getInstance();
  const instance = manager.getShiki();

  provide(GLOBAL_SHIKI_KEY, instance);

  onUnmounted(() => {
    console.log('dispose');
    manager.dispose();
  });

  return instance;
}
