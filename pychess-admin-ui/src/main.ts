import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

createApp(App).use(ElementPlus).use(router).use(store).use(router).mount('#app')
