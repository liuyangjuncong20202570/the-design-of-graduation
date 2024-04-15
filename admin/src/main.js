import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/css/index.css';
import 'normalize.css';
import Particles from '@tsparticles/vue3';
import { loadFull } from 'tsparticles';
import router from './router';
import App from './App.vue';
import 'element-plus/dist/index.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(Particles, {
  init: async engine => {
    await loadFull(engine);
  }
});
app.use(router);
app.mount('#app');
