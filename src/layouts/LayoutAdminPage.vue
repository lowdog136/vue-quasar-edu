<template>
  <q-layout view="lHh Lpr lFf" >
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
<!--        <q-footer reveal elevated>
          <q-toolbar class="glossy">
            <q-toolbar-title>Footer</q-toolbar-title>
          </q-toolbar>
        </q-footer>-->
        <q-toolbar-title>
          SeverFans
        </q-toolbar-title>
        <div v-show="$store.state.user">
          <q-btn color="" flat dense label="" icon="settings">
            <q-menu transition-show="rotate" transition-hide="rotate">
              <div class="row wrap q-pa-md">
                <div class="column">
                  <SettingsListAdmin />
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ $store.state.user.email }} </div>
                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ $store.state.user.uid }} </div>

                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn flat dense round icon="logout" @click="dialog = true" />
          <q-dialog v-model="dialog">
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
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import SettingsListAdmin from 'components/Profile/SettingsListAdmin'

export default defineComponent({
  name: 'LayoutAdminPage',
  components: { SettingsListAdmin },
  setup () {
    const leftDrawerOpen = ref(false)
    const leftDrawerOpenResultGame = ref(false)
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return {
      panelView: ref(true),
      leftDrawerOpenResultGame,
      mobileData: ref(true),
      bluetooth: ref(false),
      fab2: ref(false),
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
