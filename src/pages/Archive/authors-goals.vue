<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <stats-list :items="users"/>
  </div>
</template>

<script setup>
import StatsList from 'components/Stats/stats-list.vue'

// const user = (ref({
//   name: 'John Doffe',
//   title: 'Чемпионат СЗФО',
//   age: 2025,
//   email: 'john@example.com',
//   nameEvent: 'СШ "Ленинградец" Санкт-Петербург 0 - 1 ФК "Север Мурманск',
//   dateEvent: '2025-07-04'
// }
// ))
const users = [
  {
    id: 0,
    name: 'И. Тараканов',
    eventsList: [
      {
        id: 1,
        eventsListDate: 'июнь 4',
        eventsListEvent: 'СШ "Ленинградец" Санкт-Петербург 0 - 1 ФК "Север" Мурманск'
      }
    ]
  },
  {
    id: 1,
    name: 'В. Шапарев',
    eventsList: [
      {
        id: 1,
        eventsListDate: 'июнь 15',
        eventsListEvent: 'ФК "Север" Мурманск 1 - 0 ФК "ГОУР-Карелия" Петразаводск'
      }
    ]
  }
]
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
