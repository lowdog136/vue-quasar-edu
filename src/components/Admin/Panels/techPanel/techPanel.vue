<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-option-group
          v-model="techPanel"
          inline
          :options=tabNameList
      />
      <q-tab-panels v-model="techPanel" animated class="shadow-2 rounded-borders">
        <q-tab-panel :name=tabNameInfo>
          <div class="text-h6">{{ tabNameInfoText }}</div>
          <admin-panel-to-do-info />
        </q-tab-panel>
        <q-tab-panel name="todo">
          <div class="text-h6">{{ tabNameTodoText }}</div>
          <admin-panel-to-do-list />
        </q-tab-panel>
        <q-tab-panel name="todoAdd">
          <div class="text-h6">{{ tabNameTodoAddText }}</div>
          <admin-panel-to-do-add />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AdminPanelToDoAdd from 'components/Admin/Panels/techPanel/ToDo/adminPanelToDoAdd.vue'
import AdminPanelToDoList from 'components/Admin/Panels/techPanel/ToDo/adminPanelToDoList.vue'
import AdminPanelToDoInfo from 'components/Admin/Panels/techPanel/ToDo/adminPanelToDoInfo.vue'
export default {
  name: 'techPanel',
  components: {
    AdminPanelToDoInfo,
    AdminPanelToDoList,
    AdminPanelToDoAdd
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
          label: 'todo info',
          value: 'todoInfo'
        },
        {
          id: 3,
          label: 'todo',
          value: 'todo'
        },
        {
          id: 4,
          label: 'todo add',
          value: 'todoAdd'
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
