import type { Ref } from 'vue';
import { MERMAID_CACHE_KEY_LENGTH } from '@components/XMarkdownCore/shared';
import mermaid from 'mermaid';
import useSWRV from 'swrv';
import { Md5 } from 'ts-md5';
import { computed } from 'vue';

interface UseMermaidOptions {
  id?: string;
  theme?: 'default' | 'dark' | 'forest' | 'neutral' | string;
  config?: any;
}

let mermaidContainer: HTMLElement | null = null;

function getMermaidContainer(): HTMLElement {
  if (!mermaidContainer) {
    mermaidContainer = document.querySelector(
      '.elx-markdown-mermaid-container'
    ) as HTMLElement;
    if (!mermaidContainer) {
      mermaidContainer = document.createElement('div') as HTMLElement;
      mermaidContainer.ariaHidden = 'true';
      mermaidContainer.style.maxHeight = '0';
      mermaidContainer.style.opacity = '0';
      mermaidContainer.style.overflow = 'hidden';
      mermaidContainer.classList.add('elx-markdown-mermaid-container');
      document.body.append(mermaidContainer);
    }
  }
  return mermaidContainer;
}

export function useMermaid(
  content: string | Ref<string>,
  options: UseMermaidOptions = {}
) {
  const { id = 'mermaid', theme = 'default', config = {} } = options;

  // 默认配置
  const mermaidConfig = computed(() => ({
    suppressErrorRendering: true,
    startOnLoad: false,
    securityLevel: 'loose',
    theme,
    ...config
  }));

  // 生成缓存键
  const cacheKey = computed(() => {
    const contentValue = typeof content === 'string' ? content : content.value;
    if (!contentValue) return null;

    const hash =
      contentValue.length > MERMAID_CACHE_KEY_LENGTH
        ? `mermaid-${Md5.hashStr(contentValue)}`
        : `mermaid-${contentValue}`;

    return hash;
  });

  // 使用 useSWRV 进行缓存和数据获取
  return useSWRV(
    cacheKey,
    async (): Promise<string> => {
      const contentValue =
        typeof content === 'string' ? content : content.value;
      if (!contentValue?.trim()) return '';

      try {
        // 验证语法
        const isValid = await mermaid.parse(contentValue);
        if (!isValid) {
          console.log('Mermaid parse error: Invalid syntax');
          return '';
        }

        // 初始化配置
        mermaid.initialize(mermaidConfig.value);

        // 生成唯一ID
        const renderId = `${id}-${Math.random().toString(36).substr(2, 9)}`;

        // 获取渲染容器
        const container = getMermaidContainer();

        // 渲染图表
        const { svg } = await mermaid.render(renderId, contentValue, container);

        return svg;
      } catch (error) {
        console.log('Mermaid render error:', error);
        return '';
      }
    },
    {
      dedupingInterval: 3000,
      errorRetryCount: 2,
      revalidateOnFocus: false,
      revalidateDebounce: 300
    }
  );
}
