<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{titleMainEvent }}
    </div>
    <q-timeline :layout="layout" color="secondary" v-for="game in games" :key="game.id">
      <q-timeline-entry heading>{{ game.mounth }}</q-timeline-entry>
      <q-timeline-entry
        v-for="matchEvent in game.matchEvents" :key="matchEvent.id"
        :title='titleEvent'
        :subtitle=matchEvent.data
        side="left"
        :color=matchEvent.color
        :icon=matchEvent.icon
      >
        <div>
          {{ matchEvent.tour}}
        </div>
        <div>
          {{ matchEvent.nameEvent}}
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

export default {
  data () {
    return {
      games: [
        {
          id: 1,
          mounth: 'Май, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '1 тур',
              nameEvent: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'май 29, 2022',
              mounth: 'май',
              icon: 'bookmark_border'
            }
          ]
        },
        {
          id: 2,
          mounth: 'Июнь, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '1 тур',
              nameEvent: 'СШ "Ленинградец" 6 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 1, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            },
            {
              id: 2,
              tour: '2 тур',
              nameEvent: 'СШ "Ленинградец" 2 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 11, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            },
            {
              id: 3,
              tour: '3 тур',
              nameEvent: 'СШ "Ленинградец" 1 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 31, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            },
            {
              id: 3,
              tour: '4 тур',
              nameEvent: 'СШ "Ленинградец" 1 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 31, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            },
            {
              id: 3,
              tour: '5 тур',
              nameEvent: 'СШ "Ленинградец" 1 - 2 ФК "Север"',
              color: 'primary',
              data: 'June 31, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            }
          ]
        }
      ]
    }
  },
  setup () {
    const $q = useQuasar()

    return {
      titleEvent: 'Чемпионат СЗФО',
      titleMainEvent: 'Календарь игр ФК "Север"',
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
