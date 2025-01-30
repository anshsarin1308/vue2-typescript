import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  categories: string[];
}

interface State {
  blogs: Blog[];
  search: string;
}

const store: StoreOptions<State> = {
  state: {
    blogs: [],
    search: ''
  },
  mutations: <MutationTree<State>>{
    setBlogs(state, blogs: Blog[]) {
      state.blogs = blogs;
    },
    setSearch(state, search: string) {
      state.search = search;
    }
  },
  actions: <ActionTree<State, State>>{
    // Fetch all blogs
    async fetchBlogs({ commit }: ActionContext<State, State>) {
      try {
        const response = await axios.get('https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts.json');
        if (response.data) {
          const blogsArray: Blog[] = [];
          for (const key in response.data) {
            if (Object.prototype.hasOwnProperty.call(response.data, key)) {
              response.data[key].id = key;
              blogsArray.push(response.data[key]);
            }
          }
          commit('setBlogs', blogsArray);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },

    // Fetch a single blog by ID
    async fetchSingleBlog({ commit }: ActionContext<State, State>, id: string) {
      try {
        const response = await axios.get(`https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts/${id}.json`);
        if (response.data) {
          return response.data;
        } else {
          console.warn("No blog data found.");
        }
      } catch (error) {
        console.error("Error fetching single blog:", error);
      }
    },

    // Post a new blog
    async postBlog({ commit, state }: ActionContext<State, State>, blog: Blog) {
      try {
        const response = await axios.post('https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts.json', blog);
        if (response.data) {
          const newBlog: Blog = {
            ...blog,
            id: response.data.name,
          };
          commit('setBlogs', [...state.blogs, newBlog]); 
          return newBlog; 
        }
      } catch (error) {
        console.error("Error posting blog:", error);
      }
    },

    updateSearch({ commit }: ActionContext<State, State>, search: string) {
      commit('setSearch', search);
    }
  },
  getters: <GetterTree<State, State>>{
    filteredBlogs: (state) => {
      return state.blogs.filter(blog => blog.title.match(state.search));
    },
    getSearch: (state) => state.search
  }
};

export default new Vuex.Store(store);
