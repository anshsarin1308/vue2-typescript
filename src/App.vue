<template>
  <div>
    <blogHeader></blogHeader>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import addBlog from './components/addBlog.vue';
import showBlogs from './components/showBlogs.vue';
import blogHeader from './components/blogHeader.vue';

import BaseInput from "./components/forms/BaseInput.vue";
import BaseTextarea from "./components/forms/BaseTextarea.vue";
import BaseCheckbox from "./components/forms/BaseCheckbox.vue";
import BaseSelect from "./components/forms/BaseSelect.vue";

@Component({
  components: {
    addBlog,
    showBlogs,
    blogHeader,
    BaseInput,
    BaseTextarea,
    BaseCheckbox,
    BaseSelect
  },
})
export default class App extends Vue {
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
}
</style>
