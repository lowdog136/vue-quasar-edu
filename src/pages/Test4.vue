<template>
  <div class="q-pa-md">
    <TestInputComp />
    <q-toggle
      v-model='value'
      color="primary"
    />
    {{ value }}
    <TestTitleComp :greetingMessage=titleName />
    <div class="q-pa-md" v-for="author in authors" :key="author.id">
       <TestListComp :greeting-author="author.author"
                     :greeting-body="author.body"
                     :greeting-title="author.title"
                     :greeting-done='value'
                     :greeting-btn="btnUp"
       />
    </div>
   </div>
</template>

<script>
import { ref } from 'vue'
import TestTitleComp from 'components/TestComp/TestTitleComp'
import TestListComp from 'components/TestComp/TestListComp'
import TestInputComp from 'components/TestComp/TestInputComp'
export default {
  name: 'Test4',
  components: { TestInputComp, TestTitleComp, TestListComp },
  data () {
    return {
      value: ref(false),
      btnName: 'btnName',
      titleName: 'Prots title this'
    }
  },
  setup () {
    return {
      authors: [
        {
          id: 1,
          title: 'my little title',
          author: 'name11',
          body: 'text body1',
          date: '01-01-2020',
          done: false
        },
        {
          id: 2,
          title: 'my large title',
          author: 'name2',
          body: 'text body2',
          date: '01-02-2020',
          done: false
        },
        {
          id: 3,
          title: 'my middle title',
          author: 'name3',
          body: 'text body2',
          date: '02-04-2020',
          done: false
        }
      ]
    }
  },
  methods: {
    btnUp () {
      console.log('id')
    }
  }
}
</script>

<style scoped>

</style>
