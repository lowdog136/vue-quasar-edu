<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="glossy">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <main-toolbar-title />
        </q-toolbar-title>
        <div>
          <user-profile-menu />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      width="320"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Навигация
        </q-item-label>
          <NewsDrawer />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref, onBeforeMount } from 'vue'
import { useAuthStore } from '../stores/auth'
import NewsDrawer from 'components/NewsDrawer/NewsDrawer.vue'
import MainToolbarTitle from 'components/MainPage/mainToolbarTitle.vue'
import UserProfileMenu from 'components/UserProfileMenu.vue'

export default defineComponent({
  name: 'MainLayout2',
  components: { UserProfileMenu, MainToolbarTitle, NewsDrawer },
  setup () {
    const leftDrawerOpen = ref(false)
    const leftDrawerOpenResultGame = ref(false)
    const authStore = useAuthStore()

    onBeforeMount(() => {
      // Инициализируем auth store вместо старого Vuex store
      authStore.initAuth()
    })

    return {
      leftDrawerOpen,
      leftDrawerOpenResultGame,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleLeftDrawerResultGame () {
        leftDrawerOpenResultGame.value = !leftDrawerOpenResultGame.value
      }
    }
  }
})
</script>
<style lang="sass" scoped>
.glossy1
  width: 100%
  max-width: 150px
</style>
