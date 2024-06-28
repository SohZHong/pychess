import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/stylesheets/style.css'
// import the fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core'

// import font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import specific icons
import { faXmark, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

// Individually importing icons
library.add(faXmark, faUser, faLock, faEnvelope)

const app = createApp(App)
// Importing components
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.mount('#app')

export default app
