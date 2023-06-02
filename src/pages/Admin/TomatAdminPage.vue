<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>Административная панель управления:</q-item-label>
      <q-item >
        <q-item-section avatar>
          <q-icon color="primary" name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Привет, {{ $store.getters.userName }} </q-item-label>
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
      <q-item-label>Добавить информацию о игре в архив:</q-item-label>
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
  <q-separator />
<!--  Second block admin mode-->
  <q-item >
    <q-item-section avatar>
      <q-icon color="primary" name="edit" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Добавить новость о команде:</q-item-label>
      <q-item-label caption>
        Set the content filtering level to restrict
        apps that can be downloaded
      </q-item-label>
    </q-item-section>
    <q-item-section side >
      <q-toggle color="red" v-model="notifyClubNews" val="picture" />
    </q-item-section>
  </q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-if="notifyClubNews">
      <NewsCardContentAdd />
    </div>
  </div>
  <q-separator />
  <!--  Second block admin mode-->
  <q-item >
    <q-item-section avatar>
      <q-icon color="primary" name="edit" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Правка дат в NewsDrawer:</q-item-label>
      <q-item-label caption>
        Правка дат обновлений в "Календаре игр" и "Турнирная таблица"
      </q-item-label>
    </q-item-section>
    <q-item-section side >
      <q-toggle color="red" v-model="notifyUpdateDate" val="picture" />
    </q-item-section>
  </q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-if="notifyUpdateDate">
      <NewsDrawerDateUpdate />
    </div>
  </div>
  <q-separator />
  <!--  Threed block admin mode-->
  <q-item >
    <q-item-section avatar>
      <q-icon color="primary" name="edit" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Добавить новость о сайте:</q-item-label>
      <q-item-label caption>
        Обновления с версии на версию. Что нового.
      </q-item-label>
    </q-item-section>
    <q-item-section side >
      <q-toggle color="red" v-model="notifySiteNews" val="picture" />
    </q-item-section>
  </q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-if="notifySiteNews">
      <NewsSiteContentAdd />
    </div>
  </div>
</template>
<script>
import ArchiveGamesAdd from 'components/Admin/ArchiveGamesAdd'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import NewsCardContentAdd from 'components/Admin/NewsCardContentAdd'
import NewsSiteContentAdd from 'components/Admin/NewsSiteContentAdd'
import NewsDrawerDateUpdate from 'components/Admin/NewsDrawerDateUpdate'

export default {
  components: { NewsCardContentAdd, ArchiveGamesAdd, NewsSiteContentAdd, NewsDrawerDateUpdate },
  setup () {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return {
      notifyArchiveGames: ref(false),
      notifyClubNews: ref(false),
      notifySiteNews: ref(false),
      notifyUpdateDate: ref(false)
    }
  }
}
</script>
