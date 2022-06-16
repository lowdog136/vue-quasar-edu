<template>
  <div>
    <ResultMatchCardChemp />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import ResultMatchCardChemp from 'components/ResultMatchCardChemp'
const baseURL = 'http://localhost:3001'

export default {
  name: 'ResultMatchCard',
  components: { ResultMatchCardChemp },
  data () {
    return {}
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/resultGames`)
      this.resultGames = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    return {
      splitterModel: ref(50),
      selected: ref('1 тур'),

      simple: []
    }
  }
}
</script>
