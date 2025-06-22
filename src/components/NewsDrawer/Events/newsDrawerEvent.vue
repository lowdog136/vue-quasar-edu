<template>
  <q-expansion-item
    v-model=expanded
    :icon=expansionItemArray.icon
    :label=expansionItemArray.label
    :caption=expansionItemArray.caption
  >
    <expansion-item-games-now-event
      :icon-name=propsEventArray.iconName
      :q-item-to=propsEventArray.to
      :q-item-label=propsEventArray.label
      :q-item-label-caption=propsEventArray.caption
    />
    <expansion-item-games-now-table
      :icon-name=propsTablesArray.iconName
      :q-item-to=propsTablesArray.to
      :q-item-label=propsTablesArray.label
      :q-item-label-caption=propsTablesArray.caption
    />
    <expansion-item-stats
      :icon-name=propsGoalscorersArray.iconName
      :q-item-to=propsGoalscorersArray.to
      :q-item-label=propsGoalscorersArray.label
      :q-item-label-caption=propsGoalscorersArray.caption
    />
    <expansion-item-stats
      :icon-name=propsAssistantsArray.iconName
      :q-item-to=propsAssistantsArray.to
      :q-item-label=propsAssistantsArray.label
      :q-item-label-caption=propsAssistantsArray.caption
    />
  </q-expansion-item>
</template>

<script setup>
import { ref } from 'vue'
import ExpansionItemGamesNowTable from 'components/NewsDrawer/Events/expansionItems/expansionItemGamesNowTable.vue'
import ExpansionItemGamesNowEvent from 'components/NewsDrawer/Events/expansionItems/expansionItemGamesNowEvent.vue'
import ExpansionItemStats from 'components/NewsDrawer/Events/expansionItems/expansion-item-stats.vue'

const expansionItemArray = ref({
  icon: 'emoji_events',
  label: 'Текущие соревнования',
  caption: 'Чемпионат СЗФО, Кубок СЗФО'
})
const propsTablesArray = ref({
  label: 'Турнирная таблица',
  caption: 'Итоговая таблица',
  iconName: 'table_chart',
  to: '/GamesNow/GamesNowTable'
})
const propsEventArray = ref({
  label: 'Календарь игр',
  caption: 'Расписание матчей',
  iconName: 'calendar_month',
  to: '/GamesNow/GamesNowEvent'
})
const propsGoalscorersArray = ref({
  label: 'Бомбардиры',
  caption: 'Забитые мячи',
  iconName: 'face',
  to: '/authors-goals'
})
const propsAssistantsArray = ref({
  label: 'Ассистенты',
  caption: 'Голевые передачи',
  iconName: 'accessibility',
  to: '/authors-goals'
})

const expanded = ref(false)
</script>

<style scoped lang="sass">

</style>
