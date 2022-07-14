<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-list v-if="greetingDone">
      <q-item-section>{{ greetingTitle }}</q-item-section>
      <q-separator/>
      <div>
        <q-item>{{ greetingAuthor }}</q-item>
      </div>
      <q-separator/>
      <div>
        <q-item>{{ greetingBody }}
          <div>
            <q-btn @click=greetingBtn />
          </div>
        </q-item>
      </div>
      <q-separator/>
      <div>
        <q-item>{{ greetingDate }} </q-item>
      </div>
      <div>
        <q-item>{{ greetingCount }} </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'TestListComp',
  props: {
    greetingAuthor: String,
    greetingBtn: Function,
    greetingBody: String,
    greetingTitle: String,
    greetingDone: Boolean,
    greetingDate: String,
    greetingCount: String
  }
}
</script>

<style scoped>

</style>
