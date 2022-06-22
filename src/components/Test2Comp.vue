<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">

    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

export default {
  data () {
    return {}
  },
  setup () {
    const $q = useQuasar()

    return {
      titleEvent: 'Чемпионат СЗФО',
      layout: computed(() => {
        return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
      })
    }
  },
  props: {
    test2ComptitleMainEvent: String,
    test2CompGames: String,
    TitleNews: String,
    PopyUpTitleNews: String,
    PopyUpSrcNews: String,
    PopyUpFullNews: String,
    PopyUpHowWatch: String,

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
.title
  font-size: 28px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 350px
</style>
