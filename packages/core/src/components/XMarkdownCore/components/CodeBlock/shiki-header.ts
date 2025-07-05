import type { Component, Ref, VNode } from 'vue';
import { ArrowDownBold, Moon, Sunny } from '@element-plus/icons-vue';
import { ElButton, ElMessage, ElSpace } from 'element-plus';
import { h } from 'vue';
import CopyCodeButton from './copy-code-button.vue';

export interface CodeBlockExpose {
  renderLines: Array<string>;
  isDark: Ref<boolean>;
  toggleExpand: (ev: MouseEvent) => void;
  toggleTheme: () => Ref<boolean>;
  copyCode: (value: Array<string>) => void;
}

export type CodeBlockHeaderRenderer =
  | ((props: CodeBlockExpose) => VNode)
  | Component;

export interface CodeBlockHeaderExpose {
  codeHeader?: CodeBlockHeaderRenderer;
  codeHeaderLanguage?: CodeBlockHeaderRenderer;
  codeHeaderControl?: CodeBlockHeaderRenderer;
}

let copyCodeTimer: ReturnType<typeof setTimeout> | null = null;

// 记录当前是否暗色模式
export const isDark = ref(document.body.classList.contains('dark'));

/* ----------------------------------- 按钮组 ---------------------------------- */

/**
 * @description 描述 language标签
 * @date 2025-06-25 17:48:15
 * @author tingfeng
 *
 * @export
 * @param language
 */
export function languageEle(language: string) {
  return h(
    ElSpace,
    {
      class: `markdown-language-header-space markdown-language-header-space-start markdown-language-header-span`,
      direction: 'horizontal',
      onClick: (ev: MouseEvent) => {
        toggleExpand(ev);
      }
    },
    {
      default: () => [
        h(
          'span',
          {
            class: 'markdown-language-header-span el-card is-always-shadow'
          },
          language || ''
        ),
        h(
          ElButton,
          {
            class: 'shiki-header-button shiki-header-button-expand'
          },
          {
            default: () => [
              h(ArrowDownBold, {
                class:
                  'markdown-language-header-toggle markdown-language-header-toggle-expand '
              })
            ]
          }
        )
      ]
    }
  );
}

/**
 * @description 描述 语言头部操作按钮
 * @date 2025-06-25 17:49:04
 * @author tingfeng
 *
 * @export
 * @param {() => void} copy
 */
export function controlEle(copy: () => void) {
  return h(
    ElSpace,
    {
      class: `markdown-language-header-space`,
      direction: 'horizontal'
    },
    {
      default: () => [
        toggleThemeEle(),
        h(CopyCodeButton, { onCopy: copy }) // ✅ 改为组件形式
      ]
    }
  );
}

/**
 * @description 描述 主题按钮
 * @date 2025-06-25 17:49:53
 * @author tingfeng
 *
 * @export
 */
export function toggleThemeEle() {
  return h(
    ElButton,
    {
      class: 'shiki-header-button markdown-language-header-toggle',
      onClick: () => {
        toggleTheme();
      }
    },
    {
      default: () =>
        h(!isDark.value ? Moon : Sunny, {
          class: 'markdown-language-header-toggle'
        })
    }
  );
}

/* ----------------------------------- 方法 ----------------------------------- */

/**
 * @description 描述 展开代码
 * @date 2025-07-01 11:33:32
 * @author tingfeng
 *
 * @export
 * @param elem
 */
export function expand(elem: HTMLElement) {
  elem.style.height = 'auto';
  elem.classList.add('is-expanded');
}

/**
 * @description 描述 折叠代码
 * @date 2025-07-01 11:33:49
 * @author tingfeng
 *
 * @export
 * @param elem
 */
export function collapse(elem: HTMLElement) {
  elem.style.height = '42px';
  elem.classList.remove('is-expanded');
}

/**
 * @description 复制代码内容到剪贴板
 * @date 2025-03-28 14:03:22
 * @author tingfeng
 *
 * @async
 * @param v
 * @returns void
 */
async function copy(v: string) {
  try {
    // 现代浏览器 Clipboard API
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(v);
      ElMessage({
        message: '复制成功',
        type: 'success'
      });
      return; // 复制成功直接返回
    }

    // 兼容旧浏览器的 execCommand 方案
    const textarea = document.createElement('textarea');
    textarea.value = v.trim();
    textarea.style.position = 'fixed'; // 避免滚动到文本框位置
    document.body.appendChild(textarea);
    textarea.select();

    // 执行复制命令
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (success) {
      ElMessage({
        message: '复制成功',
        type: 'success'
      });
      return; // 复制成功直接返回
    }
    if (!success) {
      throw new Error('复制失败，请检查浏览器权限');
    }
  } catch (err) {
    throw new Error(
      `复制失败: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * @description 描述 将源代码行数转换可复制的string
 * @date 2025-06-25 17:50:42
 * @author tingfeng
 *
 * @export
 * @param lines
 */
export function extractCodeFromHtmlLines(lines: string[]): string {
  const container = document.createElement('div');
  const output: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    container.innerHTML = lines[i];
    const text = container.textContent?.trimEnd();
    output.push(text ?? '');
  }

  container.remove();
  container.innerHTML = ''; // 清空引用内容
  container.textContent = null;

  return output.join('\n');
}

/**
 * @description 描述 切换展开状态
 * @date 2025-06-26 21:29:50
 * @author tingfeng
 *
 * @export
 * @param ev
 */
export function toggleExpand(ev: MouseEvent) {
  const ele = ev.currentTarget as HTMLElement;
  const preMd = ele.closest('.pre-md') as HTMLElement | null;

  if (preMd) {
    if (preMd.classList.contains('is-expanded')) {
      collapse(preMd);
    } else {
      expand(preMd);
    }
  }
}

/**
 * @description 描述 切换主题
 * @date 2025-06-26 21:58:56
 * @author tingfeng
 *
 * @export
 */
export function toggleTheme() {
  const theme = document.body.classList.contains('dark') ? 'light' : 'dark';
  isDark.value = theme === 'dark';
  if (isDark.value) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  return isDark.value;
}

/**
 * @description 描述 复制代码
 * @date 2025-06-26 22:02:57
 * @author tingfeng
 *
 * @export
 * @param codeText
 */
export function copyCode(codeText: string[]) {
  try {
    if (copyCodeTimer) return false; // 阻止重复点击

    const code = extractCodeFromHtmlLines(codeText);
    copy(code);

    copyCodeTimer = setTimeout(() => {
      copyCodeTimer = null;
    }, 800);

    return true;
  } catch (error) {
    console.log('🚀 ~ copyCode ~ error:', error);
    return false;
  }
}
