<template>
  <div class="q-px-lg q-pb-md">
    <eventCupSZFO />
    <eventSZFO />
  </div>
</template>

<script>
import eventSZFO from 'components/Events/eventSZFO'
import eventCupSZFO from 'components/Events/eventCupSZFO'

export default {
  components: { eventSZFO, eventCupSZFO }
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
