/**
 * Shiki高亮器动态加载工具
 *
 * 这个模块提供了一个动态加载shiki的解决方案，避免在不使用XMarkdown组件时
 * 将shiki包打包到最终的bundle中，从而减小包体积。
 */

import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

/**
 * 创建高亮器的配置选项接口
 */
interface CreateHighlighterOptions {
  themes: any[];
  langs: any[];
}

/**
 * 动态加载shiki并创建高亮器实例
 *
 * @param options - 创建高亮器的配置选项
 * @returns Promise<HighlighterGeneric> - 高亮器实例
 * @throws Error - 当shiki加载失败时抛出错误
 */
export async function createShikiHighlighter(
  options: CreateHighlighterOptions
): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> {
  try {
    // 动态导入shiki，只有在实际使用XMarkdown组件时才加载
    const { createHighlighter } = await import('shiki');

    // 创建高亮器实例
    const highlighter = await createHighlighter(options);

    return highlighter;
  } catch (error) {
    // 提供详细的错误信息，便于调试
    const errorMessage = error instanceof Error ? error.message : String(error);

    throw new Error(
      `Failed to load shiki highlighter: ${errorMessage}. ` +
        'Please ensure that "shiki" is installed as a peer dependency.'
    );
  }
}

/**
 * 检查shiki是否可用
 *
 * @returns Promise<boolean> - shiki是否可用
 */
export async function isShikiAvailable(): Promise<boolean> {
  try {
    await import('shiki');
    return true;
  } catch {
    return false;
  }
}

/**
 * 安全地加载shiki，如果加载失败则返回null
 *
 * @param options - 创建高亮器的配置选项
 * @returns Promise<HighlighterGeneric | null> - 高亮器实例或null
 */
export async function safeCreateShikiHighlighter(
  options: CreateHighlighterOptions
): Promise<HighlighterGeneric<BundledLanguage, BundledTheme> | null> {
  try {
    return await createShikiHighlighter(options);
  } catch (error) {
    // 在开发环境下输出警告信息
    if (import.meta.env?.MODE === 'development') {
      console.warn(
        'Shiki not available, code highlighting will be disabled:',
        error
      );
    }
    return null;
  }
}
