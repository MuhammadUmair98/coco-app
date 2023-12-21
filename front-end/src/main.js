import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store'; // Import your Vuex store
import router from './router'; // Import your Vue Router instance

import './index.css';

const app = createApp(App);

app.use(store); // Use the Vuex store
app.use(router); // Use the Vue Router instance

app.mount('#app');
