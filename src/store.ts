

import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const MUTATIONS = {
  SET_BLOGS: 'setBlogs',
  SET_SEARCH: 'setSearch',
};

export const ACTIONS = {
  FETCH_BLOGS: 'fetchBlogs',
  FETCH_SINGLE_BLOG: 'fetchSingleBlog',
  POST_BLOG: 'postBlog',
  UPDATE_SEARCH: 'updateSearch',
};

export const GETTERS = {
  FILTERED_BLOGS: 'filteredBlogs',
  GET_SEARCH: 'getSearch',
};

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
    search: '',
  },
  mutations: <MutationTree<State>>{
    [MUTATIONS.SET_BLOGS](state, blogs: Blog[]) {
      state.blogs = blogs;
    },
    [MUTATIONS.SET_SEARCH](state, search: string) {
      state.search = search;
    },
  },
  actions: <ActionTree<State, State>>{
    async [ACTIONS.FETCH_BLOGS]({ commit }: ActionContext<State, State>) {
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
          commit(MUTATIONS.SET_BLOGS, blogsArray);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },

    async [ACTIONS.FETCH_SINGLE_BLOG]({ commit }: ActionContext<State, State>, id: string) {
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

    async [ACTIONS.POST_BLOG]({ commit, state }: ActionContext<State, State>, blog: Blog) {
      try {
        const response = await axios.post('https://vuejs-blog-94894-default-rtdb.firebaseio.com/posts.json', blog);
        if (response.data) {
          const newBlog: Blog = {
            ...blog,
            id: response.data.name,
          };
          commit(MUTATIONS.SET_BLOGS, [...state.blogs, newBlog]);
          return newBlog;
        }
      } catch (error) {
        console.error("Error posting blog:", error);
      }
    },

    [ACTIONS.UPDATE_SEARCH]({ commit }: ActionContext<State, State>, search: string) {
      commit(MUTATIONS.SET_SEARCH, search);
    }
  },
  getters: <GetterTree<State, State>>{
    [GETTERS.FILTERED_BLOGS]: (state) => {
      return state.blogs.filter(blog => blog.title.match(state.search));
    },
    [GETTERS.GET_SEARCH]: (state) => state.search
  }
};

export default new Vuex.Store(store);

