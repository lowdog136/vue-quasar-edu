<template>
  <!--  input block-->
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card dark bordered class="bg-grey-6 my-card">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <adm-input
            v-model='newSiteUpdateVer'
            :input-hint=inputHintVer
          />
          <adm-input
            v-model='newSiteUpdateTitle'
            :input-hint=inputHintTitle
          />
          <adm-input
            v-model='newSiteUpdateBody'
            :input-hint=inputHintBody
            autogrow
          />
          <adm-input
            v-model='newSiteUpdateDateUpd'
            :type=inputTypeDate
          />
          <adm-select
            v-model="newSiteUpdateIconUpd"
            :options="['done', 'settings_applications']"
            :select-color="green"
            :select-label="selectLabel[0]"
            :select-name="selectName[0]"
          />
          <adm-select
            v-model="newSiteUpdateColorUpd"
            :options="['black', 'grey', 'deep-orange-14']"
            :select-color="grey"
            :select-label="selectLabel[1]"
            :select-name="selectName[1]"
          />
        </div><br/>
      </q-form>
      <q-separator dark inset />
      <q-card-section>
        <btn-add :btn-icon="btnIcon" :btn-name="btnName" @click="addSiteUpdate"/>
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
                <q-item-label>title: {{ SiteUpdate.title }}
                  <q-popup-edit v-model="SiteUpdate.title" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateTitle(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>icon: {{ SiteUpdate.icon }}
                  <q-popup-edit v-model="SiteUpdate.icon" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateIcon(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>icon: {{ SiteUpdate.color }}
                  <q-popup-edit v-model="SiteUpdate.color" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateColor(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>dateupd: {{ SiteUpdate.dateupd }}
                  <q-popup-edit v-model="SiteUpdate.dateupd" class="bg-accent text-white" v-slot="scope">
                    <q-input
                      dark
                      color="white"
                      v-model="scope.value"
                      dense
                      autofocus
                      counter
                      @keyup.enter="scope.set"
                      mask="MMMM DD, YYYY"
                      locale="ru"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date
                              v-model="scope.value"
                              mask="MMMM DD, YYYY"
                              locale="ru"
                              dark
                            >
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup color="primary" flat size="s" icon="done"/>
                                <q-btn v-close-popup color="primary" flat size="s" icon="cancel" />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateDateUpd(SiteUpdate.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-list>
          <q-item >
            <q-item-section>
              <q-item-label v-for="bodyArray in SiteUpdate.body" :key="bodyArray.id" >Body: {{ bodyArray }}
                <q-popup-edit v-model="SiteUpdate.body" class="bg-accent text-white" v-slot="scope">
                  <q-input dark color="white" v-model="scope.value" dense autofocus counter @submit="updateBody(SiteUpdate.body)" @keyup.enter="scope.set">
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateBody(SiteUpdate.id)"  flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-tabs
        v-model="tab"
        class="bg-teal text-yellow shadow-2"
      >
        <q-tab  name="mails" icon="arrow_upward" />
        <!--        item on or off-->
        <tab-foot-done />
        <!--        delete item-->
        <tab-foot-delete @click="deleteSiteUpdate(SiteUpdate.id)" />
      </q-tabs>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import BtnAdd from 'components/Admin/UI/btnAdd.vue'
import AdmInput from 'components/Admin/UI/admInput.vue'
import TabFootDelete from 'components/Admin/UI/tabFootDelete.vue'
import TabFootDone from 'components/Admin/UI/tabFootDone.vue'
import AdmSelect from 'components/Admin/UI/admSelect.vue'

const siteUpdateCollectionRef = collection(db, 'siteUpdates')
const siteUpdateCollectionQuery = query(siteUpdateCollectionRef, orderBy('date', 'desc'))
const newSiteUpdateVer = ref('')
const newSiteUpdateTitle = ref('')
const newSiteUpdateBody = ref('')
const newSiteUpdateDate = ref('')
const newSiteUpdateCount = ref('')
const newSiteUpdateDateUpd = ref('')
const newSiteUpdateColorUpd = ref('black')
const newSiteUpdateIconUpd = ref('done')

const addSiteUpdate = () => {
  addDoc(siteUpdateCollectionRef, {
    ver: newSiteUpdateVer.value,
    title: newSiteUpdateTitle.value,
    body: [newSiteUpdateBody.value],
    dateupd: newSiteUpdateDateUpd.value,
    color: newSiteUpdateColorUpd.value,
    icon: newSiteUpdateIconUpd.value,
    date: Date.now(),
    done: true
  })
  newSiteUpdateVer.value = ''
  newSiteUpdateTitle.value = ''
  newSiteUpdateBody.value = ''
  newSiteUpdateDate.value = ''
  newSiteUpdateCount.value = ''
  newSiteUpdateDateUpd.value = ''
  newSiteUpdateColorUpd.value = 'black'
  newSiteUpdateIconUpd.value = 'done'
  console.log('add SiteUpdate', newSiteUpdateDate.value)
}
const deleteSiteUpdate = id => {
  deleteDoc(doc(siteUpdateCollectionRef, id))
  console.log('del SiteUpdate', newSiteUpdateDate.value)
}

export default {
  name: 'NewsSiteContentAdd',
  components: { AdmSelect, TabFootDone, TabFootDelete, AdmInput, BtnAdd },
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
    const SiteUpdates = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(siteUpdateCollectionQuery, (querySnapshot) => {
        const fbSiteUpdates = []
        querySnapshot.forEach((doc) => {
          const SiteUpdate = {
            id: doc.id,
            dateupd: doc.data().dateupd,
            title: doc.data().title,
            body: doc.data().body,
            ver: doc.data().ver,
            color: doc.data().color,
            icon: doc.data().icon,
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
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        ver: SiteUpdates.value[index].ver
      })
      console.log('ver update', SiteUpdates.value, 'ver id', SiteUpdates.value)
    }
    const updateTitle = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        title: SiteUpdates.value[index].title
      })
      console.log('title update', SiteUpdates.value[index].title, 'SiteUpdate id', SiteUpdates.value[index].id)
    }
    const updateBody = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        body: SiteUpdates.value[index].body
      })
      console.log('body update', SiteUpdates.value[index].body, 'body id', SiteUpdates.value[index].id)
    }
    const updateIcon = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        icon: SiteUpdates.value[index].icon
      })
      console.log('icon update', SiteUpdates.value[index].icon, 'icon id', SiteUpdates.value[index].id)
    }
    const updateColor = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        color: SiteUpdates.value[index].color
      })
      console.log('color update', SiteUpdates.value[index].color, 'color id', SiteUpdates.value[index].id)
    }
    const updateDateUpd = id => {
      const index = SiteUpdates.value.findIndex(SiteUpdate => SiteUpdate.id === id)
      updateDoc(doc(siteUpdateCollectionRef, id), {
        dateupd: SiteUpdates.value[index].dateupd
      })
      console.log('dateupd update', SiteUpdates.value[index].dateupd, 'dateupd id', SiteUpdates.value[index].id)
    }
    return {
      newSiteUpdateVer,
      newSiteUpdateTitle,
      newSiteUpdateBody,
      newSiteUpdateDate,
      newSiteUpdateCount,
      newSiteUpdateDateUpd,
      newSiteUpdateColorUpd,
      newSiteUpdateIconUpd,
      done: ref(true),
      redModel: ref(false),
      deleteSiteUpdate,
      deleteDoc,
      addSiteUpdate,
      SiteUpdates,
      updateVer,
      updateTitle,
      updateBody,
      updateDateUpd,
      updateColor,
      updateIcon,
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
