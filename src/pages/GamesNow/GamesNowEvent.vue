<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{ titleMainEvent }}
      <p>
        <q-separator color="orange" inset />
     </p>
      <p>
        <date-countdown
          mainColor = red
          secondFlipColor = white
          :showSeconds="false"
          :labels="{ days: '', hours: '', minutes: '', seconds: '', }"
          deadline='2024-06-01 14:00:00'
        />
      </p>
    </div>
    <p class="text-body1" style="text-align: center">
        {{bodyMainEvent }}
      <event-s-z-f-o23 />
    </p>
  </div>
</template>

<script>
import EventSZFO23 from 'components/Events/eventSZFO23'
import DateCountdown from 'components/Admin/dateCountdown.vue'
export default {
  components: { DateCountdown, EventSZFO23 },
  data: () => ({
    date: ''
  }),
  methods: {
    printDate: function () {
      return new Date().toLocaleDateString()
    }
  },
  mounted: function () {
    this.date = this.printDate()
  },
  setup () {
    return {
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
