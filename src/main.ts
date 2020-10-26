import Vue from 'vue';
import store from '@/store';
import App from './App.vue';
import router from './router';
import '@/_shared/components/_global';
import '@/_shared/controls';
import '@/_shared/utils/pipes.ts';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
