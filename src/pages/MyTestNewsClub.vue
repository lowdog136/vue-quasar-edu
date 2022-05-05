<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <PostForm />
    <h4> {{ postsCount }}</h4>
    <div class="post" v-for="post in validPosts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
  <div class="container">
    <div id="app">
      <h1>Shopping List</h1>
    </div>
    <ul>
      <li
        v-for="item of items"
        :class="{ bought: item.bought }"
        :key="item.id"
        @click="boughtItem(item.id)"
        @dblclick="removeItem(item.id)"
      >
        itemStatus: {{ item.status }} --
        itemBody: {{ item.body }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import PostForm from 'components/PostForm'
export default {
  name: 'MyTestNewsClub',
  components: { PostForm },
  data () {
    return {
      items: [],
      itemName: ''
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3000/items')
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  computed:
    mapGetters([
      'validPosts',
      'postsCount'
    ]),
  async mounted () {
    this.fetchPosts()
  },
  methods:
    mapActions(['fetchPosts']),
  async boughtItem (id) {
    await axios.patch(`http://localhost:3000/items/${id}`, {
      bought: true
    })
    this.items = this.items.map((item) => {
      if (item.id === id) {
        item.bought = true
      }
      return item
    })
  },
  removeItem (id) {
    axios.delete(`http://localhost:3000/items/${id}`)
    this.items = this.items.filter((item) => item.id !== id)
  },
  async addItem () {
    const res = await axios.post('http://localhost:3000/items', {
      name: this.itemName
    })
    this.items = [...this.items, res.data]
    this.itemName = ''
  }
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
