<template>
  <div class="q-pa-md">
    <TestInputComp />
    <TestTitleComp :greetingMessage=titleName />
    <div class="q-pa-md" v-for="author in authors" :key="author.id">
       <TestListComp :greeting-author="author.author"
                     :greeting-body="author.body"
                     :greeting-title="author.title"
    />
    </div>
   </div>
</template>

<script>
import TestTitleComp from 'components/TestComp/TestTitleComp'
import TestListComp from 'components/TestComp/TestListComp'
import TestInputComp from 'components/TestComp/TestInputComp'
export default {
  name: 'Test4',
  components: { TestInputComp, TestTitleComp, TestListComp },
  data () {
    return {
      titleName: 'Ololo'
    }
  },
  setup () {
    return {
      authors: [
        {
          id: 1,
          title: 'my litle title',
          author: 'name1',
          body: 'text body1',
          date: '01-01-2020'
        },
        {
          id: 2,
          title: 'my large title',
          author: 'name2',
          body: 'text body2',
          date: '01-02-2020'
        },
        {
          id: 3,
          title: 'my middle title',
          author: 'name3',
          body: 'text body2',
          date: '02-04-2020'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
