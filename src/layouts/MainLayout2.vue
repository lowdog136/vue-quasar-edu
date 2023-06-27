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
        <!--         <q-btn
                  flat
                  dense
                  round
                  icon="scoreboard"
                  aria-label="Menu"
             @click="toggleLeftDrawer"
                />
        <q-footer reveal elevated>
                  <q-toolbar class="glossy">
                    <q-toolbar-title>Footer</q-toolbar-title>
                  </q-toolbar>
                </q-footer>-->
        <q-toolbar-title>
          SeverFans
        </q-toolbar-title>
        <div>
            <q-btn flat dense round icon="login" @click="dialog = true" />
            <q-dialog v-model="dialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6"><AuthPanel /></div>
                </q-card-section>
                <q-card-section class="row items-center q-gutter-sm">
                  <q-btn v-close-popup label="Закрыть" color="primary" />
                </q-card-section>
              </q-card>
            </q-dialog>
          <q-btn flat dense round icon="logout" @click="dialogLogOut = true" />
          <q-dialog v-model="dialogLogOut">
            <q-card>
              <q-card-section>
                <div class="text-h6">До свидания, {{ $store.getters.userName }} </div>
              </q-card-section>
              <q-card-section class="row items-center q-gutter-sm">
                <q-btn v-close-popup label="Выйти ?" to="/" @click="$store.dispatch('logout')" color="primary" />
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
          <NewsDrawerResultGame />
      </q-list>
    </q-drawer>
    <q-page-container>
      <MainNotify />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import NewsDrawer from 'components/NewsDrawer'
import NewsDrawerResultGame from 'components/NewsDrawerResultGame'
import AuthPanel from 'components/Auth/AuthPanel'
import MainNotify from 'components/Admin/MainNotify.vue'

export default defineComponent({
  name: 'MainLayout2',
  components: { MainNotify, AuthPanel, NewsDrawerResultGame, NewsDrawer },
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
