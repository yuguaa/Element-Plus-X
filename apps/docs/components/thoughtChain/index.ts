import type { App } from 'vue'
import ThoughtChain from './thoughtChain.vue'

// 使用类型断言
(ThoughtChain as any).install = (app: App) => {
  app.component('ThoughtChain', ThoughtChain)
}

export default ThoughtChain
