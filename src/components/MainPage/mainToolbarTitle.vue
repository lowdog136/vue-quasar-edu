<template>
  <div >
    <q-toolbar class="text-white">
      <q-toolbar-title>
        <q-avatar>
          <img alt='10 year logo' src="../../assets/image/anniversary.png" />
        </q-avatar>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<style scoped lang="sass">

</style>
<script setup>
import { ref } from 'vue'

const title = ref('SeverFans(ru)')
</script>
