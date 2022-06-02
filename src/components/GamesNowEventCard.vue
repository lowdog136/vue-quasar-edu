<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline v-if="eventListValue.eventCardTitleMounthDateView" :layout="layout" color="secondary">
      <q-timeline-entry heading>{{ eventListValue.eventCardTitleMounthDate }}</q-timeline-entry>
      <q-timeline-entry
        :title='eventListValue.eventCardNameContest'
        :subtitle='eventListValue.eventCardTitleDate'
        side="left"
        icon="emoji_emotions"
      >
        <div>
          {{ eventListValue.eventCardGameTur }}
        </div>
        <div>
          {{ eventListValue.eventCardGameBody }}
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
export default {
  name: 'GamesNowEventCard',
  setup () {
    return {}
  },
  props: {
    eventListValue: {
      type: Object,
      default () {
        return {
          eventCardTitleMounthDate: String,
          eventCardTitleMounthDateView: String,
          eventCardTitleDate: String,
          eventCardNameContest: String,
          eventCardGameTur: String,
          eventCardGameBody: String
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
