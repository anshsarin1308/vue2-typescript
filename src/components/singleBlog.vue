<template>
  <div class="container my-5">
    <div v-if="blog" class="card shadow-lg">
      <div class="card-body">
        <h1 class="card-title text-primary">{{ blog.title }}</h1>
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
import axios from 'axios';

interface Blog {
  title: string;
  content: string;
  author: string;
  categories: string[];
}

@Component
export default class SingleBlog extends Vue {
  id: string = this.$route.params.id;
  blog: Blog | null = null;

  created() {
    axios
      .get(`https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts/${this.id}.json`)
      .then((response) => {
        if (response.data) {
          this.blog = response.data;
        } else {
          console.warn("No blog data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }
}
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: 0 auto;
}

.card-title{
  color: brown !important;
}
</style> 
