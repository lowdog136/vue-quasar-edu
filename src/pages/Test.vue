<template>
  <div class="q-pa-sm wrap rounded-borders">
    <eventMonthList />
    <q-page>
      <GoogleSignIn />
    </q-page>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'
import eventMonthList from 'components/Events/eventMonthList.vue'
import GoogleSignIn from 'components/Auth/GoogleSignIn.vue'

// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
// const newsCardCollectionRef = collection(db, 'events', 'polpred')
// const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

// import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'

export default {
  name: 'Test',
  components: { GoogleSignIn, eventMonthList },
  data () {
    return {
      btnColor: 'blue-grey-10',
      btnName: 'Подробно',
      // кнопка что бы не прилипала к краю
      btnDivMain: '',
      divclassFootTab: 'q-pa-m'
    }
  },
  setup () {
    const $q = useQuasar()
    const matchEvents = ref([])
    const NewsCards = ref([])
    const NewsCardsJ = ref([])
    const NewsCardsJl = ref([])
    const NewsCardsAu = ref([])
    const NewsCardsSep = ref([])
    const NewsCardsA = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(collection(db, '/events/szfo/2023/may/match'), orderBy('date', 'desc'), (querySnapshot) => {
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
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCards.value = fbEvents
        console.log(NewsCards)
      })
      onSnapshot(collection(db, '/events/szfo/2023/june/match'), orderBy('date', 'desc'), (querySnapshot) => {
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
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsJ.value = fbEvents
        console.log(NewsCardsJ)
      })
      onSnapshot(collection(db, '/events/szfo/2023/jule/match'), orderBy('date', 'desc'), (querySnapshot) => {
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
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsJl.value = fbEvents
        console.log(NewsCardsJl)
      })
      onSnapshot(collection(db, '/events/szfo/2023/august/match'), orderBy('date', 'desc'), (querySnapshot) => {
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
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsAu.value = fbEvents
        console.log(NewsCardsAu)
      })
      onSnapshot(collection(db, '/events/szfo/2023/september/match'), orderBy('date', 'desc'), (querySnapshot) => {
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
            body: doc.data().body,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsSep.value = fbEvents
        console.log(NewsCardsSep)
      })
      onSnapshot(collection(db, '/events/szfo/2023/april/match'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const listDateEvent = {
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            color: doc.data().color,
            date: doc.data().date,
            mounth: doc.data().mounth,
            tour: doc.data().tour,
            eventName: doc.data().eventName,
            time: doc.data().time,
            icon: doc.data().icon,
            scorer: doc.data().scorer
          }
          fbEvents.push(listDateEvent)
        })
        NewsCardsA.value = fbEvents
        console.log(NewsCardsA)
      })
    })

    return {
      titleEvent: ['XXIV Турнир полпреда СЗФО'],
      titleEventTest: ['1', '2', '3'],
      titleEvent1: 'TitileEventValue1',
      btnSize: 'xs',
      NewsCards,
      NewsCardsJ,
      NewsCardsJl,
      NewsCardsA,
      NewsCardsAu,
      NewsCardsSep,
      matchEvents,
      titleMainEvent: '',
      side: ref('right'),
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
