<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list>
      <q-item-section>{{ greetingTitle }}</q-item-section>
      <q-separator/>
      <div>
        <q-item>{{ greetingAuthor }}</q-item>
      </div>
      <q-separator/>
      <div>
        <q-item>{{ greetingBody }}</q-item>
      </div>
      <q-separator/>
      <div>
        <q-item>{{ greetingDate }}</q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'TestListComp',
  props: {
    greetingAuthor: String,
    greetingBody: String,
    greetingTitle: String,
    greetingDate: String
  }
}
</script>

<style scoped>

</style>
