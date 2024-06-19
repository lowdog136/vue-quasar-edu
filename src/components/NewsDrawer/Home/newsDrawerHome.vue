<template>
  <q-item clickable v-ripple :active="active" :to=expansionHomeArray.to>
    <q-item-section avatar>
      <q-icon :name=expansionHomeArray.icon />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ expansionHomeArray.label }}</q-item-label>
      <q-item-label caption>{{ expansionHomeArray.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

import { ref } from 'vue'
export default {
  name: 'newsDrawerHome',
  components: {},
  setup () {
    const expansionHomeArray = ref({
      icon: 'home',
      label: 'Главная',
      caption: 'Основная страница',
      to: '/'
    })

    return {
      active: ref(false),
      expansionHomeArray
    }
  },
  props: {
    text: String
  }
}
</script>

<style scoped lang="sass">

</style>
