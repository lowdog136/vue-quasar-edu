<template>
  <div class="q-pa-md row items-start q-gutter-md"
       v-for="todo in adminPanelToDos"
       :key="todo.id"
  >
    <q-card dark bordered class="bg-grey-9 my-card"
    v-if="todo.done"
    >
      <q-card-section horizontal :class=todo.color>
        <q-card-section>
          {{ todo.category }}
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          {{ todo.priority }}
        </q-card-section>
        <q-separator vertical />

        <q-card-section class="col-4">
          <btn-add
            @click=todoDone(todo.id)
            :btn-name=btnName
            :btn-icon=btnIcon
          />
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ todo.title }}</div>
        <div class="text-subtitle2">{{ todo.category }}</div>
        <div class="text-subtitle2">{{ todo.done }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section
      v-for="body in todo.body"
      :key="body.id"
      >
        {{ body }}
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore'
import { db } from 'src/firebase'
import BtnAdd from 'components/Admin/UI/btnAdd.vue'

const siteUpdateCollectionRef = collection(db, '/adminPanelToDo')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
export default {
  name: 'adminPanelToDoAdd',
  components: { BtnAdd },
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
            priority: doc.data().priority,
            done: doc.data().done
          }
          fbSiteUpdates.push(panelToDo)
        })
        adminPanelToDos.value = fbSiteUpdates
      })
    })
    const todoDone = id => {
      const index = adminPanelToDos.value.findIndex(panelToDo => panelToDo.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        done: !adminPanelToDos.value[index].done
      })
      console.log('--', adminPanelToDos.value[index])
    }
    return {
      // done: ref(true),
      todoDone,
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
