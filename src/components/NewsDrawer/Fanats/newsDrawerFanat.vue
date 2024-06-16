<template>
  <q-item disable clickable v-ripple :active="active" :to=expansionFanatArray.to>
    <q-item-section avatar>
      <q-icon :name=expansionFanatArray.icon />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ expansionFanatArray.label }}</q-item-label>
      <q-item-label caption>{{ expansionFanatArray.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

import { ref } from 'vue'
export default {
  name: 'newsDrawerFanat',
  components: {},
  setup () {
    const expansionFanatArray = ref({
      icon: 'emoji_people',
      label: 'Фанаты',
      caption: 'Болельщики клуба',
      to: '/Fanats'
    })

    return {
      active: ref(false),
      expansionFanatArray
    }
  },
  props: {
    text: String
  }
}
</script>

<style scoped lang="sass">

</style>
