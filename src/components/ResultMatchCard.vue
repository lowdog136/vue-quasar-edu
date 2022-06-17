<template>
  <div>
    <ResultMatchCardArchiveGameO />
    <ResultMatchCardArchiveGameF />
  </div>
</template>

<script>
import axios from 'axios'
import ResultMatchCardArchiveGameF from 'components/ResultMatchCardArchiveGameF'
import ResultMatchCardArchiveGameO from 'components/ResultMatchCardArchiveGameO'
const baseURL = 'http://localhost:3001'

export default {
  name: 'ResultMatchCard',
  components: { ResultMatchCardArchiveGameF, ResultMatchCardArchiveGameO },
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
    return {}
  }
}
</script>
