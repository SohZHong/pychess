import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import './assets/stylesheets/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// Globally registering icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// Importing components
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
