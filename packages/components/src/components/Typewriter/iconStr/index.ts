import copy from './copy'
import pin from './pin'
import pinOff from './pin-off'

interface SvgIconMap {
  copy: string
  pin: string
  pinOff: string
}

// 导出内置 svg 图表字符串
const svgMap: SvgIconMap = {
  copy,
  pin,
  pinOff,
}

export default svgMap
