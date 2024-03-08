<template>
  <div :class=divclassFootTab>
    <q-tabs
      v-model="tab"
      class="white text-primary"
    >
      <tab-foot-date
      :datenews="datenews"
      />
      <tab-foot-star
        @click=countUpEvent(NewsCard.id)
        :tab-icon="tabIcon"
        :tabFootStarRating="count"
      />
    </q-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import TabFootStar from 'components/NewsCard/UI/tabFootStar.vue'
import TabFootDate from 'components/NewsCard/UI/tabFootDate.vue'

export default {
  name: 'NewsCardFootTab',
  components: { TabFootDate, TabFootStar },
  data () {
    return {
      tabIcon: 'star',
      ResultCardTitle: ''
    }
  },
  setup () {
    return {
      tab: ref('event')
    }
  },
  props: {
    datenews: String,
    count: String,
    countUpEvent: Function,
    NewsCard: String,
    divclassFootTab: String
  }
}
</script>

<style scoped>

</style>
