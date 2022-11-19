<template>
  <q-list padding>
    <q-item-label header>Настройки</q-item-label>
    <q-item to="/User/ProfilePage">
      <q-item-section avatar>
        <q-icon color="primary" name="account_circle" />
      </q-item-section>
      <q-item-section>{{ settingLists[0].name }}</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/Admin/TomatAdminPage">
      <q-item-section avatar>
        <q-icon color="primary" name="admin_panel_settings" />
      </q-item-section>
      <q-item-section>AdminPage</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/Admin/CarrotAdminPage">
      <q-item-section avatar>
        <q-icon color="primary" name="admin_panel_settings" />
      </q-item-section>
      <q-item-section>AdminPageE</q-item-section>
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
  name: 'SettingsList',
  setup () {
    const settingLists = [
      {
        id: 1,
        name: 'Профиль',
        icon: 'account_circle',
        to: '/User/ProfilePage'
      },
      {
        id: 2,
        name: 'CarrotAdminPage',
        icon: 'admin_panel_settings',
        to: '/Admin/CarrotAdminPage'
      },
      {
        id: 3,
        name: 'TomatAdminPage',
        icon: 'admin_panel_settings',
        to: '/Admin/TomatAdminPage'
      },
      {
        id: 4,
        name: 'Выйти',
        icon: 'logout',
        to: '/'
      }]
    return {
      settingLists
    }
  }
}
</script>

<style scoped>

</style>
