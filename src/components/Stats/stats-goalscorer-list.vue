<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="title">
      {{ titleMainEvent }}
    </div>
    <q-card bordered class="bg-grey-2 my-card" v-for="item in ScorerArrayList" v-bind:key="item.id">
      <q-card-section>
        <div class="text-h6">{{ NewsCardHeader }}</div>
        <div class="text-subtitle2">{{ NewsCardYear }}</div>
      </q-card-section>

      <q-separator color="red" inset />
      <q-card-section>
        <div class="text-h6 q-mb-xs">
          <q-avatar>
            <img src="../../assets/image/team/players/itarakanov.jpg">
            <q-badge floating color="primary">new</q-badge>
          </q-avatar>
          {{ item.name }} - 1</div>
        <div class="row no-wrap items-center" v-for="event in item.eventsList" v-bind:key="event.id">
          <span class="text-caption text-grey ">{{ event.eventsListDate }}</span>
          <span class="text-caption text-grey q-ml-sm">{{ event.eventsListEvent }}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const NewsCardHeader = (ref('Чемпионат СЗФО'))
const NewsCardYear = (ref(''))
const titleMainEvent = (ref('Список бомбардиров ФК "Север" в 2025 году:'))

const ScorerArrayList = (ref([
  {
    id: 0,
    name: 'И. Тараканов',
    eventsList: [
      {
        id: 1,
        eventsListDate: 'июнь 4',
        eventsListEvent: 'СШ "Ленинградец" Санкт-Петербург 0 - 1 ФК "Север Мурманск'
      }
    ]
  }
]))

</script>

<style lang="sass" scoped>
.title
  font-size: 26px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 500px
</style>
