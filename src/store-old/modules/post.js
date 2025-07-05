export default {
  state: {
    posts: []
  },
  actions: {
    async fetchPosts (ctx, limit = 3) {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
      )
      const posts = await res.json()
      ctx.commit('updatePosts', posts)
    }
  },
  mutations: {
    updatePosts (state, posts) {
      state.posts = posts
    }
  },
  getters: {
    allPosts (state) {
      return state.posts
    }
  }
}
