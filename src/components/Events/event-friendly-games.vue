<template>
  <div class="q-pa-lg">
    <q-timeline :layout="layout" :side="side" color="secondary">
      <q-timeline-entry v-for="item in NewsCards.slice(id)" :key="item.id"
        :title="item.event"
        :subtitle="item.date"
        :color="item.color"
        :icon="item.icon"
        side="left"
      >
        <div>
          <div style="font-size: 10pt; color: #414040">
            {{ item.place}}
          </div>
          {{ item.tour}}
          {{ item.mounth}}
        </div>
        <div style="font-size: 10pt; color: #ae0000">
          {{ item.nameTeamHome }} {{ item.nameCityTeamHome }}  {{ item.goalTeamHome }} - {{ item.goalTeamAway }} {{ item.nameTeamAway }} {{ item.nameCityTeamAway}}
          <q-item-label caption>голы: {{ item.scorer }} </q-item-label>
          <q-item-label caption>планируют посетить: 0 </q-item-label>
        </div>
      </q-timeline-entry>
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
  name: 'event-friendly-games',
  components: {},
  data () {
    return {
      games: [
        {
          id: 1,
          mounth: 'Февраль, 2024'
        },
        {
          id: 1,
          mounth: 'Март, 2023'
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
      onSnapshot(collection(db, '/all-games'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            event: doc.data().event,
            time: doc.data().time,
            icon: doc.data().icon,
            scorer: doc.data().scorer,
            nameTeamHome: doc.data().nameTeamHome,
            nameCityTeamHome: doc.data().nameCityTeamHome,
            nameCityTeamAway: doc.data().nameCityTeamAway,
            nameTeamAway: doc.data().nameTeamAway,
            goalTeamHome: doc.data().goalTeamHome,
            goalTeamAway: doc.data().goalTeamAway,
            place: doc.data().place
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
