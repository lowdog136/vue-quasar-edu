<template>
  <div class="container">
    <div id="app">
      <h4>Добавить новость:</h4>
      <q-separator/>
      <p> Статус новости. Показывать или нет<br/>
        <input v-model="itemNewsClubNewsCardStatus" type="text" placeholder="false or true"/><br/>
      </p>
      <p>предЗаголовок - победа,ничья, поражение, анонс<br/>
        <input v-model="itemNewsCardSubTitleNews" type="text" placeholder="subtitle"/><br />
      </p>
      <p>Заголовок новости<br/>
        <input v-model="itemNewsClubNewsCardTitleNews" type="text" placeholder="itemTitle"/>
      </p>
      <p>предТекстНовости - превью. 2-3 предложения<br/>
        <input v-model="itemNewsClubNewsCardPreViewNews" type="text" placeholder="itemStatus"/>
      </p>
      <p>Текст - основной текст. полный. работает по кнопке подробно<br/>
        <input v-model="itemNewsClubNewsCardFullNews" type="text" placeholder="полный текст"/>
      </p>
      <p>датаНовости<br />
        <input v-model="itemNewsClubNewsCardDateNews" type="date" placeholder="датаНовости"/>
      </p>
      <p>источник новости<br />
        <input v-model="itemNewsClubNewsCardCardNewsSrc" type="url" placeholder="Источник новости"/>
      </p>
      <q-separator/>
      <p> Данные для страницы с итогами матча<br />
        <input v-model="ResultCardTitle" type="text" placeholder="ResultCardTitle"/><q-space/>
        <input v-model="ResultCardTeam1" type="text" placeholder="ResultCardTeam1"/><q-space/>
        <input v-model="ResultCardTeam2" type="text" placeholder="ResultCardTeam2"/><q-space/>
        <input v-model="ResultCardResult" type="text" placeholder="ResultCardResult"/><br />
      </p>
      <button @click="addPost()">Add Item</button> <br>
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
