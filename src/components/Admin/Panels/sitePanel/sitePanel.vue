<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-option-group
        v-model="panel"
        inline
        :options=tabNameList
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
          <div class="text-h6">Правка дат в NewsDrawer и countdown</div>
          <NewsDrawerGNEDateUpdate />
          <NewsDrawerGNTDateUpdate />
          <CountDown2Events />
        </q-tab-panel>

        <q-tab-panel name="site">
          <div class="text-h6">Добавить новость об обновлении на сайте:</div>
          <NewsSiteContentAdd />
        </q-tab-panel>

        <q-tab-panel name="eventlist">
          <div class="text-h6">Редактировать календарь игр:</div>
          <games-now-event-edit />
        </q-tab-panel>

        <q-tab-panel name="changeMainPage">
          <div class="text-h6">Выбрать оформление:</div>
          <change-main-page-logo />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCardContentAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsCardContentAdd.vue'
import NewsDrawerGNTDateUpdate from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsDrawerGNTDateUpdate.vue'
import NewsDrawerGNEDateUpdate from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsDrawerGNEDateUpdate.vue'
import ArchiveGamesAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/ArchiveGamesAdd.vue'
import NewsSiteContentAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsSiteContentAdd.vue'
import GamesNowEventEdit from 'components/Admin/Panels/sitePanel/functionsSitePanel/gamesNowEventEdit.vue'
import ChangeMainPageLogo from 'components/Admin/Panels/sitePanel/functionsSitePanel/changeMainPageLogo.vue'
import CountDown2Events from 'components/Admin/Panels/sitePanel/functionsSitePanel/CountDown2Events.vue'
export default {
  name: 'adminPanel',
  components: {
    CountDown2Events,
    ChangeMainPageLogo,
    GamesNowEventEdit,
    NewsSiteContentAdd,
    ArchiveGamesAdd,
    NewsDrawerGNEDateUpdate,
    NewsDrawerGNTDateUpdate,
    NewsCardContentAdd
  },
  data () {
    return {
      tabNameInfo: 'todoInfo',
      tabNameInfoText: 'To Do Info:',
      tabNameTodoText: 'To Do List:',
      tabNameTodoAddText: 'To Do Add:',
      tabNameList: [
        {
          id: 1,
          label: 'Свернуть',
          value: 'reset'
        },
        {
          id: 2,
          label: 'Игры в архиве',
          value: 'game'
        },
        {
          id: 3,
          label: 'Новость на главную',
          value: 'team'
        },
        {
          id: 4,
          label: 'Правка дат',
          value: 'date'
        },
        {
          id: 5,
          label: 'Обновление сайта',
          value: 'site'
        },
        {
          id: 6,
          label: 'Правка календаря игр',
          value: 'eventlist'
        },
        {
          id: 7,
          label: 'Смена оформления главной страницы',
          value: 'changeMainPage'
        }
      ]
    }
  },
  setup () {
    return {
      panel: ref('reset'),
      techPanel: ref('reset')
    }
  }
}
</script>
