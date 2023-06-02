<template>
<!--  input block-->
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card dark bordered class="bg-grey-9 my-card">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newSiteUpdateVer'
            hint="add Ver"
            lazy-rules
          />
        </div><br/>
      </q-form>
      <q-separator dark inset />
      <q-card-section>
        <q-btn @click="addSiteUpdate" label="add event"/>
        <q-toggle
          :false-value="false"
          :label="`Показываем ${redModel}`"
          :true-value="true"
          color="red"
          v-model="redModel"
        />
      </q-card-section>
    </q-card>
  </div>
  <!--  edit mode block-->
  <div class="q-pa-md row items-start q-gutter-md" v-if="redModel">

    <q-card
      class="bg-grey-9 my-card"
      v-for="SiteUpdate in SiteUpdates"
      :key="SiteUpdate.id"
      dark bordered >
      <q-card-section>
        <div class="text-h6">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label caption>id:{{ SiteUpdate.id }}</q-item-label>
                <q-item-label>{{ SiteUpdate.ver }}
                  <q-popup-edit v-model="SiteUpdate.ver" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @submit="updateVer(SiteUpdate.ver)" @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateVer(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>datenews: {{ SiteUpdate.datenews }}
                  <q-popup-edit v-model="SiteUpdate.datenews" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateVer(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-tabs
        v-model="tab"
        class="bg-teal text-yellow shadow-2"
      >
        <q-tab  name="mails" icon="arrow_upward" />
        <q-tab  name="alarms" icon="done" />
        <q-tab @click="deleteSiteUpdate(SiteUpdate.id)" name="movies" icon="delete" />
      </q-tabs>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

// const siteUpdateCollectionRef = collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/')
// const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
const newSiteUpdateVer = ref('')

const addSiteUpdate = () => {
  addDoc(collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/'), orderBy('date', 'desc'), {
    datenews: newSiteUpdateVer.value
  })
  newSiteUpdateVer.value = ''
  console.log('add SiteUpdate', newSiteUpdateVer.value)
}

const deleteSiteUpdate = id => {
  deleteDoc(doc(collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/'), id))
  console.log('del SiteUpdate', newSiteUpdateVer.value)
}

export default {
  name: 'NewsDrawerDateUpdate',
  components: {},
  data () {
    return {
    }
  },
  setup () {
    const SiteUpdates = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/'), (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const SiteUpdate = {
            id: doc.id,
            datenews: doc.data().datenews
          }
          fbSiteUpdates.push(SiteUpdate)
        })
        SiteUpdates.value = fbSiteUpdates
      })
    })
    // Edit SiteUpdate Block
    const updateVer = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/'), id), {
        datenews: SiteUpdates.value[index].datenews
      })
      console.log('ver update', SiteUpdates.value, 'ver id', SiteUpdates.value)
    }
    const updateTitle = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(collection(db, '/siteNewsDrawer/GamesNowEvent/dateUpdate/'), id), {
        title: SiteUpdates.value[index].title
      })
      console.log('title update', SiteUpdates.value[index].title, 'SiteUpdate id', SiteUpdates.value[index].id)
    }
    return {
      newSiteUpdateVer,
      done: ref(true),
      redModel: ref(false),
      deleteSiteUpdate,
      deleteDoc,
      addSiteUpdate,
      SiteUpdates,
      updateVer,
      updateTitle,
      tab: ref(['alarms', 'mails']),
      expanded: ref(false)
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
  max-width: 450px
  .root
    width: 400px
    margin: 0 auto
    background-color: #fff
    padding: 30px
    margin-top: 100px
    border-radius: 20px
  input
    border: none
    outline: none
    border-bottom: 1px solid #ddd
    font-size: 1em
    padding: 5px 0
    margin: 10px 0 5px 0
    width: 100%
  button
    background-color: #3498db
    padding: 10px 20px
    margin-top: 10px
    border: none
    color: white
</style>
