

 <template>
  <div class="container my-5">
    <div class="card shadow-lg p-4">
      <h2 class="text-center">Add a New Blog Post</h2>

      <form v-if="!submitted">
        <BaseInput v-model="blog.title" label="Blog Title:" required /> <br>
        <BaseTextarea v-model="blog.content" label="Blog Content:" /> <br>

        <label>Blog Categories:</label>
        <div v-for="category in categories" :key="category" class="basecheckbox">
          <BaseCheckbox
            v-model="blog.categories"
            :options="[category]"
          />
        </div>
        <br>

        <BaseSelect v-model="blog.author" label="Author:" :options="authors" /><br>

        <button type="button" class="btn w-100" v-on:click.prevent="postBlog">Add Blog</button><br>
      </form>

      <div v-if="submitted" class="alert alert-success text-center mt-3">
        <h3>Thanks for adding your post!</h3>
      </div>

      <div class="card mt-4 p-3">
        <h3 class="text-secondary">Preview Blog</h3>
        <p><strong>Blog Title:</strong> {{ blog.title }}</p>
        <p><strong>Blog Content:</strong></p>
        <p class="border p-2 bg-light" style="white-space: pre">{{ blog.content }}</p> <br>
        <p><strong>Blog Categories:</strong></p>
        <ul class="list-group">
          <li v-for="category in blog.categories" :key="category" class="list-group-item">
            {{ category }}
          </li>
        </ul> <br>
        <p class="mt-2"><strong>Author:</strong> {{ blog.author }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Blog, ACTIONS } from '@/store'; 
import BaseInput from '@/components/forms/BaseInput.vue';
import BaseTextarea from '@/components/forms/BaseTextarea.vue';
import BaseCheckbox from '@/components/forms/BaseCheckbox.vue';
import BaseSelect from '@/components/forms/BaseSelect.vue';

@Component({
  components: {
    BaseInput,
    BaseTextarea,
    BaseCheckbox,
    BaseSelect,
  }
})
export default class AddBlog extends Vue {
  blog: Blog = {
    id: '',
    title: '',
    content: '',
    categories: [],
    author: ''
  };
  authors: string[] = ['The Net Ninja', 'The Angular Avenger', 'The Vue Vindicator'];
  categories: string[] = ['Ninjas', 'Wizards', 'Mario', 'Cheese'];

  submitted = false;

  postBlog() {
    this.$store.dispatch(ACTIONS.POST_BLOG, this.blog).then((newBlog) => {
      if (newBlog) {
        this.submitted = true;

        this.$nextTick(() => {
          setTimeout(() => {
            this.$router.push({ path: '/', query: { blogId: newBlog.id } });
          }, 2000);
        });
      }
    });
  }
}
</script>

<style scoped>
.text-center {
  color: gray;
}

.btn {
  color: black;
  background-color: #ffc107;
  font-size: 25px;
}


</style>


