<template>
  <div>InsertValue1: {{ InsertValue1 }}</div>
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="InsertValue1" />
  <label for="mike">Mike</label>

  <input type="checkbox" id="mark" value="mark" v-model="InsertValue1" />
  <label for="mark">mark</label>
</template>

<script>
export default {
  name: 'AddResult',
  data () {
    return {
      checkedNames: [],
      InsertValue1: []
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
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
  }
}
</script>

<style scoped>

</style>
