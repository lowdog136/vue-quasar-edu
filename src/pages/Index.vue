<template>
  <q-page class="flex flex-center" v-if="$store.state.user">
    <img
      alt="Quasar logo"
      src="../assets/image/fcsever_logo.png"
      style="width: 500px; height: 500px"
    >
  </q-page>
  <button @click="$store.dispatch('logout')">Logout</button>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
})
</script>
