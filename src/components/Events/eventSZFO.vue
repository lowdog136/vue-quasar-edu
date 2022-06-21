<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{titleMainEvent }}
    </div>
    <q-timeline :layout="layout" color="secondary" v-for="game in games.slice(id).reverse()" :key="game.id">
      <q-timeline-entry heading>{{ game.mounth }}</q-timeline-entry>
      <q-timeline-entry
        v-for="matchEvent in game.matchEvents.slice(id).reverse()" :key="matchEvent.id"
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
// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'

export default {
  name: 'eventSZFO',
  components: {},
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
              nameEvent: 'СШ "Электрон" 0-3 ФК "Север"',
              color: 'orange-14',
              data: 'май 29, 2022',
              mounth: 'май',
              icon: 'done_all'
            }
          ]
        },
        {
          id: 2,
          mounth: 'Июнь, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '2 тур',
              nameEvent: 'СШ "Ленинградец" 1-2 ФК "Север"',
              color: 'orange-14',
              data: 'Июнь 1, 2022',
              mounth: 'June',
              icon: 'done_all'
            },
            {
              id: 2,
              tour: '3 тур',
              nameEvent: 'ФК "Новград" 1-1 ФК "Север"',
              color: 'orange-14',
              data: 'Июнь 11, 2022',
              mounth: 'June',
              icon: 'done_all'
            },
            {
              id: 3,
              tour: '4 тур',
              nameEvent: 'ФК "Псков" 0-2 ФК "Север"',
              color: 'red',
              data: 'Июнь 15, 2022',
              mounth: 'June',
              icon: 'local_fire_department'
            },
            {
              id: 3,
              tour: '5 тур',
              nameEvent: 'СШ №2 ВО "Звезда" 1-2 ФК "Север"',
              color: 'orange-14',
              data: 'Июнь 18, 2022',
              mounth: 'June',
              icon: 'done_all'
            },
            {
              id: 3,
              tour: '6 тур',
              nameEvent: 'ФК "Север" - ФК "Химик',
              color: 'teal',
              data: 'Июнь 29, 2022',
              mounth: 'June',
              icon: 'bookmark_border'
            }
          ]
        },
        {
          id: 3,
          mounth: 'Июль, 2022',
          matchEvents: [
            {
              id: 1,
              tour: '7 тур',
              nameEvent: 'ФК "Север" - СШ №7 Карелия',
              color: 'teal',
              data: 'июль 2, 2022',
              mounth: 'июль',
              icon: 'sentiment_very_satisfied'
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
      btnSize: 'xs',
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
