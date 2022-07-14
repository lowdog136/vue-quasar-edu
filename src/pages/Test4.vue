<template>
  <div class="q-pa-md">
    <TestInputComp />
    <q-toggle
      v-model='value'
      color="primary"
    />
    {{ value }}
    <TestTitleComp :greetingMessage=title1Name />
    <div class="q-pa-md" v-for="author in authors" :key="author.id">
       <TestListComp v-if="countTest == author.id" :greeting-author="author.author"
                     :greeting-body="author.body"
                     :greeting-title="author.title"
                     :greeting-date="author.date"
                     :greeting-done='value'
                     :greeting-btn="btnUp"
                     :greeting-count="author.count"
       />
    </div>
    <q-input v-model="countTest" label='text here' />
    <div style="color: #ae0000">
      {{ titleTest }}
    </div>
    <q-separator />
    <q-btn @click="countTest++" label="btnUp"/>
    {{ countTest }}
    <q-input v-model="titleTest" label='text here' />
    <div style="color: #ae0000">
      {{ titleTest }}
    </div>
   </div>
</template>

<script>
import { ref, toRefs } from 'vue'
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
      title1Name: 'Prots title this'
    }
  },
  props: {
    myTitle: String
  },
  setup (props) {
    const titleTest = ref('')
    const countTest = ref(0)
    countTest.value++
    console.log('12', countTest.value)
    const { titleName } = toRefs(props)
    return {
      countTest,
      titleTest,
      titleName,
      authors: [
        {
          id: 1,
          title: 'my little title',
          author: 'name11',
          body: 'text body1',
          date: '01-01-2020',
          count: 0,
          done: false
        },
        {
          id: 2,
          title: 'my large title',
          author: 'name2',
          body: 'text body2',
          date: '01-02-2020',
          count: 0,
          done: false
        },
        {
          id: 3,
          title: 'my middle title',
          author: 'name3',
          body: 'text body2',
          date: '02-04-2020',
          count: 0,
          done: false
        }
      ]
    }
  },
  methods: {
    btnUp () {
      this.$store.state.myCount++
      console.log('count3')
    }
  },
  mounted () {
    console.log('countTest', this.countTest)
  }
}
</script>

<style scoped>

</style>
