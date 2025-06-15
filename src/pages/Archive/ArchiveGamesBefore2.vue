<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{titleMainEvent }}
    </div>
    <div class="title">
      {{titleMainEventBody }}
    </div>
    <div class="title">
      <ArchiveGamesViewList2 />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import ArchiveGamesViewList2 from 'components/ArchiveGames/ArchiveGamesViewList2.vue'

export default {
  name: 'ArchiveGamesBefore',
  components: { ArchiveGamesViewList2 },
  data () {
    return {}
  },
  setup: function () {
    const events = ref([])
    const matchEvents = ref([])
    const $q = useQuasar()

    return {
      events,
      matchEvents,
      btnSize: 'xs',
      titleMainEvent: 'Архив игр',
      titleMainEventBody: '- в процессе наполнения -',
      layout: computed(() => {
        return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
      })
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
