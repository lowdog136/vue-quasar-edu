<template>
  <div class="showPost">
    <q-btn @click="onClick()">{{ text }}</q-btn>
  </div>
</template>
<script>
export default {
  name: 'TestComp',
  props: {
    text: String
  },
  methods: {
    onClick () {
      this.$emit('btn-click')
    }
  }
}
</script>
