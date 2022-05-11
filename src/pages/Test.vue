<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <MyTestNewsCard
      v-for="NewsClubNewsCardS in $store.state.NewsClubNewsCard.slice(id).reverse()"
      :key="NewsClubNewsCardS.id"
      :product_data="NewsClubNewsCardS"
    />
    <q-card class="my-card" flat>
      <q-card-section flat>
      </q-card-section>
    </q-card>
    <ul>eee
      <li
        v-for="item of items"
        :class="{ bought: item.bought }"
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
import { ref } from 'vue'
import MyTestNewsCard from 'components/MyTestNewsCard'
import axios from 'axios'

export default {
  components: { MyTestNewsCard },
  props: {
    NewsClubNewsCardStatus: String
  },
  data () {
    return {
      items: []
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
    return {
      expanded: ref(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
