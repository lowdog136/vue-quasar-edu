<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            CarrotPage-Админка
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 1" :key="n">
            <ResultMatchAddData />
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  <div class="container">
    <div id="app">
      <h1>Shopping List</h1>
      <input v-model="itemName" type="text" /><br />
      <input v-model="itemBody" type="text" /><br />
      <button @click="addPost()">Add Item</button> <br>
    </div>
    <ul>
      <li
        v-for="item of items"
        :class="{ bought: item.bought }"
        :key="item.id"
        @click="boughtItem(item.id)"
        @dblclick="removeItem(item.id)"
      >
        {{ item.name }} {{item.body}}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ResultMatchAddData from 'components/ResultMatchAddData'
import axios from 'axios'

export default defineComponent({
  name: 'CarrotPage',
  components: { ResultMatchAddData },
  data () {
    return {
      items: [],
      itemName: '',
      itemBody: ''
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
        body: this.itemBody
      })
      this.items = [...this.items, res.data]
      this.itemName = ''
      this.itemBody = ''
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
