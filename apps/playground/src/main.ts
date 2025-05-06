import { createApp } from 'vue'
import ElementPlusX from 'vue-element-plus-x'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(ElementPlusX)
app.mount('#app')
