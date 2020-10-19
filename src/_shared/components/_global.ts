import Vue from 'vue';

import AppLogo from '@/_assets/logo.svg';
import AppHeader from '@/_shared/components/header.vue';
import OrderHeadInfo from '@/_shared/components/order-head-info.vue';
import OrderCheck from '@/_shared/components/order-check.vue';
import AppAccordion from '@/_shared/components/app-accordion.vue';

Vue.component('app-logo', AppLogo);
Vue.component('app-header', AppHeader);
Vue.component('order-head-info', OrderHeadInfo);
Vue.component('order-check', OrderCheck);
Vue.component('app-accordion', AppAccordion);
