<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card dark bordered class="bg-grey-9 my-card"
            v-for="todo in adminPanelToDos"
            :key="todo.id"
    >
      <q-card-section horizontal :class=todo.color>
        <q-card-section>
          {{ todo.category }}
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          {{ todo.icon }}
        </q-card-section>
        <q-separator vertical />

        <q-card-section class="col-4">
          {{ todo.icon }}
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ todo.title }}</div>
        <div class="text-subtitle2">{{ todo.category }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ todo.body }}
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'

const siteUpdateCollectionRef = collection(db, '/adminPanelToDo')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
export default {
  name: 'adminPanelToDoAdd',
  components: { },
  data () {
    return {
      inputHintVer: 'add ver',
      inputHintTitle: 'add title',
      inputHintBody: 'add Body',
      inputHintDate: 'add date',
      inputTypeDate: 'date',
      btnIcon: 'post_add',
      btnName: 'add update',
      selectName: ['icon', 'color'],
      selectColor: String,
      selectLabel: ['icon', 'color']
    }
  },
  setup () {
    const adminPanelToDos = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const panelToDo = {
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            color: doc.data().color,
            category: doc.data().category,
            icon: doc.data().icon,
            date: doc.data().date,
            done: doc.data().done
          }
          fbSiteUpdates.push(panelToDo)
        })
        adminPanelToDos.value = fbSiteUpdates
      })
    })
    // Edit SiteUpdate Block
    return {
      done: ref(true),
      adminPanelToDos
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
    ])
  },

  props: {}
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
