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
      caption="О клубе, новости, стадион"
    >
      <q-item clickable v-ripple :active="active" to="/NewsClub">
        <q-item-section avatar>
          <q-icon name="newspaper" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Новости клуба</q-item-label>
          <q-item-label caption>Последние известия</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ ReleaseNewsSite }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/HistoryClub">
        <q-item-section avatar>
          <q-icon name="people_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Клуб</q-item-label>
          <q-item-label caption>О клубе</q-item-label>
        </q-item-section>
      </q-item>
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
      <q-item clickable v-ripple :active="active" to="/Foto">
        <q-item-section avatar>
          <q-icon name="camera_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Фото</q-item-label>
          <q-item-label caption>Фотографии</q-item-label>
        </q-item-section>
      </q-item>
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
    <q-expansion-item
      v-model="expanded"
      icon="info"
      label="О сайте"
      caption="Новости сайта, история развития"
    >
      <q-item clickable v-ripple :active="active" to="/NewsSite">
        <q-item-section avatar>
          <q-icon name="update" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Новости</q-item-label>
          <q-item-label caption>История обновления</q-item-label>
        </q-item-section>
          <q-item-section side top>
            <q-item-label caption >{{ ReleaseDateSite }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/AboutSite">
        <q-item-section avatar>
          <q-icon name="timeline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>История</q-item-label>
          <q-item-label caption>История ресурса</q-item-label>
        </q-item-section>
      </q-item>
     </q-expansion-item>
  </div>
</template>

<script>

export default {
  name: 'NewsDrawer',
  setup () {
    return {
      // Дата обновления сайта
      ReleaseDateSite: '14.03.22',
      // Дата обновления новостей о команде
      ReleaseNewsSite: '14.03.22',
      labelAboutSite: 'О сайте',
      iconAboutSite: 'info'
    }
  }
}
</script>

<style scoped>

</style>
