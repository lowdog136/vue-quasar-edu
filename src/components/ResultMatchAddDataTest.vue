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
          v-model='itemNewsCardSubTitleNews'
          autogrow
          label=""
          hint="subtitle.предЗаголовок - победа,ничья, поражение, анонс"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-input
          filled
          autogrow
          v-model='itemNewsClubNewsCardTitleNews'
          label=""
          hint="Заголовок новости: 2-3 слова"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-input
          filled
          autogrow
          v-model='itemNewsClubNewsCardPreViewNews'
          label=""
          hint="itemStatus.предТекстНовости - превью. 2-3 предложения"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-input
          filled
          autogrow
          v-model='itemNewsClubNewsCardFullNews'
          label=""
          hint="Текст - основной текст. полный. работает по кнопке подробно"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-input
          filled
          v-model='itemNewsClubNewsCardDateNews'
          label=""
          hint="датаНовости"
          type="date"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      <p>
        <q-input
          filled
          v-model='itemNewsClubNewsCardCardNewsSrc'
          label=""
          hint="источник новости"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <q-separator/>
      <p> Данные для страницы с итогами матча<br />
        <q-input
          filled
          v-model='ResultCardTitle'
          disable
          label=""
          hint="ResultCardTitle"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardTeam1'
          disable
          label=""
          hint="ResultCardTeam1"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardTeam2'
          disable
          label=""
          hint="ResultCardTeam2"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardResult'
          disable
          label=""
          hint="ResultCardResult"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <br />
      </p>
      <div class="bottom">
        <q-btn @click="addPost()" label="Добавить" color="primary" flat class="q-ml-sm" />
        <q-btn label="Очистить" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
      <li
        v-for="item in items.slice(id).reverse()"
        :class="{ bought: item.bought }"
        :key="item.id"
      >
        <q-separator/>
        <div class="blockNewsCard">
          Новость: {{ item.id }}
            <q-btn @click="statusItemOn(item.id)" icon="toggle_off" @dblclick="statusItemOff(item.id)" label="" color="primary" flat class="q-ml-sm">
              <q-tooltip class="bg-accent">Включить/выключить показ на странице с новостями</q-tooltip>
            </q-btn>
            <q-btn @click="boughtItem(item.id)" disable icon="visibility_off" @dblclick="removeBought(item.id)" label="" color="primary" flat class="q-ml-sm" />
            <q-btn @dblclick="removeItem(item.id)" icon="delete" label="" color="primary" flat class="q-ml-sm">
              <q-tooltip class="bg-black">Удалить запись</q-tooltip>
            </q-btn>
        </div>
        <q-card v-if="item.status" class="my-card" flat bordered>
          <q-img :src="require('../assets/image/imgTitle/title_0.png' )" />
          <q-card-section>
            <div class="text-overline text-deep-orange-14">
              {{ item.subtitle }}
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ item.title }}
            </div>
            <div class="text-caption text-blue-grey-10">
              {{ item.preview }}
            </div> <br>
            <div class="text-caption text-grey">
              {{ item.srcnews }}
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn flat color="dark" label="" />
            <div class="labelDate">
              {{ item.datenews }}
            </div>
            <NewsCardDetailPopUp
              :PopyUpSubTitleNews="item.subtitle"
              :PopyUpSrcNews="item.srcnews"
              :PopyUpFullNews="item.fullnews"
              :PopyUpTitleNews="item.title"
            />
            <q-space />
          </q-card-actions>
        </q-card>
        <q-space />item.howWatch: {{ item.howWatch }} <br>
        <q-btn @click="howWatchUp(item.id)"/>
        <q-space />item.status: {{ item.status }} <br>
        <q-btn @click="statusResultCardOn(item.id)" @dblclick="statusResultCardOff(item.id)" label="on/off" color="primary" flat class="q-ml-sm" />
        <div class="blockResultCard">
          itemResultCardStatus: {{ item.resultCardStatus }} <br>
          itemTeam1: {{ item.resultCardTeam1 }} <br>
          itemTeam2: {{ item.resultCardTeam2 }} <br>
          itemItog: {{ item.resultCardTitle }} <br>
          itemResult: {{ item.ResultCardResult }} <br>
        </div>
      </li>
  </div>
