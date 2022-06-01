<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="my-card" v-if="$store.state.colorCode">
      <h4> Text here </h4>
    </div>
    <q-btn @click="btnClick">Buttom click</q-btn>

    <q-card class="my-card" flat>
      <q-card-section flat>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

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
    ...mapGetters([
      'dropDown'
    ])
  },
  methods: {
    ...mapActions([
      'togledropDown'
    ]),
    btnClick () {
      this.togledropDown()
    },
    ratingNewsUp () {
      this.$store.dispatch('ratingNewsUp')
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
