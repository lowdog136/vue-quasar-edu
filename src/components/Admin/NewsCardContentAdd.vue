<template>
  <div class="q-pa-md row items-start q-gutter-md">
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
      <div class="q-pa-md" v-for="NewsCard in NewsCards" :key="NewsCard.id" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>{{ NewsCard.subtitle }}</q-toolbar-title>
          </q-toolbar>
          <q-list v-if="NewsCard.done">
            <q-item-section>
              {{ NewsCard.data }}
            </q-item-section>
            <q-item>
              {{ NewsCard.title }}
            </q-item>
            <q-item>
              {{ NewsCard.preview }}<br/>{{ NewsCard.datenews }}
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
            <q-tab  @click="countUpEvent(event.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="toggleEvent(event.id)" name="alarms" icon="done" />
            <q-tab @click="deleteNewsCard(NewsCard.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </div>
  <div v-if="greenModel" class="q-px-lg q-pb-md">
    AddNewsBlock Mode
    <div v-for="NewsCard in NewsCards" :key="NewsCard.id">
      {{ NewsCard.title }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
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

<style scoped>

</style>
