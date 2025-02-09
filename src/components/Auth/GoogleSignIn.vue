<template>
  <div>
    <div v-if="user">
      <p>Добро пожаловать, {{ user.displayName }}</p>
      <button @click="logout">Выход</button>
    </div>
    <div v-else>
      <button @click="loginWithGoogle">Войти с Google</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, GoogleAuthProvider } from 'src/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
export default {
  setup () {
    const logout = async () => {
      // await signOut(auth) с этим не работает
      await auth.signOut()
      user.value = null
      localStorage.removeItem('user') // Удалить пользователя из localStorage
    }
    const user = ref(null)
    const loginWithGoogle = async () => {
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(auth, provider)
        user.value = result.user
        localStorage.setItem('user', JSON.stringify(user.value)) // Сохранить пользователя в localStorage
        console.log('User info:', user.value)
      } catch (error) {
        console.error('Error during login:', error)
      }
    }
    onMounted(() => {
      // Проверка состояния авторизации при загрузке компонента
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          user.value = currentUser
          localStorage.setItem('user', JSON.stringify(user.value))
        } else {
          user.value = null
          localStorage.removeItem('user')
        }
      })
    })

    return { user, loginWithGoogle, logout, signOut }
  }
}

</script>
<style scoped lang="sass">
</style>
