<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{titleMainEvent }}
    </div>
    <p class="text-body1" style="text-align: center">
        {{bodyMainEvent }}
    </p>
    <event-pred2 />
<!--    <eventCupSZFO />-->
<!--    <eventSZFO />-->
  </div>
</template>

<script>
import EventPred2 from 'components/Events/eventPred2'
export default {
  components: { EventPred2 },
  setup () {
    return {
      titleEvent: ['Кубок СЗФО'],
      bodyMainEvent: '',
      btnSize: 'xs',
      titleMainEvent: 'Календарь игр ФК "Север" в 2023 году'
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
