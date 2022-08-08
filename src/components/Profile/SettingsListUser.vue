<template>
  <q-list padding>
    <q-item-label header>Настройки</q-item-label>
    <q-item to="/User/ProfilePage">
      <q-item-section avatar>
        <q-icon color="primary" name="account_circle" />
      </q-item-section>
      <q-item-section>Профиль</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'SettingsListUser'
}
</script>

<style scoped>

</style>
