<template>
  <div class="q-pa-lg">
    <q-timeline :layout="layout" :side="side" color="secondary">
      <q-timeline-entry heading>
        <div class="title" style="color: #ae0000">
          февраль
        </div>
      </q-timeline-entry>
      <q-timeline-entry v-for="item in NewsCards.slice(id)" :key="item.id"
                        :title="item.eventName"
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
          {{ item.title }}
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
  name: 'eventPred24',
  components: {},
  data () {
    return {
      games: [
        {
          id: 1,
          mounth: 'Февраль'
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
      onSnapshot(collection(db, 'events/polpred/2025'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            scorer: doc.data().scorer,
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
