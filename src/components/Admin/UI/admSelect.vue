<template>
  <q-select
    :model-value="modelValue"
    :options="options"
    :name="selectName"
    :color="selectColor"
    filled
    clearable
    :label="selectLabel"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script>
export default {
  name: 'admSelect',
  data () {
    return {
      btnColor: '#3498db'
    }
  },
  props: {
    modelValue: [String, Number, Array],
    options: Array,
    selectName: String,
    selectColor: String,
    selectLabel: String
  },
  emits: ['update:modelValue']
}
</script>

<style lang="sass" scoped>
</style>
