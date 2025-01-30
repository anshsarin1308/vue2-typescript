<template>
  <div class="container my-5">
    <div v-if="blog" class="card shadow-lg">
      <div class="card-body">
        <h1 class="card-title">{{ blog.title }}</h1>
        <p class="card-text">{{ blog.content }}</p>
        <p class="text-muted"><strong>Author:</strong> {{ blog.author }}</p>
        <h5 class="mt-3">Categories:</h5>
        <ul class="list-group list-group-flush">
          <li v-for="(category, index) in blog.categories" :key="index" class="list-group-item">
            {{ category }}
          </li>
        </ul>
      </div>
    </div>
    
    <div v-else class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading blog...</span>
      </div>
      <p class="mt-3">Loading blog...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Blog } from '@/store'; 

@Component
export default class SingleBlog extends Vue {
  blog: Blog | null = null;

  created() {
    const id = this.$route.params.id;  
    this.$store.dispatch('fetchSingleBlog', id).then((blog) => {
      if (blog) {
        this.blog = blog;  
      }
    });
  }
}
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: 0 auto;
}

.card-title {
  color: brown;
}
</style>
