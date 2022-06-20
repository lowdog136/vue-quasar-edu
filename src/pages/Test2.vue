<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div>
      {{ $store.state.tours[tourCount].name}}
    </div>
    <div>
      <q-btn @click="tourCount++" label="+"/>
      <q-btn @click="tourCount--" label="-"/>
    </div>
    <div v-for="test in $store.state.tours" :key="test.id">
      <div v-if="tourCount == test.id - 1">
        <q-card class="my-card" >
          <q-card-section>
            {{ test.id }} - {{ test.name }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <br/>
  <div>
    <Test2Comp />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useStore, mapActions, mapGetters } from 'vuex'
import Test2Comp from 'components/Test2Comp'

export default {
  components: { Test2Comp },
  data () {
    return {
      tests: [
        {
          id: 1,
          name: 'name1'
        },
        {
          id: 2,
          name: 'name2'
        },
        {
          id: 3,
          name: 'name3'
        },
        {
          id: 4,
          name: 'name4'
        }
      ],
      posts: [],
      profile: [],
      name: '',
      surname: '',
      other: '',
      id: '',
      title: '',
      body: '',
      author1: ['Room view', 'Room service', 'Food'],
      author2: 'Room service',
      tourCount: 0,
      count: '',
      items: []
    }
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
    // eslint-disable-next-line camelcase
    const login_form = ref({})
    // eslint-disable-next-line camelcase
    const register_form = ref({})
    const store = useStore()
    const count = ref(0)
    // eslint-disable-next-line no-undef
    const increaseCount = () => {
      count.value++
    }

    const login = () => {
      store.dispatch('login', login_form.value)
    }
    const register = () => {
      store.dispatch('login', register_form.value)
    }
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      login_form,
      register_form,
      login,
      increaseCount,
      register,
      store,
      expanded: ref(false)
    }
  },
  computed: {
    ...mapGetters([
      'dropDown'
    ])
  },
  methods: {
    ...mapActions([
      'togledropDown',
      'changePush',
      'myCountZero',
      'myCountUp',
      'howWatch'
    ]),
    btnClickPush () {
      this.$router.push({ path: '/Login' })
    },
    tourCountUp () {
      this.tourCount()
    },
    btnClick () {
      this.togledropDown()
    },
    async addProfilesT () {
      await axios.post('http://localhost:3001/profile/', {
        name: this.name,
        surname: this.surname,
        other: this.other
      })
    },
    async addPostT () {
      await axios.post('http://localhost:3001/posts/', {
        title: this.title,
        body: this.body,
        count: this.count
      })
    },
    async getProfileT () {
      await axios.get('http://localhost:3001/profile/', {
        name: this.name
      })
        .then((response) => {
          this.profile = response.data
        })
    },
    async getPostT () {
      await axios.get('http://localhost:3001/posts/', {
        id: this.id
      })
        .then((response) => {
          this.posts = response.data
        })
    },
    async renProfT (id) {
      await axios.patch(`http://localhost:3001/profile/${id}`, {
        other: this.other
      })
    },
    async renPostT (id) {
      await axios.patch(`http://localhost:3001/posts/${id}`, {
        title: this.title
      })
    },
    async countUpT (id) {
      await axios.patch(`http://localhost:3001/posts/${id}`, {
        count: this.count++
      })
    },
    async delPostT (id) {
      await axios.delete(`http://localhost:3001/posts/${id}`, {
      })
    },
    async addPostM (id) {
      await axios.post(`http://localhost:3001/posts/${id}`, {
        title: '',
        body: ''
      })
      this.posts = this.posts.map((post) => {
        if (post.id === id) {
          post.status = false
        }
        return post
      })
    },
    props: {
      eventListValue: {
        type: Object,
        default () {
          return {
            eventCardTitleMounthDate: String,
            eventCardTitleMounthDateView: String,
            eventCardTitleDate: String,
            eventCardNameContest: String,
            eventCardGameTur: String,
            eventCardGameBody: String
          }
        }
      }
    }
  },
  props: {
    TitleNews: String,
    PopyUpTitleNews: String,
    PopyUpSrcNews: String,
    PopyUpFullNews: String,
    PopyUpHowWatch: String,

    product_data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
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
