<template>
  <q-expansion-item
    v-model="expanded"
    :icon=expansionItemArray.icon
    :label=expansionItemArray.label
    :caption=expansionItemArray.caption
  >
    <expansion-item-news-club
      :icon-name=propsNewsArray.iconName
      :q-item-to=propsNewsArray.to
      :q-item-label=propsNewsArray.label
      :q-item-label-caption=propsNewsArray.caption
    />
    <expansion-item-history-club
      :icon-name=propsHistoryArray.iconName
      :q-item-to=propsHistoryArray.to
      :q-item-label=propsHistoryArray.label
      :q-item-label-caption=propsHistoryArray.caption
    />
    <expansion-item-achievement
      :icon-name=propsAchievementArray.iconName
      :q-item-to=propsAchievementArray.to
      :q-item-label=propsAchievementArray.label
      :q-item-label-caption=propsAchievementArray.caption
    />
    <expansion-item-stadium
      :icon-name=propsStadiumArray.iconName
      :q-item-to=propsStadiumArray.to
      :q-item-label=propsStadiumArray.label
      :q-item-label-caption=propsStadiumArray.caption
    />
  </q-expansion-item>
</template>

<script>

import { ref } from 'vue'
import ExpansionItemHistoryClub from 'components/NewsDrawer/Club/expansionItems/expansionItemHistoryClub.vue'
import ExpansionItemAchievement from 'components/NewsDrawer/Club/expansionItems/expansionItemAchievement.vue'
import ExpansionItemStadium from 'components/NewsDrawer/Club/expansionItems/expansionItemStadium.vue'
import ExpansionItemNewsClub from 'components/NewsDrawer/Club/expansionItems/expansionItemNewsClub.vue'

export default {
  name: 'newsDrawerClub',
  components: { ExpansionItemNewsClub, ExpansionItemStadium, ExpansionItemAchievement, ExpansionItemHistoryClub },
  setup () {
    const expansionItemArray = ref({
      icon: 'sports_soccer',
      label: 'ФК Север',
      caption: 'О клубе, новости, стадион'
    })
    const propsNewsArray = ref({
      label: 'Новости клуба',
      caption: 'Последние известия',
      iconName: 'newspaper',
      to: '/NewsClub'
    })
    const propsHistoryArray = ref({
      label: 'Клуб',
      caption: 'История ФК Север',
      iconName: 'people_alt',
      to: '/HistoryClub'
    })
    const propsAchievementArray = ref({
      label: 'Достижения',
      caption: 'Награды, медали',
      iconName: 'celebration',
      to: '/Achievement'
    })
    const propsStadiumArray = ref({
      label: 'Стадион',
      caption: 'Центральный стадион профсоюзов',
      iconName: 'stadium',
      to: '/Stadium'
    })

    return {
      expanded: ref(false),
      propsNewsArray,
      expansionItemArray,
      propsHistoryArray,
      propsAchievementArray,
      propsStadiumArray
    }
  }
}
</script>

<style scoped lang="sass">

</style>
