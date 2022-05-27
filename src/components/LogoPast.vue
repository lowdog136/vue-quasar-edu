<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-input outlined v-model="login" label="Логин" >
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
      <q-btn class="q-mt-sm" label="Войти" @click="reset" color="primary"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      login: ref(''),
      password: ref(''),
      ph: ref('')
    }
  }
}
</script>
