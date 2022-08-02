<template>
  <div class="q-pa-md row items-start q-gutter-md">
      <div>
        <nav>
          <router-link to="/"> Home </router-link> |
          <router-link to="/feed"> Feed </router-link> |
          <router-link to="/Test2"> Register </router-link> |
          <router-link to="/sign-in"> Login </router-link> |
        </nav>
        <router-view />
      </div>
    <div>
        <h2>Sign Up</h2>
        {{ email }} {{ password }}
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p>
          <input type="password" placeholder="Password" v-model="password" />
        </p>
        <p class="error-message" v-show="password.length < 6">
          The password must be at least 6 characters
        </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'trest3',
  components: { },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {},
  setup () {
    return {
      titleMainEvent: 'Новости сайта. Релизы.',
      count: 0,
      prDate: '25 may 2022'
    }
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
