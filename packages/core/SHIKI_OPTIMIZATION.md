# Shiki 和 Mermaid 按需加载优化

## 问题描述

在之前的版本中，`shiki` 和 `mermaid` 作为直接依赖被打包到组件库中，这导致即使用户没有使用相关功能的组件，也会将这些大型包（包含所有语言包和图表渲染器）打包到最终的 bundle 中，造成不必要的包体积增大。

## 解决方案

### 1. 依赖管理优化

- **移除直接依赖**：将 `shiki` 从 `dependencies` 移动到 `peerDependencies`
- **添加新的依赖**：将 `mermaid` 添加到 `peerDependencies`
- **外部化配置**：在 Vite 构建配置中将相关包添加到 `external` 列表

### 2. 动态导入实现

#### Shiki 动态加载

创建了 `shikiLoader.ts` 工具模块，提供以下功能：

- **按需加载**：只有在实际使用 `XMarkdown` 组件时才动态导入 `shiki`
- **错误处理**：提供安全的加载方式，加载失败时优雅降级
- **可用性检查**：提供检查 `shiki` 是否可用的工具函数

#### Mermaid 动态加载

创建了 `mermaidLoader.ts` 工具模块，提供以下功能：

- **按需加载**：只有在实际渲染 mermaid 图表时才动态导入 `mermaid`
- **错误处理**：加载失败时显示友好的错误提示
- **降级处理**：在 mermaid 不可用时提供错误信息而不是崩溃

### 3. 代码重构

- **useShiki.ts**：重构为使用动态导入
- **MarkdownProvider hooks.ts**：更新为使用新的shiki加载器
- **Mermaid/index.vue**：重构为使用动态导入的mermaid
- **错误处理**：添加了详细的错误处理和开发环境警告

## 使用说明

### 对于组件库用户

#### 如果您使用了 `XMarkdown` 组件的代码高亮功能

需要确保安装 `shiki` 作为依赖：

```bash
npm install shiki @shikijs/transformers
# 或
pnpm add shiki @shikijs/transformers
# 或
yarn add shiki @shikijs/transformers
```

#### 如果您使用了 `XMarkdown` 组件的 mermaid 图表功能

需要确保安装 `mermaid` 作为依赖：

```bash
npm install mermaid
# 或
pnpm add mermaid
# 或
yarn add mermaid
```

### 对于不使用相关功能的用户

如果您不使用 `XMarkdown` 组件，或者不使用代码高亮和图表功能，则无需安装这些包，您的 bundle 大小将显著减小。

## 技术细节

### 动态导入实现

#### Shiki

```typescript
// 之前：静态导入
import { createHighlighter } from 'shiki';

// 现在：动态导入
const { createHighlighter } = await import('shiki');
```

#### Mermaid

```typescript
// 之前：静态导入
import mermaid from 'mermaid';

// 现在：动态导入
const mermaid = await safeLoadMermaid();
```

### 安全加载器

```typescript
// Shiki安全加载
const highlighter = await safeCreateShikiHighlighter(options);
if (!highlighter) {
  console.warn('Shiki not available, code highlighting disabled');
}

// Mermaid安全加载
const mermaid = await safeLoadMermaid();
if (!mermaid) {
  // 显示友好的错误提示而不是崩溃
  return '<div>Mermaid not available...</div>';
}
```

### 构建配置优化

```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      external: [
        'vue',
        'element-plus',
        'shiki', // 外部化shiki
        '@shikijs/transformers', // 外部化相关包
        '@shikijs/markdown-it',
        'mermaid' // 外部化mermaid
      ]
    }
  }
};
```

## 性能改进

- **包体积减小**：
  - 不使用 XMarkdown 时 bundle 减小约 2-3MB（shiki）
  - 不使用 mermaid 图表时 bundle 减小约 1-2MB（mermaid）
- **加载性能**：只有在需要时才加载相应的库
- **代码分割**：实现了更好的代码分割和懒加载
- **用户体验**：提供友好的错误提示而不是应用崩溃

## 向后兼容性

- **API 不变**：组件的 API 保持不变
- **功能完整**：所有现有功能继续正常工作
- **渐进式**：用户可以按需决定是否安装相关依赖

## 注意事项

1. **peer dependencies**：确保在使用相关功能时安装了对应的依赖
2. **错误处理**：检查依赖是否正确加载，处理加载失败的情况
3. **开发环境**：在开发环境会显示相关警告信息，帮助调试
4. **功能分离**：代码高亮和图表渲染现在是可选功能

这个优化确保了组件库的灵活性和性能，用户只为他们实际使用的功能付出包体积成本。现在用户可以：

- 只使用基础的 markdown 渲染功能（无额外依赖）
- 按需添加代码高亮功能（安装 shiki）
- 按需添加图表渲染功能（安装 mermaid）
- 同时使用所有功能（安装所有依赖）
