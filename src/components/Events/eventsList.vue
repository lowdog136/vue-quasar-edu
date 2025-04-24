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
          {{ item.colorField }}
          {{ item.mounth}}
        </div>
        <div style="font-size: 10pt; color: #ae0000">
          {{ item.nameTeamHome }} {{ item.nameCityTeamHome }}  {{ item.goalTeamHome }} - {{ item.goalTeamAway }} {{ item.nameTeamAway }} {{ item.nameCityTeamAway}}
          <q-item-label caption v-for="(item) in item.scorer" :key="item.id">
            <q-item-label>{{ item[0] }} {{ item[1] }} {{ item[2] }}</q-item-label>
          </q-item-label>
          <q-item-label caption>планируют посетить: 0 </q-item-label>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from 'src/firebase'

const siteUpdateCollectionRef = collection(db, '/all-games')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, where('done', '==', false), orderBy('datestamp', 'asc'))

export default {
  name: 'eventsList',
  components: {},
  data () {
    return {}
  },
  setup () {
    const $q = useQuasar()
    const matchEvents = ref([])
    const NewsCards = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
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
            victory: doc.data().victory,
            place: doc.data().place,
            colorField: doc.data().colorField
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
