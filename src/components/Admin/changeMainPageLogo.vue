<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn push color="teal" label="Change image" @click="refresh" />

    <q-img
      :src="url[1]"
      spinner-color="white"
      style="height: 340px; max-width: 350px"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const url = ref(['https://severfans.ru/img/fcsever_logo_ny.f62d4c97.png', 'https://severfans.ru/img/3.2947b614.jpg', 'https://severfans.ru/img/1.59226f80.jpg'])
    console.log('url:', url.value)
    return {
      url,
      refresh () {
        url.value = 'https://severfans.ru/img/1.59226f80.jpg'
      }
    }
  }
}
</script>
