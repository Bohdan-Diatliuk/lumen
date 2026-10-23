import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import { vReveal } from './directives/reveal'

createApp(App).use(i18n).directive('reveal', vReveal).mount('#app')
