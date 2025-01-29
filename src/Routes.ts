import VueRouter, { RouteConfig } from 'vue-router';
import Vue from 'vue';

import addBlog from './components/addBlog.vue';
import showBlogs from './components/showBlogs.vue';
import singleBlog from './components/singleBlog.vue';

Vue.use(VueRouter);


const routes: RouteConfig[] = [
  { path: '/', component: showBlogs,  name: 'showBlogs', },
  { path: '/add', component: addBlog ,  name: 'addBlog',},
  { path: '/blog/:id', component: singleBlog,  name: 'singleBlog', }
];

const router = new VueRouter({
  mode: 'history', // Use 'hash' if history mode causes issues
  routes
});

export default router;