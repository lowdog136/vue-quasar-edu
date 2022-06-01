<template>
  <div class="q-pa-md">
    <q-form>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input outlined v-model="v$.email.$model" label="Емайл" >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="login = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <q-input outlined v-model="password" label="Пароль" >
          <template v-slot:prepend>
            <q-icon name="fingerprint" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="password = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-btn class="q-mt-sm" label="Войти" @click="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  setup () {
    return {
      ph: ref(''),
      v$: useVuelidate()
    }
  },
  data () {
    return {
      password: '',
      email: ''
    }
  },
  validations () {
    return {
      password: { required, min: minLength(5) }, // Matches this.lastName
      email: { required, email } // Matches this.contact.email
    }
  }
}
</script>
