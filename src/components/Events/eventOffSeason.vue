<template>
  <div class="q-pa-sm wrap rounded-borders">
    <q-item>
      <q-timeline color="secondary">
        <q-timeline-entry heading>
          <div class="title" style="color: #ae0000">
            {{ title }}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'eventOffSeason',
  components: {},
  data () {
    return {
      title: 'Сезон 2024 окончен'
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.title
  font-size: 28px
  text-align: center
  color: #2c3e50
.my-card
  width: 100%
  max-width: 350px
</style>
