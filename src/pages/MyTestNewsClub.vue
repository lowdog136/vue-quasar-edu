<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <h4></h4>
    <input type="number" v-model='$store.state.count'/>
    {{ $store.state.count }}
  </div>
  <div class="post" v-for="post in allPosts" :key="post.id">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
  <q-btn @click="$store.commit()" label="+"/>
</template>
<script>
import { stole } from 'src/store'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MyTestNewsClub',
  computed:
    mapGetters([
      'allPosts'
    ]),
  async mounted () {
    this.stole.post.dispatch('fetchPosts')
  },
  setup () {
    return {
      stole
    }
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
