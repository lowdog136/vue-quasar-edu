<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <Test2Comp />
  </div>
</template>

<script>

import Test2Comp from 'components/Test2Comp'
export default {
  name: 'test3',
  components: { Test2Comp },
  data () {
    return {
      tests: [],
      author1: ['Room view', 'Room service', 'Food'],
      author2: 'Room service',
      BtnName: 'pump',
      BtnSize: 'xs',
      tourCount: 0,
      count: '',
      items: []
    }
  },
  mounted () {
    // axios
    //   .post('http://localhost:3001/posts/', {
    //     id: '4',
    //     userId: '3',
    //     title: 'Article title4-1',
    //     body: 'Article body content44'
    //   })
    //   .then((response) => console.log(response))
    // axios
    //   .get('http://localhost:3001/posts')
    //   .then((response) => {
    //     this.posts = response.data
    //   })
  },
  setup () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
  .root
    width: 400px
    margin: 0 auto
    background-color: #fff
    padding: 30px
    margin-top: 100px
    border-radius: 20px
  input
    border: none
    outline: none
    border-bottom: 1px solid #ddd
    font-size: 1em
    padding: 5px 0
    margin: 10px 0 5px 0
    width: 100%
  button
    background-color: #3498db
    padding: 10px 20px
    margin-top: 10px
    border: none
    color: white
</style>
