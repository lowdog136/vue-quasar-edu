<template>
  <div class="q-gutter-y-md column" style="max-width: 300px">
    <div v-if=logMode>
      <h5>
        Не зарегистрированы?
        <div>
          <q-btn class="q-mt-sm" label="Регистрация" @click="changeMode" color="primary"/>
        </div>
      </h5>

    </div>
<!--    Вход-->
    <q-form v-if=logMode>
      <div class="q-gutter-y-md column" style="max-width: 300px">
          Вход в профиль:
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
        <q-btn class="q-mt-sm" label="googleAuth" @click="signIn" color="primary"/>
        <div v-if="isLogin" class="login">
          <Avatar :src="user.photoURL" />
          <button class="text-gray-400 hover:text-white" @click="signOut">
            Sign Out
          </button>
        </div>

        <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">
          Sign in
        </button>
      </div>
    </q-form>
    <br />
    <q-separator dark />
<!--    Регистрация-->
    <q-form v-if=!logMode>
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <div class="text-h6">
          <q-list>
            <q-item >
              <q-item-section>
                <q-item-label>Регистрация
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section>
                <q-item-label>введите свой email в качестве логина и придумайте пароль.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
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
        <div class="text-h6">
          <q-list>
            <q-item >
              <q-item-section v-show="login_form.password.length < 8">
                <q-item-label style="color: #ae0000">{{ sitePasswordCheck }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section>
                <q-item-label>
                  <q-toggle v-model="accept" :label="`${ siteRuleCheck }`" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <q-btn v-if="accept" class="q-mt-sm" label="Регистрация" @click="register" color="primary"/>
          <q-btn class="q-mt-sm" label="Вернуться" @click="changeMode" color="primary"/>
        </div>

      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue'
import { useAuthStore } from '../stores/auth'
import { auth } from '../../firebase'

export default {
  name: 'AuthPanel',
  data () {
    return {}
  },
  setup: function () {
    const authStore = useAuthStore()
    const state = reactive({})
    // eslint-disable-next-line camelcase
    const register_form = ref({})
    // eslint-disable-next-line camelcase
    const login_form = ref({})
    // eslint-disable-next-line camelcase
    const login = () => {
      store.dispatch('login', login_form.value)
    }
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    const register = () => {
      store.dispatch('login', register_form.value)
    }
    const accept = ref(false)
    const { user, isLogin, signOut, signIn } = auth
    return {
      siteRuleCheck: 'Согласиться с правилами сайта',
      sitePasswordCheck: 'Минимальная длина пароля 8 символов',
      text: ref(''),
      logMode: ref(true),
      state,
      login_form,
      register_form,
      login,
      user,
      isLogin,
      signOut,
      signIn,
      register,
      accept
    }
  },
  methods: {
    changeMode () {
      this.logMode = !this.logMode
      console.log('changeMode', this.logMode)
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
