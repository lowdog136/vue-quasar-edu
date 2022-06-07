<template>
  <div class="q-pa-md">
    <q-form>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input outlined v-model="state.email" label="Емайл" >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="state.email = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-badge v-if="v$.email.$error" color="teal">{{ v$.email.$errors[0].$message }}</q-badge>

        <q-input outlined v-model="state.password.password" type="password" label="Пароль" >
          <template v-slot:prepend>
            <q-icon name="fingerprint" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="state.password.password = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-badge v-if="v$.password.password.$error" color="teal">{{ v$.password.password.$errors[0].$message }}</q-badge>

        <q-input outlined v-model="state.password.confirm" type="password" label="Подтверждение пароля" >
          <template v-slot:prepend>
            <q-icon name="fingerprint" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="state.password.confirm = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-badge v-if="v$.password.confirm.$error" color="teal">{{ v$.password.confirm.$errors[0].$message }}</q-badge>

        <q-btn class="q-mt-sm" label="Войти" @click="submitForm" color="primary"/>
        <button @click="$store.dispatch('logout')">Logout</button>
      </div>
    </q-form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import useValidate from '@vuelidate/core'
import { useStore } from 'vuex'

export default {
  name: 'LogoPast',
  setup: function () {
    const state = reactive({
      email: '',
      password: {
        password: '',
        confirm: ''
      }
    })
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })

    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: { required, sameAs: sameAs(state.password.password) }
        }
      }
    })

    const v$ = useValidate(rules, state)
    return {
      text: ref(''),
      state,
      v$
    }
  },
  methods: {
    submitForm () {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
        alert('Form successfully submitted.')
      } else {
        alert('Form failed validation')
      }
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
