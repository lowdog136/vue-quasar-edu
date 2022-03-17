<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-item clickable v-ripple :active="active" to="/">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[0].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[0].Caption }}</q-item-label>
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
          <q-item-label>{{ $store.state.NavigationListMenu[2].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[2].Caption }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ $store.state.NavigationReleaseNewsSite }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/HistoryClub">
        <q-item-section avatar>
          <q-icon name="people_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[3].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[3].Caption }}</q-item-label>
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
          <q-item-label>{{ $store.state.NavigationListMenu[6].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[6].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple disable :active="active" to="/Video">
        <q-item-section avatar>
          <q-icon name="movie" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[7].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[7].Caption }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item
        v-model="expanded"
        icon="scoreboard"
        label="Результаты матчей"
        caption="Результаты матчей"
        to="/ResultMatch"
        disable
      />
    </q-expansion-item>
    <q-item clickable v-ripple disable :active="active" to="/Fanats">
      <q-item-section avatar>
        <q-icon name="emoji_people" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[9].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[9].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple :active="active" to="/Contact">
      <q-item-section avatar>
        <q-icon name="email" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[11].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[11].Caption }}</q-item-label>
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
          <q-item-label>{{ $store.state.NavigationListMenu[13].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[13].Caption }}</q-item-label>
        </q-item-section>
          <q-item-section side top>
            <q-item-label caption >{{ $store.state.NavigationReleaseDateSite }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active" to="/AboutSite">
        <q-item-section avatar>
          <q-icon name="timeline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $store.state.NavigationListMenu[14].Name }}</q-item-label>
          <q-item-label caption>{{ $store.state.NavigationListMenu[14].Caption }}</q-item-label>
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
      labelAboutSite: 'О сайте'
    }
  }
}
</script>

<style scoped>

</style>
