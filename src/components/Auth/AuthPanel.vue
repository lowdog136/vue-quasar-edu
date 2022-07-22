<template>
  <div class="q-pa-md">
    <q-btn class="q-mt-sm" label="Войти" @click=toggleLogMode color="primary"/>
    <q-btn class="q-mt-sm" label="Регистрация" @click="!regMode" color="primary"/>
    <q-form v-if=logMode>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input outlined v-model="login_form.email" type="email" label="Емайл" >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="login_form.email = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input outlined v-model="login_form.password" type="password" label="Пароль" >
          <template v-slot:prepend>
            <q-icon name="fingerprint" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="login_form.password = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-btn class="q-mt-sm" label="Войти" @click="login" color="primary"/>
      </div>
    </q-form>
    <br />
    <q-separator dark />
    <q-form v-if=regMode>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input outlined v-model="login_form.email" type="email" label="Емайл" >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="login_form.email = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input outlined v-model="login_form.password" type="password" label="Пароль" >
          <template v-slot:prepend>
            <q-icon name="fingerprint" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="login_form.password = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-btn class="q-mt-sm" label="Регистрация" @click="login" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AuthPanel',
  setup: function () {
    const state = reactive({})
    // eslint-disable-next-line camelcase
    const login_form = ref({})
    // eslint-disable-next-line camelcase
    const login = () => {
      store.dispatch('login', login_form.value)
    }
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })

    return {
      text: ref(''),
      logMode: ref(true),
      regMode: ref(false),
      state,
      login_form,
      login
    }
  },
  methods: {}
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

.input
  border: none
  outline: none
  border-bottom: 1px solid #ddd
  font-size: 1em
  padding: 5px 0
  margin: 10px 0 5px 0
  width: 100%

.button
  background-color: #3498db
  padding: 10px 20px
  margin-top: 10px
  border: none
  color: white
</style>
