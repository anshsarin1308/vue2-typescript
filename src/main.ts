import Vue from 'vue'
import App from './App.vue'
import router from './Routes'

import store from './store'

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
    } else if (binding.value === 'narrow') {  // Fixed the comparison operator
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
