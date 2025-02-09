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
            <q-btn flat dense round icon="login" @click="dialog = true" />
            <q-dialog v-model="dialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6"><GoogleSignIn /></div>
                </q-card-section>
                <q-card-section class="row items-center q-gutter-sm">
                  <q-btn v-close-popup label="Закрыть" color="primary" />
                </q-card-section>
              </q-card>
            </q-dialog>
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
import { useStore } from 'vuex'
import NewsDrawer from 'components/NewsDrawer/NewsDrawer.vue'
import MainToolbarTitle from 'components/MainPage/mainToolbarTitle.vue'
import GoogleSignIn from 'components/Auth/GoogleSignIn.vue'

export default defineComponent({
  name: 'MainLayout2',
  components: { GoogleSignIn, MainToolbarTitle, NewsDrawer },
  setup () {
    const leftDrawerOpen = ref(false)
    const leftDrawerOpenResultGame = ref(false)
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })

    return {
      leftDrawerOpen,
      leftDrawerOpenResultGame,
      dialog: ref(false),
      dialogLogOut: ref(false),
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
