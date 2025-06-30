export interface MermaidToolbarConfig {
  showToolbar?: boolean;
  showFullscreen?: boolean;
  showZoomIn?: boolean;
  showZoomOut?: boolean;
  showReset?: boolean;
  showDownload?: boolean;
  toolbarStyle?: Record<string, any>;
  toolbarClass?: string;
  iconColor?: string;
  tabTextColor?: string;
  hoverBackgroundColor?: string;
  tabActiveBackgroundColor?: string;
}

export interface MermaidToolbarProps extends MermaidToolbarConfig {}

export interface MermaidZoomControls {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  fullscreen: () => void;
  destroy: () => void;
  initialize: () => void;
}

export interface UseMermaidZoomOptions {
  container: Ref<HTMLElement | null>;
  scaleStep?: number;
  minScale?: number;
  maxScale?: number;
}

export interface MermaidToolbarEmits {
  onZoomIn: [];
  onZoomOut: [];
  onReset: [];
  onFullscreen: [];
  onEdit: [];
  onToggleCode: [];
  onCopyCode: [];
  onDownload: [];
}

// Mermaid 组件暴露给插槽的方法接口
export interface MermaidExposedMethods {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  fullscreen: () => void;
  toggleCode: () => void;
  copyCode: () => void;
  download: () => void;
  svg: import('vue').Ref<string>;
  showSourceCode: import('vue').Ref<boolean>;
  toolbarConfig: import('vue').ComputedRef<MermaidToolbarConfig>;
  rawContent: string;
}
