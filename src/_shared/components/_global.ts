import Vue from 'vue';

import AppLogo from '@/_assets/logo.svg';
import AppHeader from '@/_shared/components/header.vue';
import ModalView from '@/_shared/modals/_modal-view.vue';
import Footer from '@/_shared/components/footer.vue';
import OrderHeadInfo from '@/_shared/components/order-head-info.vue';
import OrderCheck from '@/_shared/components/order-check.vue';
import AppAccordion from '@/_shared/components/app-accordion.vue';

Vue.component('app-logo', AppLogo);
Vue.component('modal-view', ModalView);
Vue.component('app-header', AppHeader);
Vue.component('app-footer', Footer);
Vue.component('order-head-info', OrderHeadInfo);
Vue.component('order-check', OrderCheck);
Vue.component('app-accordion', AppAccordion);
