import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';





Vue.config.productionTip = false

Vue.directive('rainbow', {
  bind(el: HTMLElement) {
    el.style.color = "#" + Math.random().toString(16).slice(2, 8);
  }
});

/* eslint-disable */ 

Vue.directive('theme', {
  bind(el: HTMLElement, binding: any) {
    if (binding.value === 'wide') {
      el.style.maxWidth = "1260px";
    } else if (binding.value === 'narrow') {  
      el.style.maxWidth = "560px";
    }

    if (binding.arg === 'column') {
      el.style.background = '#ddd';
      el.style.padding = '20px';
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
