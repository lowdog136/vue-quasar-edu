<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-btn @click="ratingNewsUp">{{$store.state.ratingNews}}</q-btn>

    <q-card class="my-card" flat>
      <q-card-section flat>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  components: {},
  props: {
    NewsClubNewsCardStatus: String
  },
  data () {
    return {
      items: []
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3001/items')
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    const () {
      return this.$store.state.ratingNews
    }
  },
  methods: {
    ratingNewsUp () {
      this.$store.commit('ratingNewsUp')
      console.log(this.$store.state.ratingNews)
    }

  },
  setup () {
    return {
      expanded: ref(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
