<template>
  <q-item clickable v-ripple :active="active" :to=expansionContactArray.to>
    <q-item-section avatar>
      <q-icon :name=expansionContactArray.icon />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ expansionContactArray.label }}</q-item-label>
      <q-item-label caption>{{ expansionContactArray.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

import { ref } from 'vue'
export default {
  name: 'newsDrawerContact',
  components: {},
  setup () {
    const expansionContactArray = ref({
      icon: 'email',
      label: 'Контакты',
      caption: 'Связаться',
      to: '/Contact'
    })

    return {
      active: ref(false),
      expansionContactArray
    }
  },
  props: {
    text: String
  }
}
</script>

<style scoped lang="sass">

</style>
