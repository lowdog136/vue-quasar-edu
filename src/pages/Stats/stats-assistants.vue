<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <stats-list :items="leaderPlayers"/>
  </div>
</template>

<script setup>
import StatsList from 'components/Stats/stats-list.vue'
const leaderPlayers = [
  {
    id: 0,
    name: 'А. Пантюхин',
    playerUrl: '././assets/image/football-player.png',
    scoreCount: '1',
    old: false,
    status: 'new',
    eventsList: [
      {
        id: 1,
        eventsListDate: 'июнь 4',
        eventsListEvent: 'СШ "Ленинградец" Санкт-Петербург 0 - 1 ФК "Север" Мурманск'
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
