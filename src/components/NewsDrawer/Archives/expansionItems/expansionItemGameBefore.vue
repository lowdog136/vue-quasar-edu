<template>
  <q-item clickable v-ripple :active="active" :to=qItemTo>
    <q-item-section avatar>
      <q-icon :name=iconName />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ qItemLabel }}</q-item-label>
      <q-item-label caption>{{ qItemLabelCaption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'expansionItemGameBefore',
  setup () {
    const active = ref(false)
    return {
      active
    }
  },
  props: {
    iconName: String,
    qItemLabel: String,
    qItemLabelCaption: String,
    qItemTo: String
  }
}
</script>
<style scoped lang="sass">
</style>
