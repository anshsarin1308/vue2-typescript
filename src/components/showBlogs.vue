<template>
  <div id="show-blogs" v-theme:column="'wide'">
    <h1>All Blog Articles</h1>
    <input type="text" v-model="search" placeholder="Search" />
    
    <div v-if="notificationVisible" id="notification">
      <p>New blog added!</p>
      <router-link :to="'/blog/' + newBlogId">View it now</router-link>
    </div>

    <div v-for="blog in filteredBlogs" class="single-blog" :key="blog.id">
      <router-link :to="'/blog/' + blog.id">
        <h2 v-rainbow>{{ blog.title }}</h2>
      </router-link>
      <article>{{ blog.content }}</article>
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

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0px auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
#show-blogs a {
  color: #444;
  text-decoration: none;
}

#notification {
  position: fixed;
  width:25%;
  top: 80px;
  left: 20px;
  background-color: #4CAF50;
  text-align: center;
  font-size: 25px;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
