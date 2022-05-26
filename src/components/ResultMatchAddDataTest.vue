<template>
  <div class="container">
    <div id="app">
      <h5>Добавить новость:</h5>
      <q-separator/>
      <p>
        <q-input
          filled
          v-model='itemNewsClubNewsCardStatus'
          label=""
          hint="Статус новости. Показывать или нет/false or true"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='itemNewsCardSubTitleNews'
          label=""
          hint="subtitle.предЗаголовок - победа,ничья, поражение, анонс"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='itemNewsClubNewsCardTitleNews'
          label=""
          hint="Заголовок новости: Товарищеский матч, официальный матч"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='itemNewsClubNewsCardPreViewNews'
          label=""
          hint="itemStatus.предТекстНовости - превью. 2-3 предложения"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='itemNewsClubNewsCardFullNews'
          label=""
          hint="Текст - основной текст. полный. работает по кнопке подробно"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
      <p>
        <q-input
          filled
          v-model='itemNewsClubNewsCardDateNews'
          label=""
          hint="датаНовости"
          type="date"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
      </p>
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
          v-model='ResultCardStatus'
          label=""
          hint="Показывать карточку с результатом матча или нет"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardTitle'
          label=""
          hint="ResultCardTitle"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardTeam1'
          label=""
          hint="ResultCardTeam1"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardTeam2'
          label=""
          hint="ResultCardTeam2"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <q-space/><br>
        <q-input
          filled
          v-model='ResultCardResult'
          label=""
          hint="ResultCardResult"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Заполните поле']"
        />
        <br />
      </p>
      <div class="bottom">
        <button @click="addPost()" color="primary">Добавить</button>
        <button @click="onReset" color="primary">Очистить форму</button>
      </div>
    </div>
    <ul>
      <li
        v-for="item of items"
        :class="{ bought: item.bought }"
        :key="item.id"
        @click="boughtItem(item.id)"
        @dblclick="removeItem(item.id)"
      ><br><q-separator/>
        <h4>Удалить новость: {{ item.id }}</h4>
        item.title: {{ item.title }} <br>
        item.status: {{ item.status }} <br>
        item.subtitle: {{ item.subtitle }} <br>
        item.preview: {{ item.preview }} <br>
        item.fullnews: {{ item.fullnews }} <br>
        item.datenews: {{ item.datenews }} <br>
        item.srcnews: {{ item.srcnews }} <br>
        itemResultCardStatus: {{ item.resultCardStatus }} <br>
        itemTeam1: {{ item.resultCardTeam1 }} <br>
        itemTeam2: {{ item.resultCardTeam2 }} <br>
        itemItog: {{ item.resultCardTitle }} <br>
        itemResult: {{ item.ResultCardResult }} <br>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
export default {
  name: 'ResultMatchAddDataTest',
  data () {
    return {
      items: [],
      itemNewsClubNewsCardFullNews: '',
      itemNewsClubNewsCardPreViewNews: '',
      itemNewsClubNewsCardTitleNews: '',
      itemNewsCardSubTitleNews: '',
      itemNewsClubNewsCardStatus: '',
      itemNewsClubNewsCardDateNews: '',
      itemNewsClubNewsCardCardNewsSrc: '',
      ResultCardStatus: '',
      ResultCardTitle: '',
      ResultCardTeam1: '',
      ResultCardTeam2: '',
      ResultCardResult: ''
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3000/items')
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
      await axios.patch(`http://localhost:3000/items/${id}`, {
        bought: true
      })
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.bought = true
        }
        return item
      })
    },
    removeItem (id) {
      axios.delete(`http://localhost:3000/items/${id}`)
      this.items = this.items.filter((item) => item.id !== id)
    },
    async addPost () {
      const res = await axios.post('http://localhost:3000/items', {
        title: this.itemNewsClubNewsCardTitleNews,
        status: this.itemNewsClubNewsCardStatus,
        subtitle: this.itemNewsCardSubTitleNews,
        preview: this.itemNewsClubNewsCardPreViewNews,
        fullnews: this.itemNewsClubNewsCardFullNews,
        datenews: this.itemNewsClubNewsCardDateNews,
        srcnews: this.itemNewsClubNewsCardCardNewsSrc,
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
