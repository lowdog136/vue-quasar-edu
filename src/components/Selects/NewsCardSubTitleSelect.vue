<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-select clearable filled color="purple-12" v-model="model" :options="options" label="Label" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NewsCardSubTitleSelect',
  setup: function () {
    return {
      model: ref('Новости клуба'),

      options: [
        'Новости клуба', 'Результат матча', 'Анонс матча'
      ]
    }
  }
}
</script>

<style scoped>

</style>
