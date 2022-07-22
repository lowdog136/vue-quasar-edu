<template>
  <!--  input block-->
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card dark bordered class="bg-grey-9 my-card">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model=newNewsCardSubTitle
            hint="add subtitle"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardPreView'
            autogrow
            hint="add preview"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardFullNews'
            autogrow
            type="text"
            hint="add fullnews"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardDateNews'
            type="date"
            hint="add datenews"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardSrcNews'
            type="text"
            hint="add srcnews"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardSrcNews'
            type="text"
            hint="add date"
            lazy-rules
          />
        </div><br/>
      </q-form>
      <q-separator dark inset />
      <q-card-section>
        <q-btn @click="addNewsCard" color="primary" label="add news" flat/>
        <q-toggle
          :false-value="false"
          :label="`Показываем ${ greenModel }`"
          :true-value="true"
          color="red"
          v-model="greenModel"
        />
      </q-card-section>
    </q-card>
  </div>
  <!--  edit mode block-->
  <div class="q-pa-md row items-start q-gutter-md" v-if="greenModel">
    <q-card
      class="bg-grey-9 my-card"
      v-for="NewsCard in NewsCards"
      :key="NewsCard.id"
      dark bordered >
      <q-card-section>
        <div class="text-h6">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label caption>id:{{ NewsCard.id }}</q-item-label>
                <q-item-label>subtitle: {{ NewsCard.subtitle }}
                  <q-popup-edit v-model="NewsCard.subtitle" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @submit="updateVer(SiteUpdate.ver)" @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateSubTitle(NewsCard.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>title: {{ NewsCard.title }}
                  <q-popup-edit v-model="NewsCard.title" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateTitle(NewsCard.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-subtitle2">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>datenews: {{ NewsCard.datenews }}
                  <q-popup-edit v-model="NewsCard.datenews" class="bg-accent text-white" v-slot="scope">
                    <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="updateDateNews(NewsCard.id)"  flat size="xs" icon="done"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-list>
<!--          preview block-->
          <q-item >
            <q-item-section>
              <q-item-label>preview: {{ NewsCard.preview }}
                <q-popup-edit v-model="NewsCard.preview" class="bg-accent text-white" v-slot="scope">
                  <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updatePreView(NewsCard.id)"  flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>
<!--          fullnews block-->
          <q-item >
            <q-item-section>
              <q-item-label>fullnews: {{ NewsCard.fullnews }}
                <q-popup-edit v-model="NewsCard.fullnews" class="bg-accent text-white" v-slot="scope">
                  <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateFullNews(NewsCard.id)"  flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>
          <q-separator dark inset />
          <q-item >
            <q-item-section>
              <q-item-label>srcnews: {{ NewsCard.srcnews }}
                <q-popup-edit v-model="NewsCard.srcnews" class="bg-accent text-white" v-slot="scope">
                  <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn @click="updateSrcNews(NewsCard.id)"  flat size="xs" icon="done"/>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>
                <NewsCardDetailPopUp
                  :PopyUpSubTitleNews="NewsCard.subtitle"
                  :PopyUpSrcNews="NewsCard.srcnews"
                  :PopyUpFullNews="NewsCard.fullnews"
                  :PopyUpTitleNews="NewsCard.title"
                  :PopyUpItem="NewsCard.item"
                  :PopyUpBtnName="PopyUpBtnName"
                />
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-tabs
        v-model="tab"
        class="bg-teal text-yellow shadow-2"
      >
        <q-tab  name="mails" icon="arrow_upward" />
        <q-tab  name="alarms" icon="done" />
        <q-tab @click="deleteNewsCard(NewsCard.id)" name="movies" icon="delete" />
      </q-tabs>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'

// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

//  NewsCard Add value Block
const newNewsCardSubTitle = ref('')
const newNewsCardTitle = ref('')
const newNewsCardPreView = ref('')
const newNewsCardFullNews = ref('')
const newNewsCardDateNews = ref('')
const newNewsCardSrcNews = ref('')

// NewsCard Add Block
const addNewsCard = () => {
  addDoc(newsCardCollectionRef, {
    subtitle: newNewsCardSubTitle.value,
    title: newNewsCardTitle.value,
    preview: newNewsCardPreView.value,
    fullnews: newNewsCardFullNews.value,
    datenews: newNewsCardDateNews.value,
    srcnews: newNewsCardSrcNews.value,
    date: Date.now(),
    done: true
  })
  newNewsCardSubTitle.value = ''
  newNewsCardTitle.value = ''
  newNewsCardPreView.value = ''
  newNewsCardFullNews.value = ''
  newNewsCardDateNews.value = ''
  newNewsCardSrcNews.value = ''
  console.log('add news', newNewsCardSubTitle.value)
}
const deleteNewsCard = id => {
  deleteDoc(doc(newsCardCollectionRef, id))
}

export default {
  name: 'NewsCardContentAdd',
  components: { NewsCardDetailPopUp },
  data () {
    return {}
  },
  setup () {
    const NewsCards = ref([])
    onMounted(async () => {
      // NewsCard Module
      onSnapshot(newsCardCollectionQuery, (querySnapshot) => {
        const fbNewsCards = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            preview: doc.data().preview,
            fullnews: doc.data().fullnews,
            datenews: doc.data().datenews,
            srcnews: doc.data().srcnews,
            date: doc.data().date,
            done: doc.data().done
          }
          fbNewsCards.push(NewsCard)
        })
        NewsCards.value = fbNewsCards
      })
    })
    const toggleEvent = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionQuery, id), {
        done: !NewsCards.value[index].done
      })
    }
    const countUpEvent = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionQuery, id), {
        count: NewsCards.value[index].count++
      })
      console.log('countUP', NewsCards.value[index].count)
    }
    // Edit data in NewsCard block
    const updateSubTitle = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        subtitle: NewsCards.value[index].subtitle
      })
      console.log('subtitle update', NewsCards.value[index].subtitle, 'subtitle id', NewsCards.value[index].id)
    }
    const updateTitle = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        title: NewsCards.value[index].title
      })
      console.log('title update', NewsCards.value[index].title, 'title id', NewsCards.value[index].id)
    }
    const updatePreView = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        preview: NewsCards.value[index].preview
      })
      console.log('preview update', NewsCards.value[index].preview, 'title id', NewsCards.value[index].id)
    }
    const updateDateNews = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        datenews: NewsCards.value[index].datenews
      })
      console.log('datenews update', NewsCards.value[index].datenews, 'title id', NewsCards.value[index].id)
    }
    const updateFullNews = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        fullnews: NewsCards.value[index].fullnews
      })
      console.log('datenews update', NewsCards.value[index].datenews, 'title id', NewsCards.value[index].id)
    }
    const updateSrcNews = id => {
      const index = NewsCards.value.findIndex(NewsCard => NewsCard.id === id)
      updateDoc(doc(newsCardCollectionRef, id), {
        srcnews: NewsCards.value[index].srcnews
      })
      console.log('datenews update', NewsCards.value[index].srcnews, 'title id', NewsCards.value[index].id)
    }
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      newNewsCardDateNews,
      newNewsCardFullNews,
      newNewsCardTitle,
      newNewsCardSubTitle,
      newNewsCardPreView,
      newNewsCardSrcNews,
      done: ref(true),
      redModel: ref(false),
      greenModel: ref(false),
      PopyUpBtnName: 'popup',
      addNewsCard,
      deleteNewsCard,
      deleteDoc,
      toggleEvent,
      countUpEvent,
      NewsCards,
      updateSubTitle,
      updateTitle,
      updatePreView,
      updateDateNews,
      updateFullNews,
      updateSrcNews,
      tab: ref(['alarms', 'mails'])
    }
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([])
  },

  props: {}
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 550px
  background: #2c3e50
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
