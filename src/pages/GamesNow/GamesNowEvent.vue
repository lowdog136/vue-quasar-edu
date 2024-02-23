<template>
  <div class="q-px-lg q-pb-md">
    <div class="title">
      {{ titleMainEvent }}
      <p>
        <q-separator color="orange" inset />
        {{ titleCaption }}
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
export default {
  components: { EventSZFO23 },
  setup () {
    return {
      titleEvent: ['Кубок СЗФО'],
      bodyMainEvent: '',
      btnSize: 'xs',
      titleMainEvent: 'Календарь игр ФК "Север" в 2024 году',
      titleCaption: 'ждите обновления'
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
