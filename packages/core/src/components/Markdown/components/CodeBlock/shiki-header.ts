import { CopyDocument } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';
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

export function copyBtnEle(codeText: string[]) {
  return h(ElButton, {
    class: `markdown-language-header-button`,
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

/**
 * @description 处理复制事件
 * @date 2025-03-28 14:03:51
 * @author tingfeng
 *
 * @param event
 */
export function handleCopyClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  console.log('target.classList', target.classList);
  if (
    target.classList.contains('markdown-language-header-button') ||
    target.classList.contains('markdown-language-header-button-text')
  ) {
    const code = target.getAttribute('data-code');
    if (code) {
      copy(code);
    }
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
