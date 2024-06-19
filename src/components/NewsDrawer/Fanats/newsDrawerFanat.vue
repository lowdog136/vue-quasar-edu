<template>
  <q-item disable clickable v-ripple :active="active" :to=expansionItemArray.to>
    <q-item-section avatar>
      <q-icon :name=expansionItemArray.icon />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ expansionItemArray.label }}</q-item-label>
      <q-item-label caption>{{ expansionItemArray.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

import { ref } from 'vue'
export default {
  name: 'newsDrawerFanat',
  components: {},
  setup () {
    const expansionItemArray = ref({
      icon: 'emoji_people',
      label: 'Фанаты',
      caption: 'Болельщики клуба',
      to: '/Fanats'
    })

    return {
      active: ref(false),
      expansionItemArray
    }
  }
}
</script>

<style scoped lang="sass">

</style>
