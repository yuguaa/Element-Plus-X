import pkg from './package.json'
import * as components from './components'
import 'element-plus/dist/index.css'

export * from './components'

// 定义组件类型接口
interface ComponentWithInstall {
  install?: (app: any) => void // install 方法可选
}
console.log("components:", components);
export default {
  install(app: any) {
    // 这里的componentName我们暂时用到，可以先将它加个下划线避免eslint报错
    Object.entries(components).forEach(([_componentName, component]) => {
      // 我们直接判断一下是否有install方法，如果有我们就执行一下install的方法
      // 为什么我们这里不用app.component,这是因为我们不确定这个组件中注册哪些附属的组件
      // 所以我们直接执行install方法，让组件自己去注册自己需要的组件就可以

      const typedComponent = component as ComponentWithInstall
      if (typeof typedComponent.install === 'function') {
        typedComponent.install(app) // 调用 install 方法
      }
    })
  },
  // 我们还可以在这里导出一下我们组件的版本号，方便我们后期查看版本。
  // 版本号我们直接从package.json中获取
  version: pkg.version,
}
