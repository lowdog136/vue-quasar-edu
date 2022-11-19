<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>Административная панель управления:</q-item-label>
      <q-item >
        <q-item-section avatar>
          <q-icon color="primary" name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Привет, admin </q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <q-separator spaced />
<!--  First block admin mode-->
  <q-item >
    <q-item-section avatar>
      <q-icon color="primary" name="edit" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Редактировать архив игр:</q-item-label>
      <q-item-label caption>
        Set the content filtering level to restrict
        apps that can be downloaded
      </q-item-label>
    </q-item-section>
    <q-item-section side >
      <q-toggle color="red" v-model="notifyArchiveGames" val="picture" />
    </q-item-section>
  </q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-if="notifyArchiveGames">
      <ArchiveGamesAdd/>
    </div>
  </div>
  <q-separator spaced />
<!--  Second block admin mode-->
  <q-item >
    <q-item-section avatar>
      <q-icon color="primary" name="edit" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Редактировать новости сайта:</q-item-label>
      <q-item-label caption>
        Set the content filtering level to restrict
        apps that can be downloaded
      </q-item-label>
    </q-item-section>
    <q-item-section side >
      <q-toggle color="red" v-model="notifySiteNews" val="picture" />
    </q-item-section>
  </q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-if="notifySiteNews">
      <NewsCardContentAdd />
    </div>
  </div>
</template>
<script>
import ArchiveGamesAdd from 'components/Admin/ArchiveGamesAdd'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import NewsCardContentAdd from 'components/Admin/NewsCardContentAdd'

export default {
  components: { NewsCardContentAdd, ArchiveGamesAdd },
  setup () {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return {
      notifyArchiveGames: ref(false),
      notifySiteNews: ref(false)
    }
  }
}
</script>
