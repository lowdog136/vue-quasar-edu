export default {
  state: {
    posts: []
  },
  actions: {
    async fetchPosts (ctx) {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=3'
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
