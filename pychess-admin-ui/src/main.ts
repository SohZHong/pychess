import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import './assets/stylesheets/style.css'
import VueCookies from 'vue-cookies'

const app = createApp(App)
// Importing components
app.use(ElementPlus)
app.use(VueCookies)
app.use(router)
app.use(store)
app.mount('#app')
