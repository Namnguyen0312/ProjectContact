import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import './assets/main.css'
import router from "./router";
import { createPinia } from 'pinia'
const pinia = createPinia();
// import VueSplide from '@splidejs/vue-splide';
// import '@splidejs/vue-splide/css/sea-green';
createApp(App).use(pinia).use(router).mount('#app');