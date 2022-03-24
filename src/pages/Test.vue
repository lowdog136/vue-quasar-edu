<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <NewsCard v-for="product in products"
                  :key="product.name"
                  :product_data="product"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewsCard from 'components/NewsCard'

export default {
  components: { NewsCard },
  data () {
    return {
      products: [
        {
          id: '1',
          name: 'title_1.png',
          article: 't1'
        },
        {
          id: '2',
          name: 'Name2',
          article: 't2'
        },
        {
          id: '3',
          name: 'Name3',
          article: 't3'
        }
      ]
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
