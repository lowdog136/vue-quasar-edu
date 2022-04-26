<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model='$store.state.NewsClubNewsCard[1].NewsCardAnnounceNews'
        label="Заголовок"
        hint="Товарищеский матч, официальный матч"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      /> {{ $store.state.NewsClubNewsCard[1].NewsCardAnnounceNews }}
      <q-input
        filled
        v-model="ResultCardTitle"
        label="Результат игры"
        hint="Победа, поражение, ничья"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
      <q-input
        filled
        v-model='$store.state.NewsClubNewsCard[1].ResultCardTeam1'
        label="Команда 1"
        hint="ФК Имя Город"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      /> {{ $store.state.NewsClubNewsCard[1].ResultCardTeam1 }}
      <q-input
        filled
        v-model="ResultCardTeam2"
        label="Команда 2"
        hint="ФК Имя Город"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />
      <q-input
        filled
        v-model="ResultCardResult"
        label="Счет в матче"
        hint="1-1 (1-0)"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Заполните поле']"
      />

      <div>
        <q-btn @click="saveResultMatch" label="Отправить" type="submit" color="primary"/>
        <q-btn label="Очистить" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
export default {
  name: 'ResultMatchAddData',
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const NewsCardAnnounceNews = ref(null)
    const ResultCardTitle = ref(null)
    const ResultCardTeam1 = ref(null)
    const ResultCardTeam2 = ref(null)
    const ResultCardResult = ref(null)
    const accept = ref(false)

    return {
      name,
      NewsCardAnnounceNews,
      ResultCardTitle,
      ResultCardTeam1,
      ResultCardTeam2,
      ResultCardResult,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        NewsCardAnnounceNews.value = null
        ResultCardTitle.value = null
        ResultCardTeam1.value = null
        ResultCardTeam2.value = null
        ResultCardResult.value = null
        accept.value = false
      },

      saveResultMatch () {
        console.log('saveResultMatch')
      }
    }
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return {
          NewsClubNewsCardCardNewsSrc: String,
          NewsCardAnnounceNews: String,
          NewsClubNewsCardStatus: String,
          NewsClubNewsCardPreViewNews: String,
          NewsClubNewsCardExtNews: String,
          NewsClubNewsCardTitleUrlImg: String,
          NewsCardStatusMatch_F: String,
          NewsCardStatusMatch_O: String,
          dateNews: String,
          ResultCardTeam1: String,
          NewsClubNewsCardDateNews: String,
          TitleNewsCard: String,
          NewsClubNewsCardFullNews: String,
          NewsClubNewsCardFullNews2: String,
          NewsClubNewsAnnounce: String,
          NewsClubNewsCardTitleNews: String
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
