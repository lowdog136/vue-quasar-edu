<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn push color="teal" label="Change image" @click="refresh" />
    <q-img
      :src="url"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
    />
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-btn push color="teal" label="Change value" @click="refreshV" />
    <p>
      {{ myValue }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const url = ref('https://severfans.ru/img/4.9a3d5f2d.jpg')
    const myValue = ref('Ololosh')

    return {
      url,
      myValue,
      refresh () {
        url.value = 'https://severfans.ru/img/2.7df60b0c.jpg'
      },
      refreshV () {
        myValue.value = '121212'
      }
    }
  }
}
</script>
