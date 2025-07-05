<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img  alt="logo" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            О сайте
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <!-- История сайта -->
          <div class="site-history q-mb-xl">
            <h2 class="text-h4 text-weight-bold q-mb-md">История SeverFans</h2>
            <p v-for="n in 1" :key="n" class="text-body1 q-mb-md">
              Сайт был основан в 2007 году.<br>
              Точную дату не вспомнить, но судя по Wayback Machine - 25 мая. Наверно эта дата и будет считаться датой начала. Хотя по факту все начиналось раньше.<br>
              Как клуб, объединение болельщиков (хулсы, ультрас) - этот сайт имеет свою историю.<br>
              О ней и будет ниже.<br>
            </p>
          </div>

          <!-- Навигация по разделам -->
          <q-tabs
            v-model="activeTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="history" label="История" />
            <q-tab name="roadmap" label="Дорожная карта" />
            <q-tab name="team" label="Команда" />
          </q-tabs>

          <q-separator class="q-my-md" />

          <!-- Контент разделов -->
          <q-tab-panels v-model="activeTab" animated>
            <!-- История -->
            <q-tab-panel name="history" class="q-pa-none">
              <div class="text-body1">
                <h3 class="text-h5 q-mb-md">Развитие проекта</h3>
                <p class="q-mb-md">
                  SeverFans.ru начал свой путь как простой сайт для болельщиков футбольного клуба "Север".
                  За годы существования проект прошел множество этапов развития и трансформаций.
                </p>

                <div class="timeline q-mt-lg">
                  <div class="timeline-item q-mb-lg">
                    <div class="row items-center">
                      <div class="col-auto">
                        <q-avatar color="primary" text-color="white" size="40px">
                          <q-icon name="event" />
                        </q-avatar>
                      </div>
                      <div class="col q-ml-md">
                        <h4 class="text-h6 q-mb-xs">2007 - Основание</h4>
                        <p class="text-caption">Создание первого сайта для болельщиков</p>
                      </div>
                    </div>
                  </div>

                  <div class="timeline-item q-mb-lg">
                    <div class="row items-center">
                      <div class="col-auto">
                        <q-avatar color="secondary" text-color="white" size="40px">
                          <q-icon name="web" />
                        </q-avatar>
                      </div>
                      <div class="col q-ml-md">
                        <h4 class="text-h6 q-mb-xs">2010-2015 - Развитие</h4>
                        <p class="text-caption">Расширение функционала, добавление новостей и статистики</p>
                      </div>
                    </div>
                  </div>

                  <div class="timeline-item q-mb-lg">
                    <div class="row items-center">
                      <div class="col-auto">
                        <q-avatar color="accent" text-color="white" size="40px">
                          <q-icon name="mobile_friendly" />
                        </q-avatar>
                      </div>
                      <div class="col q-ml-md">
                        <h4 class="text-h6 q-mb-xs">2015-2020 - Мобилизация</h4>
                        <p class="text-caption">Адаптация под мобильные устройства, улучшение UX</p>
                      </div>
                    </div>
                  </div>

                  <div class="timeline-item q-mb-lg">
                    <div class="row items-center">
                      <div class="col-auto">
                        <q-avatar color="positive" text-color="white" size="40px">
                          <q-icon name="trending_up" />
                        </q-avatar>
                      </div>
                      <div class="col q-ml-md">
                        <h4 class="text-h6 q-mb-xs">2020-2025 - Современность</h4>
                        <p class="text-caption">Переход на Vue.js + Quasar, внедрение современных технологий</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Дорожная карта -->
            <q-tab-panel name="roadmap" class="q-pa-none">
              <RoadmapTimeline />
            </q-tab-panel>

            <!-- Команда -->
            <q-tab-panel name="team" class="q-pa-none">
              <div class="text-body1">
                <h3 class="text-h5 q-mb-md">Наша команда</h3>
                <p class="q-mb-md">
                  SeverFans - это проект, созданный энтузиастами для болельщиков.
                  Наша команда постоянно работает над улучшением сайта и добавлением новых функций.
                </p>

                <div class="row q-gutter-md q-mt-lg">
                  <div class="col-12 col-md-6">
                    <q-card class="team-member-card">
                      <q-card-section>
                        <div class="row items-center">
                          <q-avatar size="60px" class="q-mr-md">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Developer">
                          </q-avatar>
                          <div class="col">
                            <h4 class="text-h6 q-mb-xs">Разработчик</h4>
                            <p class="text-caption q-mb-xs">Frontend & Backend</p>
                            <p class="text-body2">Отвечает за техническую реализацию проекта</p>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-card class="team-member-card">
                      <q-card-section>
                        <div class="row items-center">
                          <q-avatar size="60px" class="q-mr-md">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Content Manager">
                          </q-avatar>
                          <div class="col">
                            <h4 class="text-h6 q-mb-xs">Контент-менеджер</h4>
                            <p class="text-caption q-mb-xs">Новости & Контент</p>
                            <p class="text-body2">Управляет контентом и новостями сайта</p>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>

                <div class="q-mt-lg">
                  <h4 class="text-h6 q-mb-md">Присоединяйтесь к команде!</h4>
                  <p class="text-body2 q-mb-md">
                    Мы всегда рады новым участникам команды. Если вы хотите помочь в развитии проекта,
                    свяжитесь с нами через форму обратной связи.
                  </p>
                  <q-btn
                    color="primary"
                    label="Связаться с командой"
                    icon="email"
                    @click="contactTeam"
                  />
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RoadmapTimeline from 'components/Roadmap/RoadmapTimeline.vue'

export default defineComponent({
  name: 'PageAboutSite',
  components: {
    RoadmapTimeline
  },
  setup () {
    const activeTab = ref('history')

    const contactTeam = () => {
      // Логика для связи с командой
      console.log('Contact team clicked')
    }

    return {
      activeTab,
      contactTeam
    }
  }
})
</script>

<style scoped>
.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 40px;
  bottom: -20px;
  width: 2px;
  background: var(--q-grey-3);
}

.timeline-item:last-child::before {
  display: none;
}

.team-member-card {
  transition: all 0.3s ease;
}

.team-member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
