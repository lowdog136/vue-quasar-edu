<template>
  <div class="container">
    <div id="app">
      <h4>Добавить новость:</h4>
      <q-separator/>
      <p> Статус новости. Показывать или нет<br/>
        <input v-model="itemNewsClubNewsCardStatus" type="text" placeholder="false or true"/><br/>
      </p>
      <p>предЗаголовок - победа,ничья, поражение, анонс<br/>
        <input v-model="itemNewsCardAnnounceNews" type="text" placeholder="itemTitle"/><br />
      </p>
      <p>Заголовок новости<br/>
        <input v-model="itemNewsClubNewsCardTitleNews" type="text" placeholder="itemTitle"/>
      </p>
      <p>предТекстНовости - превью. 2-3 предложения<br/>
        <input v-model="itemNewsClubNewsCardPreViewNews" type="text" placeholder="itemStatus"/>
      </p>
      <p>Текст - основной текст. полный. работает по кнопке подробно<br/>
        <input v-model="itemNewsClubNewsCardFullNews" type="text" placeholder="itemTitle"/>
      </p>
      <p>раскрТекст - текст показывающий при раскрытии.чуть больше чем в предТекстНовости<br/>
        <input v-model="itemNewsClubNewsCardExtNews" type="text" placeholder="itemTitle"/>
      </p>
      <p>датаНовости<br />
        <input v-model="itemNewsClubNewsCardDateNews" type="date" placeholder="датаНовости"/>
      </p>
      <p>источник новости<br />
        <input v-model="itemNewsClubNewsCardCardNewsSrc" type="url" placeholder="датаНовости"/>
      </p>
      <q-separator/>
      <p> Данные для страницы с итогами матча<br />
        <input v-model="itemTeam1" type="text" placeholder="itemTeam1"/><q-space/>
        <input v-model="itemTeam2" type="text" placeholder="itemTeam2"/><q-space/>
        <input v-model="itemResult" type="text" placeholder="itemResult"/><br />
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
        itemTitle: {{ item.title }} <br>
        itemStatus: {{ item.status }} <br>
        item.preview: {{ item.preview }} <br>
        item.fullnews: {{ item.fullnews }} <br>
        item.extnews: {{ item.extnews }} <br>
        item.datenews: {{ item.datenews }} <br>
        item.srcnews: {{ item.srcnews }} <br>
        itemTeam1: {{ item.team1 }} <br>
        itemTeam2: {{ item.team2 }} <br>
        itemResult: {{ item.result }} <br>
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
      itemName: '',
      itemBody: '',
      itemNewsClubNewsCardFullNews: '',
      itemNewsClubNewsCardPreViewNews: '',
      itemNewsClubNewsCardTitleNews: '',
      itemNewsCardAnnounceNews: '',
      itemNewsClubNewsCardExtNews: '',
      itemNewsClubNewsCardStatus: '',
      itemNewsClubNewsCardDateNews: '',
      itemNewsClubNewsCardCardNewsSrc: '',
      itemTeam1: '',
      itemTeam2: '',
      itemResult: ''
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
        name: this.itemName,
        body: this.itemBody,
        title: this.itemNewsClubNewsCardTitleNews,
        status: this.itemNewsClubNewsCardStatus,
        preview: this.itemNewsCardAnnounceNews,
        fullnews: this.itemNewsClubNewsCardFullNews,
        extnews: this.itemNewsClubNewsCardExtNews,
        datenews: this.itemNewsClubNewsCardDateNews,
        srcnews: this.itemNewsClubNewsCardCardNewsSrc,
        team1: this.itemTeam1,
        team2: this.itemTeam2,
        result: this.itemResult
      })
      this.items = [...this.items, res.data]
      this.itemName = ''
      this.itemBody = ''
      this.itemNewsClubNewsCardFullNews = ''
      this.itemNewsClubNewsCardTitleNews = ''
      this.itemNewsClubNewsCardStatus = ''
      this.itemNewsCardAnnounceNews = ''
      this.itemNewsClubNewsCardDateNews = ''
      this.itemNewsClubNewsCardExtNews = ''
      this.itemNewsClubNewsCardCardNewsSrc = ''
      this.itemTeam1 = ''
      this.itemTeam2 = ''
      this.itemResult = ''
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
  background-color: #24e02dd2;
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
