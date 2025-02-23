<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="todo in adminPanelToDos"
       :key="todo.id"
  >
    <q-card dark bordered class="bg-grey-9 my-card"
    >
      <q-card-section horizontal :class=todo.colorField>
        <q-card-section>
          {{ todo.stringField }}
        </q-card-section>

        <q-separator vertical />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ todo.title }}</div>
        <div class="text-subtitle2">{{ todo.category }}</div>
        <div class="text-subtitle2">{{ todo.done }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'

const adminPanelToDosCollectionRef = collection(db, '/trest')
const adminPanelToDosCollectionQuery = query(adminPanelToDosCollectionRef, orderBy('date', 'desc'))
export default {
  name: 'test',
  components: { },
  data () {
    return {
      inputHintVer: 'add ver',
      inputHintTitle: 'add title',
      inputHintBody: 'add Body',
      inputHintDate: 'add date',
      inputTypeDate: 'date',
      btnIcon: 'done',
      btnName: 'done',
      selectName: ['icon', 'color'],
      selectColor: String,
      selectLabel: ['icon', 'color']
    }
  },
  setup: function () {
    const adminPanelToDos = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(adminPanelToDosCollectionQuery, (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const panelToDo = {
            id: doc.id,
            arrayField: doc.data().arrayField,
            colorField: doc.data().colorField,
            stringField: doc.data().stringField,
            dateField: doc.data().dateField
          }
          fbSiteUpdates.push(panelToDo)
        })
        adminPanelToDos.value = fbSiteUpdates
      })
    })
    return {
      // done: ref(true),
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
