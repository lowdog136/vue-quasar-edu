<template>
  <q-list padding>
    <q-item-label header>Настройки</q-item-label>
    <q-item to="/User/ProfilePage">
      <q-item-section avatar>
        <q-icon color="primary" :name=settingLists[0].icon />
      </q-item-section>
      <q-item-section>{{ settingLists[0].name }}</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/Admin/TomatAdminPage">
      <q-item-section avatar>
        <q-icon color="primary" :name=settingLists[2].icon />
      </q-item-section>
      <q-item-section>{{ settingLists[2].name }}</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/Admin/CarrotAdminPage">
      <q-item-section avatar>
        <q-icon color="primary" name="admin_panel_settings" />
      </q-item-section>
      <q-item-section>{{ settingLists[1].name }}</q-item-section>
    </q-item>
    <q-separator spaced inset />
    <q-item to="/" @click="$store.dispatch('logout')" >
      <q-item-section avatar>
        <q-icon color="primary" name="logout" />
      </q-item-section>
      <q-item-section>{{ settingLists[3].name }}</q-item-section>
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
        name: 'AdminPageE',
        icon: 'admin_panel_settings',
        to: '/Admin/CarrotAdminPage'
      },
      {
        id: 3,
        name: 'AdminPage',
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
