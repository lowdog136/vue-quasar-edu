<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{ titleMainEvent }}
      <p>
        <q-separator color="orange" inset />
     </p>
      <p>
        <date-countdown v-for="countdown in GamesNowEvents" :key="countdown.id"
          :mainColor='countdown.datenews'
          :secondFlipColor = deadlinesecondFlipColor
          :showSeconds="false"
          :labels=deadlinelabels
          :deadline = 'countdown.datenews'
        />
      </p>
    </div>
    <p class="text-body1" style="text-align: center">
        {{bodyMainEvent }}
      <event-friendly-games />
      <event-pred2 />
    </p>
  </div>
</template>

<script>
import DateCountdown from 'components/Admin/dateCountdown.vue'
import EventFriendlyGames from 'components/Events/event-friendly-games.vue'
import EventPred2 from 'components/Events/eventPred2.vue'
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'

export default {
  name: 'GamesNowEvent',
  components: { EventPred2, EventFriendlyGames, DateCountdown },
  setup () {
    const NewsCards = ref([])
    const GamesNowEvents = ref([])
    onMounted(async () => {
      onSnapshot(collection(db, '/events/countdown/dateUpdate/'), orderBy('date', 'desc'), (querySnapshot) => {
        const fbGamesNowEvents = []
        querySnapshot.forEach((doc) => {
          const GamesNowEvent = {
            datenews: doc.data().datenews
          }
          fbGamesNowEvents.push(GamesNowEvent)
        })
        GamesNowEvents.value = fbGamesNowEvents
        console.log('Countdown date update', GamesNowEvents)
      })
    })
    return {
      NewsCards,
      GamesNowEvents,
      deadlinemainColor: 'red',
      deadlinesecondFlipColor: 'white',
      deadlinelabels: '{ days: \'\', hours: \'\', minutes: \'\', seconds: \'\', }',
      titleEvent: ['Кубок СЗФО'],
      bodyMainEvent: '',
      btnSize: 'xs',
      titleMainEvent: 'Календарь игр ФК "Север" в 2025 году',
      titleCaption: ''
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
