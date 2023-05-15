import { createApp } from 'vue'
import './ui/assets/css/style.css'
import './ui/assets/css/layout.css'
import App from './ui/App.vue'
import { createPinia } from 'pinia'
import router from './router'
import "@mdi/font/css/materialdesignicons.css";


createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
