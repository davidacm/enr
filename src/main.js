import Vue from 'vue'
import App from './App.vue';
import {VueSpeak} from './utils';
Vue.use(VueSpeak);

// import { BootstrapVue} from 'bootstrap-vue'
import {BTabs, BTab, BContainer, BRow, BCol, BButton, BFormFile, BFormInput, BFormSelect, BFormSelectOption, BFormCheckbox, BFormTextarea, BLink} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)

Vue.component('BContainer', BContainer);
Vue.component('b-tabs', BTabs);
Vue.component('b-tab', BTab);
Vue.component('b-row', BRow);
Vue.component('b-col', BCol);
Vue.component('b-button', BButton);
Vue.component('b-form-file', BFormFile);
Vue.component('b-form-input', BFormInput);
Vue.component('b-form-select', BFormSelect);
Vue.component('b-form-select-option', BFormSelectOption);
Vue.component('b-form-checkbox', BFormCheckbox);
Vue.component('b-form-textarea', BFormTextarea);
Vue.component('b-link', BLink);
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents, {swipeTolerance:75})

import store from './store';
import './registerServiceWorker'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
