import Vue from 'vue';

import AppIcon from '@/_shared/controls/app-icon.vue';
import AppRadio from '@/_shared/controls/app-radio.vue';
import AppCheckbox from '@/_shared/controls/app-checkbox.vue';
import AppInput from '@/_shared/controls/app-input.vue';
import AppLoader from '@/_shared/controls/app-loader.vue';
import AppFile from '@/_shared/controls/app-file.vue';
import AppCounter from '@/_shared/controls/app-counter.vue';
import AppSelect from '@/_shared/controls/app-select.vue';
import AppTextarea from '@/_shared/controls/app-textarea.vue';
import AppSwitcher from '@/_shared/controls/app-switcher.vue';

Vue.component('app-icon', AppIcon);
Vue.component('app-radio', AppRadio);
Vue.component('app-checkbox', AppCheckbox);
Vue.component('app-input', AppInput);
Vue.component('app-loader', AppLoader);
Vue.component('app-file', AppFile);
Vue.component('app-switcher', AppSwitcher);
Vue.component('app-counter', AppCounter);
Vue.component('app-select', AppSelect);
Vue.component('app-textarea', AppTextarea);
