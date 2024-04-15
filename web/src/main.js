import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'normalize.css';
import 'element-plus/dist/index.css';
import './assets/css/index.css';
import App from '@/App.vue';
import './assets/css/fontText.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.mount('#app');
