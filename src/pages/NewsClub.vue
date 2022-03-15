<template>
 <NewsCard />
</template>

<script>
import { ref } from 'vue'
import NewsCard from 'components/NewsCard'

export default {
  components: { NewsCard },
  setup () {
    return {
      expanded: ref(false),
      statusMatch_1: 'Товарищеский матч',
      statusMatch_2: 'Официальный матч',
      lorem1: 'В минувшее воскресенье ФК "Север" провел гостевой товарищеский матч против ФК "Динамо" Санкт-Питербург. Матч закончился победой хозяев со счетом 4-2.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
