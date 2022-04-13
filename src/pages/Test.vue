<template>
  <div class="Input">
    <AddNews />
  </div>
  <div class="checkBox">
    <AddResult />
  </div>
  <div class="profile">
    <h1>{{ firstName }} {{ lastName }}</h1>
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
  props () {
    return {
      message: String,
      NewsClubNewsCardCardNewsSrc: String,
      NewsClubNewsCardPreViewNews: String,
      NewsClubNewsCardExtNews: String,
      NewsClubNewsCardTitleUrlImg: String,
      NewsCardStatusMatch_F: String,
      NewsCardStatusMatch_O: String,
      dateNews: String,
      NewsClubNewsCardDateNews: String,
      TitleNewsCard: String,
      NewsClubNewsCardFullNews: String,
      NewsClubNewsCardFullNews2: String,
      NewsClubNewsAnnounce: String,
      NewsClubNewsCardTitleNews: String
    }
  }
}
</script>
