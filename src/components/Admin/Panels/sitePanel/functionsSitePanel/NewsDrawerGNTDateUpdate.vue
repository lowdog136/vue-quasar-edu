<template>
  <!--  edit mode block-->
  <div class="q-pa-md" style="max-width: 300px">
    <div class="text-h6">
      {{ titleCard }}
    </div>
    <!--  date block-->
    <q-input v-for="SiteUpdate in SiteUpdates"
             :key="SiteUpdate.id" filled v-model="SiteUpdate.datenews">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="SiteUpdate.datenews" mask="MMMM DD, YYYY" locale="ru">
              <div class="row items-center justify-end">
                <q-item-section avatar>
                  <q-btn @click="updateVer(SiteUpdate.id)" color="primary" flat size="s" icon="done"/>
                </q-item-section>
                <q-btn v-close-popup color="primary" flat size="s" icon="cancel" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
      <!--  time block-->
    </q-input>
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
