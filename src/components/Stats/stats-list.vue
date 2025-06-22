<template>
  <div class="q-pa-md items-start q-gutter-md">
    <div class="title" v-if="NewsCardHeader !== 'Ассистенты' && NewsCardHeader !== 'Бомбардиры'">
      {{ titleMainEvent }}
    </div>
    <q-card bordered class="bg-grey-2 my-card" v-for="(item, index) in items" :key="index" :class="{ 'new-player-card': item.status === 'new' }">
      <q-card-section>
        <div class="text-h6 q-mb-xs">
          <q-avatar>
            <img alt='player image' src='../../assets/image/football-player.png'>
<!--            <q-img :src="item.playerUrl" />-->
            <q-badge floating color="primary" v-show="item.old === true">{{ item.status }}</q-badge>
            <q-badge floating color="positive" v-show="item.status === 'new'" icon="new_releases">Новый</q-badge>
          </q-avatar>
          {{ item.name }} - {{ item.scoreCount}} {{ getScoreLabel(item.scoreCount) }}
        </div>
        <div class="text-subtitle2">{{ NewsCardYear }}</div>
      </q-card-section>

      <q-separator color="red" inset />

      <q-card-section>
        <div class="events-list">
          <div v-for="(tournamentGroup, tournamentName) in groupedEvents(item.eventsList)" :key="tournamentName" class="tournament-group">
            <div class="tournament-header">{{ tournamentName }}</div>
            <div class="event-item" v-for="event in tournamentGroup" v-bind:key="event.id" :class="{ 'new-event': event.isNew }">
              <div class="event-date">{{ event.eventsListDate }}</div>
              <div class="event-match">{{ event.eventsListEvent }}</div>
              <div class="event-icon" v-if="event.isNew">
                <q-icon name="fiber_new" color="positive" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const titleMainEvent = ref('Список бомбардиров ФК "Север" в 2025 году:')

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
  },
  lastViewedDate: {
    type: String,
    default: null
  }
})

// Функция для группировки событий по турнирам
const groupedEvents = (eventsList) => {
  const groups = {}

  eventsList.forEach(event => {
    // Используем поле event из данных
    const tournamentName = event.event || 'Другие турниры'

    if (!groups[tournamentName]) {
      groups[tournamentName] = []
    }
    groups[tournamentName].push(event)
  })

  return groups
}

// Динамический заголовок в зависимости от типа статистики
const getScoreLabel = (count) => {
  if (props.NewsCardHeader === 'Ассистенты') {
    return getAssistLabel(parseInt(count))
  } else if (props.NewsCardHeader === 'Бомбардиры') {
    return getGoalLabel(parseInt(count))
  }
  return 'голов'
}

// Функция для правильного склонения слова "передача"
const getAssistLabel = (count) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'передач'
  }

  if (lastDigit === 1) {
    return 'передача'
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'передачи'
  } else {
    return 'передач'
  }
}

// Функция для правильного склонения слова "гол"
const getGoalLabel = (count) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'голов'
  }

  if (lastDigit === 1) {
    return 'гол'
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'гола'
  } else {
    return 'голов'
  }
}
</script>

<style lang="sass" scoped>
.title
  font-size: 26px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 500px

.new-player-card
  border: 2px solid #21ba45
  background-color: #f0f9ff !important

.events-list
  display: flex
  flex-direction: column
  gap: 8px

.tournament-group
  display: flex
  flex-direction: column
  gap: 4px

.tournament-header
  font-size: 0.85rem
  font-weight: 600
  color: #1976d2
  background-color: #e3f2fd
  padding: 4px 8px
  border-radius: 4px
  margin-bottom: 2px
  border-left: 3px solid #1976d2

.event-item
  display: flex
  align-items: center
  gap: 12px
  padding: 6px
  border-radius: 4px
  transition: background-color 0.2s ease

.event-date
  min-width: 80px
  font-size: 0.75rem
  color: #666
  font-weight: 500

.event-match
  flex: 1
  font-size: 0.75rem
  color: #333
  line-height: 1.4

.event-icon
  display: flex
  align-items: center
  justify-content: center
  min-width: 16px

.new-event
  background-color: #e8f5e8
  border-left: 3px solid #21ba45
</style>
