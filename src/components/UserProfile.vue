<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>User Controls</q-item-label>

      <q-item v-ripple>
        <q-item-section avatar>
        <q-icon color="primary" name="account_circle" />
      </q-item-section>
        <q-item-section>
          <q-item-label>Привет, {{ $store.getters.userName }}</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Редактирование профиля</q-item-label>

      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="edit" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Редактировать профиль:</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="red" v-model="notifProf" val="picture" />
        </q-item-section>
      </q-item>
      <q-item v-ripple v-if="notifProf">
        <q-item-section avatar>
          <q-icon color="primary" name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Отредактировать, {{ $store.getters.userName }}</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>
     <q-separator spaced />
      <q-item-label header>SeverFans</q-item-label>

      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="bookmarks" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Матчи, которые ты хочешь посетить:</q-item-label>
          <q-item-label caption>
            Показать список матчей которые вы отметили для посещения
          </q-item-label>
        </q-item-section>
          <q-item-section side >
          <q-toggle color="red" v-model="notifMatch" val="picture" />
        </q-item-section>
      </q-item>
      <q-item v-ripple v-if="notifMatch">
        <q-item-section avatar>
          <q-icon color="primary" name="bookmark" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Матчи, которые ты отметил:</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>
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
