<template>
  <div class="q-pa-md row items-start q-gutter-md"
  v-for="resultGame in resultGames.slice(id).reverse()"
  :key="resultGame.id">
    <q-card class="my-card" flat bordered>
      <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
      <q-card-section>
        <div class="text-overline text-orange-9">{{ resultGame.title }}</div>
        <div class="text-caption text-grey">{{ resultGame.date }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs-md">{{ resultGame.result }}</div>
        <div class="text-caption text-grey">
          {{ resultGame.team1 }}<br>
          {{ resultGame.team1city }} <br>
          {{ resultGame.team2 }}<br>
          {{ resultGame.team2city }}<br>
        </div>
        <div class="text-caption text-pink-7" style="width: auto">
          Счет: {{ resultGame.total }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import axios from 'axios'
const baseURL = 'http://localhost:3001'

export default {
  name: 'ResultMatchCard',
  data () {
    return {
      resultGames: [],
      resultGameStatus: '',
      resultGameResult: '',
      resultGameTitle: '',
      resultGameDate: '',
      resultGameTeam1: '',
      resultGameTeam1City: '',
      resultGameTeam2: '',
      resultGameTeam2City: '',
      resultGameTotal: ''
    }
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/resultGames`)
      this.resultGames = res.data
    } catch (error) {
      console.log(error)
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.result
  display: flex
  height: 60px
.my-card
  display: flex
  width: 300px
</style>
