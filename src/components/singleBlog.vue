<template>
  <div id="single-blog" v-if="blog">
    <h1>{{ blog.title }}</h1>
    <article>{{ blog.content }}</article>
    <p>Author: {{ blog.author }}</p>
    <p>Categories:</p>
    <ul>
      <li v-for="(category, index) in blog.categories" :key="index">{{ category }}</li>
    </ul>
  </div>
  <div v-else>
    <p>Loading blog...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

interface Blog {
  title: string;
  content: string;
  author: string;
  categories: string[]; // Fix: Changed 'array' to 'string[]'
}

@Component
export default class SingleBlog extends Vue {
  id: string = this.$route.params.id;
  blog: Blog | null = null; // Fix: Changed to 'null' initially

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
#single-blog {
  max-width: 960px;
  margin: 0 auto;
}
</style>
