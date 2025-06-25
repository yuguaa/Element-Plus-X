import { CopyDocument, Sunny } from '@element-plus/icons-vue';
import { ElButton, ElSpace } from 'element-plus';
import { h } from 'vue';

export function languageEle(language: string) {
  return h(
    'span',
    {
      class: 'markdown-language-header-span el-card is-always-shadow'
    },
    language || ''
  );
}

export function controlEle(codeText: string[]) {
  return h(
    ElSpace,
    {
      class: `markdown-language-header-space`,
      direction: 'horizontal'
    },
    {
      default: () => [toggleTheme(), copyBtnEle(codeText)]
    }
  );
}

export function toggleTheme() {
  return h(ElButton, {
    class: `shiki-header-button markdown-language-header-toggle`,
    icon: () =>
      h(Sunny, {
        class: 'markdown-language-header-toggle'
      })
  });
}

export function copyBtnEle(codeText: string[]) {
  return h(ElButton, {
    class: `shiki-header-button markdown-language-header-button`,
    icon: () =>
      h(CopyDocument, {
        class: `markdown-language-header-button-text`,
        'data-code': extractCodeFromHtmlLines(codeText)
      }),
    'data-code': extractCodeFromHtmlLines(codeText) // Vue 不支持直接绑定数组作为 data-* 属性
  });
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

export function extractCodeFromHtmlLines(lines: string[]): string {
  const container = document.createElement('div');

  return lines
    .map(line => {
      container.innerHTML = line;
      return container.textContent?.trimEnd() ?? '';
    })
    .filter(line => line.trim() !== '')
    .join('\n');
}

let listenerBound = false;

function handleCopyClick(target: HTMLElement) {
  const code = target.getAttribute('data-code');
  if (code) copy(code);
}

function handleThemeToggleClick() {
  document.body.classList.toggle('dark');
}

export function handleClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const copyEl =
    target.closest('.markdown-language-header-button') ||
    target.closest('.markdown-language-header-button-text');
  const toggleEl = target.closest('.markdown-language-header-toggle');

  if (copyEl instanceof HTMLElement) {
    handleCopyClick(copyEl);
    return;
  }

  if (toggleEl) {
    handleThemeToggleClick();
  }
}

export function startEventListener() {
  if (!listenerBound) {
    document.addEventListener('click', handleClick);
    listenerBound = true;
  }
}

export function stopEventListener() {
  if (listenerBound) {
    document.removeEventListener('click', handleClick);
    listenerBound = false;
  }
}
