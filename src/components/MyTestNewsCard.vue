<template>
  <div class="container">
    <ul>
      <li
        v-for="item of items"
        :key="item.id"
      ><br>
        itemTitle: {{ item.title }} --
        itemStatus: {{ item.status }} --
        itemTeam1: {{ item.team1 }} --
        itemTeam2: {{ item.team2 }} --
        itemResult: {{ item.result }} --
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
      itemStatus: '',
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
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
.container {
  background-color: #24e02dd2;
  max-width: 400px;
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
