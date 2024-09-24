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
      <event-off-season />
    </p>
  </div>
</template>

<script>
import DateCountdown from 'components/Admin/dateCountdown.vue'
import EventOffSeason from 'components/Events/eventOffSeason.vue'
export default {
  components: { EventOffSeason, DateCountdown },
  setup () {
    return {
      deadline: '2024-06-29 18:30:00',
      deadlinemainColor: 'red',
      deadlinesecondFlipColor: 'white',
      deadlinelabels: '{ days: \'\', hours: \'\', minutes: \'\', seconds: \'\', }',
      titleEvent: ['Кубок СЗФО'],
      bodyMainEvent: '',
      btnSize: 'xs',
      titleMainEvent: 'Календарь игр ФК "Север" в 2024 году',
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
