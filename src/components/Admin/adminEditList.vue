<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-option-group
        v-model="panel"
        inline
        :options="[
          { label: 'Игры в архиве', value: 'game' },
          { label: 'Новость на главную', value: 'team' },
          { label: 'Правка дат', value: 'date' },
          { label: 'Обновление сайта', value: 'site' },
          { label: 'Правка календаря игр', value: 'eventlist' }
        ]"
      />

      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="game">
          <div class="text-h6">Добавить информацию о игре в архив:</div>
          <ArchiveGamesAdd />
        </q-tab-panel>

        <q-tab-panel name="team">
          <div class="text-h6">Добавить новость о команде:</div>
          <NewsCardContentAdd />
        </q-tab-panel>

        <q-tab-panel name="date">
          <div class="text-h6">Правка дат в NewsDrawer:</div>
          <NewsDrawerGNEDateUpdate />
          <NewsDrawerGNTDateUpdate />
        </q-tab-panel>

        <q-tab-panel name="site">
          <div class="text-h6">Добавить новость о сайте:</div>
          <NewsSiteContentAdd />
        </q-tab-panel>

        <q-tab-panel name="eventlist">
          <div class="text-h6">Редактировать календарь игр:</div>
          <games-now-event-edit />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCardContentAdd from 'components/Admin/NewsCardContentAdd.vue'
import NewsDrawerGNTDateUpdate from 'components/Admin/NewsDrawerGNTDateUpdate.vue'
import NewsDrawerGNEDateUpdate from 'components/Admin/NewsDrawerGNEDateUpdate.vue'
import ArchiveGamesAdd from 'components/Admin/ArchiveGamesAdd.vue'
import NewsSiteContentAdd from 'components/Admin/NewsSiteContentAdd.vue'
import GamesNowEventEdit from 'components/Admin/gamesNowEventEdit.vue'

export default {
  components: { GamesNowEventEdit, NewsSiteContentAdd, ArchiveGamesAdd, NewsDrawerGNEDateUpdate, NewsDrawerGNTDateUpdate, NewsCardContentAdd },
  setup () {
    return {
      panel: ref('mails')
    }
  }
}
</script>
