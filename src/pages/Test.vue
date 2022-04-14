<template>
  <div class="Input">
    <AddNews />
  </div>
  <div class="checkBox">
    <AddResult />
  </div>
  <div class="profile">
    <div class="text-h5 q-mt-sm q-mb-xs">{{ product_data.ResultCardTitle }}</div>
    <h1>{{ product_data.NewsClubNewsCardTitleNews }} {{ lastName }}</h1>
    <AddUserName
      v-model:first-name="firstName"
      v-model:last-name="lastName"
    />
  </div>
</template>
<script>
import AddNews from 'components/AddNews'
import AddResult from 'components/AddResult'
import AddUserName from 'components/AddUserName'

export default {
  components: { AddUserName, AddResult, AddNews },
  data () {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          NewsClubNewsCardStatus: String,
          NewsClubNewsCardCardNewsSrc: String,
          NewsClubNewsCardPreViewNews: String,
          NewsClubNewsCardExtNews: String,
          NewsClubNewsCardTitleUrlImg: String,
          dateNews: String,
          NewsClubNewsCardDateNews: String,
          TitleNewsCard: String,
          NewsClubNewsCardFullNews: String,
          NewsClubNewsCardFullNews2: String,
          NewsClubNewsCardTitleNews: String
        }
      }
    }
  }
}
</script>
