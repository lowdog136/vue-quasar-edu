<template>
  <q-expansion-item
    v-model="expanded"
    :icon=expansionItemArray.icon
    :label=expansionItemArray.label
    :caption=expansionItemArray.caption
  >
    <expansion-item-foto
      :icon-name=propsFotoArray.iconName
      :q-item-to=propsFotoArray.to
      :q-item-label=propsFotoArray.label
      :q-item-label-caption=propsFotoArray.caption
    />
    <expansion-item-video
      :icon-name=propsVideoArray.iconName
      :q-item-to=propsVideoArray.to
      :q-item-label=propsVideoArray.label
      :q-item-label-caption=propsVideoArray.caption
      :disable=propsVideoArray.disable
    />
    <expansion-item-game-before
      :icon-name=propsGameBeforeArray.iconName
      :q-item-to=propsGameBeforeArray.to
      :q-item-label=propsGameBeforeArray.label
      :q-item-label-caption=propsGameBeforeArray.caption
    />
  </q-expansion-item>
</template>

<script>

import { ref } from 'vue'
import ExpansionItemFoto from 'components/NewsDrawer/Archives/expansionItems/expansionItemFoto.vue'
import ExpansionItemVideo from 'components/NewsDrawer/Archives/expansionItems/expansionItemVideo.vue'
import ExpansionItemGameBefore from 'components/NewsDrawer/Archives/expansionItems/expansionItemGameBefore.vue'

export default {
  name: 'newsDrawerArchive',
  components: { ExpansionItemGameBefore, ExpansionItemVideo, ExpansionItemFoto },
  setup () {
    const expansionItemArray = ref({
      icon: 'perm_identity',
      label: 'Архив',
      caption: 'Фото, видео, результаты матчей'
    })

    const propsFotoArray = ref({
      label: 'Фото',
      caption: 'Фотографии',
      iconName: 'camera_alt',
      to: '/Foto'
    })
    const propsVideoArray = ref({
      label: 'Видео',
      caption: 'Видеоматериалы',
      iconName: 'movie',
      to: '/Video',
      disable: true
    })
    const propsGameBeforeArray = ref({
      label: 'Старые записи',
      caption: 'Все результаты матчей',
      iconName: 'find_in_page',
      to: '/ArchiveGamesBefore'
    })

    return {
      expanded: ref(false),
      expansionItemArray,
      propsFotoArray,
      propsVideoArray,
      propsGameBeforeArray
    }
  }
}
</script>

<style scoped lang="sass">

</style>
