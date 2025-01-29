<template>
    <div id="add-blog">
      <h2>Add a New Blog Post</h2>
      <form v-if="!submitted">
        <label>Blog Title:</label>
        <input type="text" v-model.lazy="blog.title" required />
        <label>Blog Content:</label>
        <textarea v-model.lazy.trim="blog.content"></textarea>
        <div id="checkboxes">
          <p>Blog Categories:</p>
          <label>Ninjas</label>
          <input type="checkbox" value="ninjas" v-model="blog.categories" />
          <label>Wizards</label>
          <input type="checkbox" value="wizards" v-model="blog.categories" />
          <label>Mario</label>
          <input type="checkbox" value="mario" v-model="blog.categories" />
          <label>Cheese</label>
          <input type="checkbox" value="cheese" v-model="blog.categories" />
        </div>
        <label>Author:</label>
        <select v-model="blog.author">
          <option v-for="author in authors" :key="author">{{ author }}</option>
        </select>
        <br /> <br />
        <button v-on:click.prevent="post">Add Blog</button>
      </form>
      <div v-if="submitted">
        <h3>Thanks for adding your post</h3>
      </div>
      <div id="preview">
        <h3>Preview blog</h3>
        <p>Blog title: {{ blog.title }}</p>
        <p>Blog content:</p>
        <p style="white-space: pre">{{ blog.content }}</p>
        <p>Blog Categories:</p>
        <ul>
          <li v-for="category in blog.categories" :key="category">{{ category }}</li>
        </ul>
        <p>Author: {{ blog.author }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  
  interface Blog {
    id:string;
    title: string;
    content: string;
    categories: string[];
    author: string;
  }
  
  @Component
  export default class AddBlog extends Vue {
    blog: Blog = {
      id:'',
      title: '',
      content: '',
      categories: [],
      author: ''
    };
    authors: string[] = ['The Net Ninja', 'The Angular Avenger', 'The Vue Vindicator'];
    submitted = false;
  
    // post() {
    //   axios
    //     .post('https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts.json', this.blog)
    //     .then((response) => {
    //       console.log(response);
    //       this.submitted = true;
    //       setTimeout(() => {
    //       this.$router.push('/');
    //     }, 2000);
          
    //     });
    // }

    post() {
  axios
    .post('https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts.json', this.blog)
    .then((response) => {
      const blogId = response.data.name; 
      this.submitted = true;

      const newBlog: Blog = {
        ...this.blog,
        id: blogId
      };
      this.$store.commit('setBlogs', [...this.$store.state.blogs, newBlog]);

      setTimeout(() => {
        this.$router.push({ path: '/', query: { blogId: blogId } });
      }, 2000);
    });
}

  }
  </script>
  
  <style scoped>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 500px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
}
#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}
#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}
#checkboxes label{
    display: inline-block;
    margin-top: 0;
}
</style>