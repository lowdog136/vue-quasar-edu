<template>
  <div class="q-pa-md row items-start q-gutter-md">
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore'
import { db } from 'src/firebase'

const siteUpdateCollectionRef = collection(db, '/adminPanelToDo')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
export default {
  name: 'adminPanelToDoAdd',
  components: {},
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
