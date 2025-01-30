<template>
  <div class="container my-5">
    <h1 class="text-center text-primary">All Blog Articles</h1>

    <input type="text" v-model="search" class="form-control mb-4" placeholder="Search blogs..." />

    <div v-if="notificationVisible" class="alert alert-success position-fixed start-0 top-0 m-3 shadow">
      <p class="mb-1">New blog added!</p>
      <router-link :to="'/blog/' + newBlogId" class="alert-link">View it now</router-link>
    </div>

    <div v-for="blog in filteredBlogs" :key="blog.id" class="card mb-4 shadow">
      <div class="card-body">
        <router-link :to="'/blog/' + blog.id" class="text-decoration-none">
          <h2 class="text-dark" v-rainbow>{{ blog.title }}</h2>
        </router-link>
        <article class="text-muted">{{ blog.content }}</article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ShowBlogs extends Vue {
  newBlogId: string | null = null;
  notificationVisible = false;

  get filteredBlogs() {
    return this.$store.getters.filteredBlogs;
  }

  get search(): string {
    return this.$store.state.search;
  }

  set search(value: string) {
    this.$store.dispatch('updateSearch', value);
  }

  created() {
    this.$store.dispatch('fetchBlogs');
    
    const blogId = this.$route.query.blogId as string;
    if (blogId) {
      this.newBlogId = blogId;
      this.notificationVisible = true;

      setTimeout(() => {
        this.notificationVisible = false;
      }, 5000);
    }
  }
}
</script>