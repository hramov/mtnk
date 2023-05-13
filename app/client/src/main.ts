import { createApp } from 'vue'
import './ui/assets/css/style.css'
import App from './ui/App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './ui/plugins/vuetify'
import "@mdi/font/css/materialdesignicons.css";

// Vuetify
import 'vuetify/styles'


createApp(App)
    .use(router)
    .use(createPinia())
    .use(vuetify)
    .mount('#app')
