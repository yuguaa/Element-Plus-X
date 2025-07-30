/**
 * Mermaid图表库动态加载工具
 *
 * 这个模块提供了一个动态加载mermaid的解决方案，避免在不使用包含mermaid的
 * XMarkdown组件时将mermaid包打包到最终的bundle中，从而减小包体积。
 */

/**
 * Mermaid配置选项接口
 */
interface MermaidConfig {
  suppressErrorRendering?: boolean;
  startOnLoad?: boolean;
  securityLevel?: 'strict' | 'loose' | 'antiscript' | 'sandbox';
  [key: string]: any;
}

/**
 * 动态加载mermaid并返回API实例
 *
 * @returns Promise<any> - mermaid实例（使用any类型避免复杂的类型定义）
 * @throws Error - 当mermaid加载失败时抛出错误
 */
export async function loadMermaid(): Promise<any> {
  try {
    // 动态导入mermaid，只有在实际使用包含mermaid的组件时才加载
    const mermaidModule = await import('mermaid');

    // 处理不同的导出格式
    const mermaid = mermaidModule.default || mermaidModule;

    return mermaid;
  } catch (error) {
    // 提供详细的错误信息，便于调试
    const errorMessage = error instanceof Error ? error.message : String(error);

    throw new Error(
      `Failed to load mermaid: ${errorMessage}. ` +
        'Please ensure that "mermaid" is installed as a peer dependency.'
    );
  }
}

/**
 * 检查mermaid是否可用
 *
 * @returns Promise<boolean> - mermaid是否可用
 */
export async function isMermaidAvailable(): Promise<boolean> {
  try {
    await import('mermaid');
    return true;
  } catch {
    return false;
  }
}

/**
 * 安全地加载mermaid，如果加载失败则返回null
 *
 * @returns Promise<any | null> - mermaid实例或null
 */
export async function safeLoadMermaid(): Promise<any | null> {
  try {
    return await loadMermaid();
  } catch (error) {
    // 在开发环境下输出警告信息
    if (import.meta.env?.MODE === 'development') {
      console.warn(
        'Mermaid not available, diagram rendering will be disabled:',
        error
      );
    }
    return null;
  }
}

/**
 * 渲染mermaid图表的包装器函数
 *
 * @param content - mermaid图表定义内容
 * @param config - mermaid配置选项
 * @param container - 可选的渲染容器
 * @returns Promise<string> - 渲染后的SVG字符串，失败时返回空字符串
 */
export async function renderMermaidDiagram(
  content: string,
  config: MermaidConfig = {},
  container?: HTMLElement
): Promise<string> {
  const mermaid = await safeLoadMermaid();

  if (!mermaid) {
    // 如果mermaid不可用，返回一个错误提示
    return `<div style="padding: 16px; border: 1px solid #ff6b6b; border-radius: 4px; background: #ffe0e0; color: #d63031;">
      <strong>Mermaid not available</strong><br>
      Please install "mermaid" package to render diagrams.
    </div>`;
  }

  try {
    // 验证mermaid语法
    const valid = await mermaid.parse(content);
    if (!valid) {
      return '<div style="padding: 16px; border: 1px solid #fdcb6e; border-radius: 4px; background: #fff3cd; color: #856404;">Invalid mermaid syntax</div>';
    }

    // 初始化mermaid配置
    mermaid.initialize({
      suppressErrorRendering: true,
      startOnLoad: false,
      securityLevel: 'loose',
      ...config
    });

    // 生成唯一ID
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    // 渲染图表
    const { svg } = await mermaid.render(id, content, container);

    return svg;
  } catch (error) {
    // 渲染失败时返回错误提示
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `<div style="padding: 16px; border: 1px solid #ff6b6b; border-radius: 4px; background: #ffe0e0; color: #d63031;">
      <strong>Mermaid render error:</strong><br>
      ${errorMessage}
    </div>`;
  }
}
