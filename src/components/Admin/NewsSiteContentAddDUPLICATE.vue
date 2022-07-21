<template>
  <div class="q-pa-md row items-start q-gutter-md">
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
    <div class="q-pa-md" style="max-width: 650px">
      <!--    addNewsCard-->
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
        </div>
        <q-btn @click="addNewsCard" label="add news"/>
      </q-form>
    </div>
    <q-toggle
      :false-value="false"
      :label="`Показываем NewsAddModule ${greenModel}`"
      :true-value="true"
      color="red"
      v-model="greenModel"
    />
    <div v-if="greenModel">
      <div class="my-card" v-for="NewsCard in NewsCards" :key="NewsCard.id" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>
              <q-item>
                <q-input v-model="NewsCard.subtitle" @submit="updateSubTitle(NewsCard.id)"/>
                <q-btn @click="updateSubTitle(NewsCard.id)" size="xs" icon="done"/>
              </q-item>
            </q-toolbar-title>
          </q-toolbar>
          <q-list v-if="NewsCard.done">
            <q-item-section>
              {{ NewsCard.data }}
            </q-item-section>
            <q-item>
              <q-input v-model="NewsCard.title" hint="title" @submit="updateTitle(NewsCard.id)"/>
              <q-btn @click="updateTitle(NewsCard.id)" size="xs" icon="done"/>
            </q-item>
            <q-item>
              <q-input v-model="NewsCard.preview" hint="subtitle" @submit="updatePreView(NewsCard.id)" autogrow/>
              <q-btn @click="updatePreView(NewsCard.id)" size="xs" icon="done"/>
            </q-item>
            <q-item>
              <q-input v-model="NewsCard.datenews" hint="datenews" @submit="updateDateNews(NewsCard.id)" type="date" autogrow/>
              <q-btn @click="updateDateNews(NewsCard.id)" size="xs" icon="done"/>
            </q-item>
            <q-item>
              <q-input v-model="NewsCard.fullnews" hint="fullnews" @submit="updateFullNews(NewsCard.id)"/>
              <q-btn @click="updateFullNews(NewsCard.id)" size="xs" icon="done"/>
            </q-item>
            <q-item>
              <q-input v-model="NewsCard.srcnews" hint="srcnews" @submit="updateSrcNews(NewsCard.id)"/>
              <q-btn @click="updateSrcNews(NewsCard.id)" size="xs" icon="done"/>
            </q-item>
            <q-item>
              <NewsCardDetailPopUp
                :PopyUpSubTitleNews="NewsCard.subtitle"
                :PopyUpSrcNews="NewsCard.srcnews"
                :PopyUpFullNews="NewsCard.fullnews"
                :PopyUpTitleNews="NewsCard.title"
                :PopyUpItem="NewsCard.item"
                :PopyUpBtnName="PopyUpBtnName"
              />
            </q-item>
          </q-list>
          <q-tabs
            v-model="tab"
            class="bg-teal text-yellow shadow-2"
          >
            <q-tab  @click="countUpEvent(NewsCard.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="toggleEvent(NewsCard.id)" name="alarms" icon="done" />
            <q-tab @click="deleteNewsCard(NewsCard.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import NewsCardDetailPopUp from 'components/NewsCard/NewsCardDetailPopUp'

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
  console.log('del SiteUpdate', newSiteUpdateDate.value)
}
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
  mounted () {
    // axios
    //   .post('http://localhost:3001/posts/', {
    //     id: '4',
    //     userId: '3',
    //     title: 'Article title4-1',
    //     body: 'Article body content44'
    //   })
    //   .then((response) => console.log(response))
    // axios
    //   .get('http://localhost:3001/posts')
    //   .then((response) => {
    //     this.posts = response.data
    //   })
  },
  setup () {
    const SiteUpdate = ref([])
    const SiteUpdates = ref([])
    const NewsCards = ref([])
    onMounted(async () => {
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
      greenModel: ref(true),
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
      addSiteUpdate,
      deleteSiteUpdate,
      SiteUpdate,
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
