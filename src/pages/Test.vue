<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="my-card" v-if="$store.state.colorCode">
      <h4> Text here </h4>
      <div class="q-pa-md row items-start q-gutter-md">
        <GamesNowEventCard
          v-for="GamesNowEventList in $store.state.GamesNowEventLists"
          :key="GamesNowEventList.id"
          :eventListValue="GamesNowEventList"
        />
      </div>
    </div>
    <q-btn @click="btnClick">Buttom click</q-btn>
  </div>
  <div>
    <vueLidate />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import GamesNowEventCard from 'components/GamesNowEventCard'
import vueLidate from 'components/vueLidate'

export default {
  components: { GamesNowEventCard, vueLidate },
  data () {
    return {
      items: []
    }
  },
  setup () {
    return {
      expanded: ref(false)
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
  props: {
    eventListValue: {
      type: Object,
      default () {
        return {
          eventCardTitleMounthDate: String,
          eventCardTitleMounthDateView: String,
          eventCardTitleDate: String,
          eventCardNameContest: String,
          eventCardGameTur: String,
          eventCardGameBody: String
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px

  .root
    width: 400px
    margin: 0 auto
    background-color: #fff
    padding: 30px
    margin-top: 100px
    border-radius: 20px

  input
    border: none
    outline: none
    border-bottom: 1px solid #ddd
    font-size: 1em
    padding: 5px 0
    margin: 10px 0 5px 0
    width: 100%
  button
    background-color: #3498db
    padding: 10px 20px
    margin-top: 10px
    border: none
    color: white

</style>
