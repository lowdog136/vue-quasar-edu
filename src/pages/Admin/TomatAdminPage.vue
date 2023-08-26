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
            Нужно выбрать раздел для редактирования
          </q-item-label>
          <q-item-label>
            <admin-edit-list />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <q-separator spaced />
<!--  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>Административная панель управления v2:</q-item-label>
      <q-item >
        <q-item-section avatar>
          <q-icon color="primary"/>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            Нужно выбрать раздел для редактирования
          </q-item-label>
          <q-item-label>
            <admin-edit-list />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>-->
<!--&lt;!&ndash;  First block admin mode&ndash;&gt;-->
<!--  <q-item >-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit" />-->
<!--    </q-item-section>-->
<!--    <q-item-section>-->
<!--      <q-item-label>Добавить информацию о игре в архив:</q-item-label>-->
<!--      <q-item-label caption>-->
<!--        Set the content filtering level to restrict-->
<!--        apps that can be downloaded-->
<!--      </q-item-label>-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyArchiveGames" val="picture" />-->
<!--    </q-item-section>-->
<!--  </q-item>-->
<!--  <div class="q-pa-md row items-start q-gutter-md">-->
<!--    <div v-if="notifyArchiveGames">-->
<!--      <ArchiveGamesAdd/>-->
<!--    </div>-->
<!--  </div>-->
<!--  <q-separator />-->
<!--&lt;!&ndash;  Second block admin mode&ndash;&gt;-->
<!--  <q-item >-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit" />-->
<!--    </q-item-section>-->
<!--    <q-item-section>-->
<!--      <q-item-label>Добавить новость о команде:</q-item-label>-->
<!--      <q-item-label caption>-->
<!--        Set the content filtering level to restrict-->
<!--        apps that can be downloaded-->
<!--      </q-item-label>-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyClubNews" val="picture" />-->
<!--    </q-item-section>-->
<!--  </q-item>-->
<!--  <div class="q-pa-md row items-start q-gutter-md">-->
<!--    <div v-if="notifyClubNews">-->
<!--      <NewsCardContentAdd />-->
<!--    </div>-->
<!--  </div>-->
<!--  <q-separator />-->
<!--  &lt;!&ndash;  Second block admin mode&ndash;&gt;-->
<!--  <q-item >-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit" />-->
<!--    </q-item-section>-->
<!--    <q-item-section>-->
<!--      <q-item-label>Правка дат в NewsDrawer:</q-item-label>-->
<!--      <q-item-label caption>-->
<!--        Правка раздела "Текущие соревнования".Даты обновлений в "Календаре игр" и "Турнирная таблица"-->
<!--      </q-item-label>-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyUpdateDate" val="picture" />-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyUpdateDate" val="picture" />-->
<!--    </q-item-section>-->
<!--  </q-item>-->
<!--  <div class="q-pa-md row items-start q-gutter-md">-->
<!--    <div v-if="notifyUpdateDate">-->
<!--      <NewsDrawerGNEDateUpdate />-->
<!--      <NewsDrawerGNTDateUpdate />-->
<!--    </div>-->
<!--  </div>-->
<!--  <q-separator />-->
<!--  &lt;!&ndash;  Threed block admin mode&ndash;&gt;-->
<!--  <q-item >-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit" />-->
<!--    </q-item-section>-->
<!--    <q-item-section>-->
<!--      <q-item-label>Добавить новость о сайте:</q-item-label>-->
<!--      <q-item-label caption>-->
<!--        Обновления с версии на версию. Что нового.-->
<!--      </q-item-label>-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifySiteNews" val="picture" />-->
<!--    </q-item-section>-->
<!--  </q-item>-->
<!--  <div class="q-pa-md row items-start q-gutter-md">-->
<!--    <div v-if="notifySiteNews">-->
<!--      <NewsSiteContentAdd />-->
<!--    </div>-->
<!--  </div>-->
<!--  &lt;!&ndash;  5 block admin mode&ndash;&gt;-->
<!--  <q-item >-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit" />-->
<!--    </q-item-section>-->
<!--    <q-item-section>-->
<!--      <q-item-label>Редактировать календарь игр:</q-item-label>-->
<!--      <q-item-label caption>-->
<!--        Обновления с версии на версию. Что нового.-->
<!--      </q-item-label>-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyEventEdit" val="picture" />-->
<!--    </q-item-section>-->
<!--  </q-item>-->
<!--  <div class="q-pa-md row items-start q-gutter-md">-->
<!--    <div v-if="notifyEventEdit">-->
<!--      <games-now-event-edit />-->
<!--    </div>-->
<!--  </div>-->
<!--  <q-separator />-->
<!--  &lt;!&ndash;  6 block admin mode&ndash;&gt;-->
<!--  <q-item >-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit" />-->
<!--    </q-item-section>-->
<!--    <q-item-section>-->
<!--      <q-item-label>Редактировать календарь игр2:</q-item-label>-->
<!--      <q-item-label caption>-->
<!--        Edit now date.-->
<!--      </q-item-label>-->
<!--      <q-item-label caption>-->
<!--        <event-month-list />-->
<!--      </q-item-label>-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyEventEdit2" val="picture" />-->
<!--    </q-item-section>-->
<!--    <q-item-section side >-->
<!--      <q-toggle color="red" v-model="notifyEventEdit21" val="picture" />-->
<!--    </q-item-section>-->
<!--    <q-item-section avatar>-->
<!--      <q-icon color="primary" name="edit"  @click="notifyEventEdit21 = true"/>-->
<!--    </q-item-section>-->
<!--  </q-item>-->
<!--  <div class="q-pa-md row items-start q-gutter-md">-->
<!--    <div v-if="notifyEventEdit2">-->
<!--      <games-now-event-edit />-->
<!--    </div>-->
<!--    <div v-if="notifyEventEdit21">-->
<!--      <games-now-event-edit />-->
<!--    </div>-->
<!--  </div>-->
</template>
<script>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AdminEditList from 'components/Admin/adminEditList.vue'

export default {
  components: { AdminEditList },
  setup () {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return {
      notifyArchiveGames: ref(false),
      notifyClubNews: ref(false),
      notifySiteNews: ref(false),
      notifyUpdateDate: ref(false),
      notifyEventEdit: ref(false),
      notifyEventEdit2: ref(false),
      notifyEventEdit21: ref(false)
    }
  }
}
</script>
