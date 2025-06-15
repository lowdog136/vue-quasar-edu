<template>
  <div class="q-pa-md items-start q-gutter-md">
    <div class="title">
      {{ titleMainEvent }}
    </div>
    <q-card bordered class="bg-grey-2 my-card" v-for="(item, index) in items" :key="index">
      <q-card-section>
        <div class="text-h6">{{ NewsCardHeader }}</div>
        <div class="text-subtitle2">{{ NewsCardYear }}</div>
      </q-card-section>

      <q-separator color="red" inset />
      <q-card-section>
        <div class="text-h6 q-mb-xs">
          <q-avatar>
            <img alt='player image' src='../../assets/image/football-player.png'>
            <q-badge floating color="primary" v-show="item.old === true">{{ item.status }}</q-badge>
          </q-avatar>
          {{ item.name }} - {{ item.scoreCount}}</div>
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

const titleMainEvent = (ref('Список бомбардиров ФК "Север" в 2025 году:'))
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  NewsCardHeader: {
    type: String,
    default: 'Чемпионат СЗФО'
  },
  NewsCardYear: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => [] // Важно использовать функцию для дефолтного значения!
  }
})
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
