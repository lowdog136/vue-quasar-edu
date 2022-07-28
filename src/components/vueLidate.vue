<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="root">
      <h5>Create an Account</h5>
      <p>
        <input type="text" placeholder="Email" v-model="state.email" />
        <span v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          v-model="state.password.password"
        />
        <span v-if="v$.password.password.$error">
        {{ v$.password.password.$errors[0].$message }}
      </span>
      </p>
      <p>
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="state.password.confirm"
        />
        <span v-if="v$.password.confirm.$error">
        {{ v$.password.confirm.$errors[0].$message }}
      </span>
      </p>
      <button @click="submitForm">Submit</button>
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: 'vueLidate',
  setup: function () {
    const state = reactive({
      email: '',
      password: {
        password: '',
        confirm: ''
      }
    })

    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: { required, sameAs: sameAs(state.password.password) }
        }
      }
    }
    )

    const v$ = useValidate(rules, state)
    return {
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
