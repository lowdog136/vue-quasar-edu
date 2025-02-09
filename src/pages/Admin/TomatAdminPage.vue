<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>{{ labelHeader }}</q-item-label>
      <q-item >
        <q-item-section>
          <q-item-label>Привет, {{ $store.getters.userName }} {{ $store.getters.displayName }}</q-item-label>
          <q-item-label caption>
            {{ labelCaption }}
          </q-item-label>
          <q-item-label>
            <admin-edit-list />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AdminEditList from 'components/Admin/Panels/adminEditList.vue'
export default {
  components: { AdminEditList },
  data () {
    return {
      labelCaption: 'Нужно выбрать раздел для редактирования',
      labelHeader: 'Административная панель управления:'
    }
  },
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
