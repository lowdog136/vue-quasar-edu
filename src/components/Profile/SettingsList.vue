<template>
  <q-list padding>
    <q-item-label header>Настройки</q-item-label>
    <q-item to="/User/ProfilePage">
      <q-item-section avatar>
        <q-icon color="primary" name="account_circle" />
      </q-item-section>
      <q-item-section>Профиль</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/Admin/CarrotAdminPage">
      <q-item-section avatar>
        <q-icon color="primary" name="admin_panel_settings" />
      </q-item-section>
      <q-item-section>CarrotAdminPage</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/" @click="$store.dispatch('logout')" >
      <q-item-section avatar>
        <q-icon color="primary" name="logout" />
      </q-item-section>
      <q-item-section>Выйти</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'SettingsList'
}
</script>

<style scoped>

</style>
