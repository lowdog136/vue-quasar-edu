<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <PostForm />
    <h4> {{ postsCount }}</h4>
    <div class="post" v-for="post in allPosts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PostForm from 'components/PostForm'
export default {
  name: 'MyTestNewsClub',
  components: { PostForm },
  computed:
    mapGetters([
      'allPosts',
      'postsCount'
    ]),
  async mounted () {
    this.fetchPosts()
  },
  methods:
    mapActions(['fetchPosts'])
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px

.post
  border: 1px solid #ccc
  border-radius: 5px
  margin-bottom: 1rem
</style>
