<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="my-card" v-if="$store.state.colorCode">
      <h4> Text here </h4>
      <div class="q-pa-md row items-start q-gutter-md">
        <GamesNowEventCard
          v-for="GamesNowEventList in $store.state.GamesNowEventLists"
          :key="GamesNowEventList.id"
          :eventListValue="GamesNowEventList"
        />
      </div>
      <div>
        <vueLidate />
      </div>
      <section class="forms">
        <form class="register" @submit.prevent="register">
          <h4>register</h4>
          <input type="email" placeholder="email" v-model="register_form.email"/>
          <input type="password" placeholder="password" v-model="register_form.password"/>
          <input type="submit" value="register"/>
        </form>
        <form class="login" @submit.prevent="login">
          <h4>login</h4>
          <input type="email" placeholder="email" v-model="login_form.email"/>
          <input type="password" placeholder="password" v-model="login_form.password"/>
          <input type="submit" value="login"/>
        </form>
        <div>
        <q-btn @click="btnClickPush">Buttom push</q-btn>
      </div> <br/>
        <div>
          <q-btn @click="howWatch">Buttom watch</q-btn>
          {{ store.state.NewsCardHowWatch }}
        </div>
        <br/>
        <div>
          <q-btn @click="myCountUp">Buttom myCount</q-btn>
          {{ store.state.myCount }}
        </div>
        <div>
          <q-btn @click="myCountZero">Buttom myCountZero</q-btn>
        </div><br/>
      </section>
    </div>
    <q-btn @click="btnClick">Buttom click</q-btn>
  </div>

  <div>
    <q-input style="max-width: 150px" label="id" v-model="id"></q-input>
    <q-input style="max-width: 150px" label="title" v-model="title"></q-input>
    <q-input style="max-width: 150px" label="body" v-model="body"></q-input>
    <br><q-separator/>
    <q-input style="max-width: 150px" label="name" v-model="name"></q-input>
    <q-input style="max-width: 150px" label="surname" v-model="surname"></q-input>
    <q-input style="max-width: 150px" label="other" v-model="other"></q-input>
    <q-btn style="max-width: 150px" @click="getPostT()">JSON get post</q-btn>
    <q-btn style="max-width: 150px" @click="getProfileT()">JSON get profile</q-btn>
    <q-btn style="max-width: 150px" @click="addPostT()">JSON add post</q-btn>
    <q-btn style="max-width: 150px" @click="addProfilesT()">JSON add prof</q-btn>
    <q-btn style="max-width: 150px" @click="delPostT(id)">JSON del post</q-btn>
    <q-btn style="max-width: 150px" @click="renProfT(id)">JSON reN prof</q-btn>
    <q-btn style="max-width: 150px" @click="renPostT(id)">JSON reN post</q-btn>
    <div v-for="profiles in profile" :key="profiles.id">
      <p>id:{{ profiles.id }}
        name:{{ profiles.name }}
      surname:{{ profiles.surname }}
      other: {{ profiles.other }}</p>
    </div>
    <div v-for="post in posts" :key="post.id">
      <p>id:{{ post.id }}
      {{ post.title }}
      {{ post.body }}
        <q-btn style="max-width: 150px" @click="countUpT(id)">JSON count up</q-btn>
        count: {{ post.count }}</p>
    </div>
  </div><br/>
  <div>
  </div><br/>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useStore, mapActions, mapGetters } from 'vuex'
import GamesNowEventCard from 'components/GamesNowEventCard'
import vueLidate from 'components/vueLidate'

export default {
  components: { GamesNowEventCard, vueLidate },
  data () {
    return {
      posts: [],
      profile: [],
      name: '',
      surname: '',
      other: '',
      id: '',
      title: '',
      body: '',
      author: 'author1',
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
      login_form,
      register_form,
      login,
      increaseCount,
      register,
      store,
      expanded: ref(false)
    }
  },
  async addPost2 () {
    try {
      const res = await axios.post('http://localhost:3001/posts')
      this.items = res.data
    } catch (error) {
      console.log(error)
    }
  },
  async created () {
    try {
      const res = await axios.get('https://severfans.ru:3001/items')
      this.items = res.data
    } catch (error) {
      console.log(error)
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
