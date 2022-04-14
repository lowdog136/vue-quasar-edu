<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'AddUserName',
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          lastName: String,
          firstName: String,
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
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<style scoped>

</style>
