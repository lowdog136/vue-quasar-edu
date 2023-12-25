<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{titleMainEvent }}
    </div>
    <p class="text-body1" style="text-align: center">
        {{bodyMainEvent }}
      <event-pred24 />
    </p>
  </div>
</template>

<script>

import EventPred24 from 'components/Events/eventPred24.vue'
export default {
  components: { EventPred24 },
  setup () {
    return {
      titleEvent: ['Кубок СЗФО'],
      bodyMainEvent: '',
      btnSize: 'xs',
      titleMainEvent: 'Календарь игр ФК "Север" в 2024 году'
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
