<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-md">
      <h4>Вход в систему</h4>

      <q-card class="auth-card">
        <q-card-section>
          <q-form @submit="handleSignIn" class="q-gutter-md">
            <q-input
              v-model="email"
              label="Email"
              type="email"
              :rules="[val => !!val || 'Email обязателен']"
            />

            <q-input
              v-model="password"
              label="Пароль"
              type="password"
              :rules="[val => !!val || 'Пароль обязателен']"
            />

            <div class="row q-gutter-md">
              <q-btn
                label="Войти"
                type="submit"
                color="primary"
                :loading="loading"
              />

              <q-btn
                label="Войти через Google"
                @click="handleGoogleSignIn"
                color="secondary"
                :loading="loading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-btn
        label="Продолжить без входа"
        @click="continueWithoutAuth"
        flat
        color="grey"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from 'src/firebase'

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    const handleSignIn = async () => {
      if (!email.value || !password.value) return

      loading.value = true
      try {
        await authStore.login({ email: email.value, password: password.value })
        router.push('/')
      } catch (error) {
        console.error('Ошибка входа:', error)
      } finally {
        loading.value = false
      }
    }

    const handleGoogleSignIn = async () => {
      loading.value = true
      try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        router.push('/')
      } catch (error) {
        console.error('Ошибка входа через Google:', error)
      } finally {
        loading.value = false
      }
    }

    const continueWithoutAuth = () => {
      authStore.setGuestMode()
      router.push('/')
    }

    return {
      email,
      password,
      loading,
      handleSignIn,
      handleGoogleSignIn,
      continueWithoutAuth
    }
  }
})
</script>

<style scoped>
.auth-card {
  min-width: 300px;
}
</style>
