<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newSiteUpdateVer'
            hint="add Ver"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateBody'
            hint="add Body"
            autogrow
            lazy-rules
          />
          <q-input
            v-model='newSiteUpdateDateUpd'
            type="date"
            hint="add date"
            lazy-rules
          />
        </div>
        <q-btn @click="addSiteUpdate" label="add event"/>
      </q-form>
    </div>
    <q-toggle
      :false-value="false"
      :label="`Показываем ${redModel}`"
      :true-value="true"
      color="red"
      v-model="redModel"
    />
    <div v-if="redModel">
      <div class="q-pa-md" v-for="SiteUpdate in SiteUpdates" :key="SiteUpdate.id" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>
              <div class="q-gutter-md">
                <div class="cursor-pointer" style="width: 100px">
                  {{ SiteUpdate.ver }}
                  <q-popup-edit v-model="SiteUpdate.ver" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                  <q-btn @click="updateVer(SiteUpdate.id)"  flat size="xs" icon="done"/>
                </div>
              </div>
            </q-toolbar-title>
          </q-toolbar>
          <q-list v-if="SiteUpdate.done">
            <q-item-section>
              <div class="q-gutter-md">
                <div class="cursor-pointer" style="width: 100px">
                  {{ SiteUpdate.dateupd }}
                  <q-popup-edit v-model="SiteUpdate.dateupd" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                  <q-btn @click="updateVer(SiteUpdate.id)"  flat size="xs" icon="done"/>
                </div>
              </div>
            </q-item-section>
            <q-item>
              <div class="q-gutter-md">
                <div class="cursor-pointer" style="width: 100px">
                  {{ SiteUpdate.title }}
                  <q-popup-edit v-model="SiteUpdate.title" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </div>
              </div>
              <q-btn @click="updateTitle(SiteUpdate.id)" flat size="xs" icon="done"/>
            </q-item>
            <q-item>
              <div class="q-gutter-md">
                <div class="cursor-pointer" style="width: 100px">
                  {{ SiteUpdate.body }}
                  <q-popup-edit v-model="SiteUpdate.body" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </div>
              </div>
              <q-btn @click="updateBody(SiteUpdate.id)" flat size="xs" icon="done"/>
            </q-item>
          </q-list>
          <q-tabs
            v-model="tab"
            class="bg-teal text-yellow shadow-2"
          >
            <q-tab  @click="countUpEvent(SiteUpdate.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="toggleEvent(SiteUpdate.id)" name="alarms" icon="done" />
            <q-tab @click="deleteSiteUpdate(SiteUpdate.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const siteUpdateCollectionRef = collection(db, 'siteUpdates')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
const newSiteUpdateVer = ref('')
const newSiteUpdateTitle = ref('')
const newSiteUpdateBody = ref('')
const newSiteUpdateDate = ref('')
const newSiteUpdateCount = ref('')
const newSiteUpdateDateUpd = ref('')

const addSiteUpdate = () => {
  addDoc(siteUpdateCollectionRef, {
    ver: newSiteUpdateVer.value,
    title: newSiteUpdateTitle.value,
    body: newSiteUpdateBody.value,
    dateupd: newSiteUpdateDateUpd.value,
    date: Date.now(),
    done: true
  })
  newSiteUpdateVer.value = ''
  newSiteUpdateTitle.value = ''
  newSiteUpdateBody.value = ''
  newSiteUpdateDate.value = ''
  newSiteUpdateCount.value = ''
  newSiteUpdateDateUpd.value = ''
  console.log('add SiteUpdate', newSiteUpdateDate.value)
}

const deleteSiteUpdate = id => {
  deleteDoc(doc(siteUpdateCollectionRef, id))
}

export default {
  name: 'NewsSiteContentAdd',
  components: {},
  data () {
    return {
    }
  },
  setup () {
    const SiteUpdate = ref([])
    const SiteUpdates = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const SiteUpdate = {
            id: doc.id,
            dateupd: doc.data().dateupd,
            title: doc.data().title,
            body: doc.data().body,
            ver: doc.data().ver,
            date: doc.data().date,
            done: doc.data().done
          }
          fbSiteUpdates.push(SiteUpdate)
        })
        SiteUpdates.value = fbSiteUpdates
      })
    })
    // Edit SiteUpdate Block
    const updateVer = id => {
      const index = SiteUpdate.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        ver: SiteUpdate.value[index].ver
      })
      console.log('ver update', SiteUpdate.value[index].ver, 'SiteUpdate id', SiteUpdate.value[index].id)
    }
    const updateTitle = id => {
      const index = SiteUpdate.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        title: SiteUpdate.value[index].title
      })
      console.log('title update', SiteUpdate.value[index].title, 'SiteUpdate id', SiteUpdate.value[index].id)
    }
    const updateBody = id => {
      const index = SiteUpdate.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        body: SiteUpdate.value[index].body
      })
      console.log('body update', SiteUpdate.value[index].body, 'SiteUpdate id', SiteUpdate.value[index].id)
    }
    const updateDateUpd = id => {
      const index = SiteUpdate.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        dateupd: SiteUpdate.value[index].dateupd
      })
      console.log('dateupd update', SiteUpdate.value[index].dateupd, 'dateupd id', SiteUpdate.value[index].id)
    }
    return {
      newSiteUpdateVer,
      newSiteUpdateTitle,
      newSiteUpdateBody,
      newSiteUpdateDate,
      newSiteUpdateCount,
      newSiteUpdateDateUpd,
      done: ref(true),
      redModel: ref(true),
      deleteSiteUpdate,
      deleteDoc,
      addSiteUpdate,
      SiteUpdates,
      updateVer,
      updateTitle,
      updateBody,
      updateDateUpd,
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
