<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{ titleMainEvent }}
      <p>
        <q-separator color="orange" inset />
     </p>
      <p>
        <date-countdown
          :mainColor = deadlinemainColor
          :secondFlipColor = deadlinesecondFlipColor
          :showSeconds="false"
          :labels=deadlinelabels
          :deadline = deadline
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
export default {
  components: { EventPred2, EventFriendlyGames, DateCountdown },
  setup () {
    return {
      deadline: '2025-02-08 17:30:00',
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
