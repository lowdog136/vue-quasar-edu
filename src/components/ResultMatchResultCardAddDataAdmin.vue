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
        v-model='resultGameTitle'
        label=""
        hint="товарищ или чемп/кубок"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
        <q-input
          filled
          autogrow
          v-model='resultGameResult'
          label=""
          hint="победа/ничья/поражение"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-input
          filled
          v-model='resultGameDate'
          label=""
          hint="датаНовости"
          type="date"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      <p>
        <q-input
          filled
          v-model='resultGameTeam1'
          label=""
          hint="команда 1"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='resultGameTeam1City'
          label=""
          hint="город команда 1"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='resultGameTeam2'
          label=""
          hint="команда 2"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='resultGameTeam2City'
          label=""
          hint="город команда 2"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='resultGameTotal'
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
        :class="{ bought: item.bought }"
        :key="resultGame.id"
      >
        <q-separator/>
        <div class="blockNewsCard">
          Новость: {{ resultGame.id }}
            <q-btn @click="statusItemOn(resultGame.id)" icon="toggle_off" @dblclick="statusItemOff(resultGame.id)" label="" color="primary" flat class="q-ml-sm">
              <q-tooltip class="bg-accent">Включить/выключить показ на странице с новостями</q-tooltip>
            </q-btn>
            <q-btn @click="boughtItem(resultGame.id)" disable icon="visibility_off" @dblclick="removeBought(resultGame.id)" label="" color="primary" flat class="q-ml-sm" />
            <q-btn @dblclick="removeItem(resultGame.id)" icon="delete" label="" color="primary" flat class="q-ml-sm">
              <q-tooltip class="bg-black">Удалить запись</q-tooltip>
            </q-btn>
        </div>
        <q-card v-if="resultGame.status" class="my-card" flat bordered>
          <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
          <q-card-section>
            <div class="text-overline text-deep-orange-14">
              {{ resultGame.status }}
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ resultGame.status }}
            </div>
            <div class="text-caption text-blue-grey-10">
              {{ resultGame.status }}
            </div> <br>
            <div class="text-caption text-grey">
              {{ resultGame.status }}
            </div>
          </q-card-section>
        </q-card>
        <q-btn @click="statusResultCardOn(resultGame.id)" @dblclick="statusResultCardOff(resultGame.id)" label="on/off" color="primary" flat class="q-ml-sm" />
        <div class="blockResultCard">
          resultGameStatus: {{ resultGame.resultGameStatus }} <br>
          itemTeam1: {{ resultGame.resultGameResult }} <br>
          itemTeam2: {{ resultGame.resultGameTitle }} <br>
          itemItog: {{ resultGame.resultGameDate }} <br>
          itemResult: {{ resultGame.ResultCardResult }} <br>
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
      resultGameStatus: '',
      resultGameResult: '',
      resultGameTitle: '',
      resultGameDate: '',
      resultGameTeam1: '',
      resultGameTeam1City: '',
      resultGameTeam2: '',
      resultGameTeam2City: '',
      resultGameTotal: ''
    }
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/resultGames`)
      this.items = res.data
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
    async boughtItem (id) {
      await axios.patch(`${baseURL}/resultGames/${id}`, {
        bought: true
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.bought = true
        }
        return item
      })
    },
    async removeBought (id) {
      await axios.patch(`${baseURL}/resultGames/${id}`, {
        bought: false
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.bought = false
        }
        return item
      })
    },
    async statusItemOn (id) {
      await axios.patch(`${baseURL}/resultGames/${id}`, {
        status: true
      })
      this.resultGames = this.resultGames.map((resultGame) => {
        if (resultGame.id === id) {
          resultGame.status = true
        }
        return resultGame
      })
    },
    async statusItemOff (id) {
      await axios.patch(`${baseURL}/resultGames/${id}`, {
        status: false
      })
      this.resultGames = this.resultGames.map((resultGame) => {
        if (resultGame.id === id) {
          resultGame.status = false
        }
        return resultGame
      })
    },
    async statusResultCardOn (id) {
      await axios.patch(`${baseURL}/resultGames/${id}`, {
        resultCardStatus: true
      })
      this.resultGames = this.resultGames.map((resultGame) => {
        if (resultGame.id === id) {
          resultGame.resultCardStatus = true
        }
        return resultGame
      })
    },
    async statusResultCardOff (id) {
      await axios.patch(`${baseURL}/resultGames/${id}`, {
        resultCardStatus: false
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.resultCardStatus = false
        }
        return item
      })
    },
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
