import type { Ref } from 'vue';
import type { FilesCardProps } from '../FilesCard/types.d.ts';

export interface FileListProps {
  items?: FilesCardProps[];
  overflow?: 'scrollX' | 'scrollY' | 'wrap';
  listStyle?: Record<string, string>;
  limit?: number; // 新增最大文件数限制
  // 隐藏内置上传
  hideUpload?: boolean;

  // 上传相关参数
  uploadIconSize?: string;
  dragTarget?: string | Ref<HTMLElement> | HTMLElement;
}

export type AttachmentsProps = FileListProps;

export interface AttachmentsEmits {
  (event: 'uploadChange', file: File, props: FileListProps): void;
  (
    event: 'uploadSuccess',
    response: any,
    file: File,
    props: FileListProps
  ): void;
  (event: 'uploadError', error: any, file: File, props: FileListProps): void;
  (event: 'uploadDrop', fileArr: File[], props: FileListProps): void;
  (event: 'deleteCard', item: FilesCardProps, index: number): void;
}
