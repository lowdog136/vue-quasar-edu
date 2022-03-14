<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-item clickable v-ripple :active="active" to="/">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Главная</q-item-label>
        <q-item-label caption>Оснавная страница</q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
      v-model="expanded"
      icon="sports_soccer"
      label="ФК Север"
      caption="О клубе, стадион"
    >
      <q-expansion-item
        v-model="expanded"
        icon="people_alt"
        label="Клуб"
        caption="О клубе"
        to="/HistoryClub"
      />
      <q-expansion-item
        v-model="expanded"
        icon="perm_identity"
        label="Стадион"
        caption="Стадион"
        to="/Stadium"
        disable
      />
    </q-expansion-item>
    <q-expansion-item
      v-model="expanded"
      icon="perm_identity"
      label="Архив"
      caption="Фото, видео, результаты матчей"
    >
      <q-expansion-item
        v-model="expanded"
        icon="camera_alt"
        label="Фото"
        caption="Фотографии"
        to="/Foto"
      />
      <q-expansion-item
        v-model="expanded"
        icon="movie"
        label="Видео"
        caption="Видеоматериалы"
        to="/Video"
        disable
      />
      <q-expansion-item
        v-model="expanded"
        icon="scoreboard"
        label="Результаты матчей"
        caption="Результаты матчей"
        to="/ResultMatch"
        disable
      />
    </q-expansion-item>
    <q-expansion-item
      v-model="expanded"
      icon="emoji_people"
      label="Фанаты"
      caption="Болельщики клуба"
      to="/Fanats"
      disable
    />
    <q-item clickable v-ripple :active="active" to="/Contact">
      <q-item-section avatar>
        <q-icon name="email" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Контакты</q-item-label>
        <q-item-label caption>Связаться</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple :active="active" to="/AboutSite">
      <q-item-section avatar>
        <q-icon name="info" />
      </q-item-section>
      <q-item-section>
        <q-item-label>О сайте</q-item-label>
        <q-item-label caption>История развития</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>

export default {
  name: 'TestComp'
}
</script>

<style scoped>

</style>
