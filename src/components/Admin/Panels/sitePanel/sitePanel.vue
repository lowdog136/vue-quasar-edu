<template>
  <div class="q-pa-md">
    <div class="text-h6">
      {{ titlePanel }}
    </div>
    <div class="q-gutter-y-md">
      <q-option-group
        v-model="panel"
        inline
        :options=tabNameList
      />
      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
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
          <div class="text-h6">Редактор игр:добавление, правка, удаление</div>
          <games-now-event-edit />
        </q-tab-panel>

        <q-tab-panel name="calendarEdit">
          <div class="text-h6">Правка в календаре игр</div>
          <calendar-games-edit />
        </q-tab-panel>

        <q-tab-panel name="changeMainPage">
          <div class="text-h6">Выбрать оформление:</div>
          <change-main-page-logo />
        </q-tab-panel>

        <q-tab-panel name="tournamentTable">
          <div class="text-h6">Редактирование турнирной таблицы</div>
          <event-table-editor />
        </q-tab-panel>
      </q-tab-panels>
      <user-map-editor />
      <user-map-editor2 />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCardContentAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsCardContentAdd.vue'
import NewsDrawerGNTDateUpdate from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsDrawerGNTDateUpdate.vue'
import NewsDrawerGNEDateUpdate from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsDrawerGNEDateUpdate.vue'
import NewsSiteContentAdd from 'components/Admin/Panels/sitePanel/functionsSitePanel/NewsSiteContentAdd.vue'
import ChangeMainPageLogo from 'components/Admin/Panels/sitePanel/functionsSitePanel/changeMainPageLogo.vue'
import CountDown2Events from 'components/Admin/Panels/sitePanel/functionsSitePanel/CountDown2Events.vue'
import GamesNowEventEdit from 'components/Admin/Panels/sitePanel/functionsSitePanel/games-now-event-edit.vue'
import UserMapEditor from 'components/Admin/Panels/UserMapEditor.vue'
import UserMapEditor2 from 'components/Admin/Panels/UserMapEditor2.vue'
import CalendarGamesEdit from 'components/Admin/Panels/sitePanel/functionsSitePanel/calendar-games-edit.vue'
import EventTableEditor from 'components/Admin/Tables/EventTableEditor.vue'
export default {
  name: 'adminPanel',
  components: {
    UserMapEditor2,
    UserMapEditor,
    GamesNowEventEdit,
    CountDown2Events,
    ChangeMainPageLogo,
    NewsSiteContentAdd,
    NewsDrawerGNEDateUpdate,
    NewsDrawerGNTDateUpdate,
    NewsCardContentAdd,
    CalendarGamesEdit,
    EventTableEditor
  },
  data () {
    return {
      titlePanel: 'admin panel',
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
          label: 'Новость на главную',
          value: 'team'
        },
        {
          id: 3,
          label: 'Правка дат',
          value: 'date'
        },
        {
          id: 4,
          label: 'Обновление сайта',
          value: 'site'
        },
        {
          id: 5,
          label: 'Добавление (правка) игр',
          value: 'eventlist'
        },
        {
          id: 6,
          label: 'Правка в календаре игр',
          value: 'calendarEdit'
        },
        {
          id: 7,
          label: 'Смена оформления главной страницы',
          value: 'changeMainPage'
        },
        {
          id: 8,
          label: 'Редактирование турнирной таблицы',
          value: 'tournamentTable'
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
