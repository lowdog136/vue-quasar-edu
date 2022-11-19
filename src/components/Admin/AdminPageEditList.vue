<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-item >
      <q-item-section avatar>
        <q-icon color="primary" name="edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Редактировать архив игр:</q-item-label>
        <q-item-label caption>
          Set the content filtering level to restrict
          apps that can be downloaded
        </q-item-label>
      </q-item-section>
      <q-item-section side >
        <q-toggle color="red" v-model:product_data="notifProf1" val="picture" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'AdminPageEditList',
  setup () {
    return {
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          notifProf1: Boolean
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
