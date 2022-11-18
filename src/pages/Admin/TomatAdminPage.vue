<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list padding>
      <q-item-label header>Административная панель управления:</q-item-label>
      <TestTitleComp :greeting-message="notifProf"/>
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
      <q-toggle color="red" v-model="notifProf" val="picture" />
    </q-item-section>
  </q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-if="notifProf">
      <ArchiveGamesAdd/>
    </div>
  </div>
  <q-separator spaced />
  <AdminPageEditList greetingDone/>
</template>
<script>
import ArchiveGamesAdd from 'components/Admin/ArchiveGamesAdd'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AdminPageEditList from 'components/Admin/AdminPageEditList'
import TestTitleComp from 'components/TestComp/TestTitleComp'
export default {
  components: { TestTitleComp, AdminPageEditList, ArchiveGamesAdd },
  setup () {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return {
      notifProf: ref(false)
    }
  }
}
</script>
