<template>
  <q-expansion-item
    v-model="expanded"
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
  </q-expansion-item>
</template>

<script>

import { ref } from 'vue'
import ExpansionItemGamesNowTable from 'components/NewsDrawer/Events/expansionItems/expansionItemGamesNowTable.vue'
import ExpansionItemGamesNowEvent from 'components/NewsDrawer/Events/expansionItems/expansionItemGamesNowEvent.vue'

export default {
  name: 'newsDrawerEvent',
  components: { ExpansionItemGamesNowEvent, ExpansionItemGamesNowTable },
  setup () {
    const expansionItemArray = ref({
      icon: 'emoji_events',
      label: 'Текущие соревнования',
      caption: 'Сезон окончен'
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

    return {
      expanded: ref(false),
      expansionItemArray,
      propsTablesArray,
      propsEventArray
    }
  }
}
</script>

<style scoped lang="sass">

</style>
