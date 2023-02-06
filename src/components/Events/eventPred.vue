<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{titleMainEvent }}
    </div>
    <q-timeline :layout="layout" color="secondary" v-for="game in games.slice(id).reverse()" :key="game.id">
      <q-timeline-entry heading>
        <div class="title" style="color: #ae0000">
          {{ game.mounth }}
        </div>
      </q-timeline-entry>
      <div v-show="titleEventTest[1] == 2">
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
            <q-item-label caption>планируют посетить: {{ matchEvent.planeVisitCount }}</q-item-label>
          </div>
        </q-timeline-entry>
      </div>
    </q-timeline>
  </div>
  <div class="q-pa-lg">
    <q-timeline-entry heading>Timeline heading</q-timeline-entry>
    <q-timeline :layout="layout" :side="side" color="secondary" v-for="item in NewsCards" :key="item.id">
      <q-timeline-entry
        :title="item.title"
        :subtitle="item.date"
        :color="item.color"
        :icon="item.icon"
        side="left"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>
      <q-timeline-entry heading></q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'

// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
// const newsCardCollectionRef = collection(db, 'events', 'polpred')
// const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'

export default {
  name: 'eventPred',
  components: {},
  data () {
    return {
      games: [
        {
          id: 1,
          mounth: 'Февраль, 2023',
          matchEvents: [
            {
              id: 1,
              tour: '1 тур',
              nameEvent: '',
              color: 'orange-14',
              data: 'февраль 13, 2023',
              mounth: 'февраль',
              icon: 'event'
            }
          ]
        }
      ]
    }
  },
  setup () {
    const $q = useQuasar()
    const matchEvents = ref([])
    const NewsCards = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(collection(db, 'events/polpred/2023'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            icon: doc.data().icon
          }
          fbEvents.push(listDateEvent)
        })
        NewsCards.value = fbEvents
        console.log(NewsCards)
      })
    })

    return {
      titleEvent: ['XXIV Турнир полпреда СЗФО'],
      titleEventTest: ['1', '2', '3'],
      titleEvent1: 'TitileEventValue1',
      btnSize: 'xs',
      NewsCards,
      matchEvents,
      titleMainEvent: '',
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
