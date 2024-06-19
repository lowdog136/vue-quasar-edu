<template>
  <q-expansion-item
    v-model="expanded"
    :icon=expansionItemArray.icon
    :label=expansionItemArray.label
    :caption=expansionItemArray.caption
  >
    <expansion-item-news
      :icon-name=propsNewsArray.iconName
      :q-item-to=propsNewsArray.to
      :q-item-label=propsNewsArray.label
      :q-item-label-caption=propsNewsArray.caption
    />
    <expansion-item-history
      :icon-name=propsHistoryArray.iconName
      :q-item-to=propsHistoryArray.to
      :q-item-label=propsHistoryArray.label
      :q-item-label-caption=propsHistoryArray.caption
    />
  </q-expansion-item>
</template>

<script>

import { ref } from 'vue'
import ExpansionItemNews from 'components/NewsDrawer/Site/expansionItems/expansionItemNews.vue'
import ExpansionItemHistory from 'components/NewsDrawer/Site/expansionItems/expansionItemHistory.vue'

export default {
  name: 'newsDrawerSite',
  components: { ExpansionItemHistory, ExpansionItemNews },
  setup () {
    const expansionItemArray = ref({
      icon: 'info',
      label: 'О сайте',
      caption: 'Новости сайта, история развития'
    })
    const propsNewsArray = ref({
      label: 'Новости',
      caption: 'История обновления',
      iconName: 'update',
      to: '/NewsSite'
    })
    const propsHistoryArray = ref({
      label: 'История',
      caption: 'История ресурса',
      iconName: 'timeline',
      to: '/AboutSite'
    })

    return {
      expanded: ref(false),
      propsNewsArray,
      expansionItemArray,
      propsHistoryArray
    }
  },
  props: {
    text: String
  }
}
</script>

<style scoped lang="sass">

</style>
