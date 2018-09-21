import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Button } from 'bootstrap-vue/es/components';

import App from './App.vue'

Vue.use(BootstrapVue);
Vue.use(Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