</template>

<script>
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import NewsCardDetailPopUp from 'components/NewsCardDetailPopUp'
const baseURL = 'http://localhost:3001'

export default {
  components: { NewsCardDetailPopUp },
  name: 'ResultMatchAddDataTest',
  data () {
    return {
      items: [],
      itemNewsClubNewsCardFullNews: '',
      itemNewsClubNewsCardPreViewNews: '',
      itemNewsClubNewsCardTitleNews: '',
      itemNewsCardSubTitleNews: '',
      itemNewsClubNewsCardStatus: true,
      itemNewsClubNewsCardDateNews: '',
      itemNewsClubNewsCardCardNewsSrc: '',
      itemNewsClubNewsCardHowWatch: '',
      ResultCardStatus: true,
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      ResultCardResult: ''
    }
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/items`)
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
      await axios.patch(`${baseURL}/items/${id}`, {
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
      await axios.patch(`${baseURL}/items/${id}`, {
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
      await axios.patch(`${baseURL}/items/${id}`, {
        status: true
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.status = true
        }
        return item
      })
    },
    async statusItemOff (id) {
      await axios.patch(`${baseURL}/items/${id}`, {
        status: false
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.status = false
        }
        return item
      })
    },
    async statusResultCardOn (id) {
      await axios.patch(`${baseURL}/items/${id}`, {
        resultCardStatus: true
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.resultCardStatus = true
        }
        return item
      })
    },
    async statusResultCardOff (id) {
      await axios.patch(`${baseURL}/items/${id}`, {
        resultCardStatus: false
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.resultCardStatus = false
        }
        return item
      })
    },
    async howWatchUp (id) {
      await axios.put(`${baseURL}/items/${id}`, {
        howWatch: this.itemNewsClubNewsCardHowWatch++
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          this.item.howWatch = item.howWatch++
          console.log(item.howWatch)
        }
        return item
      })
    },
    removeItem (id) {
      axios.delete(`${baseURL}/items/${id}`)
      this.items = this.items.filter((item) => item.id !== id)
    },
    async addPost () {
      const res = await axios.post(`${baseURL}/items`, {
        title: this.itemNewsClubNewsCardTitleNews,
        status: this.itemNewsClubNewsCardStatus,
        subtitle: this.itemNewsCardSubTitleNews,
        preview: this.itemNewsClubNewsCardPreViewNews,
        fullnews: this.itemNewsClubNewsCardFullNews,
        datenews: this.itemNewsClubNewsCardDateNews,
        srcnews: this.itemNewsClubNewsCardCardNewsSrc,
        howWatch: this.itemNewsClubNewsCardHowWatch,
        resultCardStatus: this.ResultCardStatus,
        resultCardTitle: this.ResultCardTitle,
        resultCardTeam1: this.ResultCardTeam1,
        resultCardTeam2: this.ResultCardTeam2,
        result: this.ResultCardResult
      })
      this.items = [...this.items, res.data]
      this.itemNewsClubNewsCardFullNews = ''
      this.itemNewsClubNewsCardTitleNews = ''
      this.itemNewsClubNewsCardPreViewNews = ''
      this.itemNewsClubNewsCardStatus = ''
      this.itemNewsCardSubTitleNews = ''
      this.itemNewsClubNewsCardDateNews = ''
      this.itemNewsClubNewsCardCardNewsSrc = ''
      this.itemNewsClubNewsCardHowWatch = ''
      this.ResultCardStatus = ''
      this.itemTeam1 = ''
      this.itemTeam2 = ''
      this.ResultCardResult = ''
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
