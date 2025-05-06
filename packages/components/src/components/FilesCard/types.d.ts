import type { CSSProperties } from 'vue'

export type FilesType = 'word' | 'excel' | 'ppt' | 'pdf' | 'txt' | 'mark' | 'image' | 'audio' | 'video' | 'three' | 'code' | 'database' | 'link' | 'zip' | 'file' | 'unknown'

export interface FilesCardProps {
  uid?: string | number
  name?: string
  fileSize?: number
  fileType?: FilesType
  description?: string
  url?: string
  thumbUrl?: string
  imgFile?: File | Blob
  iconSize?: string
  iconColor?: string
  showDelIcon?: boolean
  maxWidth?: string
  noStyle?: boolean
  style?: CSSProperties
  hoverStyle?: CSSPropertiess
  // 图片文件变体
  imgVariant?: 'rectangle' | 'square'
  // 图片是否开启预览
  imgPreview?: boolean
  // 是否显示预览遮罩
  imgPreviewMask?: boolean

  // 文件状态
  status?: 'uploading' | 'done' | 'error'
  // 上传进度
  percent?: numbe
  // 失败提示信息
  errorTip?: string
}
