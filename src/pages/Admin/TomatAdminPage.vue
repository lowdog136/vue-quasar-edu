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
