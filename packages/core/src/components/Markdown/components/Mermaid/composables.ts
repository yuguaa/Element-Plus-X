import mermaid from 'mermaid';
import { ref } from 'vue';

// 内容哈希生成
export function generateContentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
}

// 复制到剪贴板
export async function copyToClipboard(content: string): Promise<boolean> {
  if (!content) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return true;
    }
  } catch (err) {
    console.error('Failed to copy content: ', err);
    return false;
  }
}

// SVG下载功能
export function downloadSvgAsPng(svg: string): void {
  if (!svg) return;

  try {
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: false });
        if (!ctx) return;

        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制SVG
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 下载
        const timestamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/:/g, '-');

        try {
          canvas.toBlob(
            blob => {
              if (!blob) return;
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `mermaid-diagram-${timestamp}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            },
            'image/png',
            0.95
          );
        } catch (toBlobError) {
          console.error('toBlobError:', toBlobError);
          // 降级方案
          try {
            const dataUrl = canvas.toDataURL('image/png', 0.95);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `mermaid-diagram-${timestamp}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (dataUrlError) {
            console.error('dataUrlError:', dataUrlError);
          }
        }
      } catch (canvasError) {
        console.error('Canvas操作失败:', canvasError);
      }
    };

    img.onerror = error => {
      console.error('Image load error:', error);
    };

    img.src = svgDataUrl;
  } catch (error) {
    console.error('Download error:', error);
  }
}

// Mermaid渲染composable
export function useMermaidRenderer(id: string) {
  const svg = ref('');
  const isRendering = ref(false);
  const contentHash = ref('');

  // 渲染Mermaid图表
  async function renderMermaid(content: string): Promise<boolean> {
    if (isRendering.value) return false;

    const newHash = generateContentHash(content);
    if (newHash === contentHash.value && svg.value) {
      return true;
    }

    try {
      isRendering.value = true;
      const valid = await mermaid.parse(content);

      if (valid) {
        mermaid.initialize({ securityLevel: 'loose' });
        const renderKey = `${id}-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(renderKey, content);

        contentHash.value = newHash;
        svg.value = renderedSvg;
        return true;
      }
      return false;
    } catch (error) {
      console.log('Mermaid render error:', error);
      return false;
    } finally {
      isRendering.value = false;
    }
  }

  // 重置状态
  function resetRenderer() {
    svg.value = '';
    contentHash.value = '';
    isRendering.value = false;
  }

  return {
    svg,
    isRendering,
    renderMermaid,
    resetRenderer
  };
}
