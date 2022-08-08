<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="account_circle" />
        </q-item-section>
        <q-item-section>
          <h6> Привет, {{ $store.getters.userName }} </h6>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>meta</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
      <q-separator spaced inset />
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="edit" />
        </q-item-section>
        <q-item-section>
          <h6> Редактировать профиль:</h6>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="red" v-model="notifProf" val="picture" />
        </q-item-section>
      </q-item>
      <q-list v-if="notifProf">
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="account_circle" />
          </q-item-section>
          <q-item-section><h6> Отредактировать, {{ $store.getters.userName }} </h6></q-item-section>
          <q-item-section side>
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator spaced inset />
      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="bookmarks" />
        </q-item-section>
        <q-item-section><h6> Матчи, которые ты хочешь посетить:</h6></q-item-section>
        <q-item-section side >
          <q-toggle color="red" v-model="notifMatch" val="picture" />
        </q-item-section>
      </q-item>
      <q-list v-if="notifMatch">
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="bookmark" />
          </q-item-section>
          <q-item-section><h6> Матч, который ты хочешь посетить:</h6></q-item-section>
        </q-item>
      </q-list>
    </q-list>
  </div>
</template>

<script>

import { defineComponent, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'LayoutUserPage',
  components: {},
  setup () {
    const leftDrawerOpen = ref(false)
    const leftDrawerOpenResultGame = ref(false)
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return {
      panelView: ref(true),
      notifProf: ref(false),
      notifMatch: ref(false),
      leftDrawerOpenResultGame,
      mobileData: ref(true),
      bluetooth: ref(false),
      fab2: ref(false),
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

<style scoped>

</style>
