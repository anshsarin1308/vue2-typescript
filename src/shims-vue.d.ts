declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module './store' {
  import { Store } from 'vuex';
  const store: Store<any>;
  export default store;
}

