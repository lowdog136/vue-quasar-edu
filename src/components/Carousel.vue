<template>
  <div class="q-pa-md">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      autoplay="6500"
      height="600px"
    >
      <q-carousel-slide :name="1" img-src="~assets/carousel/1.jpg" />
      <q-carousel-slide :name="2" img-src="~assets/carousel/2.jpg" />
      <q-carousel-slide :name="3" img-src="~assets/carousel/3.jpg" />
      <q-carousel-slide :name="4" img-src="~assets/carousel/4.jpg" />
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Carousel',
  setup () {
    return {
      slide: ref(1)
    }
  }
}
</script>

<style scoped>

</style>
