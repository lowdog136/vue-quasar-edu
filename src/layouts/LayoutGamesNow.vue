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
        <!--        <q-footer reveal elevated>
                  <q-toolbar class="glossy">
                    <q-toolbar-title>Footer</q-toolbar-title>
                  </q-toolbar>
                </q-footer>-->
        <q-toolbar-title>
          SeverFans
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      :width="320"
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
    <q-page-container style="padding-left: 0px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import NewsDrawer from 'components/NewsDrawer/NewsDrawer.vue'

export default defineComponent({
  name: 'MainLayout2',
  components: { NewsDrawer },
  setup () {
    const leftDrawerOpen = ref(false)
    const leftDrawerOpenResultGame = ref(false)

    return {
      leftDrawerOpen,
      leftDrawerOpenResultGame,
      dialog: ref(false),
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
