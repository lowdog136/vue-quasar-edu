<template>
  <div class="container">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-separator/>
      <q-input
        filled
        v-model='resultGameStatus'
        autogrow
        label=""
        hint="показывать или нет true/false"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
      <q-input
        filled
        autogrow
        :resultGameTitle="resultGameTitle"
        label=""
        hint="товарищ или чемп/кубок"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
      <q-input
        filled
        autogrow
        :resultGameResult="resultGameResult"
        label=""
        hint="победа/ничья/поражение"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
      <q-input
        filled
        :resultGameDate="resultGameDate"
        label=""
        hint="датаНовости"
        type="date"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
      <p>
        <q-input
          filled
          :resultGameTeam1="resultGameTeam1"
          label=""
          hint="команда 1"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          :resultGameTeam1City="resultGameTeam1City"
          label=""
          hint="город команда 1"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          :resultGameTeam2="resultGameTeam2"
          label=""
          hint="команда 2"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          :resultGameTeam2City="resultGameTeam2City"
          label=""
          hint="город команда 2"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          :resultGameTotal="resultGameTotal"
          label=""
          hint="Итоговый счет"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <div class="bottom">
        <q-btn @click="addPost()" label="Добавить" color="primary" flat class="q-ml-sm" />
        <q-btn label="Очистить" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <li
      v-for="resultGame in resultGames.slice(id).reverse()"
      :key="resultGame.id"
    >
      <q-separator/>
      <div class="blockNewsCard">
        Новость: {{ resultGame.id }}
      </div>
      <q-card class="my-card" flat bordered>
        <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
        <q-card-section>
          <div class="text-overline text-deep-orange-14">
            {{ resultGame.team1 }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ resultGame.team1 }}
          </div>
          <div class="text-caption text-blue-grey-10">
            {{ resultGame.team1 }}
          </div> <br>
          <div class="text-caption text-grey">
            {{ resultGame.team1 }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="dark" label="" />
          <div class="labelDate">
            {{ resultGame.team1 }}
          </div>
          <q-space />
        </q-card-actions>
      </q-card>
      <q-space />resultGame.raiting: {{ resultGame.id }} <br>
      <q-space />resultGame.howWatch: {{ resultGame.team1 }} <br>
      <q-space />item.status: {{ resultGame.team1 }} <br>
      <div class="blockResultCard">
        itemResultCardStatus: {{ resultGame.team1 }}<br>
        itemTeam1: {{ resultGame.team1 }}<br>
        itemTeam2: {{ resultGame.team1 }} <br>
        itemItog: {{ resultGame.team1 }} <br>
        itemResult: {{ resultGame.team1 }} <br>
      </div>
    </li>
  </div>
</template>

<script>
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const baseURL = 'http://localhost:3001'

export default {
  components: {},
  name: 'ResultMatchResultCardAddDataAdmin',
  data () {
    return {
      resultGames: [],
      resultGameStatus: ref(''),
      resultGameResult: ref(''),
      resultGameTitle: ref(''),
      resultGameDate: ref(''),
      resultGameTeam1: ref(''),
      resultGameTeam1City: ref(''),
      resultGameTeam2: ref(''),
      resultGameTeam2City: ref(''),
      resultGameTotal: ref('')
    }
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/resultGames`)
      this.resultGames = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const accept = ref(false)

    return {
      name,
      accept,
      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        accept.value = false
      }
    }
  },
  methods: {
    removeItem (id) {
      axios.delete(`${baseURL}/resultGames/${id}`)
      this.resultGames = this.resultGames.filter((resultGame) => resultGame.id !== id)
    },
    async addPost () {
      const res = await axios.post(`${baseURL}/resultGames`, {
        status: this.resultGameStatus,
        result: this.resultGameResult,
        title: this.resultGameTitle,
        date: this.resultGameDate,
        team1: this.resultGameTeam1,
        team1city: this.resultGameTeam1City,
        team2: this.resultGameTeam2,
        team2city: this.resultGameTeam2City,
        total: this.resultGameTotal
      })
      this.resultGames = [...this.resultGames, res.data]
      this.resultGameStatus = ''
      this.resultGameResult = ''
      this.resultGameTitle = ''
      this.resultGameDate = ''
      this.resultGameTeam1 = ''
      this.resultGameTeam1City = ''
      this.resultGameTeam2 = ''
      this.resultGameTeam2City = ''
      this.resultGameTotal = ''
    }
  }
}
</script>

<style>
#app {
  text-align: left;
  color: #2c3e50;
}
.container {
  background-color: rgba(172, 187, 180, 0.82);
  margin: 0 auto;
  border-radius: 8px;
}
li {
  font-size: 1.5rem;
  list-style: none;
  max-width: 350px;
}
button {
  margin-top: 5px;
  background-color: #3498db;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}
.blockResultCard {
  font-size: 14px;
}
.labelDate {
  font-size: 14px;
}
.blockNewsCard {
  font-size: 14px;
}
.my-card {
  width: 100%;
  max-width: 450px;
}
input {
  margin-top: 5px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bought {
  text-decoration: line-through;
}
</style>
