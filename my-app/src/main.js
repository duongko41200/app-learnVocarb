import Vue from 'vue'
import App from './App.vue'
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router';
import CKEditor from 'ckeditor4-vue';



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use( CKEditor );
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
