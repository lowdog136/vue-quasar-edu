<template>
  <q-expansion-item
    v-model="expanded"
    :icon=expansionItemArray.icon
    :label=expansionItemArray.label
    :caption=expansionItemArray.caption
  >
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

<style scoped lang="sass">

</style>
<script setup>
import { ref } from 'vue'
import ExpansionItemStats from 'components/NewsDrawer/Stats/expansionItems/expansion-item-stats.vue'

const expansionItemArray = ref({
  icon: 'insert_chart',
  label: 'Статистика',
  caption: 'Лидеры по голам и передачам в 2025'
})
const propsGoalscorersArray = ref({
  label: 'Бомбардиры',
  caption: 'Забитые мячи',
  iconName: 'face',
  to: '/stats-goalscorers'
})
const propsAssistantsArray = ref({
  label: 'Ассистенты',
  caption: 'Голевые передачи',
  iconName: 'accessibility',
  to: '/stats-assistants'
})
</script>
