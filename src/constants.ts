// src/constants.ts

export const ACTIONS = {
  FETCH_BLOGS: 'fetchBlogs',
  FETCH_SINGLE_BLOG: 'fetchSingleBlog',
  ADD_BLOG: 'addBlog',
  UPDATE_SEARCH: 'updateSearch',
};

export const GETTERS = {
  FILTERED_BLOGS: 'filteredBlogs',
  CURRENT_BLOG: 'getCurrentBlog',
  SEARCH: 'getSearch', // Updated to match store.ts naming
};

// Adding mutations for consistency
export const MUTATIONS = {
  SET_BLOGS: 'setBlogs',
  ADD_BLOG: 'addBlog',
  SET_SEARCH: 'setSearch',
  SET_CURRENT_BLOG: 'setCurrentBlog',
};
