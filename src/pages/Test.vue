<template>
  <div>
    Store count: {{ stope.state.myCount2 }}<br>
    My Ttitle text : {{ stope.state.myTitleText }}
  </div>
  <div>
    <q-input v-model="stope.statemyTitleText"/>
  </div>
  <q-btn @click="stope.state.myCount2++">+</q-btn>
  <div>
    <h3>
      Array: <br>
      {{ stope.state.myArray[0].title }}
    </h3>
    <q-input v-model="stope.state.myArray[0].title"/>
  </div>
  myName value: {{ stope.state.myName }}<br>
  <input type="submit" value="save"/>
  <TestComp />
</template>
<script>
import { stope } from 'src/store'
import TestComp from 'components/TestComp'

export default {
  name: 'Test',
  components: { TestComp },
  data () {
    return {
      stope
    }
  },
  methods: {
    showPost () {
      this.stope.state.myArray[0].status = !this.stope.state.myArray[0].status
    }
  }
}
</script>
