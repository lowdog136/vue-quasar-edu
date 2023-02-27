<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="secondary">
      <q-timeline-entry heading v-for="items in NewsCards" :key="items.id">
        {{ items.title }}
      </q-timeline-entry>
      <div>
        <q-timeline-entry v-for="items in eventsMounthMarch" :key="items.id"
                          :title="items.title"
                          subtitle="March, 1986"
        >
          <div >
            {{ items.mounth }}
            --
          </div>
        </q-timeline-entry>
      </div>
    </q-timeline>
  </div>
  <div>
    <div v-for="items in NewsCards" :key="items.id">
      {{ items.title }}
    </div>
    <div v-for="items in eventsMounthMarch" :key="items.id">
      {{ items.title }}-{{ items.mounth }}
    </div>
    <div v-for="items in eventsMounthFebruary" :key="items.id">
      {{ items.title }}-{{ items.mounth }}
    </div>
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
          mounth: 'Февраль, 2023'
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
    const eventsMounthMarch = ref([])
    const eventsMounthFebruary = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(collection(db, '/events2/polpred/2023'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            february: doc.data().february,
            march: doc.data().march,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon
          }
          fbEvents.push(listDateEvent)
        })
        NewsCards.value = fbEvents
        console.log(NewsCards)
      })
    })
    onMounted(async () => {
      // eventsMounthMarch Module
      onSnapshot(collection(db, '/events2/polpred/2023/march/games'), orderBy('date', 'desc'), (querySnapshot) => {
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
            icon: doc.data().icon
          }
          fbEvents.push(listDateEvent)
        })
        eventsMounthMarch.value = fbEvents
        console.log(eventsMounthMarch)
      })
    })
    onMounted(async () => {
      // eventsMounth Module
      onSnapshot(collection(db, '/events2/polpred/2023/february/games'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            february: doc.data().february,
            march: doc.data().march,
            title: doc.data().title,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon
          }
          fbEvents.push(listDateEvent)
        })
        eventsMounthFebruary.value = fbEvents
        console.log(eventsMounthFebruary)
      })
    })
    return {
      titleEvent: ['XXIV Турнир полпреда СЗФО'],
      titleEventTest: ['1', '2', '3'],
      titleEvent1: 'TitileEventValue1',
      btnSize: 'xs',
      eventsMounthMarch,
      eventsMounthFebruary,
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
