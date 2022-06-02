<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="my-card" v-if="$store.state.colorCode">
      <h4> Text here </h4>
    </div>
    <q-btn @click="btnClick">Buttom click</q-btn>
  </div>
  <div>
    <q-timeline-entry
      :title='titleEvent'
      subtitle="Июль 2, 2022"
      side="left"
      icon="emoji_emotions">
      ff
    </q-timeline-entry>
    <q-timeline-entry
      :title='titleEvent'
      subtitle="Июль 2, 2022"
      side="left"
      icon="emoji_emotions"
    >
      ff
    </q-timeline-entry>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <GamesNowEventCard
    v-for="GamesNowEventList in $store.state.GamesNowEventLists"
    :key="GamesNowEventList.id"
    :eventListValue="GamesNowEventList"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import GamesNowEventCard from 'components/GamesNowEventCard'

export default {
  components: { GamesNowEventCard },
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
</style>
