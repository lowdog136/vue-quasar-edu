<template>
  <div class="container">
    <div id="app">
      <h4>Добавить новость:</h4>
      <p> Статус новости. Показывать или нет
        <input v-model="itemNewsClubNewsCardStatus" type="text" placeholder="false or true"/><br/>
      </p>
      <p>предЗаголовок - победа,ничья, поражение, анонс
        <input v-model="itemNewsCardAnnounceNews" type="text" placeholder="itemTitle"/><br />
      </p>
      <input v-model="itemTitle" type="text" placeholder="itemTitle"/><br />
      <input v-model="itemStatus" type="text" placeholder="itemStatus"/><br />
      <input v-model="itemTeam1" type="text" placeholder="itemTeam1"/><br />
      <input v-model="itemTeam2" type="text" placeholder="itemTeam2"/><br />
      <input v-model="itemResult" type="text" placeholder="itemResult"/><br />
      <input v-model="itemTitle" type="text" placeholder="itemTitle"/><br />
      <input v-model="itemTitle" type="text" placeholder="itemTitle"/><br />
      <input v-model="itemStatus" type="text" placeholder="itemStatus"/><br />
      <input v-model="itemTeam1" type="text" placeholder="itemTeam1"/><br />
      <input v-model="itemTeam2" type="text" placeholder="itemTeam2"/><br />
      <input v-model="itemResult" type="text" placeholder="itemResult"/><br />
      <button @click="addPost()">Add Item</button> <br>
    </div>
    <ul>
      <li
        v-for="item of items"
        :class="{ bought: item.bought }"
        :key="item.id"
        @click="boughtItem(item.id)"
        @dblclick="removeItem(item.id)"
      ><br>
        <h4>Удалить новость: {{ item.id }}</h4>
        itemTitle: {{ item.title }} <br>
        itemStatus: {{ item.status }} <br>
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
      itemTitle: '',
      itemNewsCardAnnounceNews: '',
      itemNewsClubNewsCardStatus: '',
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
        title: this.itemTitle,
        status: this.itemNewsClubNewsCardStatus,
        preview: this.itemNewsCardAnnounceNews,
        team1: this.itemTeam1,
        team2: this.itemTeam2,
        result: this.itemResult
      })
      this.items = [...this.items, res.data]
      this.itemName = ''
      this.itemBody = ''
      this.itemTitle = ''
      this.itemNewsClubNewsCardStatus = ''
      this.itemNewsCardAnnounceNews = ''
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
