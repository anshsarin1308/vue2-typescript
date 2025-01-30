import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

interface Blog {
  id:string;
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
    async fetchBlogs({ commit }) {
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
  
    updateSearch({ commit }, search: string) {
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

export default  new Vuex.Store(store);




