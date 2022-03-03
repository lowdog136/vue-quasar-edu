<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-expansion-item
      v-model="expanded"
      icon="home"
      label="Главная"
      caption="На главную"
      to="/"
     />
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
      />
      <q-expansion-item
        v-model="expanded"
        icon="scoreboard"
        label="Результаты матчей"
        caption="Результаты матчей"
        to="/ResultMatch"
      />
    </q-expansion-item>
    <q-expansion-item
      v-model="expanded"
      icon="emoji_people"
      label="Фанаты"
      caption="На главную"
      to="/Fanats"
    />
    <q-expansion-item
      v-model="expanded"
      icon="email"
      label="Контакты"
      caption="Связаться"
      to="/Contact"
    />
    <q-expansion-item
      v-model="expanded"
      icon="info"
      label="О сайте"
      caption="История развития"
      to="/AboutSite"
    />
  </div>
</template>

<script>

export default {
  name: 'TestComp'
}
</script>

<style scoped>

</style>
