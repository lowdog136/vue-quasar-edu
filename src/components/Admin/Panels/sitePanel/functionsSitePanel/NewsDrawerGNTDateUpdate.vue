<template>
  <!--  edit mode block-->
  <div class="q-pa-md row items-start q-gutter-md">
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
                <q-item-label caption>{{ titleCard }}</q-item-label>
                <q-item-label caption>id:{{ SiteUpdate.id }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>{{ valueCard }}: {{ SiteUpdate.datenews }}
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
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

const newSiteUpdateVer = ref('')

export default {
  name: 'NewsDrawerGNTDateUpdate',
  components: { },
  data () {
    return {
      titleCard: 'Турнирная таблица',
      valueCard: 'datenews'
    }
  },
  setup () {
    const SiteUpdates = ref([])
    onMounted(async () => {
      // Get data in firebase Module
      onSnapshot(collection(db, '/siteNewsDrawer/GamesNowTable/dateUpdate/'), (querySnapshot) => {
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
      updateDoc(doc(collection(db, '/siteNewsDrawer/GamesNowTable/dateUpdate/'), id), {
        datenews: SiteUpdates.value[index].datenews
      })
      console.log('ver update', SiteUpdates.value, 'ver id', SiteUpdates.value)
    }
    return {
      newSiteUpdateVer,
      SiteUpdates,
      updateVer
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
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
