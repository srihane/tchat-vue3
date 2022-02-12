import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

//importing AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

createApp(App)
.use(router)
.use(store)
.use(AOS.init())
.mount('#app')