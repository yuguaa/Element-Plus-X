import type { Ref } from 'vue'
import { onUnmounted, ref, watch } from 'vue'

export function useElementWidth(elementRef: Ref<HTMLElement | null>) {
  const width = ref<number>(0)

  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry)
      return

    // 使用最新的浏览器 API 获取宽度，优先使用 borderBoxSize
    const borderWidth = entry.borderBoxSize?.[0]?.inlineSize
    if (borderWidth) {
      width.value = borderWidth
    }
    else {
      // 兼容旧版本浏览器
      width.value = entry.target.getBoundingClientRect().width
    }
  })

  const stopWatch = watch(
    () => elementRef.value,
    (newEl, oldEl) => {
      if (oldEl) {
        resizeObserver.unobserve(oldEl)
      }
      if (newEl) {
        resizeObserver.observe(newEl)
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    resizeObserver.disconnect()
    stopWatch()
  })

  return width
}
